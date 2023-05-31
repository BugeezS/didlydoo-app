export function openForm(buttonForm, form){
    form.classList.add("translate-form")

    const closeButtonForm = document.getElementById("close-form")
    closeButtonForm.addEventListener("click", event => {
        closeForm(form)
    })
}

function closeForm(form){
    form.classList.remove("translate-form")
}