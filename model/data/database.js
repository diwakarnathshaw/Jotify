import mongoose from "mongoose";
import { readAllPosts } from "./posts.js";

const errorResponseObject = {
  id: 500,
  posthead: "Internal Server Error",
  postbody: "",
};

export async function handleDatabaseConnection() {
  await mongoose.connect("mongodb://127.0.0.1:27017/jotify_db");
}

export function createPostSchema() {
  const postSchema = mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    posthead: {
      type: String,
      required: true,
    },
    postbody: {
      type: String,
    },
  });
  return postSchema;
}

async function generatePostId(ModelObj) {
  const baseID = 31220;
  const response = await getAllPostQuery(ModelObj);
  console.log(response.length);
  const newID = baseID + response.length;
  return newID;
}

// this function is for having some initial data in our database.
export function createInitialDefaultPost(PostModelObj) {
  readAllPosts().forEach((post, index) => {
    const saveInDb = new PostModelObj(post);
    saveInDb
      .save()
      .then((res) => console.log(`${index + 1} post save successfully`))
      .catch((err) => console.log(err));
  });
}

export async function getAllPostQuery(ModelObj) {
  try {
    const response = await ModelObj.find({});
    if (!response) {
      errorResponseObject.id = 204;
      errorResponseObject.posthead = "No Content Found.";
      return Array(1).fill(errorResponseObject);
    }
    const JSONResponse = JSON.parse(JSON.stringify(response));
    return JSONResponse;
  } catch (err) {
    console.log("There was an error while quering getAllPost request");
    console.log(err);
    errorResponseObject.id = 502;
    errorResponseObject.postbody = err.toString();
    return Array(1).fill(errorResponseObject);
  }
}

export async function getPostByIdQuery(ModelObj, postID) {
  try {
    const response = await ModelObj.findOne({ id: postID });
    if (!response) {
      errorResponseObject.id = 204;
      errorResponseObject.posthead = "No Content Found.";
      return Array(1).fill(errorResponseObject);
    }
    const JSONResponse = JSON.parse(JSON.stringify(response));
    return JSONResponse;
  } catch (err) {
    console.log("There was an error while quering getPostById request");
    console.log(err);
    errorResponseObject.code = 502;
    errorResponseObject.postbody = err.toString();
    return Array(1).fill(errorResponseObject);
  }
}

export async function updatePostQuery(ModelObj, reqObj) {
  try {
    const response = await ModelObj.updateOne({ id: reqObj.id }, reqObj);
    if (!response) {
      errorResponseObject.id = 204;
      errorResponseObject.posthead = "No Content Found.";
      return Array(1).fill(errorResponseObject);
    }
    const JSONResponse = JSON.parse(JSON.stringify(response));
    return JSONResponse;
  } catch (err) {
    console.log("There was an error while quering getPostById request");
    console.log(err);
    errorResponseObject.code = 502;
    errorResponseObject.postbody = err.toString();
    return Array(1).fill(errorResponseObject);
  }
}

export async function deletePostByIdQuery(ModelObj, postID) {
  try {
    const response = await ModelObj.deleteOne({ id: postID });
    if (!response) {
      errorResponseObject.id = 204;
      errorResponseObject.posthead = "No Content Found.";
      return Array(1).fill(errorResponseObject);
    }
    const JSONResponse = JSON.parse(JSON.stringify(response));
    return JSONResponse;
  } catch (err) {
    console.log("There was an error while quering getPostById request");
    console.log(err);
    errorResponseObject.code = 502;
    errorResponseObject.postbody = err.toString();
    return Array(1).fill(errorResponseObject);
  }
}

export async function createNewPostQuery(ModelObj, reqObj) {
  try {
    const postID = await generatePostId(ModelObj);
    reqObj.id = postID;
    const db_record = new ModelObj(reqObj);
    const response = await db_record.save();
    if (!response) {
      errorResponseObject.id = 204;
      errorResponseObject.posthead = "No Content Found.";
      return Array(1).fill(errorResponseObject);
    }
    const JSONResponse = JSON.parse(JSON.stringify(response));
    return JSONResponse;
  } catch (err) {
    console.log("There was an error while quering getPostById request");
    console.log(err);
    errorResponseObject.code = 502;
    errorResponseObject.postbody = err.toString();
    return Array(1).fill(errorResponseObject);
  }
}
