export function closeButton() {
    
    const form = document.getElementById('add-events');
    if (form.style.display !== 'none') {
      console.log("closeButton flex")
      form.style.display = 'none';
    } 
}


