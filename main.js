
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


function AddListFreeLance(){

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
      </div>` 

      div_row.innerHTML += card
        
    });

}

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


 

