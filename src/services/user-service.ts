import {TelegramUser, TelegramUserCreationAttributes} from '../models/TelegramUser';
import {User, UserCreationAttributes} from '../models/User';
// import redisClient from "../config/redisClient";
import imageService from "./image-service";
import ApiError from "../exceptions/api-error";
import UserDto from "../dtos/user-dto";

class UserService {
    async createTelegramUser(data: TelegramUserCreationAttributes): Promise<TelegramUser> {
        try {
            const telegramUser = await TelegramUser.create(data);

            // await redisClient.set(`telegramUser:${data.telegram_id}`, JSON.stringify(data), {
            //     EX: 3600, // Кэширование на 1 час
            // });

            return telegramUser;
        }catch (error) {
            throw ApiError.BadRequest('Ошибка создания Telegram пользователя', [(error as Error).message]);
        }
    }

    async createUser(data: UserCreationAttributes): Promise<UserDto>  {
        try{
            const telegramUser = await TelegramUser.findOne({ where: { telegram_id: data.account_id } });
            if (!telegramUser) {
                throw ApiError.NotFoundError("Такого telegram_id не существует");
            }

            const isImageApproved: boolean = await imageService.checkImage(data.photo_path[0], data.selfie_path);
            const isSubscribed: boolean = false; // function for check subscription

            if(isImageApproved){
                const user = await User.create(data);
                return new UserDto(user, isImageApproved, isSubscribed);
            }
            else{
                throw ApiError.BadRequest("Изображения не одобрены");
            }

            // await redisClient.set(`user:${data.account_id}`, JSON.stringify(data), {
            //     EX: 3600, // Кэширование на 1 час
            // });


        }catch (error) {
            throw ApiError.BadRequest('Ошибка создания пользователя', [(error as Error).message]);
        }
    }

    async checkUser(account_id: number): Promise<User | null> {
        try {
            // const cachedUser = await redisClient.get(`user:${account_id}`);
            // if (cachedUser) {
            //     return JSON.parse(cachedUser);
            // }
            const user = await User.findOne({ where: { account_id } });
            if (!user) {
                throw ApiError.NotFoundError('Пользователь с данным id не найден');
            }
            // await redisClient.set(`user:${account_id}`, JSON.stringify(user), 'EX', 3600); // Кэширование на 1 час
            return user;
        } catch (error) {
            throw ApiError.BadRequest('Ошибка при проверке пользователя', [(error as Error).message]);
        }
    }
}

export default new UserService();