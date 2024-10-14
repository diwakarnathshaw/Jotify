import { navigateToHomePage } from "./utility/index.js";

const DOMele_createPostForm = document.getElementById("create-post-form");
const DOMele_indicator = document.querySelector("#message-indicator");
const DOMele_homeBtn = document.getElementById("home-btn");

DOMele_createPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(DOMele_createPostForm);
  const jsObj = Object.fromEntries(formData);
  sendPostToServer(jsObj)
    .then((res) => {
      displayTheIndicator(true, "New Post Added Successfully!");
      console.log(res);
      clearFormData();
    })
    .catch((err) => {
      displayTheIndicator(false, "There was an error. Please click again or try to refresh your page.");
      console.log(err);
    });
});

async function sendPostToServer(formData) {
  const URL = "http://localhost:1234/post/new";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  return result;
}

function displayTheIndicator(flag, message) {
  const className = flag ? "green" : "red";
  DOMele_indicator.classList.add("green");
  DOMele_indicator.innerHTML = message;
  setTimeout(() => {
    DOMele_indicator.classList.remove(className);
    DOMele_indicator.innerHTML = "";
  }, 3000);
}

function clearFormData() {
  Array.from(DOMele_createPostForm.children).forEach((child) => {
    if (child.tagName === "DIV") {
      Array.from(child.children).forEach((grandChildren) => {
        if (grandChildren.tagName === "INPUT" || grandChildren.tagName === "TEXTAREA") {
          grandChildren.value = "";
        }
      });
    }
  });
}

DOMele_homeBtn.addEventListener("click", navigateToHomePage);
