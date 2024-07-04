import { Router } from 'express';
import userController from "../controllers/user-controller";
import upload from "../middlewares/multer-middleware";

const authRouter = Router();

authRouter.post("/telegramData", userController.telegram_data);

authRouter.post("/userData", upload.fields([
    { name: 'photo_path', maxCount: 3 },
    { name: 'selfie_path', maxCount: 1 }
]), userController.user_data);

authRouter.post("/check/:id", userController.check);

export default authRouter;