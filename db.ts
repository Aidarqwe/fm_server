import sequelize from './src/config/dbConnect';

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Подключение в базе данных установлено!');
    } catch (error) {
        console.error('Не удалось подключиться к базе данных: ', error);
    }
}

export default connectDB;