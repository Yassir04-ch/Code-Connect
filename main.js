
// ------- DOM Freelances --------------------
const btn_freelance = document.getElementById("btn_freelance");
const Carte = document.getElementById("Carte"); 
const img_freelance = document.getElementById("img_freelance")
const name_freelance = document.getElementById("name_freelance")
const skils_freeLance = document.getElementById("skils_freeLance")
const specialisee = document.getElementById("specialisee")
const amuont_freeLance = document.getElementById("amuont_freeLance")
const div_row = document.getElementById("div_row")
const header = document.getElementById("header")
const selectFiltre = document.getElementById("filtre");

const add_freelance_Form = document.forms['add_freelance'];
const submit = document.getElementById("submit")

//-------------cart-profile-dom------
const image_profil=document.getElementById('image_profil');

const btn_voir = document.getElementsByClassName("mouad");

// ---------------- DOM mession --------------------

// ----------- Array ----------
let ListFreeLence ;

// ---------- Data Json ----------------
async function fetshdata(file) {
  let get_data = await fetch(file);
  let xml = await get_data.text();
  ListFreeLence = JSON.parse(xml);

  //  ider verification  ila kano les doonnes f local storage
  const stored = localStorage.getItem("freelancers");
  if (stored) {
    ListFreeLence = JSON.parse(stored);
  }

  AddListFreeLance();
}

 function copyData(){
  ListFreeLence = fetshdata('../services/data.json');
}


// ------------- header ----------------
async function fetsh_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;

}

fetsh_header('../components/header.html');

// ---------------- localStorage -------------------
function getData(){
  ListFreeLence = JSON.parse(localStorage.getItem('freelancers')) || [];
}

function setData(){
  localStorage.setItem('freelancers',ListFreeLence);
}

if(localStorage.getItem('freelancers')){
  getData()
  AddListFreeLance()
}else{
  copyData()
}

// --------------- Card -------------------


// import {nameRegex , skillRegex , amountRegex ,regex} from './utils/Rejex'

// ---------functions ----------------

function AddListFreeLance(){


   div_row.innerHTML = "";
    ListFreeLence.forEach(element => {
         let card = `<div class="col-md-4">
        <div id = "Carte" class="card h-100 shadow-sm">
          <div class="card-body d-flex gap-3">
            <img id="img_freelance" src=${element.photos} alt="Mouad" class="card-avatar">
            <div>
              <h5 id="name_freelance"  class="card-title mb-1">${element.fullName}</h5>
              <small id="skils_freeLance" class="text-muted">${element.skils}</small>
              <p id="specialisee" class="mt-2 mb-1 text-muted">${element.spécialisations}</p>
              <div class="text-warning">
                ★★★★☆ <small class="text-muted">(4.7)</small>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent d-flex justify-content-between">
            <small id="amuont_freeLance" class="text-muted">${element.amaunt}</small>
            <button type="button" class="btn btn-primary mouad" data-bs-toggle="modal" data-bs-target="#affich_prf" >Voir</button>
          </div>
        </div>
      </div> `

      div_row.innerHTML += card

    });

}


// list des option 

function optionslist(){

  const option = ["Développeur Web","Designer","Rédacteur","Marketing"];
  for(let i = 0 ; i < option.length ; i++){
    const opt = document.createElement("option");
    opt.textContent = option[i];
    selectFiltre.appendChild(opt);
  }
}

function filter(){
  if(selectFiltre.value === "Toutes les spécialités"){
     AddListFreeLance();
  }

  else{
   const listfilter = ListFreeLence.filter(fil => fil.skils === selectFiltre.value)
    div_row.innerHTML = ""; 
    listfilter.forEach(element => {
      let card = `
        <div class="col-md-4">
          <div id="Carte" class="card h-100 shadow-sm">
            <div class="card-body d-flex gap-3">
              <img src=${element.photos} alt="Mouad" class="card-avatar">
              <div>
                <h5 class="card-title mb-1">${element.fullName}</h5>
                <small class="text-muted">${element.skils}</small>
                <p class="mt-2 mb-1 text-muted">${element.spécialisations}</p>
                <div class="text-warning">★★★★☆ <small class="text-muted">(4.7)</small></div>
              </div>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
              <small class="text-muted">${element.amaunt}</small>
              <button type="button" class="btn btn-primary mouad" data-bs-toggle="modal" data-bs-target="#affich_prf">Voir</button>
            </div>
          </div>
        </div>`;
      div_row.innerHTML += card;
    });
  }
} 

// bach matkhdamch fuction filter tatkmal t7mil ga3 data 7it kan kaytra error f lawal omakaykhdamch lkod 
fetshdata('../services/data.json').then(() => {
  optionslist();
  selectFiltre.addEventListener("change", filter);
});





// -----------page avis----------------

const container = document.getElementById("avis-container");
if (container) {
//data json avis 

 let avis ;
 async function fetchavis(file) {
  let get_data = await fetch(file)
  let av = await get_data.text()
  avis = JSON.parse(av);
   const stored = localStorage.getItem("avisloca");
  if (stored) {
    avis = JSON.parse(stored);
  }

   afficheavis();
 }

 fetchavis("../services/avis.json")

 function afficheavis(){
    container.innerHTML = "";
    avis.forEach((ya,index)=> {
        container.innerHTML += ` 
         <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-0">${ya.client}</h5>
            <p class="text-muted small mb-1">Client de : <strong>${ya.freelance}</strong></p>
            <p> ${ya.commentaire} Je recommande à ${ya.note}</p>
            <p>Reponse de freelance: ${ya.reponce}</p>
          </div>
             <textarea placeholder="entrer la reponce" data-index="${index}"></textarea>
             <button class="btn_rep" data-index="${index}"  style="background: #2784feff ; color:white">Envoyer</button>
        </div>`
    })
 
 const btn_rep = document.querySelectorAll(".btn_rep");
 btn_rep.forEach(btn => {
    btn.addEventListener("click",function(){
        const idx = this.dataset.index
        const text = this.previousElementSibling
        if(text.value.trim() ===""){
            alert("ecrire la reponce")
            return;
        }
        avis[idx].reponce = text.value.trim()
        localStorage.setItem("avisloca",JSON.stringify(avis))

        afficheavis();

    })
 })
  
 }
//  function ajoutnewavis 

  const nclient = document.getElementById("fullname")
  const nfreel = document.getElementById("nfreel")
  const commentaire = document.getElementById("commentaire")
  const note = document.getElementById("note")
  const btn_avis = document.getElementById("btn-avis")
   document.querySelector("#yassir form").addEventListener("mouseover",function(){
  if(nclient.value.trim()!= ''){
  nclient.style.border = "2px solid green"
}
if(nfreel.value.trim()!= ''){
  nfreel.style.border = "2px solid green"
}
if(commentaire.value.trim()!= ''){
  commentaire.style.border = "2px solid green"
}
if(note.value.trim()!= ''){
  note.style.border = "2px solid green"
}
})


btn_avis.addEventListener("click",function(){
if(nclient.value.trim()== ''){
  nclient.style.border = "2px solid red"
  alert("entrer le nom")
  return;
}
if(nfreel.value.trim()== ''){
  nfreel.style.border = "2px solid red"
  alert("entrer le nom de freelance")
  return;
}
if(commentaire.value.trim()== ''){
  commentaire.style.border = "2px solid red"
  alert("entrer le commentaire")
  return
}
if(note.value.trim()== ''){
  note.style.border = "2px solid red"
  alert("entrer le note")
  return;
}

  const avi = {
    client:nclient.value,
    freelance:nfreel.value,
    note:note.value,
    commentaire:commentaire.value,
    reponce:""
  }
   avis.push(avi);
   localStorage.getItem("avisloca",JSON.stringify(avis));
  
   afficheavis();
  document.querySelector("#yassir form").reset();

})
}

//----------------card-mission-----------------
const div_misson = document.getElementById("card_mission")

let mission ;


// add mission localStorage and json 

if(localStorage.getItem("missions")){
  mission = JSON.parse(localStorage.getItem("missions"))
  AddListmission();
}
else {
  fetshmission("../services/mission.json");
}

async function fetshmission(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    mission = JSON.parse(xml);

    AddListmission();

    localStorage.setItem("missions", JSON.stringify(mission));
}


function AddListmission(){
    div_misson.innerHTML = "";

    mission.forEach(mouad => {

         let card_1 = `<div class="col-md-4">
        <div class="card mission-card p-3">
        <h5 class="card-title">${mouad.thework}</h5>
          <p class="text-muted mb-2">${mouad.prix_time}</p>
          <p>${mouad.deteils}</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>`

      div_misson.innerHTML += card_1
        
    });
  }


// form add maisson 

const send = document.getElementById("send");
const job = document.getElementById("job");
const day = document.getElementById("day");
const prix = document.getElementById("prix");
const details = document.getElementById("details");
 const fortm = document.querySelector('#mouad_sr form')

//  add border in input de form maisson 
fortm.addEventListener("mouseover",function(){
  if(  job.value.trim() !== ''){
    job.style.border = "2px solid green"
  }
   if(  day.value.trim()!== ''){
    day.style.border = "2px solid green"
  }
   if(  prix.value.trim()!== ''){
    prix.style.border = "2px solid green"
  }
   if(  details.value.trim()!== ''){
    details.style.border = "2px solid green"
  }
})

// function de Newmaisson


send.addEventListener("click",function(){

// validation de form maisson 

if(job.value.trim()== ''){
  job.style.border = "2px solid red"
  return;
}
if(details.value.trim()== ''){
  details.style.border = "2px solid red"
  return;
}
if(day.value.trim()== ''){
  day.style.border = "2px solid red"
  return
}
if(prix.value.trim()== ''){
  prix.style.border = "2px solid red"
  return;
}

  const maisson = {
    thework: job.value,
    prix_time:`Budget: ${prix.value} - Duration: ${day.value}`,
    deteils: details.value
  }

  div_misson.innerHTML +=`<div class = "col-md-4">
   <div class="card mission-card p-3">
        <h5 class="card-title">${maisson.thework}</h5>
          <p class="text-muted mb-2">${maisson.prix_time}</p>
          <p>${maisson.deteils}</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>
    `;
    
// add newmaisson in localStorage
     mission.push(maisson);
     localStorage.setItem("missions", JSON.stringify(mission));

    document.querySelector('#mouad_sr form').reset(); 

})






 
//formula by regex validation

//function regex validation
// --------------------------------------------
// Modification du profil Freelance
// --------------------------------------------

// Selecteur dial DOM  le formulaire dans la modale
const modal = document.getElementById("staticBackdrop");
const modalTitle = document.getElementById("staticBackdropLabel");
const form = modal.querySelector("form");

// Champs du formulaire
const inputName = document.getElementById("freelanceName");
const inputSkill = document.getElementById("freelanceSkill");
const inputSpecialisation = document.getElementById("freelanceSpecialisation");
const inputAmount = document.getElementById("freelanceAmount");
const inputPhoto = document.getElementById("freelancePhoto");

let selectedFreelancerIndex = null;


// ----------------- RegEx -----------------


// import {nameRegex , skillRegex , amountRegex ,regex} from './utils/Rejex.js';

// --------------- validation -------------------

function validation(){
  submit.addEventListener("click",(e)=>{
    e.preventDefault()
    
    const Names = ["name","email","password","skils","specialisations"]
    let isvalid = true;
    Names.forEach(ele =>{
      let valid_name = add_freelance_Form.elements[ele];
      valid_name.style.border = '#ccc solid 1px'
      if(valid_name.value.trim() == ''){
        valid_name.style.border = 'red solid 1px'
        isvalid = false
      }

    })


       if(isvalid){
        let objet = {
           fullName : add_freelance_Form.elements.name.value,
            photos : "../assets/images/profil1.jpg",
           spécialisations : add_freelance_Form.elements.spécialisations.value,
          note : "(4.7)" ,
          skils : add_freelance_Form.elements.skils.value,
          amaunt : "40€/h"
        }

        ListFreeLence.push(objet)
        setData()
        // ----------- hidden modul ----------
        const staticBackdrop = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop')) 
        staticBackdrop.hide()
        AddListFreeLance()

    } 


  })
}

validation()

// --------------------------------------------
// Modification du profil Freelance
// --------------------------------------------


// Ouvrir la modale avec les infos du freelance 
function openEditModal(index) {
  selectedFreelancerIndex = index;
  const f = ListFreeLence[index];

  document.getElementById("editName").value = f.fullName;
  document.getElementById("editSkill").value = f.skils;
  document.getElementById("editSpecialisation").value = f.spécialisations;
  document.getElementById("editAmount").value = f.amaunt.replace("€/h", "");
  document.getElementById("editPhoto").value = f.photos;
}

// Validation Regex et mise a jour 
function saveFreelanceChanges() {
  const name = document.getElementById("editName").value.trim();
  const skill = document.getElementById("editSkill").value.trim();
  const specialisation = document.getElementById("editSpecialisation").value.trim();
  const amount = document.getElementById("editAmount").value.trim();
  const photo = document.getElementById("editPhoto").value.trim();

  // Regex simples pour valider les champs
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
  const skillRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
  const amountRegex = /^[0-9]{1,3}$/;

  if (!nameRegex.test(name)) {
    alert("Nom invalide (3 à 40 lettres)");
    return;
  }

  if (!skillRegex.test(skill)) {
    alert("Compétence invalide");
    return;
  }

  if (!amountRegex.test(amount)) {
    alert("Montant invalide");
    return;
  }

  // Mise a jour de donnees dakhel dial array
  ListFreeLence[selectedFreelancerIndex] = {
    ...ListFreeLence[selectedFreelancerIndex],
    fullName: name,
    skils: skill,
    spécialisations: specialisation,
    amaunt: `${amount}€/h`,
    photos: photo || ListFreeLence[selectedFreelancerIndex].photos
  };

  // Sauvegarde dans LocalStorage
  localStorage.setItem("freelancers", JSON.stringify(ListFreeLence));

  // Mise a jour visuelle
  AddListFreeLance();

  // Fermer la modale
  const modalInstance = bootstrap.Modal.getInstance(document.getElementById("editModal"));
  modalInstance.hide();

  alert("Profil mis a jour avec succes !");
}


// i charge les donnes

