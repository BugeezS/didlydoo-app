export function postEvents(){
    const authorTag = document.getElementById("add-events__author")
    const author = authorTag.value.trim()
    const nameTag = document.getElementById("add-events__name")
    const name = nameTag.value.trim()
    const descriptionTag = document.getElementById("add-events__description")
    const description = descriptionTag.value.trim()
    const dateTag = document.getElementsByClassName("add-events__date")

    let dates = []
    for ( let i = 0 ; i < dateTag.length ; i++){
        dates.push(dateTag[i].value)
    }

    if(!author){
        const authorAlert = `<p>The author name must be filled !</p>`
        authorTag.classList.add("alert-field")
        authorTag.previousElementSibling.innerHTML != `The author name must be filled !` ? authorTag.insertAdjacentHTML("beforebegin", authorAlert) : "";
        return;
    }
    authorTag.classList.remove("alert-field")
    authorTag.previousElementSibling.innerHTML == `The author name must be filled !` ? authorTag.previousElementSibling.remove() : ""

    if(!name){
        const nameAlert = `<p>The event name must be filled !</p>`
        nameTag.classList.add("alert-field")
        nameTag.previousElementSibling.innerHTML != `The event name must be filled !` ? nameTag.insertAdjacentHTML("beforebegin", nameAlert) : "";
        return;
    }
    nameTag.classList.remove("alert-field")
    nameTag.previousElementSibling.innerHTML == `The event name must be filled !` ? nameTag.previousElementSibling.remove() : ""
    
    if(!description){
        const descriptionAlert = `<p>The event description must be filled !</p>`
        descriptionTag.classList.add("alert-field")
        descriptionTag.previousElementSibling.innerHTML != `The event description must be filled !` ? descriptionTag.insertAdjacentHTML("beforebegin", descriptionAlert) : "";
        return;
    }
    descriptionTag.classList.remove("alert-field")
    descriptionTag.previousElementSibling.innerHTML == `The event description must be filled !` ? descriptionTag.previousElementSibling.remove() : ""

    let dateNumber = 1;
    for(let date of dates){
        if(!date){
            console.error(`Your dates number ${dateNumber} must be filled`);
        }
        dateNumber++;
    }

    formatEventObject(author, name, description, dates);
    
}

function formatEventObject(author, name, description, dates){
    const data = {
        "name" : name,
        "dates" : dates,
        "author" : author,
        "description" : description
    }

    sendEventToDB(data)
}

function sendEventToDB(data){
    try{
        fetch("http://localhost:3000/api/events",{

        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
    }
    catch(error){
        console.log('There was an error', error)
    }
}
