const article = document.querySelector(".events");

export async function testFetch() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    console.log(data);

    data.forEach((element) => {
      article.innerHTML += `
        <h2>${element.author} ${element.name}</h2>
        <p>${element.description}</p>`;

      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = "<th>Name</th>";

      element.dates.forEach((date) => {
        const th = document.createElement("th");
        th.textContent = date;
        headerRow.appendChild(th);
      });

      table.appendChild(headerRow);

      // Create table body rows with attendee availability
      element.attendees.forEach((attendee) => {
        const bodyRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = attendee.name;
        bodyRow.appendChild(nameCell);

        element.dates.forEach((date) => {
          const availabilityCell = document.createElement("td");
          const dateAvailability = attendee.dates.find((d) => d.date === date);

          if (dateAvailability) {
            availabilityCell.textContent = dateAvailability.available
              ? "Yes"
              : "No";
          } else {
            availabilityCell.textContent = "N/A";
          }

          bodyRow.appendChild(availabilityCell);
        });

        table.appendChild(bodyRow);
      });

      article.appendChild(table);
    });
  } catch (error) {
    console.error(error);
  }
}
