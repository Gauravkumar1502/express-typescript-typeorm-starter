import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema, ValidationResult } from "joi";

export function validateRequest<T extends keyof Request>(schema: Schema, property: T = "body" as T): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value }: ValidationResult = schema.validate(req[property]);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    req[property] = value;
    next();
  };
}