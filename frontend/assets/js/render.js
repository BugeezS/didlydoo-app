import { removeEvents } from "./remove.js";

const ul = document.querySelector(".events-list");

export async function renderEvents() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    data.forEach((element) => {
      const uniqueNames = new Set();
      uniqueNames.add(element.author);
      element.dates.forEach((date) => {
        if (date.attendees && Array.isArray(date.attendees)) {
          date.attendees.forEach((attendee) => {
            uniqueNames.add(attendee.name);
          });
        }
      });

      ul.innerHTML += `
        <li class="event">
          <h2>${element.author} ${element.name}</h2>
          <p>${element.description}</p>
          <svg id="${
            element.id
          }" class="event-trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <table id="table-${element.id}" class="events_table">
          </table>
          <div class="event-addP">
            <input type="text" id="new-attendee-${
              element.id
            }" placeholder="Enter name" />
            ${element.dates
              .map(
                (date) =>
                  `<input type="checkbox" id="availability-${element.id}-${date.date}" />`
              )
              .join("")}
            <button id="add-attendee-button-${element.id}">Add Attendee</button>
          </div>
        </li>
      `;

      const addAttendeeButton = document.getElementById(
        `add-attendee-button-${element.id}`
      );
      addAttendeeButton.addEventListener("click", () => {
        const attendeeName = document.getElementById(
          `new-attendee-${element.id}`
        ).value;
        const attendeeAvailabilities = element.dates.map((date) => {
          const checkbox = document.getElementById(
            `availability-${element.id}-${date.date}`
          );
          return {
            date: date.date,
            available: checkbox.checked,
          };
        });

        // Call a function to add the attendee to the database
        addAttendeeToDatabase(element.id, attendeeName, attendeeAvailabilities);
      });

      const table = document.getElementById(`table-${element.id}`);

      const trHeader = document.createElement("tr");
      table.appendChild(trHeader);

      const thAuthor = document.createElement("th");
      thAuthor.textContent = "Author";
      trHeader.appendChild(thAuthor);

      element.dates.forEach((date) => {
        const thDate = document.createElement("th");
        thDate.textContent = date.date;
        trHeader.appendChild(thDate);
      });

      uniqueNames.forEach((name) => {
        const trName = document.createElement("tr");
        table.appendChild(trName);

        const tdName = document.createElement("td");
        tdName.textContent = name;
        trName.appendChild(tdName);

        element.dates.forEach((date) => {
          const tdAttendance = document.createElement("td");
          const attendanceStatus = getAttendanceStatus(date.attendees, name);
          tdAttendance.textContent =
            name === element.author ? "V" : attendanceStatus ? "V" : "X";
          trName.appendChild(tdAttendance);
        });
      });
    });

    renderTrashes();
  } catch (error) {
    console.error(error);
  }
}

function renderTrashes() {
  const remove = document.getElementsByClassName("event-trash");
  for (let trash of remove) {
    trash.addEventListener("click", (event) => {
      removeEvents(event, trash);
    });
  }
}

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

function addAttendeeToDatabase(eventId, attendeeName, availabilities) {
  // Make an API request to add the attendee to the database
  // You can use fetch or any other library to make the request
  // Example using fetch:
  fetch(`http://localhost:3000/api/events/${eventId}/attend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: attendeeName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response and update the table if needed
      updateTable(eventId, attendeeName, availabilities);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateTable(eventId, attendeeName, availabilities) {
  const table = document.getElementById(`table-${eventId}`);
  const existingRow = table.querySelector(`tr[data-name="${attendeeName}"]`);

  if (existingRow) {
    // If the attendee already exists, update the availability in the table
    availabilities.forEach((availability) => {
      const td = existingRow.querySelector(
        `td[data-date="${availability.date}"]`
      );
      if (td) {
        td.textContent = availability.available ? "V" : "X";
      }
    });
  } else {
    // If the attendee is new, create a new row in the table
    const tr = document.createElement("tr");
    tr.setAttribute("data-name", attendeeName);
    table.appendChild(tr);

    const tdName = document.createElement("td");
    tdName.textContent = attendeeName;
    tr.appendChild(tdName);

    availabilities.forEach((availability) => {
      const tdAttendance = document.createElement("td");
      tdAttendance.setAttribute("data-date", availability.date);
      tdAttendance.textContent = availability.available ? "V" : "X";
      tr.appendChild(tdAttendance);
    });
  }
}
