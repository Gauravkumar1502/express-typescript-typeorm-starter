import "dotenv/config";
import { DataSource } from "typeorm";
import fs from "fs";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: process.env.NODE_ENV === "development" ? true : false,
    logger: "file",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.DB_SSL_CERT_PATH as string).toString(), 
    },
    migrations: ["src/migrations/*.ts"],
    uuidExtension: "uuid-ossp",
});

export default dataSource;