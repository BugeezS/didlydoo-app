import { testFetch } from "./testfetch.js";
import { hiddenFormDisplayForm } from "./toggleButton.js";



testFetch();


const buttonToggle = document.getElementById('toggle');

buttonToggle.addEventListener('click', hiddenFormDisplayForm);
