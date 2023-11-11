import fs from "fs";
import express from "express";
import { db, connectToDb } from "./db.js";
import admin from "firebase-admin";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  const { authToken } = req.headers;
  if (authToken) {
    try {
      req.user = await admin.auth().verifyIdToken(authToken);
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};
  next();
});

// TODO: Use /api prefix for all routes
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.status(200).json(article);
  } else {
    res.status(404).send("Article not found");
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
      await db.collection("articles").updateOne(
        { name },
        {
          $inc: {
            upvotes: 1,
          },
          $push: {
            upvoteIds: uid,
          },
        }
      );
    }
    const updatedArticle = await db.collection("articles").findOne({ name });
    res.status(200).json(updatedArticle);
  } else {
    res.status(404).send("Article not found");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { text } = req.body;
  const { name } = req.params;
  const { email } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    await db.collection("articles").updateOne(
      { name },
      {
        $push: {
          comments: {
            postedBy: email,
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
