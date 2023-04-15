import mongoose from "mongoose";

export default async function getOneFromDB(url, collection, searchParams) {
    const conn = await mongoose.connect(url);
    const currentGame = await collection.findOne(searchParams);
    await conn.disconnect();
    return currentGame;
}