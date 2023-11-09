import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

// TODO: Use /api prefix for all routes
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).send("Article not found");
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    await db.collection("articles").updateOne(
      { name },
      {
        $inc: {
          upvotes: 1,
        },
      }
    );
    const updatedArticle = await db.collection("articles").findOne({ name });
    // Send the updated article object as response
    res.status(200).json(updatedArticle);
  } else {
    res.status(404).send("Article not found");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    await db.collection("articles").updateOne(
      { name },
      {
        $push: {
          comments: {
            postedBy,
            text,
          },
        },
      }
    );
    const updatedArticle = await db.collection("articles").findOne({ name });
    res.status(200).json(updatedArticle);
  } else {
    res.status(404).send("Article not found");
  }
});

connectToDb(() => {
  app.listen(8000, () => {
    console.log("Server listening on port 8000");
  });
});
