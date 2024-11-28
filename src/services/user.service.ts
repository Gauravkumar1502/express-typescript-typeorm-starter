import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/User";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/password.util";

export default class UserService {
    private userRepository: UserRepository;

    constructor() {
        if (!this.userRepository) {
            this.userRepository = new UserRepository();
        }
    }

    registerUser = async (userData: CreateUserDto): Promise<User> => {
        const isUserExist = await this.userRepository.isExistByEmail(userData.email);
        if (isUserExist) {
            throw new AlreadyExistsException(`User with email ${userData.email} already exists`);
        }
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const newUser = new User({ email: userData.email, passwordHash: userData.password });
        return this.userRepository.create(newUser);
    }

    getAllUsers = async (): Promise<User[]> => {
        return this.userRepository.findAll();
    }

    getUserById = async (id: string): Promise<User> => {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id "${id}" not found`);
        }
        return user;
    }

    getUserByEmail = async (email: string): Promise<User> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email "${email}" not found`);
        }
        return user;
    }
}