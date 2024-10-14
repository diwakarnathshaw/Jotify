import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  handleDatabaseConnection,
  createPostSchema,
  createInitialDefaultPost,
  updatePostQuery,
  getAllPostQuery,
  getPostByIdQuery,
  deletePostByIdQuery,
  createNewPostQuery,
} from "./data/database.js";

const app = express();
const port = 1234;
let PostModel = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
  handleDatabaseConnection()
    .then((res) => {
      console.log("Database connected successfully");
      const postSchema = new createPostSchema();
      PostModel = mongoose.model("Post", postSchema);
      // below method is called only to create initial post in our DB.
      // createInitialDefaultPost(PostModel);
    })
    .catch((err) => {
      console.log("There was an error while establishing a database connection");
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.send(`
    <h1>You are in the root page of server</h1>
    <p>This page is used for checking if the server is running.</p>`);
});

app.get("/post", (req, res) => {
  getAllPostQuery(PostModel)
    .then((response) => res.send(response))
    .catch((err) => {
      console.log("There was an error while sending response to the client");
      res.send(err);
    });
});

app.get("/post/:postid", (req, res) => {
  getPostByIdQuery(PostModel, req.params.postid)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error while sending response to the client");
      console.log(err);
      res.send(err);
    });
});

app.patch("/post/update", (req, res) => {
  const reqObj = req.body;
  updatePostQuery(PostModel, reqObj)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error while sending response to the client");
      console.log(err);
      res.send(err);
    });
});

app.delete("/post/delete/:postid", (req, res) => {
  deletePostByIdQuery(PostModel, req.params.postid)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error while sending response to the client");
      console.log(err);
      res.send(err);
    });
});

app.post("/post/new", (req, res) => {
  const newPost = req.body;
  createNewPostQuery(PostModel, newPost)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error while sending response to the client");
      console.log(err);
      res.send(err);
    });
});
