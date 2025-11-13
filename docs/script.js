function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 4000);

// Countdown for mystery event
const countdownElement = document.getElementById('countdown');
const eventDate = new Date('July 1, 2025 20:00:00 EST').getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    countdownElement.innerText = "LIVE NOW!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

