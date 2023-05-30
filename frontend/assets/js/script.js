import { renderEvents } from "./render.js";
import { postEvents } from "./post.js";
import { addDate } from "./addDate.js";
import { hiddenFormDisplayForm } from "./toggleButton.js";
import { closeButton } from "./closeButton.js";



renderEvents();
addDate();

const submit = document.getElementById("add-events__submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  postEvents();
});

// display the form with the toggle Button
const buttonToggle = document.getElementById('toggle');
buttonToggle.addEventListener('click', hiddenFormDisplayForm);

// hide form with the close Button

closeButton.addEventListener('click', closeButton);
