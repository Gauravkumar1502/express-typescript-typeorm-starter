import { Router } from "express";
import { validateRequest } from "../middlewares/validation.middleware";
import { emailOrPasswordSchema } from "../validations/schemas";
import { UserController } from "../controllers/user.controller";

export const authRouter: Router = Router();
const userController: UserController = new UserController();

authRouter.post("/register", validateRequest(emailOrPasswordSchema), userController.registerUser);
authRouter.post("/login", validateRequest(emailOrPasswordSchema), userController.loginUser);
authRouter.get("/", userController.getAllUsers);