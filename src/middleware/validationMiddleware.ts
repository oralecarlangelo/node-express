import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";

export const validationMiddleware = (type: any): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body))
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
          return res.status(400).json({ message });
        } else {
          next();
        }
      });
  };
};
