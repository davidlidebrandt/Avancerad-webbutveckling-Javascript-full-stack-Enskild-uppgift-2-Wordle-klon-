import mongoose from "mongoose";


const Game = mongoose.model("Game", {
    id: String,
    startTime: Date,
    guesses: Array,
    correctWord: String,
    finished: Boolean
});

export default Game;