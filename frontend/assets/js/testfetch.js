/**
 * Note Corentin
 * 
 * cols:[{
        'date':"2022-03-17",
        attendees:['']
      }] 
 */


const ul = document.querySelector(".events");

export async function callAPI() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();
    showEventsDates(data)
  } catch (error) {
    console.error(error);
  }
}

export function showEventsDates(data){
  data.forEach((element) => {
    ul.innerHTML += `
    <li class="events__cards">
      <h2>${element.author} ${element.name}</h2>
      <p>${element.description}</p>
      <table>
        <tr>
    </li>
    `;
    const headerRow = document.createElement("tr");

    let i = 0
    for(let date of element.dates){
      console.log(date.date)
      ul.innerHTML+=`
        <th>${date.date}</th>
      `
      i++
    }

    ul.innerHTML += `
        </tr>
      </table>
    `
  });
}