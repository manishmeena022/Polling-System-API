import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("\n MongoDb connected")
    }catch(error){
        console.log("MongoDb connection FAILED",error)
        process.exit(1);
    }
}

export default connectDb;