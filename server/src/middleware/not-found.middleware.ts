import { RequestHandler } from "express";
import AppError from "../utils/AppError";

const notFoundMiddleware: RequestHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export default notFoundMiddleware;
