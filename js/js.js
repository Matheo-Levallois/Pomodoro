function converter(time) {
  tab = time.split(':');
  let heure = tab[0];
  let minutes = tab[1];
  let secondes = tab[2];
  console.log(heure);
  console.log(minutes);
  console.log(secondes);
  return parseInt(heure * 3600) + parseInt(minutes * 60) + parseInt(secondes);



  
}

function lancer(work , rest) {
  localStorage.setItem("myTimeWork", document.getElementById("work").value);
  console.log(localStorage.getItem("myTimeWork"))
const timerElement = document.getElementById("timer");

let tempsTravail = true

let temps = converter(work);
console.log(temps);
let pause = document.getElementById('pause');
let travail = document.getElementById('travail');
travail.style.color = 'white';
pause.style.color = "#8d3486";



setInterval(() => {
    
  
  let heures = parseInt(temps /3600, 10)
  let minutes = parseInt(temps/60 - heures * 60, 10)
  let secondes = parseInt(temps % 60, 10)

  heures = heures < 10 ? "0" + heures : heures
  minutes = minutes < 10 ? "0" + minutes : minutes
  secondes = secondes < 10 ? "0" + secondes : secondes

  timerElement.innerText = `${heures}:${minutes}:${secondes}`
  temps = temps <= 0 ? 0 : temps - 1

  if (temps <= 0 && tempsTravail) {
    tempsTravail = false;
    temps = converter(rest);
    console.log("repos");
    pause.style.color = 'white';
    travail.style.color = "#8d3486";


  }
  if (temps <= 0 && !tempsTravail) {
    tempsTravail = true;
    temps = converter(work);
    console.log("travail");
    travail.style.color = 'white';
    pause.style.color = "#8d3486";

  }

}, 10)
}

const tempsTravail = document.getElementById("work");
const tempsRepos = document.getElementById("break")
const timer = document.getElementById("timer");

timer.innerText = tempsTravail.value;



tempsTravail.addEventListener("input", function () {
timer.textContent = tempsTravail.value;
});


  

const bouton = document.getElementById("bouton");
let chronoLancer = false;


bouton.addEventListener('click', () => {

if (!chronoLancer) {
  lancer(tempsTravail.value, tempsRepos.value);
  chronoLancer = true;
  bouton.className = "fa-solid fa-rotate-right";
}
else {
  location.reload();
  chronoLancer = false;

}
})

if(localStorage.getItem("myTimeWork") != null){

  document.getElementById("work") = localStorage.getItem("myTimeWork").value;
}