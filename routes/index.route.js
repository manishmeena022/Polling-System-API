import express,{Router} from "express";
import { home } from "../controllers/home.controller.js";
import questionRoute from "./question.route.js";
import optionRoute from "./option.route.js";

const router = Router()

router.get('/', home);
router.use('/questions',questionRoute);
router.use('/options', optionRoute)

export default router;