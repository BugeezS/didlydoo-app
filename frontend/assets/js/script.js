import { testFetch } from "./testfetch.js";
import { postEvent } from "./post.js"

testFetch();

const submit =  document.getElementById("add-events__submit")
submit.addEventListener("click", event => {
    event.preventDefault()
    postEvent()
})