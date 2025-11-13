
// DOM Freelances
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

//cart-profile-dom
const image_profil=document.getElementById('image_profil');

const btn_voir = document.getElementsByClassName(".mouad");



let ListFreeLence ;

//  njibo Data Json 

async function fetshdata(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    ListFreeLence = JSON.parse(xml);
    AddListFreeLance()
}

function copyData(){
  ListFreeLence = fetshdata('/services/data.json');
}

//  header 
async function fetch_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;

}

fetch_header('/components/header.html');

// localStorage
function getData(){
  ListFreeLence = JSON.parse(localStorage.getItem('data_freelance')) || [];
}

function setData(){
  localStorage.setItem('data_freelance',ListFreeLence);
}

if(localStorage.getItem('data_freelance')){
  getData()
  AddListFreeLance()
}else{
  copyData()
}


// import {nameRegex , skillRegex , amountRegex ,regex} from './utils/Rejex'

// functions

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




 

 
//mission
const div_misson = document.getElementById("card_mission")
let mission ;
async function fetshmission(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    mission = JSON.parse(xml);

    AddListmission();
}

fetshmission('/services/mission.json');

function AddListmission(){

    mission.forEach(mouad => {

         let card_1 = `<div class="col-md-4">
        <div class="card mission-card p-3"><h5 class="card-title">${mouad.thework}</h5>
          <p class="text-muted mb-2">${mouad.prix_time}</p>
          <p>${mouad.deteils}</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>`

      div_misson.innerHTML += card_1
        
    });

}


 
//formula by regex validation

//function regex validation

// Modification du profil Freelance


// Selecteur dial DOM  le formulaire dans la modale



//  RegEx 


// import {nameRegex , skillRegex , amountRegex ,regex} from './utils/Rejex.js';

//  validation 

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


    if(regex()){
       alert("erour")
    }else{

       if(isvalid){
        let objet = {
           fullName : add_freelance_Form.elements.name.value,
            photos : "../assets/images/profil1.jpg",
           spécialisations : add_freelance_Form.elements.specialisations.value,
          note : "(4.7)" ,
          skils : add_freelance_Form.elements.skils.value,
          amaunt : "40€/h"
        }

        ListFreeLence.push(objet)
        console.log(ListFreeLence)
        setData()
        const staticBackdrop = document.getElementById('staticBackdrop')
        staticBackdrop.style.display = "none"
        AddListFreeLance()

    }
    }


  })
}

validation()


// Modification du profil Freelance



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
    alert("Nom invalide (3 a 40 lettres)");
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
  console.log(animals.slice(2, 4));

  // Mise a jour de donnees dakhel dial array
  ListFreeLence[selectedFreelancerIndex] = {
    ...ListFreeLence[selectedFreelancerIndex],
    fullName: name,
    skils: skill,
    spécialisations: specialisation,
    am
   , amaunt: `${amount}€/h`,
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

function filter(){
   let listfilter ;
  if(selectFiltre.value === "Toutes les spécialités"){
   listfilter = ListFreeLence;
  }
  else{
    listfilter = ListFreeLence.filter(fil => fil.skils === selectFiltre.value)
  }
  AddListFreeLance(listfilter);  
}

selectFiltre.addEventListener("change",filter)




// Charger les services 
//DOM Freelances 


//Data Json
async function fetshdata(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    ListFreeLence = JSON.parse(xml);
    AddListFreeLance()
}

function copyData(){
  ListFreeLence = fetshdata('/services/data.json');
}

// header 
async function fetsh_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;
}

fetsh_header('/components/header.html');

//  localStorage 
function getData(){
  ListFreeLence = JSON.parse(localStorage.getItem('data_freelance')) || [];
}

function setData(){
  localStorage.setItem('data_freelance',ListFreeLence);
}

if(localStorage.getItem('data_freelance')){
  getData()
  AddListFreeLance()
}else{
  copyData()
}

// functions 
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

// Missions

async function fetshmission(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    mission = JSON.parse(xml);
    AddListmission();
}

fetshmission('/services/mission.json');

function AddListmission(){
    mission.forEach(mouad => {
         let card_1 = `<div class="col-md-4">
        <div class="card mission-card p-3"><h5 class="card-title">${mouad.thework}</h5>
          <p class="text-muted mb-2">${mouad.prix_time}</p>
          <p>${mouad.deteils}</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>`
      div_misson.innerHTML += card_1
    });
}


// Modification du profil Freelance

const modal = document.getElementById("staticBackdrop");
const modalTitle = document.getElementById("staticBackdropLabel");
const form = modal ? modal.querySelector("form") : null;

const inputName = document.getElementById("freelanceName");
const inputSkill = document.getElementById("freelanceSkill");
const inputSpecialisation = document.getElementById("freelanceSpecialisation");
const inputAmount = document.getElementById("freelanceAmount");
const inputPhoto = document.getElementById("freelancePhoto");

let selectedFreelancerIndex = null;

function validation(){
  if (!submit) return;
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
           spécialisations : add_freelance_Form.elements.specialisations.value,
           note : "(4.7)" ,
           skils : add_freelance_Form.elements.skils.value,
           amaunt : "40€/h"
        }
        ListFreeLence.push(objet)
        setData()
        AddListFreeLance()
    }
  })
}
validation()

function openEditModal(index) {
  selectedFreelancerIndex = index;
  const f = ListFreeLence[index];
  document.getElementById("editName").value = f.fullName;
  document.getElementById("editSkill").value = f.skils;
  document.getElementById("editSpecialisation").value = f.spécialisations;
  document.getElementById("editAmount").value = f.amaunt.replace("€/h", "");
  document.getElementById("editPhoto").value = f.photos;
}

function saveFreelanceChanges() {
  const name = document.getElementById("editName").value.trim();
  const skill = document.getElementById("editSkill").value.trim();
  const specialisation = document.getElementById("editSpecialisation").value.trim();
  const amount = document.getElementById("editAmount").value.trim();
  const photo = document.getElementById("editPhoto").value.trim();

  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
  const skillRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
  const amountRegex = /^[0-9]{1,3}$/;

  if (!nameRegex.test(name)) { alert("Nom invalide"); return; }
  if (!skillRegex.test(skill)) { alert("Compétence invalide"); return; }
  if (!amountRegex.test(amount)) { alert("Montant invalide"); return; }

  ListFreeLence[selectedFreelancerIndex] = {
    ...ListFreeLence[selectedFreelancerIndex],
    fullName: name,
    skils: skill,
    spécialisations: specialisation,
    amaunt: `${amount}€/h`,
    photos: photo || ListFreeLence[selectedFreelancerIndex].photos
  };

  localStorage.setItem("freelancers", JSON.stringify(ListFreeLence));
  AddListFreeLance();
  alert("Profil mis a jour !");
}


// main.js : Gestion de la page Services

// Slection des elements HTML
const container = document.getElementById("servicesContainer");
const searchInput = document.getElementById("servicesSearch");
const filterSelect = document.getElementById("filterCategory");
const sortSelect = document.getElementById("sortPrice");
const addButton = document.getElementById("openAddService");
const template = document.getElementById("templateServiceCard");
const modalSkeleton = document.getElementById("serviceModalSkeleton");

// Tableau principal des services
let services = [];

// Chargement initial des donnes
document.addEventListener("DOMContentLoaded", async () => {
  await loadServices();
  renderServices(services);
});

// Fonction njib  services mn json ola mn 
const checkFetchData = async(serviceData, callback) => {
  let serviceData = await fetch('./services/services.json'${serviceData})
  let serviceDataJson = await serviceData.json();
  return serviceDataJson;

}

function checkServicesHosting(h)


//Affichage dynamique des services 
function renderServices(list) {
  container.innerHTML = ""; // on vide le container avant de le remplir
  const fragment = document.createDocumentFragment();

  list.forEach(service => {
    const card = template.content.cloneNode(true);
    card.querySelector(".card-img-top").src = service.image;
    card.querySelector(".card-title").textContent = service.title;
    card.querySelector(".card-text").textContent = `Freelance : ${service.freelance} — Spécialité : ${formatCategory(service.category)}`;
    card.querySelector(".service-price").textContent = `${service.price} DH`;
    card.querySelector(".service-time").textContent = `${service.time} jours`;
    card.querySelector(".description").textContent = service.description;

    // Actions des boutons
    card.querySelector("[data-action='view']").addEventListener("click", () => viewService(service));
    card.querySelector("[data-action='edit']").addEventListener("click", () => openForm(service));
    card.querySelector("[data-action='delete']").addEventListener("click", () => deleteService(service.id));

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// 3. Recherche / Filtrage / Tri 
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

function applyFilters() {
  let filtered = [...services];

  const term = searchInput.value.toLowerCase();
  const cat = filterSelect.value;
  const sort = sortSelect.value;

  // Recherche texte
  if (term) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.freelance.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term)
    );
  }

  // Filtrage par categorie
  if (cat) {
    filtered = filtered.filter(s => s.category === cat);
  }

  // Tri par prix ou dlai
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "time-asc") filtered.sort((a, b) => a.time - b.time);

  renderServices(filtered);
}

// 4. Ajout / Modification / Suppressio
addButton.addEventListener("click", () => openForm());

// Ouvre le formulaire (pour ajout ou modification)
function openForm(service = null) {
  const modal = modalSkeleton.cloneNode(true);
  modal.classList.remove("d-none");

  const form = modal.querySelector("#serviceForm");
  document.body.appendChild(modal);

  // Prremplir si modification
  if (service) {
    form.title.value = service.title;
    form.description.value = service.description;
    form.price.value = service.price;
    form.time.value = service.time;
    form.category.value = service.category;
  }

  // Boutoon annuler
  form.querySelector("[data-action='cancel']").onclick = () => modal.remove();

  // Soumission
  form.onsubmit = e => {
    e.preventDefault();
    const newService = {
      id: service ? service.id : "svc-" + Date.now(),
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      freelance: service ? service.freelance : "Freelance inconnu",
      category: form.category.value,
      price: parseInt(form.price.value),
      time: parseInt(form.time.value),
      image: "assets/img/sample-service.jpg"
    };

    if (service) {
      // Modification
      services = services.map(s => (s.id === service.id ? newService : s));
    } else {
      // Ajout
      services.push(newService);
    }

    localStorage.setItem("services", JSON.stringify(services));
    renderServices(services);
    modal.remove();
  };
}

// Supprimer un service
function deleteService(id) {
  if (confirm("Supprimer ce service ?")) {
    services = services.filter(s => s.id !== id);
    localStorage.setItem("services", JSON.stringify(services));
    renderServices(services);
  }
}

// Voir un service 
function viewService(service) {
  alert(
    `Service : ${service.title}\nFreelance : ${service.freelance}\nPrix : ${service.price} DH\nDélai : ${service.time} jours\n\n${service.description}`
  );
}

// 6. Utils 
function formatCategory(cat) {
  switch (cat) {
    case "dev-web": return "Développement Web";
    case "design-ux": return "Design / UX";
    case "marketing": return "Marketing";
    case "redaction": return "Rédaction";
    default: return "Autre";
  }
}
