import { renderEvents } from "./render.js";
import { postEvents } from "./post.js"

renderEvents();

const submit = document.getElementById("add-events__submit")
submit.addEventListener("click", event => {
    event.preventDefault()
    postEvents()
})

