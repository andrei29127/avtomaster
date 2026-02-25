// ===== DOM Elements =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const vinInput = contactForm.querySelector('input[name="vin"]');
const vinCount = document.querySelector('.vin-count');
const vinHint = document.querySelector('.hint-text');
const faqItems = document.querySelectorAll('.faq-item');

// ===== Mobile Menu =====
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// ===== FAQ Accordion =====
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
  });
});

// ===== VIN Validation =====
const validateVin = (vin) => {
  if (!vin) return 'VIN обязателен для заполнения';
  if (vin.length !== 17) return 'VIN должен содержать ровно 17 символов';
  if (!/^[A-HJ-NPR-Z0-9]+$/i.test(vin)) return 'VIN может содержать только латинские буквы (кроме I, O, Q) и цифры';
  return '';
};

// VIN input formatting
vinInput.addEventListener('input', (e) => {
  // Convert to uppercase and remove invalid characters
  let value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi, '');
  e.target.value = value;
  
  // Update counter
  vinCount.textContent = `${value.length}/17`;
  
  // Update counter color
  if (value.length === 17) {
    vinCount.classList.add('valid');
  } else {
    vinCount.classList.remove('valid');
  }
  
  // Clear error state
  vinInput.classList.remove('error');
  if (vinHint.classList.contains('error-text')) {
    vinHint.classList.remove('error-text');
    vinHint.textContent = '17 символов (латинские буквы и цифры)';
  }
});

// ===== Form Submission =====
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const vin = formData.get('vin');
  
  // Validate VIN
  const vinError = validateVin(vin);
  if (vinError) {
    vinInput.classList.add('error');
    vinHint.classList.add('error-text');
    vinHint.textContent = vinError;
    return;
  }
  
  // Get submit button
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnArrow = submitBtn.querySelector('.arrow-icon');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Show loading state
  btnText.classList.add('hidden');
  btnArrow.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  submitBtn.disabled = true;
  
  try {
    // Simulate API call (replace with actual endpoint)
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        phone: formData.get('phone'),
        vin: formData.get('vin'),
        service: formData.get('service'),
        message: formData.get('message'),
      }),
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      // Show success message
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        vinCount.textContent = '0/17';
        vinCount.classList.remove('valid');
        contactForm.classList.remove('hidden');
        formSuccess.classList.add('hidden');
      }, 3000);
    } else {
      alert(result.error || 'Ошибка при отправке заявки. Попробуйте позвонить нам.');
    }
  } catch (error) {
    console.error('Submit error:', error);
    alert('Ошибка соединения. Попробуйте позвонить нам: +7 (978) 088-41-06');
  } finally {
    // Reset button state
    btnText.classList.remove('hidden');
    btnArrow.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Background on Scroll =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== Phone Number Formatting =====
const phoneInput = contactForm.querySelector('input[name="phone"]');

phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  
  // Format as +7 (XXX) XXX-XX-XX
  if (value.length > 0) {
    if (value[0] === '8') {
      value = '7' + value.slice(1);
    }
    if (value[0] !== '7') {
      value = '7' + value;
    }
    
    let formatted = '+7';
    if (value.length > 1) {
      formatted += ' (' + value.slice(1, 4);
    }
    if (value.length > 4) {
      formatted += ') ' + value.slice(4, 7);
    }
    if (value.length > 7) {
      formatted += '-' + value.slice(7, 9);
    }
    if (value.length > 9) {
      formatted += '-' + value.slice(9, 11);
    }
    
    e.target.value = formatted;
  }
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .advantage-card, .review-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== Console Log =====
console.log('АвтоМастер - Сайт загружен успешно!');
