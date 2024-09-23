import User from "../models/User.js";
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find();
        return next(createSuccess(200,"All Users",users));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getById = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return next(createError(404,"User not found!"));
        return next(createSuccess(200,"Single User",user));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}