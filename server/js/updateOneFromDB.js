import mongoose from "mongoose";

export default async function updateOneFromDB(
  url,
  collection,
  id,
  guessedWord,
  gameFinished = false
) {
  const conn = await mongoose.connect(url);
  const data = await collection.findOneAndUpdate(
    { id: id },
    { $push: { guesses: guessedWord }, finished: gameFinished }
  );
  await conn.disconnect();
  if (data.correctWord === guessedWord) {
    return [true, data];
  }
  return [false, data];
}
