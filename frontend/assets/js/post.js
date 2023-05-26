export function postEvent(){
    const authorTag = document.getElementById("add-events__author")
    const author = authorTag.value
    const nameTag = document.getElementById("add-events__name")
    const name = nameTag.value
    const descriptionTag = document.getElementById("add-events__description")
    const description = descriptionTag.value
    const dateTag = document.getElementById("add-events__date")
    const date =  dateTag.value

    formatEventObject(author, name, description, date)
}

function formatEventObject(author, name, description, date){
    const dates = []
    dates.push(date)

    const data = {
        "name" : name,
        "dates" : dates,
        "author" : author,
        "description" : description
    }

    sendEventToDB(data)
}

function sendEventToDB(data){
    fetch("http://localhost:3000/api/events",{

        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}
