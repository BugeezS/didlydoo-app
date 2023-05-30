import { testFetch } from "./testfetch.js";
import { postEvent } from "./post.js";
import { addDate } from "./addDate.js";

testFetch();
addDate();

const submit = document.getElementById("add-events__submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  postEvent();
});
