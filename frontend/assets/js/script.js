import { renderEvents } from "./render.js";
import { postEvents } from "./post.js"
import { addDate } from "./addDate.js";

renderEvents();
addDate();

const submit =  document.getElementById("add-events__submit")
submit.addEventListener("click", event => {
    event.preventDefault()
    postEvents()
})