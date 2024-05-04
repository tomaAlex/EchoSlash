import fs from "fs";
import multer from "multer";
import express from "express";
import { SUMMARIES_DIRECTORY } from "@constants";
import summarizeAndEmailNews from "./src/summarizeAndEmailNews";

const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(multer().none()); // handle form-data for non-file fields

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", async (req, res) => {
  const { topic, email } = req.body;

  if (fs.existsSync(`./${SUMMARIES_DIRECTORY}/${email}`)) {
    res.send(`<h2>Do you like it this much? 🤓</h2>`);
    return;
  }

  summarizeAndEmailNews(topic, email);

  res.send(
    `<h2>Your latest slash about ${topic} is being prepared and will ` +
      `be sent to ${email} shortly! Watchout for that echo 👓</h2>`
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
