
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


//-------------cart-profile-dom------
const image_profil=document.getElementById('image_profil');

const btn_voir = document.getElementsByClassName(".mouad")


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
            <button type="button" class="btn btn-primary mouad" data-bs-toggle="modal" data-bs-target="#affich_prf" >Voir</button>
          </div>
        </div>
      </div>` 

      div_row.innerHTML += card
        
    });

}


// add des  options 



// ---------------- filter -----------------------






// --------------- Card-porfile -------------------


 
function AddListFreeLance(){

    ListFreeLence.forEach(element => {

         let card = `  <div class="modal fade" id="affich_prf" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Profil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="  container ">
            <img src="/assets/download (10).jpg" alt="Mouad" id="" class="img-thumbnail avatar mt-2 mb-3 ">

            <h4 class="mb-0 col">Mouad El Amrani</h4>
            <div class="small-muted mb-2 col">Full-Stack Web & Mobile Developer</div>
            <p class="service-rate col">25 EUR / heure</p>
          </div>
          <div>
            <h5 class="mb-1">À propos</h5>
            <p class="small-muted mb-2">
              Développeur full-stack avec 3 ans d'expérience, spécialisé en JavaScript, React, Node.js et Flutter.
              J'aime construire des interfaces propres et des APIs performantes.
            </p>
          </div>

          <div class="mb-3">
            <h6 class="mb-2">Compétences</h6>
            <div>
              <span class="badge bg-primary skill-badge">JavaScript — expert (4 ans)</span>
              <span class="badge bg-primary skill-badge">React — advanced (3 ans)</span>
              <span class="badge bg-primary skill-badge">Node.js — advanced (3 ans)</span>
              <span class="badge bg-primary skill-badge">Flutter — intermediate (2 ans)</span>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">modification </button>
        </div>
      </div>
    </div>
  </div>` 

      div_row.innerHTML += card
        
    });

}
 
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

// list des option 

function optionslist(){

  const option = ["Développeur Web","Designer","Rédacteur","Marketing"];
  for(let i = 0 ; i < option.length ; i++){
    const opt = document.createElement("option");
    opt.textContent = option[i];
    selectFiltre.appendChild(opt);
  }
}
optionslist();

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

