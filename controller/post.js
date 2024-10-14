import { deletePostFromServer } from "./delete.js";

const URL = "http://localhost:1234/post";
const DOMele_postContainer = document.getElementById("post-container");
const DOMele_editBtn = document.getElementById("edit-btn");
const DOMele_deleteBtn = document.getElementById("delete-btn");
const DOMele_homeBtn = document.getElementById("home-btn");
const DOMele_messageIndicator = document.getElementById("message-indicator");

async function getThePostDetails() {
  const postID = getThePostID();
  const response = await fetch(`${URL}/${postID}`);
  const JSONResponse = await response.json();
  return JSONResponse;
}

function displayPostDetail() {
  const divEle = document.createElement("div");
  getThePostDetails()
    .then((postObj) => {
      divEle.innerHTML = `
        <h2>POST ID : <i>${postObj.id}</i></h2>
        <h2>${postObj.posthead}</h2>
        <p>${postObj.postbody}</p>`;
    })
    .catch((err) => {
      divEle.innerHTML = `<p class="red">${err.toString()}<p>`;
    });
  DOMele_postContainer.appendChild(divEle);
}

DOMele_editBtn.addEventListener("click", navigateToEditPage);
function navigateToEditPage() {
  const postID = getThePostID();
  const URL = `http://localhost:5500/view/editpost.html?postid=${postID}`;
  window.location.href = URL;
}

DOMele_homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navigateBackToHome();
});

DOMele_deleteBtn.addEventListener("click", (e) => handleDeleteBtn(e));
function handleDeleteBtn(event) {
  event.preventDefault();
  const postID = getThePostID();
  deletePostFromServer(postID)
    .then((resObj) => {
      console.log(resObj);
      displayIndicatorMessage(true, resObj.message);
      navigateBackToHome();
    })
    .catch((err) => {
      console.log(err);
      displayIndicatorMessage(false, err.toString());
    });
}

function getThePostID() {
  const URL = window.location.href;
  const ID = URL.slice(URL.indexOf("=") + 1);
  return ID;
}

function displayIndicatorMessage(flag, message) {
  const className = flag ? "green" : "red";
  DOMele_messageIndicator.classList.add(className);
  DOMele_messageIndicator.innerHTML = message;
  setTimeout(() => {
    DOMele_messageIndicator.classList.remove(className);
    DOMele_messageIndicator.innerHTML = "";
  }, 3000);
}

function navigateBackToHome() {
  const URL = "http://localhost:5500/view/index.html";
  window.location.href = URL;
}

displayPostDetail();
