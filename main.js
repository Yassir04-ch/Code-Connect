
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

const btn_voir = document.getElementsByClassName(".mouad");



let ListFreeLence ;

// ---------- Data Json ----------------

async function fetshdata(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    ListFreeLence = JSON.parse(xml);
    AddListFreeLance()
}

function copyData(){
  ListFreeLence = fetshdata('/services/data.json');
}

// ------------- header ----------------
async function fetsh_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;

}

fetsh_header('/components/header.html');

// ---------------- localStorage -------------------
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

// --------------- Card-porfile -------------------


 

 
//----------------card-mission-----------------
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
// --------------------------------------------
// Modification du profil Freelance
// --------------------------------------------

// Selecteur dial DOM  le formulaire dans la modale



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
// ------- DOM Freelances --------------------


// ---------- Data Json ----------------
async function fetshdata(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    ListFreeLence = JSON.parse(xml);
    AddListFreeLance()
}

function copyData(){
  ListFreeLence = fetshdata('/services/data.json');
}

// ------------- header ----------------
async function fetsh_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;
}

fetsh_header('/components/header.html');

// ---------------- localStorage -------------------
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

// ---------------- Missions -----------------

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

// --------------------------------------------
// Modification du profil Freelance
// --------------------------------------------
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
  alert("Profil mis à jour !");
}


// SECTION OUGHLANE - SERVICES


document.addEventListener("DOMContentLoaded", () => {
  const servicesContainer = document.getElementById("servicesContainer");
  const searchInput = document.getElementById("servicesSearch");
  const filterSelect = document.getElementById("filterCategory");
  const sortSelect = document.getElementById("sortPrice");
  const addServiceBtn = document.getElementById("openAddService");
  const serviceForm = document.getElementById("serviceForm");
  const template = document.getElementById("templateServiceCard");

  let servicesList = [];
  let filteredServices = [];
  const LS_KEY = "freelancelink_services_v1";

  async function fetchServicesData() {
    try {
      const local = localStorage.getItem(LS_KEY);
      if (local) {
        servicesList = JSON.parse(local);
        filteredServices = [...servicesList];
        renderServices(filteredServices);
        return;
      }

const res = await fetch("./services/services.json");

      const data = await res.json();
      servicesList = data;
      filteredServices = [...servicesList];
      localStorage.setItem(LS_KEY, JSON.stringify(servicesList));
      renderServices(filteredServices);
    } catch (err) {
      console.error("Erreur :", err);
      servicesContainer.innerHTML = `<p class="text-danger text-center">Impossible de charger les services.</p>`;
    }
  }

  function renderServices(list) {
    servicesContainer.innerHTML = "";
    if (!list.length) {
      servicesContainer.innerHTML = `<p class="text-center text-muted">Aucun service trouvé.</p>`;
      return;
    }

    list.forEach((svc, index) => {
      const card = template.content.cloneNode(true);
      card.querySelector("img").src = svc.image || "../assets/images/default-service.jpg";
      card.querySelector(".card-title").textContent = svc.title;
      card.querySelector(".card-text").textContent = `Freelance: ${svc.freelancer} — Spécialité: ${svc.category}`;
      card.querySelector(".service-price").textContent = `${svc.price} DH`;
      card.querySelector(".service-time").textContent = `${svc.time} jours`;
      card.querySelector(".description").textContent = svc.description;

      card.querySelector("[data-action='view']").addEventListener("click", () => viewService(svc));
      card.querySelector("[data-action='edit']").addEventListener("click", () => editService(index));
      card.querySelector("[data-action='delete']").addEventListener("click", () => deleteService(index));
      servicesContainer.appendChild(card);
    });
  }

  searchInput.addEventListener("input", () => applyFilters());
  filterSelect.addEventListener("change", () => applyFilters());
  sortSelect.addEventListener("change", () => applyFilters());

  function applyFilters() {
    let result = [...servicesList];
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cat = filterSelect.value;
    const sort = sortSelect.value;

    if (searchTerm) {
      result = result.filter(svc =>
        svc.title.toLowerCase().includes(searchTerm) ||
        svc.freelancer.toLowerCase().includes(searchTerm) ||
        svc.category.toLowerCase().includes(searchTerm)
      );
    }

    if (cat) result = result.filter(svc => svc.category === cat);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "time-asc") result.sort((a, b) => a.time - b.time);

    filteredServices = result;
    renderServices(filteredServices);
  }

  addServiceBtn.addEventListener("click", () => {
    serviceForm.reset();
    serviceForm.dataset.mode = "add";
    alert("🟢 Remplissez le formulaire pour ajouter un service !");
  });

  serviceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(serviceForm);
    const newService = {
      id: Date.now(),
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      freelancer: "Oughlane",
      category: formData.get("category"),
      price: parseInt(formData.get("price")),
      time: parseInt(formData.get("time")),
      image: "../assets/images/default-service.jpg"
    };

    if (!newService.title || !newService.description) {
      alert("⚠️ Champs obligatoires manquants !");
      return;
    }

    if (serviceForm.dataset.mode === "edit") {
      const index = serviceForm.dataset.index;
      servicesList[index] = newService;
      alert("✏️ Service modifié avec succès !");
      serviceForm.dataset.mode = "add";
    } else {
      servicesList.push(newService);
      alert("✅ Service ajouté avec succès !");
    }

    localStorage.setItem(LS_KEY, JSON.stringify(servicesList));
    renderServices(servicesList);
    serviceForm.reset();
  });

  function editService(index) {
    const svc = servicesList[index];
    serviceForm.title.value = svc.title;
    serviceForm.description.value = svc.description;
    serviceForm.price.value = svc.price;
    serviceForm.time.value = svc.time;
    serviceForm.category.value = svc.category;

    serviceForm.dataset.mode = "edit";
    serviceForm.dataset.index = index;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteService(index) {
    if (!confirm("Supprimer ce service ?")) return;
    servicesList.splice(index, 1);
    localStorage.setItem(LS_KEY, JSON.stringify(servicesList));
    renderServices(servicesList);
  }

  function viewService(svc) {
    alert(`📦 ${svc.title}\n\n${svc.description}\nPrix : ${svc.price} DH\nDurée : ${svc.time} jours\nFreelance : ${svc.freelancer}`);
  }

  fetchServicesData();
});
