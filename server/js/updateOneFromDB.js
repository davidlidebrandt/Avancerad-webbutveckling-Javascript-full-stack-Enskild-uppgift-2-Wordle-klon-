import mongoose from "mongoose";

export default async function updateOneFromDB(
  url,
  collection,
  id,
  guessedWord,
  updatedValues,
) {
  const conn = await mongoose.connect(url);
  const data = await collection.findOneAndUpdate(
    { id: id },
    updatedValues
  ).lean();
 
  await conn.disconnect();
  if (data.correctWord === guessedWord) {
    return [true, data];
  }
  return [false, data];
}
