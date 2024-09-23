import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type:String,
            required: true
        },
        username: {
            type:String,
            required: true,
            unique: true
        },
        email: {
            type:String,
            required: true,
            unique: true
        },
        password: {
            type:String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        },
        jobOffers: [{ type: Schema.Types.ObjectId, ref: "JobOffer" }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User",UserSchema);