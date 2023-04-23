import mongoose from "mongoose";


const Game = mongoose.model("Game", {
    id: String,
    startTime: Date,
    guesses: Array,
    correctWord: String,
    duplicateLetters: Boolean,
    finished: Boolean
});

export default Game;