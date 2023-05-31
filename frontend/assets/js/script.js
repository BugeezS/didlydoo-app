import { renderEvents } from "./render.js";
import { postEvents } from "./post.js";
import { addDate } from "./addDate.js";
import { openForm } from "./openForm.js";

renderEvents();
addDate();

const submit = document.getElementById("add-events__submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  postEvents();
});

const buttonForm = document.getElementById("open-form");
const form = document.getElementById("add-events")
buttonForm.addEventListener("click", event => {
  openForm(buttonForm, form)
})