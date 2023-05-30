import { renderEvents } from "./render.js";
import { postEvents } from "./post.js";
import { addDate } from "./addDate.js";
import { hiddenFormDisplayForm } from "./toggleButton.js";



renderEvents();
addDate();

const submit = document.getElementById("add-events__submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  postEvents();
});


const buttonToggle = document.getElementById('toggle');

buttonToggle.addEventListener('click', hiddenFormDisplayForm);
