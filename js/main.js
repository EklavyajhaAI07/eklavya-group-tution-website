// ===================================
// EKLAVYA GROUP TUTION - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initBackToTop();
  initFormHandling();

  // Load dynamic content from JSON files
  loadAchievements();
  loadFaculty();
  loadEvents();
});

// ===================================
// DYNAMIC CONTENT LOADING
// ===================================

// Load Achievements from JSON
async function loadAchievements() {
  try {
    const response = await fetch('data/achievements.json');
    const data = await response.json();

    // Update stats
    if (data.stats) {
      updateStats(data.stats);
    }

    // Update achievement cards
    if (data.achievements && data.achievements.length > 0) {
      renderAchievements(data.achievements);
    }
  } catch (error) {
    console.log('Using default achievements data');
  }
}

function updateStats(stats) {
  const statElements = {
    studentsCount: document.querySelector('.achievement-stat:nth-child(1) .achievement-stat-number'),
    passRate: document.querySelector('.achievement-stat:nth-child(2) .achievement-stat-number'),
    topScorers: document.querySelector('.achievement-stat:nth-child(3) .achievement-stat-number'),
    jeeSelections: document.querySelector('.achievement-stat:nth-child(4) .achievement-stat-number')
  };

  if (statElements.studentsCount) statElements.studentsCount.textContent = stats.studentsCount;
  if (statElements.passRate) statElements.passRate.textContent = stats.passRate;
  if (statElements.topScorers) statElements.topScorers.textContent = stats.topScorers;
  if (statElements.jeeSelections) statElements.jeeSelections.textContent = stats.jeeSelections;
}

function renderAchievements(achievements) {
  const container = document.querySelector('.achievements-grid');
  if (!container) return;

  container.innerHTML = achievements.map(achievement => `
    <div class="achievement-card reveal">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-content">
        <h4>${achievement.title}</h4>
        <p>${achievement.description}</p>
        <span class="achievement-badge">${achievement.badge}</span>
      </div>
    </div>
  `).join('');

  // Re-initialize scroll reveal for new elements
  initScrollReveal();
}

// Load Faculty from JSON
async function loadFaculty() {
  try {
    const response = await fetch('data/faculty.json');
    const data = await response.json();

    if (data.mainFaculty) {
      updateMainFaculty(data.mainFaculty);
    }

    if (data.otherFaculty && data.otherFaculty.length > 0) {
      renderOtherFaculty(data.otherFaculty);
    }
  } catch (error) {
    console.log('Using default faculty data');
  }
}

function updateMainFaculty(faculty) {
  const nameEl = document.querySelector('.faculty-content h3');
  const titleEl = document.querySelector('.faculty-title');
  const bioEl = document.querySelectorAll('.faculty-bio');

  if (nameEl) nameEl.textContent = faculty.name;
  if (titleEl) titleEl.textContent = faculty.title;
  if (bioEl[0]) bioEl[0].textContent = faculty.bio;
  if (bioEl[1]) bioEl[1].textContent = faculty.bio2;

  // Update image if provided
  if (faculty.image) {
    const imgContainer = document.querySelector('.faculty-main .placeholder-image');
    if (imgContainer) {
      imgContainer.outerHTML = `<img src="${faculty.image}" alt="${faculty.name}" class="faculty-img">`;
    }
  }
}

function renderOtherFaculty(facultyList) {
  const container = document.querySelector('.faculty-grid');
  if (!container) return;

  container.innerHTML = facultyList.map(faculty => `
    <div class="faculty-card">
      <div class="faculty-card-image">
        ${faculty.image ? `<img src="${faculty.image}" alt="${faculty.name}">` : '👨‍🏫'}
      </div>
      <h4>${faculty.name}</h4>
      <span>${faculty.subject}</span>
    </div>
  `).join('');
}

// Load Events and Notices from JSON
async function loadEvents() {
  try {
    const response = await fetch('data/events.json');
    const data = await response.json();

    // Render notices if there are active ones
    if (data.notices && data.notices.filter(n => n.active).length > 0) {
      renderNotices(data.notices.filter(n => n.active));
    }

    // Render events section if there are active events
    if (data.events && data.events.filter(e => e.active).length > 0) {
      renderEvents(data.events.filter(e => e.active));
    }
  } catch (error) {
    console.log('Using default events data');
  }
}

function renderNotices(notices) {
  // Create notices banner if important notices exist
  const importantNotices = notices.filter(n => n.important);
  if (importantNotices.length > 0) {
    const banner = document.createElement('div');
    banner.className = 'notice-banner';
    banner.innerHTML = `
      <div class="container">
        <div class="notice-content">
          <span class="notice-icon">📢</span>
          <span class="notice-text">${importantNotices[0].title}: ${importantNotices[0].description}</span>
          <button class="notice-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);

    // Add some padding to navbar
    document.querySelector('.navbar').style.top = '48px';
    document.documentElement.style.scrollPaddingTop = '128px';
  }
}

function renderEvents(events) {
  // Events section is handled via the Faculty section space or can be added dynamically
  console.log('Events loaded:', events.length);
}

// ===================================
// NAVBAR
// ===================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
      menuToggle.classList.toggle('active');

      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    navbarNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===================================
// FORM HANDLING
// ===================================
function initFormHandling() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = '';
        }
      });

      if (isValid) {
        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Create WhatsApp message with form data
        const message = `New Enquiry from Website:%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AClass: ${data.class}%0AMessage: ${data.message || 'No message'}`;

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/917878891891?text=${message}`, '_blank');

        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#10B981';

        // Reset form
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });

    // Remove error styling on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }
}

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number, .achievement-stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + suffix;
        setTimeout(updateCounter, stepTime);
      } else {
        counter.textContent = target + suffix;
      }
    };

    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

// Initialize counters
document.addEventListener('DOMContentLoaded', animateCounters);
