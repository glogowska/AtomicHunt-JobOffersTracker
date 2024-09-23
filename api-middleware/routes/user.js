import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


//get all users
router.get('/', verifyAdmin, getAllUsers);

//get user by id (verifyUser - only this user can see their profile)
router.get('/:id',verifyUser ,getById);

export default router;