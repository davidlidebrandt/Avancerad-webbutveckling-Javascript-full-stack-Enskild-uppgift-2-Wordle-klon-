import mongoose from "mongoose";

export default async function saveInDb(url,modelObject){
    const conn = await mongoose.connect(url);
    const data = await modelObject.save();
    await conn.disconnect();
    return data;
}