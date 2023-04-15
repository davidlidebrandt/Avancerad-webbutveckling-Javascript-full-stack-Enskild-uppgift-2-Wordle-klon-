import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function getManyFromDB(url, collection, sortBy, limit) {
    const conn = await mongoose.connect(url);
    const highScores = await collection.find().lean().sort(sortBy).limit(limit);
    await conn.disconnect();
    return highScores;
}