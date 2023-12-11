import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
    {   
        title: {
            type: String,
            required: true,
        },
        options: [
            {
                type: Schema.Types.ObjectId,
                ref: "Option",
            }
        ]
    },{
        timestamps: true,
    }
);

export const Question = mongoose.model("Question", questionSchema);
