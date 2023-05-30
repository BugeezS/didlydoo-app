export async function removeEvents(event, trash) {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      const data = await response.json();
  
      console.log(data);
      const trashID = trash.id
      console.log(trash)
      console.log(trashID)
    }
    catch (error) {
        console.error(error);
    }
}