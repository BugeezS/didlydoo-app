
export function hiddenFormDisplayForm() {
  console.log("toggle button");
  const form = document.getElementById('add-events');
  if (form.style.display !== 'flex') {
    console.log("if css not flex");
    form.style.display = 'flex';
  } else {
    console.log("if css flex");
  }
    form.classList.toggle("vertical-form");
  
}