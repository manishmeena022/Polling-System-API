import { Option } from "../models/option.model.js";
import { Question } from "../models/question.model.js";

/**
 * delete the option
 * takes option id from paramters
 * check if option id is valid or not if it is valid
 * first remove option's id from question's options array
 * then delete the option from db
 */
const deleteOption = async (req, res) => {
    try {
        const optionId = req.params.id;

        const option = await Option.findById(optionId);
        if (!option) {
            return res.status(400).json({
                message: "Option not found",
            });
        }

        // Check if the option has any votes
        if (option.votes.length > 0) { 
            return res.status(400).json({
                message: "This option has at least one vote",
            });
        }

        const question = await Question.findById(option.question);

        // Remove reference of this option from the question's options field
        await question.updateOne({ $pull: { options: optionId } });

        // Delete the option
        await Option.findByIdAndDelete(optionId);

        return res.status(200).json({
            status: "success",
            message: "Option deleted successfully!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


/**
 * add vote to the option
 * takes option id from parameters of request
 * check if option id is valid or not if valid increate votes by 1
 * and return option object
 */
const addVote = async (req, res) => {
    try {
        const optionId = req.params.id;

        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(400).json({
                message: "Option not found",
            });
        }

        option.votes += 1;
        await option.save();

        const question = await Question.findById(option.question);
        if (!question) {
            return res.status(400).json({
                message: "Associated question not found",
            });
        }

        question.totalVotes += 1;
        await question.save();

        return res.status(200).json({
            status: "success",
            data: option,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export { deleteOption, addVote}