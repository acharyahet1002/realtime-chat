import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";
import { loginSchema, registerSchema } from "../validations/auth";
import "dotenv/config";
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  verifyRefreshToken
} from "../utils/jwt";
import { refreshCookieOptions } from "../utils/cookie";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return next(
        new AppError("Validation failed", 400, validation.error.issues)
      );
    }
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return next(new AppError("Email is already registered", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "Registration successful",
        newUser
      });
    }
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return next(
        new AppError("Validation failed", 400, validation.error.issues)
      );
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email
    }).select("+password");

    if (!existingUser) {
      return next(new AppError("Account not found", 404));
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = generateAccessToken(email.toString());
    const refreshToken = generateRefreshToken(existingUser._id.toString());

    // Store only the refresh token hash
    existingUser.refreshTokenHash = hashRefreshToken(refreshToken);
    await existingUser.save();

    const data = { token, user: existingUser };

    if (existingUser) {
      res.cookie("refreshToken", refreshToken, refreshCookieOptions);

      res.status(201).json({
        success: true,
        message: "Login successful",
        data
      });
    }
  }
);

export const refresh: RequestHandler = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return next(new AppError("Refresh token required", 401));
  }

  const decoded = verifyRefreshToken(token);

  if (!decoded?.sub) {
    res.clearCookie("refreshToken", refreshCookieOptions);
    return next(new AppError("Invalid or expired refresh token", 401));
  }

  const user = await User.findById(decoded.sub).select("+refreshTokenHash");

  if (
    !user?.refreshTokenHash ||
    user.refreshTokenHash !== hashRefreshToken(token)
  ) {
    res.clearCookie("refreshToken", refreshCookieOptions);
    return next(new AppError("Invalid refresh token", 401));
  }

  // Rotate refresh token
  const newRefreshToken = generateRefreshToken(user._id.toString());

  user.refreshTokenHash = hashRefreshToken(newRefreshToken);
  await user.save();

  const newAccessToken = generateAccessToken(user._id.toString());

  res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: newAccessToken
    }
  });
});

export const logout: RequestHandler = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    const decoded = verifyRefreshToken(token);

    if (decoded?.sub) {
      await User.findByIdAndUpdate(decoded.sub, {
        $unset: { refreshTokenHash: 1 }
      });
    }
  }

  res.clearCookie("refreshToken", refreshCookieOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});
