import mongoose from "mongoose";

export default async function updateOneFromDB(url,collection,id,guessedWord){
    const conn = await mongoose.connect(url);
    const data = await collection.findOneAndUpdate({id:id}, {$push: {guesses: guessedWord}});
    console.log(data)
    await conn.disconnect();
    if(data.correctWord === guessedWord) {
        return true;
    }
    return false;
}