
//initialisation de toute les constantes
const tempsTravail = document.getElementById("work");
const tempsRepos = document.getElementById("break")
const tempsGrandRepos = document.getElementById("bigBreak")
const timerElement = document.getElementById("timer");
const pause = document.getElementById('pause');
const travail = document.getElementById('travail');
const bouton = document.getElementById("bouton");
const reset = document.getElementById("reset")
let chronoLancer = false;


localStorageWork();
localStorageBreak();
localStorageBigBreak();

//met à jour le timer directemnt depuis la sélection du temps de travail
tempsTravail.addEventListener("input", function () {
  timerElement.textContent = tempsTravail.value;
});

// réinitialise les valeurs par défaut lorsque l'on presse le bouton reset
reset.addEventListener('click', () => {

  tempsTravail.value = "00:25:00";
  tempsRepos.value = "00:05:00";
  tempsGrandRepos.value = "00:20:00";

})

// lance le timer lorsque l'on presse le bouton start  
bouton.addEventListener('click', () => {

  if (!chronoLancer) {
    lancer(tempsTravail.value, tempsRepos.value, tempsGrandRepos.value);
    chronoLancer = true;
    bouton.className = "fa-solid fa-rotate-right";
  }
  else {
    location.reload();
    chronoLancer = false;

  }
})

//Fontion permettant de stocker le temps du travail  
function localStorageWork() {

  if (localStorage.getItem("myTimeWork") != null) {

    tempsTravail.value = localStorage.getItem("myTimeWork");
    timerElement.innerText = localStorage.getItem("myTimeWork");//affiche en direct le temps du travail dans le timer
    console.log("ok");
  }
  else {
    tempsTravail.value = "00:25:00";//valeur par défaut
    console.log("ko")

  }

}

//Fontion permettant de stocker le temps de la pause  
function localStorageBreak() {

  if (localStorage.getItem("myTimeBreak") != null) {

    tempsRepos.value = localStorage.getItem("myTimeBreak");
    console.log("ok");
  }
  else {
    tempsRepos.value = "00:05:00";//valeur par défaut
    console.log("ko")

  }

}


//Fontion permettant de stocker le temps de la grande pause  
function localStorageBigBreak() {

  if (localStorage.getItem("myTimeBigBreak") != null) {

    tempsGrandRepos.value = localStorage.getItem("myTimeBigBreak");
    console.log("ok");
  }
  else {
    tempsGrandRepos.value = "00:20:00";//valeur par défaut
    console.log("ko")

  }

}


/**
 * 
 * @param {*} time mon horaire
 * @returns mon Horaire de forme 'hh:mm:ss' en seconde
 */

function converter(time) {
  tab = time.split(':');
  let heure = tab[0];
  let minutes = tab[1];
  let secondes = tab[2];
  return parseInt(heure * 3600) + parseInt(minutes * 60) + parseInt(secondes);
}



/**
 * 
 * @param {*} work  mon horaire travail
 * @param {*} rest  mon horaire de pause
 * @param {*} bigRest mon horaire de grande pause
 */
//lance le chronomètre et actualise le timer avec les horaire choisit
function lancer(work, rest, bigRest) {

  localStorage.setItem("myTimeWork", document.getElementById("work").value);//stocke mon temps travail 
  localStorage.setItem("myTimeBreak", document.getElementById("break").value);//stocke mon temps repos 
  localStorage.setItem("myTimeBigBreak", document.getElementById("bigBreak").value);//stocke mon temps grand repos 

  console.log(localStorage.getItem("myTimeWork"))
  console.log(localStorage.getItem("myTimeBreak"))
  console.log(localStorage.getItem("myTimeBigBreak"))

  let cycle = 1;
  let tempsTravail = true
  let temps = converter(work);
  console.log(temps);
  

  setInterval(() => {


    let heures = parseInt(temps / 3600, 10)
    let minutes = parseInt(temps / 60 - heures * 60, 10)
    let secondes = parseInt(temps % 60, 10)

    heures = heures < 10 ? "0" + heures : heures
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerElement.innerText = `${heures}:${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1
    //teste si le timer doit basculer en grand repos
    if (temps <= 0 && tempsTravail && cycle == 4) {
      tempsTravail = false;
      temps = converter(bigRest);
      console.log("repos");
      cycle = 1;
      travail.style.display = "none";
      pause.style.display = "block";

    }
    //teste si le timer doit basculer en repos
    if (temps <= 0 && tempsTravail && cycle != 4) {
      tempsTravail = false;
      temps = converter(rest);
      console.log("repos");
      travail.style.display = "none"
      pause.style.display = "block";



    }
    //teste si le timer doit basculer en travail
    if (temps <= 0 && !tempsTravail) {
      tempsTravail = true;
      temps = converter(work);
      console.log("travail");
      travail.style.display = "block";
      pause.style.display = "none";
      cycle++;

    }


  }, 10)
}

