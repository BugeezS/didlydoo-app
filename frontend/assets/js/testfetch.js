const article = document.querySelector(".events");

export async function testFetch() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    console.log(data);

    // Create a Set to store unique names
    const uniqueNames = new Set();

    data.forEach((element) => {
      // Add the author's name to the Set
      uniqueNames.add(element.author);

      article.innerHTML += `
        <h2>${element.author} ${element.name}</h2>
        <p>${element.description}</p>`;

      const table = document.createElement("table");
      table.classList.add("events_table");
      article.appendChild(table);

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
  } catch (error) {
    console.error(error);
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
