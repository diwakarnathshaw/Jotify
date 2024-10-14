const SERVER_BASE_URL = "http://localhost:1234";
const CLIENT_BASE_URL = "http://localhost:5500";

// Server Route
export const ALL_POST_URL = `${SERVER_BASE_URL}/post`;

// Client Route
export const HOME_PAGE = `${CLIENT_BASE_URL}/view/index.html`;
export const POST_PAGE = `${CLIENT_BASE_URL}/view/post.html`;
export const EDIT_POST_PAGE = `${CLIENT_BASE_URL}/view/editpost.html`;
export const CREATE_POST_PAGE = `${CLIENT_BASE_URL}/view/createpost.html`;

export function displayMessage(DOMele_messageIndicator, flag, message) {
  const className = flag ? "green" : "red";
  DOMele_messageIndicator.classList.add("green");
  DOMele_messageIndicator.innerHTML = message;
  setTimeout(() => {
    DOMele_messageIndicator.classList.remove(className);
    DOMele_messageIndicator.innerHTML = "";
  }, 3000);
}

export function getThePostID(URL) {
  const ID = URL.slice(URL.indexOf("=") + 1);
  return ID;
}

// Client Routing
export function navigateToCreatePostPage() {
  window.location.href = CREATE_POST_PAGE;
}

export function navigateToHomePage() {
  window.location.href = HOME_PAGE;
}
