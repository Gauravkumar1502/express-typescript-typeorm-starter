import { Request, Response } from "express";
import { HttpStatus } from "../constants/HttpStatus";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { NotFoundException } from "../exceptions/NotFoundException";
import UserService from "../services/user.service";
import { comparePassword } from "../utils/password.util";

export class UserController {
    private userService: UserService;

    constructor() {
        if (!this.userService){
            this.userService = new UserService();
        }
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        const id: string = req.params.id;
        try {
            const user = await this.userService.getUserById(id);
            res.status(HttpStatus.OK).json(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                res.status(error.statusCode).json({ error: error.message });
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(HttpStatus.OK).json(users);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }

    registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.registerUser(req.body);
            res.status(HttpStatus.CREATED).json(user);
        } catch (error) {
            if (error instanceof AlreadyExistsException) {
                res.status(error.statusCode).json({ error: error.message });
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserByEmail(req.body.email);
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({ error: "User not found" });
                return;
            }
            if (!user.verifiedAt){
                res.status(HttpStatus.UNAUTHORIZED).json({ error: "User is not verified" });
                return;
            }
            const isPasswordMatch = await comparePassword(req.body.password, user.passwordHash);
            if (!isPasswordMatch) {
                res.status(HttpStatus.UNAUTHORIZED).json({ error: "Invalid email or password" });
                return;
            }
            const { passwordHash, ...userWithoutPassword } = user;
            res.status(HttpStatus.OK).json(userWithoutPassword);
        } catch (error) {
            if (error instanceof NotFoundException) {
                res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }
}