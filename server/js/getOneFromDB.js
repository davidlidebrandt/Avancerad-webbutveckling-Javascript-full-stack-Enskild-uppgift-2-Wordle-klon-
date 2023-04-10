import mongoose from "mongoose";

export default async function getOneFromDB(url, collection, id) {
    const conn = await mongoose.connect(url);
    const currentGame = await collection.findOne({"id": id});
    await conn.disconnect();
    return currentGame;
}