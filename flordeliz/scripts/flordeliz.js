const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animateme');
if (hamburgerElement && navElement) {
  hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
  });
}