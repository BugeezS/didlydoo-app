import { renderEvents } from "./render.js";
import { postEvent } from "./post.js"
import { addDate } from "./addDate.js";

renderEvents();

const submit =  document.getElementById("add-events__submit")
submit.addEventListener("click", event => {
    event.preventDefault()
    postEvent()
})