import { Router } from "express";
import { loginSchema, registerSchema } from "../validations/auth";
import validate from "../middleware/validate.middleware";
import { register, login, refresh, logout } from "../controllers/auth";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
