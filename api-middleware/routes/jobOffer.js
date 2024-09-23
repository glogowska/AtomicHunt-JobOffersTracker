import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createJobOffer, createJobOfferForUser, deleteJobOfferById, getJobOfferById, getUserJobOffers, updateJobOfferById } from "../controllers/jobOffer.controller.js";

const router = express.Router();

router.post('/', verifyToken, createJobOffer);
router.get('/job-offers', verifyToken, getUserJobOffers);
router.get('/:id', verifyToken, getJobOfferById);
router.put('/:id', verifyToken, updateJobOfferById);
router.delete('/:id', verifyToken, deleteJobOfferById);
router.post('/user/:username', createJobOfferForUser);

export default router;