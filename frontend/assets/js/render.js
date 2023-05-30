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
        ${element.dates.map((date) => `<input type="checkbox" />`).join("")}
        <button id="add-attendee-button-${element.id}">Add Attendee</button>
      </div>
    </li>
      `;

      const table = document.getElementById(`table-${element.id}`);
      const addAttendeeButton = document.getElementById(
        `add-attendee-button-${element.id}`
      );
      const newAttendeeInput = document.getElementById(
        `new-attendee-${element.id}`
      );

      addAttendeeButton.addEventListener("click", () => {
        const newAttendeeName = newAttendeeInput.value;
        if (newAttendeeName) {
          addAttendeeRow(table, newAttendeeName, element.dates);
          newAttendeeInput.value = "";
        }
      });

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

function addAttendeeRow(table, attendeeName, dates) {
  const trAttendee = document.createElement("tr");
  table.appendChild(trAttendee);

  const tdName = document.createElement("td");
  tdName.textContent = attendeeName;
  trAttendee.appendChild(tdName);

  dates.forEach((date) => {
    const tdAttendance = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      tdAttendance.textContent = isChecked ? "V" : "X";
    });
    tdAttendance.appendChild(checkbox);
    trAttendee.appendChild(tdAttendance);
  });
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
