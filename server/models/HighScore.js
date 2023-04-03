import mongoose from "mongoose";

export default HighScore = mongoose.model("HighScore", {
    userName: String,
    wordLength: Number,
    guesses: Array,
    completionTime: Number
});