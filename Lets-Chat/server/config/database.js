import mongoose from "mongoose";

export const connectDB = async() => {       
    try{
        await mongoose.connect(process.env.MONGO_URL);
        // console.log(`Connection Successfully with ${mongoose.connection.host}`);
        console.log(`Connection Successfully with MongoDB`);
    } catch(err){
        console.log('Failed to connect to MongoDB', err);
        throw err;
    }
}
