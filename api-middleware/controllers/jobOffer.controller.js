import JobOffer from "../models/JobOffer.js";
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";
import User from "../models/User.js";

export const createJobOffer = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming the userId is extracted from the JWT token
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const newJobOffer = new JobOffer({
            userId: userId,
            status: req.body.status,
            position: req.body.position,
            location: req.body.location,
            companyName: req.body.companyName,
            mode: req.body.mode,
            jobDescription: req.body.jobDescription,
            contactInfo: req.body.contactInfo,
            email: req.body.email,
            salary: req.body.salary,
            dates: req.body.dates || {},
            url: req.body.url,
            customNotes: req.body.customNotes,
        });

        const savedJobOffer = await newJobOffer.save();
        user.jobOffers.push(savedJobOffer._id);
        await user.save();

        res.status(201).json(savedJobOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserJobOffers = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the userId is extracted from the JWT token
        const jobOffers = await JobOffer.find({ userId: userId });

        res.status(200).json(jobOffers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getJobOfferById = async (req, res, next) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.id);
        if (!jobOffer || jobOffer.userId.toString() !== req.user.id) {
            return next(createError(404, "Job Offer not found or not authorized!"));
        }
        res.status(200).json(jobOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateJobOfferById = async (req, res, next) => {
    try {
        const jobOffer = await JobOffer.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: req.body },
            { new: true }
        );
        if (!jobOffer) {
            return next(createError(404, "Job Offer not found or not authorized!"));
        }
        res.status(200).json(jobOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteJobOfferById = async (req, res, next) => {
    try {
        const jobOffer = await JobOffer.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!jobOffer) {
            return next(createError(404, "Job Offer not found or not authorized!"));
        }
        res.status(200).json({ message: "Job Offer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createJobOfferForUser = async (req, res, next) => {
    try {
        const { username } = req.params; // Assuming username is passed as a route parameter
        const user = await User.findOne({ username });

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const newJobOffer = new JobOffer({
            userId: user._id,
            status: req.body.status,
            position: req.body.position,
            location: req.body.location,
            companyName: req.body.companyName,
            mode: req.body.mode,
            jobDescription: req.body.jobDescription,
            contactInfo: req.body.contactInfo,
            email: req.body.email,
            salary: req.body.salary,
            dates: req.body.dates || {},
            url: req.body.url,
            customNotes: req.body.customNotes,
        });

        const savedJobOffer = await newJobOffer.save();
        user.jobOffers.push(savedJobOffer._id);
        await user.save();

        res.status(201).json(savedJobOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};