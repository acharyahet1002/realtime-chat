import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import AppError from "../utils/AppError";

const validate = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation Field",
          400,
          result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
          }))
        )
      );
    }
    req.body = result.data;

    next();
  };
};

export default validate;
