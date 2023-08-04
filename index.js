import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { poemValidation } from "./validations/poem.js";
import { validationResult } from "express-validator";
import Poem from "./models/Poem.js";

const PORT = 3001;
const app = express();
const client = new MongoClient(
  "mongodb+srv://shoxrux:1111@cluster.2qqo7oh.mongodb.net/"
);
client.connect();
const poems = client.db("poem").collection("poems");
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", async (req, res) => {
  const documents = await poems.find({}).toArray();
  res.json({
    result: documents,
  });
});

app.post("/admin", poemValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateFormat = `${year}.${month}.${day}`;

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const poem = new Poem({
    date: dateFormat,
    time: time,
    title: req.body.title,
    poem: req.body.poem,
    author: req.body.author,
  });

  poems.insertOne(poem);
  res.send({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log("Server OK. Port: 3001");
});
