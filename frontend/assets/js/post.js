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
        authorTag.classList.add("alert-field")
        console.error('The author name must be filled');
        return;
    }
    authorTag.classList.remove("alert-field")

    if(!name){
        nameTag.classList.add("alert-field")
        console.error('The event name must be filled');
        return;
    }
    nameTag.classList.remove("alert-field")
    
    if(!description){
        descriptionTag.classList.add("alert-field")
        console.error('The event description must be filled');
        return;
    }
    descriptionTag.classList.remove("alert-field")

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
