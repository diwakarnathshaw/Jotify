const URL = "http://localhost:1234/post/delete";

export async function deletePostFromServer(postID) {
  const POST_PATH = `${URL}/${postID}`;
  const response = await fetch(POST_PATH, {
    method: "DELETE",
  });
  const JSONResponse = await response.json();
  return JSONResponse;
}
