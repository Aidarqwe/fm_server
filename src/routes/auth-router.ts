import { Router } from 'express';
import userController from "../controllers/user-controller";

const authRouter = Router();

authRouter.post("/telegramData", userController.telegram_data);

authRouter.post("/userData", userController.user_data);

authRouter.post("/check/:id", userController.check);

export default authRouter;