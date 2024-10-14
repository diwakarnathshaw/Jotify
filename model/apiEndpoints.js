/**
 * THIS FILE ACT AS AN API ENDPOINT FOR MOCK database
 */

app.get("/", (req, res) => {
  res.send("<h1>You are in root page</h1>");
});

app.get("/post", (req, res) => {
  res.send(readAllPosts());
});

app.post("/post/new", (req, res) => {
  const newPost = req.body;
  addNewPost(newPost);
  res.send({
    code: 201,
    message: "The request has been fulfilled, resulting in the creation of a new post.",
  });
});

app.get("/post/:postid", (req, res) => {
  const resObj = getPostById(req.params.postid);
  res.send(resObj);
});

app.patch("/post/update", (req, res) => {
  const resObj = req.body;
  updatePost(resObj);
  res.send({
    code: 205,
    message: "The server successfully processed the request.",
  });
});

app.delete("/post/delete/:postid", (req, res) => {
  const postID = req.params.postid;
  removePost(postID);
  res.send({
    code: 200,
    message: "Your post has been deleted sucessfully.",
  });
});
