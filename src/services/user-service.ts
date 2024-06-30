import {TelegramUser, TelegramUserCreationAttributes} from '../models/TelegramUser';
import {User, UserCreationAttributes} from '../models/User';
import imageService from "./image-service";
import ApiError from "../exceptions/api-error";
import UserDto from "../dtos/user-dto";


class UserService {
    async createTelegramUser(data: TelegramUserCreationAttributes): Promise<TelegramUser> {
        try {
            const telegramUser = await TelegramUser.create(data);

            // await redisClient.set(`telegramUser:${telegramUser.id}`, JSON.stringify(telegramUser), {
            //     EX: 3600, // Кэширование на 1 час
            // });

            return telegramUser;
        }catch (error) {
            throw ApiError.BadRequest('Ошибка создания Telegram пользователя', [(error as Error).message]);
        }
    }

    async createUser(data: UserCreationAttributes): Promise<any> {
        try{
            const telegramUser = await TelegramUser.findOne({ where: { telegram_id: data.account_id } });
            if (!telegramUser) {
                throw ApiError.NotFoundError("Такого telegram_id не существует");
            }

            const user = await User.create(data);
            const isImageApproved = await imageService.checkImage(data.photo_path, data.selfie_path);
            const isSubscribed = false;


            // if(isImageApproved){  // будет ли возможность сверки фотографий после регистрации
            //     const user = await User.create(data);
            //     const userDto = new UserDto({});
            // }
            // else{
            //
            // }

            // await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
            //     EX: 3600, // Кэширование на 1 час
            // });

            return new UserDto(user, isImageApproved, isSubscribed);
        }catch (error) {
            throw ApiError.BadRequest('Ошибка создания пользователя', [(error as Error).message]);
        }
    }

    async checkUser(account_id: number): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { account_id } });
            if (!user) {
                throw ApiError.NotFoundError('Пользователь с данным id не найден');
            }
            return user;
        } catch (error) {
            throw ApiError.BadRequest('Ошибка при проверке пользователя', [(error as Error).message]);
        }
    }

}

export default new UserService();