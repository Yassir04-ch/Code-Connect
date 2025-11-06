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


let ListFreeLence ;

// ---------- Data Json ----------------

async function fetshdata(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    ListFreeLence = JSON.parse(xml);

    AddListFreeLance();
}
fetshdata('/services/data.json');

// ------------- header ----------------
async function fetsh_header(file){
    let get_data = await fetch(file);
    let xml = await get_data.text();
    header.innerHTML = xml;

}

fetsh_header('/components/header.html');

// --------------- Card -------------------




// ---------functions ----------------


function AddListFreeLance(liste = ListFreeLence){

   div_row.innerHTML = "";
    liste.forEach(element => {

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
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#profilModal">Voir</button>
          </div>
        </div>
      </div>` 

      div_row.innerHTML += card
        
    });

}

// ---------------- filter -----------------------


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

//  Ajout du bouton Modifier a chaque carte
function AddListFreeLance() {
  div_row.innerHTML = "";

  ListFreeLence.forEach((element, index) => {
    let card = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex gap-3">
            <img src="${element.photos}" alt="${element.fullName}" class="card-avatar">
            <div>
              <h5 class="card-title mb-1">${element.fullName}</h5>
              <small class="text-muted">${element.skils}</small>
              <p class="mt-2 mb-1 text-muted">${element.spécialisations}</p>
              <div class="text-warning">★★★★☆ <small class="text-muted">${element.note}</small></div>
            </div>
          </div>
          <div class="card-footer bg-transparent d-flex justify-content-between">
            <small class="text-muted">${element.amaunt}</small>
            <button class="btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal" onclick="openEditModal(${index})">
              Modifier
            </button>
          </div>
        </div>
      </div>`;
    div_row.innerHTML += card;
  });
}

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

function filter(){
   let listfilter ;
  if(selectFiltre.value === "Toutes les spécialités"){
   listfilter = ListFreeLence;
  }
  if(selectFiltre.value != selectFiltre.value ){
    alert("Cette option n'est pas disponible.")
  }
  else{
    listfilter = ListFreeLence.filter(fil => fil.skils === selectFiltre.value)
  }
  AddListFreeLance(listfilter);  
}

selectFiltre.addEventListener("change",filter)


// SECTION : SERVICES — Consultation des services


// Sélecteurs DOM
const servicesContainer = document.getElementById("servicesContainer");
const searchServiceInput = document.getElementById("servicesSearch");
const filterServiceSelect = document.getElementById("filterCategory");
const sortServiceSelect = document.getElementById("sortPrice");
const serviceTemplate = document.getElementById("templateServiceCard");

let servicesList = [];
let filteredServices = [];

// Charger les services 
async function fetchServicesData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();
    servicesList = data;
    filteredServices = [...servicesList];
    renderServices(filteredServices);
  } catch (err) {
    console.error("Erreur de chargement des services :", err);
    servicesContainer.innerHTML = `<p class="text-center text-danger">Erreur de chargement des données.</p>`;
  }
}

// Afficher les services 
function renderServices(list) {
  if (!servicesContainer) return;
  servicesContainer.innerHTML = "";

  if (list.length === 0) {
    servicesContainer.innerHTML = `<p class="text-center text-muted mt-3">Aucun service trouvé.</p>`;
    return;
  }

  list.forEach(service => {
    const card = serviceTemplate.content.cloneNode(true);

    // Remplir les infos
    const img = card.querySelector("img");
    img.src = service.image || "../assets/images/default-service.jpg";
    img.alt = service.title;

    card.querySelector(".card-title").textContent = service.title;
    card.querySelector(".card-text").textContent = 
      `Freelance: ${service.freelancer} — Spécialité: ${service.category}`;
    card.querySelector(".service-price").textContent = `${service.price} DH`;
    card.querySelector(".service-time").textContent = `${service.time} jours`;
    card.querySelector(".description").textContent = service.description;

    servicesContainer.appendChild(card);
  });
}

// Recherche 
if (searchServiceInput) {
  searchServiceInput.addEventListener("input", () => {
    const searchTerm = searchServiceInput.value.toLowerCase().trim();
    filteredServices = servicesList.filter(service =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.freelancer.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
    );
    renderServices(filteredServices);
  });
}

//  Filtrage par catégorie 
if (filterServiceSelect) {
  filterServiceSelect.addEventListener("change", () => {
    const cat = filterServiceSelect.value;

    if (cat === "") {
      filteredServices = [...servicesList];
    } else {
      filteredServices = servicesList.filter(svc => svc.category === cat);
    }

    renderServices(filteredServices);
  });
}

// Tri bl prix 
if (sortServiceSelect) {
  sortServiceSelect.addEventListener("change", () => {
    const sort = sortServiceSelect.value;

    if (sort === "price-asc") {
      filteredServices.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filteredServices.sort((a, b) => b.price - a.price);
    } else if (sort === "time-asc") {
      filteredServices.sort((a, b) => a.time - b.time);
    }

    renderServices(filteredServices);
  });
}

//charger donnes f demarrraage
fetchServicesData("/services/services.json");