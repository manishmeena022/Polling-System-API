import express,{Router} from "express"
import { addVote, deleteOption } from "../controllers/option.controller.js"

const optionRoute = Router()

optionRoute.delete('/:id/delete', deleteOption)
optionRoute.put('/:id/add_vote',addVote)

export default optionRoute;