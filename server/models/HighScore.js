import mongoose from "mongoose";

const HighScore = mongoose.model("HighScore", {
    id: String,
    gameId: String,
    userName: String,
    wordLength: Number,
    guesses: Array,
    duplicateLetters: Boolean,
    completionTime: Number
});

export default HighScore;