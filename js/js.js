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

tempsTravail.addEventListener("input", function () {
timerElement.textContent = tempsTravail.value;
});

reset.addEventListener('click', () => {
  
tempsTravail.value = "00:25:00";
tempsRepos.value = "00:05:00";
tempsGrandRepos.value = "00:20:00";

})

  
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


function localStorageWork(){

if(localStorage.getItem("myTimeWork")!= null){

 tempsTravail.value = localStorage.getItem("myTimeWork");
 timerElement.innerText = localStorage.getItem("myTimeWork");
 console.log("ok");
}
else{
  tempsTravail.value = "00:25:00";
  console.log("ko")

}

}


function localStorageBreak(){

  if(localStorage.getItem("myTimeBreak")!= null){

    tempsRepos.value = localStorage.getItem("myTimeBreak");
    console.log("ok");
   }
   else{
    tempsRepos.value = "00:05:00";
     console.log("ko")
   
   }

}



function localStorageBigBreak(){

  if(localStorage.getItem("myTimeBigBreak")!= null){

    tempsGrandRepos.value = localStorage.getItem("myTimeBigBreak");
    console.log("ok");
   }
   else{
    tempsGrandRepos.value = "00:20:00";
     console.log("ko")
   
   }




}









function converter(time) {
  tab = time.split(':');
  let heure = tab[0];
  let minutes = tab[1];
  let secondes = tab[2];
  return parseInt(heure * 3600) + parseInt(minutes * 60) + parseInt(secondes);
}



function lancer(work , rest, bigRest) {

  localStorage.setItem("myTimeWork", document.getElementById("work").value);
  localStorage.setItem("myTimeBreak", document.getElementById("break").value);
  localStorage.setItem("myTimeBigBreak", document.getElementById("bigBreak").value);


  console.log(localStorage.getItem("myTimeWork"))
  console.log(localStorage.getItem("myTimeBreak"))
  console.log(localStorage.getItem("myTimeBigBreak"))








let cycle = 1;
let tempsTravail = true
let temps = converter(work);
console.log(temps);
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
  if(temps <= 0 && tempsTravail && cycle == 4){
    tempsTravail = false;
    temps = converter(bigRest);
    console.log("repos");
    pause.style.color = 'white';
    travail.style.color = "#8d3486";
    cycle = 1;

  }
  if (temps <= 0 && tempsTravail && cycle != 4) {
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
    cycle++;

  }
  

}, 10)
}

