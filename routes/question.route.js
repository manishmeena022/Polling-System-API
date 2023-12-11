import express,{Router} from "express";
import { createQuestion, createOption , deleteQuestion, getQuestion } from "../controllers/question.controller.js";

const questionRoute = Router()

questionRoute.post('/create', createQuestion)
questionRoute.post('/:id/options/create', createOption)
questionRoute.delete('/:id/delete', deleteQuestion)
questionRoute.get('/:id', getQuestion)


export default questionRoute;