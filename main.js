async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
   let w = JSON.parse(y);
    w.fisrtname = "sara";
console.log(w.fisrtname);
const fl= document.getElementById('mouad');
fl.textContent = w.fisrtname;

}
getText("/services/data.json");
 
document.getElementById('fullname').innerText = "nana";

