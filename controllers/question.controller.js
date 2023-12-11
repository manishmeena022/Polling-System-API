import { Option } from "../models/option.model.js";
import { Question } from "../models/question.model.js";

/**create a question
 *1. take the title from body of request
 *2. check if question is already exists or not
 *3. if question is not already exist we create a question with the given title
 */
 const createQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
          return res.status(400).json({
            message: 'title is required!',
          });
        }
    
        const question = await Question.create({title});
    
        res.status(200).json({
          question,
        });
      } catch (err) {
        console.log('*******', err);
        return res.status(500).json({
          message: 'Internal server error',
        });
      }
};

//create a option
// tekes the question id from paramters and text of option from body of request
// check if questionId is valid or not if question id is valid then we create a option
// assign link to vote dynamically and push option id to the question's options array
const createOption = async (req, res) => {
    try {
        const questionId = req.params.id;
        const { text } = req.body;
    
        if (!text) {
          return res.status(400).json({
            message: 'text required!',
          });
        }
    
        const question = await Question.findById(questionId);
        if (!question) {
          return res.status(400).json({
            message: 'question not found!',
          });
        }
    
        const option = await Option.create({
          text,
          question,
        });
    
        // create link_to_vote using _id of option
        const link_to_vote = `https://polling-system-api0.herokuapp.com/options/${option.id}/add_vote`;
    
        option.linkToVote = link_to_vote;
        option.save();
    
        // put reference of option in question schema
        await question.updateOne({ $push: { options: option } });
    
        return res.status(200).json({
          success: true,
          option,
        });
      } catch (err) {
        console.log('*******', err);
        return res.status(500).json({
          message: 'Internal server error',
        });
      }
};


/**
 * remove a question
 * takes question id from request parameters
 * check if question id is valid or not
 * if id is valid we first delete all the options of question and then delete question from db
 */
const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        
        const question = await Question.findById(questionId).populate('options');
        if (!question) {
            return res.status(400).json({
                message: 'Question not found',
            });
        }

        // Check if any of the options have votes
        const optionsWithVotes = question.options.some(option => option.votes > 0);
        if (optionsWithVotes) {
            return res.status(400).json({
                message: 'At least one of the options has votes',
            });
        }

        // Delete all the options of the question
        await Option.deleteMany({ question: questionId });

        // Delete the question
        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            success: true,
            message: 'Question and associated options deleted successfully!',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};


/**
 *get details of question
 *take the question id from parameters
 *check if it is valid or not
 *populate the options array and send it to the user
 */
 const getQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
    
        // populate question with all of its options
        const question = await Question.findById(questionId).populate({
          path: 'options',
          model: 'Option',
        });
        if (!question) {
          return res.status(400).json({
            message: 'question not found',
          });
        }
    
        return res.status(200).json({
          question,
        });
      } catch (err) {
        console.log('*******', err);
        return res.status(500).json({
          message: 'Internal server error',
        });
      }
};


export {createQuestion, deleteQuestion, getQuestion , createOption}