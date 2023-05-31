const addDateButton = document.querySelector('#add-events__date_button');
const form = document.querySelector("form") 

export function addDate (){
    addDateButton.addEventListener('click',()=>{
        const containerNewDate = document.createElement('section')
        containerNewDate.classList.add("add-events__date--container")

        const addDate = document.createElement('input');
        addDate.type = "date";
        addDate.classList.add("add-events__date");

        const removeDate = document.createElement('button');
        removeDate.textContent = "Remove this date";
        removeDate.classList.add("add-events__remove-date");

        form.insertBefore(containerNewDate,addDateButton)
        containerNewDate.appendChild(addDate);
        containerNewDate.appendChild(removeDate);
    })
}