const URL = "http://localhost:1234/post";
const DOMele_updatePostForm = document.getElementById("update-post-form");
const DOMele_postHead = document.getElementById("posthead");
const DOMele_postBody = document.getElementById("postbody");
const DOMele_cancelBtn = document.getElementById("cancel-btn");
const DOMele_messageIndicator = document.getElementById("message-indicator");

async function getPostDetails() {
  const postID = getPostId();
  const response = await fetch(`${URL}/${postID}`);
  const JSONResponse = await response.json();
  return JSONResponse;
}

function displayServerDataInTheForm() {
  getPostDetails()
    .then((resObj) => {
      DOMele_postHead.value = resObj.posthead;
      DOMele_postBody.value = resObj.postbody;
    })
    .catch((err) => {
      displayTheIndicatorMessage(
        false,
        "There was an error while fetching the post, please read the console log for more details."
      );
      console.log(err);
    });
}

DOMele_updatePostForm.addEventListener("submit", (e) => getUpdatedPostData(e));
function getUpdatedPostData(event) {
  event.preventDefault();
  const formData = new FormData(DOMele_updatePostForm);
  const postID = getPostId();
  formData.append("id", postID);
  const formObj = Object.fromEntries(formData);
  sendPostDataToTheServer(formObj)
    .then((resObj) => {
      displayTheIndicatorMessage(true, "You Post has been update.");
      console.log(resObj);
      navigateToPostDetails();
    })
    .catch((err) => {
      displayTheIndicatorMessage(false, err.toString());
      console.log(err);
    });
}

async function sendPostDataToTheServer(formObj) {
  const UPDATE_URL = `${URL}/update`;
  const response = await fetch(UPDATE_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObj),
  });
  const JSONResult = await response.json();
  return JSONResult;
}

DOMele_cancelBtn.addEventListener("click", (e) => navigateToHomePage(e));
function navigateToHomePage(event) {
  event.preventDefault();
  const URL = "http://localhost:5500/view/index.html";
  window.location.href = URL;
}

function navigateToPostDetails() {
  const postID = getPostId();
  const URL = `http://localhost:5500/view/post.html?postid=${postID}`;
  window.location.href = URL;
}

function displayTheIndicatorMessage(flag, message) {
  const className = flag ? "green" : "red";
  DOMele_messageIndicator.classList.add(className);
  DOMele_messageIndicator.innerHTML = message;
  setTimeout(() => {
    DOMele_messageIndicator.classList.remove(className);
    DOMele_messageIndicator.innerHTML = "";
  }, 3000);
}

function getPostId() {
  const URL = window.location.href;
  const postID = URL.slice(URL.indexOf("=") + 1);
  return postID;
}

displayServerDataInTheForm();
