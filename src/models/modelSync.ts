import sequelize from '../config/dbConnect';
import { User } from './User';
import { TelegramUser } from './TelegramUser';


TelegramUser.hasOne(User, {foreignKey: "account_id"});
User.belongsTo(TelegramUser, { foreignKey: 'telegram_id' });

export const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

export { User, TelegramUser };