

export function addAttendees(buttonID, inputAttendee, dates, availabilities){
    for(let i=0; i <=availabilities.length; i++){    
        fetch(`http://localhost:3000/api/events/${buttonID}/attend`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputAttendee,
                dates: [{
                    "date" : dates[i],
                    "available" : availabilities[i]
                }]
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // Handle the response and update the table if needed
            updateTable(buttonID, inputAttendee, dates, availabilities);
            })
            .catch((error) => {
            console.error(error);
            })
    };
}