import { Router } from "express";

const highScoreRouter = Router();
const DBUrl = process.env.DB_URL;

highScoreRouter.use((req, res, next) => {
  next();
})

highScoreRouter.get('/', (req, res) => {
  res.render("high-scores.html");
});

highScoreRouter.get('/duplicates', (req, res) => {
  res.send('Duplicates');
});

export default highScoreRouter;