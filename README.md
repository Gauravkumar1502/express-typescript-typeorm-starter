# Express.js TypeScript TypeORM Boilerplate Starter

A boilerplate project for quickly setting up an Express.js application with TypeScript and TypeORM, designed to save time on repetitive tasks when starting similar projects.

## Features

- 🛠️ TypeScript: Provides type safety and modern JavaScript features.
- ⚡ Express.js: Fast, unopinionated, and minimalist web framework for Node.js.
- 📦 TypeORM: A powerful ORM for database interaction.
- 🗂️ Modular Structure: Clean and scalable folder organization.
- 🌐 Environment Configuration: Manage environment variables efficiently.
- ✅ Validation: Easily integrate request validation using libraries like class-validator.
- 🔄 Migrations: Supports database migrations.
- 🧪 Testing: Ready-to-use testing setup.

## Getting Started

1. Clone the Repository

    ```bash
    git clone https://github.com/your-username/typescript-typeorm-starter.git
    cd typescript-typeorm-starter
    ```

2. Install Dependencies

    ```bash
    npm install
    ```

3. Set Up Environment Variables

    Create a .env file in the root directory and configure the following variables:

    ```env
    PORT=3000
    NODE_ENV=development
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=your_database_name
    DB_SSL_CERT_PATH=ca.pem
    ```

4. Run the Project

    **For development:**

    ```bash
    npm run dev
    ```

    **For production:**

    ```bash
    npm run build
    npm start
    ```

5. Open your browser and visit <http://localhost:3000> to see the application in action.

## Available Scripts

- `npm run dev`: Starts the server in development mode using Nodemon.
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm start`: Starts the server in production mode.

## Project Structure

```plaintext
src/
├── config/                                 // Configuration files
│   └── data-source.ts                      // TypeORM Data Source configuration
├── constants/                              // Application-wide constants
│   └── HttpStatus.ts                       // HTTP status codes
├── controllers/                            // Route handler logic
│   └── UserController.ts                   // User-related route handlers
├── dtos/                                   // Data Transfer Objects
│   └── create-user.dto.ts                  // DTO for creating a new user
├── entities/                               // TypeORM entities (database models)
│   └── User.ts                             // User entity definition
├── exceptions/                             // Custom exceptions
│   └── BaseException.ts                    // Base exception class
|   └── AlreadyExistsException.ts           // Custom exception for duplicate entries
├── migrations/                             // Database migrations
│   └── <timestamp>-InitialMigration.ts     // Example migration file
├── middlewares/                            // Custom Express middlewares
│   └── authMiddleware.ts                   // Example middleware for authentication
├── repositories/                           // TypeORM custom repositories
│   └── UserRepository.ts                   // Repository for User entity
├── routes/                                 // API routes
│   └── userRoutes.ts                       // User-related API routes
├── services/                               // Business logic and services
│   └── UserService.ts                      // User-specific business logic
├── utils/                                  // Helper functions and utilities
│   └── logger.ts                           // Example utility for logging
├── validators/                             // Request data validation
│   └── schemas.ts                          // Joi validation schemas
├── main.ts                                 // Main Express application setup
```

## Development Guidelines

- Follow Clean Code Practices for readability and maintainability.
- Use TypeORM repositories for database operations.
- Leverage TypeScript's strict types to avoid runtime errors.

## How to Reproduce the Same Starter

Follow these steps to recreate this starter project from scratch:

1. Initialize the Project

    - Start with a new Node.js project:

        ```bash
        mkdir typescript-typeorm-starter
        cd typescript-typeorm-starter
        npm init -y
        ```

    - Set up TypeScript:

        ```bash
        npx tsc --init
        ```

    - Above command will create a `tsconfig.json` file. Change the following settings in the `tsconfig.json` file:

        ```json
        "rootDir": "./src",
        "outDir": "./dist",
        ```

2. Install Dependencies

    - Install the required dependencies:

        ```bash
        npm install express typeorm reflect-metadata pg dotenv cors joi bcrypt 
        ```

    - Install development dependencies:

        ```bash
        npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/dotenv @types/pg @types/joi @types/bcrypt @types/cors
        ```

3. Set Up the Project Structure

    - Create the following directories inside the `src` folder:

        ```bash
        mkdir src/controllers src/entities src/migrations src/middlewares src/routes src/services src/utils src/validators src/constants src/exceptions src/dtos src/repositories src/config
        ```

    - Create the following files inside the `src` folder:

        ```bash
        touch src/main.ts
        ```

4. Configure Scripts

    - Update the `package.json` file with the following scripts:

        ```json
        "scripts": {
            "dev": "nodemon src/main.ts",
            "build": "tsc",
            "start": "node dist/main.js",
        }
        ```

5. Set Up TypeORM

    - Create a `data-source.ts` file inside the `src/config` folder:

        ```bash
        touch src/config/data-source.ts
        ```

    - Add the following code to the `data-source.ts` file:

        ```typescript
        import { DataSource } from "typeorm";

        const dataSource = new DataSource({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            logging: false,
            entities: [
                // Add your entities here
            ],
            migrations: [
                // Add your migrations here
            ],
            logging: process.env.NODE_ENV === "development" ? true : false, // Enable logging in development mode
            ssl: {
                rejectUnauthorized: true,
                ca: fs.readFileSync(process.env.DB_SSL_CERT_PATH as string).toString(), 
            },
            uuidExtension: "uuid-ossp", // Enable UUID extension for PostgreSQL
        });

        export default dataSource;
        ```

6. Set Up Express.js

    - Create an `main.ts` file inside the `src` folder:

        ```bash
        touch src/main.ts
        ```

    - Add the following code to the `main.ts` file:

        ```typescript
        import "reflect-metadata";
        import "dotenv/config";
        import cors from "cors";
        import express, { Request, Response } from "express";
        import dataSource from "./config/data-source";
        import { authRouter } from "./routes/auth.routes";

        const PORT = process.env.PORT || 3000;
        const app = express();

        // Connect to the database
        dataSource.initialize().then(() => {
            console.log(`Datasource Successfully Connected to the ${process.env.DB_NAME} database`);
        }).catch((error) => {
            console.error(`Error while connecting to the database: ${error}`);
            process.exit(1);
        });

        // Cofigure body-parser to parse JSON data
        app.use(express.json());

        // Configure body-parser to parse URL encoded data
        app.use(express.urlencoded({ extended: true }));

        // Configure CORS
        app.use(cors());

        app.use("/auth", authRouter);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on on http://localhost:${PORT}`);
        });
        ```

## Contributing

Contributions are welcome! If you find a bug or want to add a feature, feel free to submit a pull request.
