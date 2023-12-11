import mongoose from "mongoose";

const { Schema } = mongoose;

const optionSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
        linkToVote: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Option = mongoose.model("Option", optionSchema);
