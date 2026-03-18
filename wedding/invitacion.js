const weddingDate = new Date("Aug 12, 2026 10:00:00").getTime();

const countdown = setInterval(function(){
const now = new Date().getTime();
const distance = weddingDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

if (distance < 0){
clearInterval(countdown);
document.getElementById("countdown").innerHTML = "¡Hoy es el gran día!";
}
},1000);