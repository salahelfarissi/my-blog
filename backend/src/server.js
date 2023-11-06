import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments: [],
  },
];

const app = express();
app.use(express.json());

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((article) => article.name === name);
  if (article) {
    article.upvotes += 1;
    res.status(200).send(`${name} now has ${article.upvotes} upvotes`);
  } else {
    res.status(404).send("Article not found");
  }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;
  const article = articlesInfo.find((article) => article.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.status(200).send(article.comments);
  } else {
    res.status(404).send("Article not found");
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
