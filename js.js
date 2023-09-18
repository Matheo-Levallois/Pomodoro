

const timerElement = document.getElementById("timer")




function repos(){
    const tempsRepos = 0.2;
    let temps = tempsRepos * 60

  setInterval(() => {
   
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)
  
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
  
    timerElement.innerText = `${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1

    if(minutes == 0 && secondes == 0){
      console.log("finish repos ");
      commencer();
    }
  
  }, 1000)


}
















function commencer() {
  const travail = 0.1;
  let temps = travail * 60

  setInterval(() => {
   
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)
  
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
  
    timerElement.innerText = `${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1

    if(minutes == 0 && secondes == 0){
      console.log("finish");
      repos();
    }
  
  }, 1000)
  
  
}


 


const bouton = document.querySelectorAll("button");
    for(let i = 0; i < bouton.length; i++){
      bouton[i].addEventListener('click', () => {
      console.log("hello world");
      commencer(0.1);
     


      })}