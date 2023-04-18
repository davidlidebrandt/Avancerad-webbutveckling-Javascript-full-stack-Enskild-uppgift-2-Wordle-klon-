import mongoose from "mongoose";

export default async function getOneFromDB(url, collection, searchParams) {
    const conn = await mongoose.connect(url);
    const data = await collection.findOne(searchParams);
    await conn.disconnect();
    return data;
}