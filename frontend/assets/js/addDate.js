const addDateButton = document.querySelector('#add-events__date_button');
const form = document.querySelector("form") 

let removeButtons
let containerNewDateID = 0
export function addDate(){
    addDateButton.addEventListener('click',()=>{
        const containerNewDate = document.createElement('section')
        containerNewDate.classList.add("add-events__date--container")
        containerNewDate.setAttribute("id", `dateID-${containerNewDateID}`)
        containerNewDateID++

        const addDate = document.createElement('input');
        addDate.type = "date";
        addDate.classList.add("add-events__date");

        const removeDate = document.createElement('button');
        removeDate.textContent = "Remove this date";
        removeDate.classList.add("add-events__remove-date");

        form.insertBefore(containerNewDate,addDateButton)
        containerNewDate.appendChild(addDate);
        containerNewDate.appendChild(removeDate);

        listenRemoveDate();
    })
    
}

function listenRemoveDate(){
    removeButtons = document.getElementsByClassName("add-events__remove-date")
    let dateToRemove
    let buttonConcerned
    for(let button of removeButtons){
        dateToRemove = button.parentElement
        buttonConcerned = button
    }
    buttonConcerned.addEventListener("click", event => {
        removeDate(dateToRemove)
    })        
    // removeDate(dateToRemove) 
}

function removeDate(dateToRemove){
    // const idSelected = document.getElementById(`${dateToRemove.id}`)
    // idSelected.remove()
    dateToRemove.remove()
}