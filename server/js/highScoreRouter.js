import { Router } from "express"

const highScoreRouter = Router();

highScoreRouter.use((req, res, next) => {
  next();
})
// define the home page route
highScoreRouter.get('/', (req, res) => {
  res.render("high-scores.html");
});
// define the about route
highScoreRouter.get('/duplicates', (req, res) => {
  res.send('Duplicates');
});

export default highScoreRouter;