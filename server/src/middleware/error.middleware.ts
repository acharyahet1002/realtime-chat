import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
import mongoose from "mongoose";

const errorMiddleware: ErrorRequestHandler = (error, _req, res) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Database validation Failed";

    errors = Object.values(error.errors).map((err) => ({
      field: err.path,
      message: err.message
    }));
  } else if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    statusCode = 409;
    message = "Duplicate resource already exists";
  } else if (error instanceof Error) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(process.env.NODE_ENV === "development" && error instanceof Error
      ? { stack: error.stack }
      : {})
  });
};

export default errorMiddleware;
