import mongoose from "mongoose";
import { DB_NAME, env } from "../constents.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Database connected ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;