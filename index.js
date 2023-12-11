import dotenv from "dotenv";
import express from 'express';
import connectDb from './db/index.js';
import router from "./routes/index.route.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

//Routes
app.use('/', router);

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })
})
.catch((err) => {
    console.log("MongoDb connection failed!!",err)
})