import {Request, Response, NextFunction} from "express";
import userService from "../services/user-service";

class UserController {
    async telegram_data(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {
            telegram_id,
            telegram_name,
            is_bot,
            telegram_surname,
            username,
            language_code,
            is_premium,
            added_to_attachment_menu,
            allows_write_to_pm,
            photo_url,
        } = req.body;

        try {
            const telegramUser = await userService.createTelegramUser({
                telegram_id,
                telegram_name,
                is_bot,
                telegram_surname,
                username,
                language_code,
                is_premium,
                added_to_attachment_menu,
                allows_write_to_pm,
                photo_url,
            });

            res.json({ telegramUser });
            // return(res.json({ telegramUser }));   // parameter type void
        } catch (error) {
            next(error);
        }
    }


    async user_data(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {
            account_id,
            name,
            gender,
            birthdate,
            city,
            search_goal,
            photo_path,
            selfie_path,
            subscription_links
        } = req.body;

        try {
            const user = await userService.createUser({
                account_id,
                name,
                gender,
                birthdate,
                city,
                search_goal,
                photo_path,
                selfie_path,
                subscription_links
            });

            res.json({ user });
        } catch (error) {
            next(error);
        }
    }

    async check(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.checkUser(Number(id));
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    // async getUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { id } = req.params;
    //
    //         const cachedUser = await redisClient.get(`user:${id}`);
    //         if (cachedUser) {
    //             return res.status(200).json(JSON.parse(cachedUser));
    //         }
    //
    //         const user = await User.findByPk(id);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //
    //         await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
    //             EX: 3600,
    //         });
    //
    //         return res.status(200).json(user);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export default new UserController();