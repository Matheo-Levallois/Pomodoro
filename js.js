

const timerElement = document.getElementById("timer")




function lancer(){
    
    let temps = 0.2 * 60
    let tempsTravail = true
    travail.style.color = 'green';
  pause.style.color = 'red';


  setInterval(() => {
   
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)
  
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
  
    timerElement.innerText = `${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1

    if (temps <= 0 && tempsTravail) {
      tempsTravail = false;
      temps = 0.2*60;
      console.log("repos");
      pause.style.color = 'green';
      travail.style.color = 'red';


    }
    if (temps <= 0 && !tempsTravail) {
      tempsTravail = true;
      temps = 0.5*60;
      console.log("travail");
      travail.style.color = 'green';
      pause.style.color = 'red';
    }
  
  }, 1000)


}

      const bouton = document.getElementById("bouton");
      let chronoLancer = false;
      bouton.addEventListener('click', () => {

  if (!chronoLancer) {
    lancer();
    chronoLancer = true;
    bouton.innerText = "recommencer";
  }
  else {
    location.reload();
    chronoLancer = false;

  }
})