const article = document.querySelector(".events");

export async function testFetch() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    console.log(data);

    data.forEach((element) => {
      let i = 0;
      article.innerHTML += `
        <h2>${element.author} ${element.name}</h2>
        <p>${element.description}</p>`;

      const table = document.createElement("table");
      table.classList.add(".events_table");
      article.appendChild(table);

      const tr = document.createElement("tr");
      table.appendChild(tr);

      for (let i = 0; i < element.dates.length; i++) {
        const tdDate = document.createElement("td");
        tdDate.textContent = element.dates[i].date;
        tr.appendChild(tdDate);
      }
      let a = 0;

      for (let date of element.dates) {
        const trName = document.createElement("tr");
        trName.textContent = date.attendees[a].name;
        table.appendChild(trName);
        console.log(date.attendees[a]);
        a++;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
