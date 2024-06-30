const Router = require("express").Router;
const router = new Router();
import authRouter from "./auth-router";


router.use("/auth", authRouter);




export default router;