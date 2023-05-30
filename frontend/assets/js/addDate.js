const addDateButton = document.querySelector('#add-events__date_button');
const form = document.querySelector("form") 

export function addDate (){
    addDateButton.addEventListener('click',()=>{
        const addDate = document.createElement('input')
        addDate.type = "date";
        addDate.classList.add("add-events__date")
        form.insertBefore(addDate,addDateButton);
    })
}