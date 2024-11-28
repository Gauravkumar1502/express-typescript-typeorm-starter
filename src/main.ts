import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import dataSource from "./config/data-source";
import { authRouter } from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});