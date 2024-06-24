import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';

interface TelegramUserAttributes {
    id: number;
    telegram_id: number;
    telegram_name: string;
}


export class TelegramUser extends Model<TelegramUserAttributes> implements TelegramUserAttributes {
    public id!: number;
    public telegram_id!: number;
    public telegram_name!: string;
}

TelegramUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        telegram_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        telegram_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'TelegramUser',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


