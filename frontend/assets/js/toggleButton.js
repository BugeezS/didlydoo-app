const buttonToggle = document.querySelector('.toggle');
const form = document.querySelector('.add-events');

export function hideFormDisplayEvent() {
  form.style.display = 'none';
  console.log("hello");

  function display() {
    const author = document.getElementById('add-events__author').value;
    const name = document.getElementById('add-events__name').value;
    const description = document.getElementById('add-events__description').value;
    const date = document.getElementById('add-events__date').value;

    const eventContainer = document.createElement('div');
    eventContainer.classList.add('event-container');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '✖';

    const eventAuthor = document.createElement('span');
    const eventName = document.createElement('span');
    const eventDescription = document.createElement('textarea');
    const eventDate = document.createElement('span');

    eventAuthor.textContent = author;
    eventName.textContent = name;
    eventDescription.textContent = description;
    eventDate.textContent = date;

    eventContainer.appendChild(closeButton);
    eventContainer.appendChild(eventAuthor);
    eventContainer.appendChild(eventName);
    eventContainer.appendChild(eventDescription);
    eventContainer.appendChild(eventDate);

    const eventsSection = document.querySelector('.events');
    eventsSection.appendChild(eventContainer);

    closeButton.addEventListener('click', function () {
      eventsSection.removeChild(eventContainer);
    });
  }

  display();
}

buttonToggle.addEventListener('click', hideFormDisplayEvent);