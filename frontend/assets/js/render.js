import { removeEvents } from "./remove.js";

const ul = document.querySelector(".events-list");

export async function renderEvents() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    // Create a Set to store unique names
    const uniqueNames = new Set();

    data.forEach((element) => {
      // Add the author's name to the Set
      uniqueNames.add(element.author);

      ul.innerHTML += `
        <li class="event">
          <h2>${element.author} ${element.name}</h2>
          <p>${element.description}</p>
          <svg id="${element.id}" class="event-trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <table id="table-${element.id}" class="events_table">
          </table>
        </li>
        `;

      const table = document.getElementById(`table-${element.id}`);

      // Create the header row for dates
      const trHeader = document.createElement("tr");
      table.appendChild(trHeader);

      // Create the first empty cell in the header
      const thEmpty = document.createElement("th");
      trHeader.appendChild(thEmpty);

      // Create the remaining header cells for dates
      element.dates.forEach((date) => {
        const thDate = document.createElement("th");
        thDate.textContent = date.date;
        trHeader.appendChild(thDate);
      });

      // Create a Set to store unique attendee names
      const uniqueAttendeeNames = new Set();

      // Iterate over the dates array
      element.dates.forEach((date) => {
        // Check if attendees array exists for the date
        if (date.attendees && Array.isArray(date.attendees)) {
          // Iterate over the attendees array
          date.attendees.forEach((attendee) => {
            // Add the attendee's name to the Set
            uniqueAttendeeNames.add(attendee.name);
          });
        }
      });

      // Create the first column for attendee names
      uniqueAttendeeNames.forEach((name) => {
        const trName = document.createElement("tr");
        table.appendChild(trName);

        const tdName = document.createElement("td");
        tdName.textContent = name;
        trName.appendChild(tdName);

        // Create the attendance cells for each date
        element.dates.forEach((date) => {
          const tdAttendance = document.createElement("td");
          const attendanceStatus = getAttendanceStatus(date.attendees, name);
          tdAttendance.textContent = attendanceStatus ? "V" : "X";
          trName.appendChild(tdAttendance);
        });
      });
    });
    renderTrashes();
  } catch (error) {
    console.error(error);
  }
}

function renderTrashes(){
  const remove = document.getElementsByClassName("event-trash")
  for(let trash of remove){
   trash.addEventListener("click", event => {
       removeEvents(event, trash)
   })
 }
}


// Get the attendance status for a specific attendee on a given date
function getAttendanceStatus(attendees, attendeeName) {
  if (attendees && Array.isArray(attendees)) {
    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      if (attendee.name === attendeeName) {
        return attendee.available;
      }
    }
  }
  return false;
}
