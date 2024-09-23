import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobOfferSchema = new mongoose.Schema(
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String},
    companyName: { type: String, required: true },
    mode: { type: String },
    jobDescription: { type: String },
    email: { type: String},
    contactInfo: { type: String },
    salary: { type: String },
    dates: { type: Map, of: [String] },
    url: { type: String },
    customNotes: { type: String }
}, {
    timestamps: true
});


JobOfferSchema.index({ userId: 1 });

//const JobOffer = mongoose.model("JobOffer", JobOfferSchema);

export default mongoose.model("JobOffer",JobOfferSchema);


// export const dropUserIdIndex = async () => {
//     try {
//         await JobOffer.collection.dropIndex({ userId: 1 });
//         console.log("Index on userId dropped successfully");
//     } catch (err) {
//         console.error("Error dropping index: ", err);
//     }
// };
