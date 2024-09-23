import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next)=>{
    const existingUsername = await User.findOne({ username: req.body.username });
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
        return next(createError(409, "Email already in use!"));
      }
      
    if (existingUsername) {
        return next(createError(409, "Username already exists!"));
      }
    //return next(createError(500, "My custom Error!"));
    const role = await Role.find({role: 'User'});
    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        roles: role,
    });
    await newUser.save();
    return next(createSuccess(200, "User Registered Successfully!"));
    //return res.status(200).send("User Registered Successfully!");
}

export const login = async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role");

        const { roles } = user;
        if (!user){
            return res.status(404).send("User not found!");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).send("Password is incorrect");
        }
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )
        //return next(createSuccess(200, "Login Success!"));
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Success!",
            data:user
        })
    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
}

export const registerAdmin = async (req, res, next)=>{
    //return next(createError(500, "My custom Error!"));
    const role = await Role.find({});
    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role,
    });
    await newUser.save();
    return next(createSuccess(200, "Admin Registered Successfully!"));
    //return res.status(200).send("User Registered Successfully!");
}

export const logout = (req, res) => {
    res.clearCookie("access_token").status(200).json({ message: "Logged out successfully!" });
};