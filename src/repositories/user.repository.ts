import { Repository, DataSource } from "typeorm";
import { User } from "../entities/User";
import dataSource from "../config/data-source";

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        if (!this.repository) {
            this.repository = dataSource.getRepository(User);
        }
    }

    isExistById(id: string): Promise<boolean> {
        return this.repository.existsBy({ id: id });
    }

    isExistByEmail(email: string): Promise<boolean> {
        return this.repository.existsBy({ email: email });
    }

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<User | null> {
        return this.repository.findOneBy({ id: id });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email: email });
    }

    create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    update(id: string, userData: Partial<User>): Promise<User | null> {
        this.repository.update(id, userData);
        return this.findById(id);
    }
}