// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class when scrolling down
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero && currentScroll < window.innerHeight) {
    const slideshow = hero.querySelector('.slideshow');
    if (slideshow) {
      const parallaxSpeed = currentScroll * 0.5;
      slideshow.style.transform = `translateY(${parallaxSpeed}px)`;
    }
    
    // Fade out scroll indicator as user scrolls
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - (currentScroll / 300));
      scrollIndicator.style.opacity = opacity;
    }
  }
  
  lastScroll = currentScroll;
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const mobileLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Update desktop nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
      
      // Update mobile nav links
      mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Handle home section (when at top of page)
  if (scrollY < 100) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#home') {
        link.classList.add('active');
      }
    });
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#home') {
        link.classList.add('active');
      }
    });
  }
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      let target;
      let offsetTop;
      
      if (href === '#home') {
        offsetTop = 0;
      } else {
        target = document.querySelector(href);
        if (target) {
          offsetTop = target.offsetTop - 80;
        } else {
          return;
        }
      }
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobileMenu");
      const hamburger = document.querySelector('.hamburger');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.textContent = '☰';
      }
    }
  });
});

// Mobile menu toggle with animation
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector('.hamburger');
  
  mobileMenu.classList.toggle('active');
  
  // Change hamburger icon
  if (mobileMenu.classList.contains('active')) {
    hamburger.textContent = '✕';
    hamburger.style.transform = 'rotate(0deg)';
  } else {
    hamburger.textContent = '☰';
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector('.hamburger');
  
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('active');
      hamburger.textContent = '☰';
    }
  }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector('.hamburger');
  
  if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    hamburger.textContent = '☰';
  }
});

// Logo click scroll to top
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Hero Slideshow with manual controls
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function updateSlide() {
  // Remove active class from all slides and indicators
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (indicators[index]) {
      indicators[index].classList.remove('active');
    }
  });
  
  // Add active class to current slide and indicator
  slides[currentSlide].classList.add('active');
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add('active');
  }
}

function changeSlide(direction) {
  currentSlide += direction;
  
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  
  updateSlide();
  resetSlideInterval();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlide();
  resetSlideInterval();
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Initialize slideshow
if (slides.length > 0) {
  updateSlide();
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
  
  // Pause on hover
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    slideshow.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slideshow.addEventListener('mouseleave', () => {
      resetSlideInterval();
    });
  }
  
  // Keyboard navigation (only when hero section is in view)
  document.addEventListener('keydown', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (isInView) {
        if (e.key === 'ArrowLeft') {
          changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
          changeSlide(1);
        }
      }
    }
  });
}

// Scroll indicator click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const offsetTop = aboutSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
  
  scrollIndicator.style.cursor = 'pointer';
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger counter animation for stats
      if (entry.target.classList.contains('stat-card')) {
        const counter = entry.target.querySelector('.counter');
        const target = parseInt(entry.target.getAttribute('data-target'));
        if (counter && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(counter, target);
        }
      }
    }
  });
}, observerOptions);

// Observe fade-in text elements
document.querySelectorAll('.fade-in-text').forEach(el => {
  observer.observe(el);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(el => {
  observer.observe(el);
});

// Observe feature items
document.querySelectorAll('.feature-item').forEach(el => {
  observer.observe(el);
});

// Observe music cards
document.querySelectorAll('.music-card').forEach(el => {
  observer.observe(el);
});

// Observe event cards
document.querySelectorAll('.event-card').forEach(el => {
  observer.observe(el);
});

// Countdown for mystery event
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
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
}

