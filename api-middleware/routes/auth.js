import express from 'express';
import { login, register, registerAdmin, logout } from '../controllers/auth.controller.js';


const router = express.Router();

//register
router.post("/register", register);

//login
router.post("/login", login);

//register as Admin
router.post("/register-admin", registerAdmin);

//logout
router.post("/logout", logout);

export default router;