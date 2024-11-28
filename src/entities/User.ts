import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BLOCKED = "blocked",
    DELETED = "deleted",
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "first_name", type: "varchar", length: 255, nullable: true })
    firstName: string;

    @Column({ name: "middle_name", type: "varchar", length: 255, nullable: true })
    middleName: string;

    @Column({ name: "last_name", type: "varchar", length: 255, nullable: true })
    lastName: string;

    @Column({ name: "username", type: "varchar", length: 255, unique: true, nullable: true })
    username: string;

    @Column({ name: "profile_url", type: "varchar", length: 512, nullable: true })
    profileUrl: string;

    @Column({ name: "email", type: "varchar", length: 255, unique: true, nullable: false })
    email: string;

    @Column({ name: "password_hash", type: "varchar", length: 255, nullable: false })
    passwordHash: string;

    @Column({ name: "country_code", type: "varchar", length: 5, nullable: true })
    countryCode: string;

    @Column({ name: "phone_number", type: "varchar", length: 15, unique: true, nullable: true })
    phoneNumber: string;

    @Column({ name: "role", type: "varchar", length: 20, nullable: false, default: "user" })
    role: string;

    @Column({ name: "verified_at", type: "timestamp", nullable: true })
    verifiedAt: Date;

    @Column({ name: "status", type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
    updatedAt: Date;

    @Column({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    get fullName(): string {
        return [this.firstName, this.middleName, this.lastName].filter(Boolean).join(" ");
    }
}