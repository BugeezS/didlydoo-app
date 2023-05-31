import { removeEvents } from './remove.js';

const ul = document.querySelector('.events-list');

export async function renderEvents() {
  try {
    const response = await fetch('http://localhost:3000/api/events');
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
        <svg id="${element.id}" class="event-trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <table id="table-${element.id}" class="events_table"></table>
        <div>
          <form id="attendanceForm-${element.id}">
            <input type="text" id="nameInput-${element.id}" />
            ${element.dates
              .map(
                (date) =>
                  `<input type="checkbox" id="availabilityInput-${element.id}-${date.date}" />`
              )
              .join('')}
            <input type="submit"/>
          </form>
        </div>
      </li>`;

      const table = document.getElementById(`table-${element.id}`);

      const trHeader = document.createElement('tr');
      table.appendChild(trHeader);

      const thAuthor = document.createElement('th');
      thAuthor.textContent = 'Author';
      trHeader.appendChild(thAuthor);

      element.dates.forEach((date) => {
        const thDate = document.createElement('th');
        thDate.textContent = date.date;
        trHeader.appendChild(thDate);
      });

      uniqueNames.forEach((name) => {
        const trName = document.createElement('tr');
        table.appendChild(trName);

        const tdName = document.createElement('td');
        tdName.textContent = name;
        trName.appendChild(tdName);

        element.dates.forEach((date) => {
          const tdAttendance = document.createElement('td');
          const attendanceStatus = getAttendanceStatus(date.attendees, name);
          tdAttendance.textContent =
            name === element.author ? 'V' : attendanceStatus ? 'V' : 'X';
          trName.appendChild(tdAttendance);
        });
      });

      const attendanceForm = document.getElementById(`attendanceForm-${element.id}`);
      attendanceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById(`nameInput-${element.id}`);
        const dates = element.dates.map((date) => {
          const availabilityInput = document.getElementById(
            `availabilityInput-${element.id}-${date.date}`
          );
          return {
            date: date.date,
            available: availabilityInput.checked
          };
        });

        console.log('Submitting attendance:', element.id, nameInput.value, dates);
        sendAttendanceInfo(element.id, nameInput.value, dates);
      });
    });

    renderTrashes();
  } catch (error) {
    console.error(error);
  }
}

function renderTrashes() {
  const remove = document.getElementsByClassName('event-trash');
  for (let trash of remove) {
    trash.addEventListener('click', (event) => {
      console.log('Removing event:', event, trash);
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

async function sendAttendanceInfo(eventId, name, dates) {
  const url = `http://localhost:3000/api/events/${eventId}/attend`;
  const payload = { name, dates };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Attendance information sent successfully');
    } else {
      console.error('Failed to send attendance information');
    }
  } catch (error) {
    console.error('An error occurred while sending attendance information:', error);
  }
}
