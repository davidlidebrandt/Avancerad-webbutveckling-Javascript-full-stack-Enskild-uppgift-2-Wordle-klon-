import { Router } from "express";
import mongoose from "mongoose";
import HighScore from "../models/highScore.js";
import getManyFromDB from "./getManyFromDB.js";

const highScoreRouter = Router();
const DBUrl = process.env.DB_URL;

highScoreRouter.use((req, res, next) => {
  next();
})

highScoreRouter.get('/', async (req, res) => {
  let highScores = await getManyFromDB(DBUrl, HighScore, {completionTime: 1}, 10);
  console.log(highScores)
  highScores = highScores.map((hs)=> {
    return { ...hs,
      completionTime: hs.completionTime/1000
    }
  });
  console.log(highScores)
  res.render("high-scores.html", {highScores: highScores});
});

export default highScoreRouter;