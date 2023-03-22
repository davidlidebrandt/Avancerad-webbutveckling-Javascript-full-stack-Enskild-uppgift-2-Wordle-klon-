import express from "express";
import nunjucks from "nunjucks";
import axios from "axios";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static("./public"));

app.get("/", (req,res)=> {
    res.send("hey there");
});

app.get("/information", (req,res)=> {
    res.render("information.html");
});

app.get("/high-scores", (rew,res)=> {
    res.render("high-scores.html");
});

export default app;

