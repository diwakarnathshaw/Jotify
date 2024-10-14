import { navigateToCreatePostPage } from "./utility/index.js";

const DOMele_postContainer = document.getElementById("all-post");
const DOMele_createBtn = document.getElementById("create-new");

async function fetchAllPost() {
  const URL = "http://localhost:1234";
  try {
    const res = await fetch(`${URL}/post`);
    try {
      const jsonPost = await res.json();
      displayAllPost(jsonPost);
    } catch (e) {
      console.log(`error in converting response into json, read the below response`);
      console.log(e);
    }
  } catch (e) {
    console.log("error in getting the response, read the error message below");
    console.log(e);
  }
}

function displayAllPost(postData) {
  if (postData.length) {
    postData.forEach((post) => {
      const liEl = document.createElement("li");
      liEl.innerHTML = `<div class="post" title="click to see in details" postid=${post.id}>
                                <h3>${post?.posthead}</h3>
                                <p>${post?.postbody}</p>
                          </div>`;
      DOMele_postContainer.appendChild(liEl);
    });
  } else {
    const liEl = document.createElement("li");
    liEl.innerHTML = "There is Nothing to Display. Click On Create Post Button to create a post.";
    DOMele_postContainer.appendChild(liEl);
  }
}

DOMele_postContainer.addEventListener("click", (e) => navigateToPostDetails(e));
function navigateToPostDetails(event) {
  let postID = 0;
  switch (event.target.tagName) {
    case "P":
      {
        postID = event.target.parentNode.getAttribute("postid");
      }
      break;
    case "H3":
      {
        postID = event.target.parentElement.getAttribute("postid");
      }
      break;
    default: {
      postID = event.target.getAttribute("postid");
    }
  }
  window.location.href = `http://localhost:5500/view/post.html?postid=${postID}`;
}

DOMele_createBtn.addEventListener("click", navigateToCreatePostPage);

fetchAllPost();
