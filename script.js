/* ========================================
   Ideálne stavby — Sharp & Corporate
   Content Loader + Animations + Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(res => res.json())
    .then(data => {
      if (data.theme) applyTheme(data.theme);
      if (data.fonts) applyFonts(data.fonts);

      const currentPage = document.body.dataset.page || 'home';
      const sections = data.sections
        .filter(s => !s.page || s.page === currentPage || s.type === 'navigation' || s.type === 'footer')
        .sort((a, b) => a.order - b.order);

      sections.forEach(section => renderSection(section));

      if (window.lucide) lucide.createIcons();

      initAnimations();
      initNavbar();
      initMobileMenu();
      initSmoothScroll();
      initScrollTopButton();
      initContactForm();
    })
    .catch(err => console.error('Error loading content:', err));
});

/* --- Theme & Fonts --- */
function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace(/_/g, '-')}`, value);
  });
}

function applyFonts(fonts) {
  if (fonts.heading) document.documentElement.style.setProperty('--font-heading', `'${fonts.heading}', sans-serif`);
  if (fonts.body) document.documentElement.style.setProperty('--font-body', `'${fonts.body}', sans-serif`);
}

/* --- Section Router --- */
function renderSection(section) {
  const renderers = {
    navigation: renderNav,
    hero: renderHero,
    about: renderAbout,
    services_grid: renderServicesGrid,
    brands: renderBrands,
    gallery: renderGallery,
    portfolio: renderGallery,
    features: renderFeatures,
    cta_banner: renderCTA,
    contact: renderContact,
    footer: renderFooter
  };
  const renderer = renderers[section.type];
  if (renderer) renderer(section);
}

/* --- Navigation --- */
function renderNav(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'logo_text', f.logo_text);

  const linksDesktop = el.querySelector('.nav-links-desktop');
  const linksMobile = document.querySelector('.mobile-nav-overlay');

  if (linksDesktop && f.links) {
    linksDesktop.innerHTML = '';
    f.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.className = 'text-sm font-semibold text-white/80 hover:text-primary transition-colors duration-300 nav-link-text';
      a.dataset.section = section.id;
      a.dataset.field = 'links';
      a.dataset.item = link.id;
      linksDesktop.appendChild(a);
    });
  }

  if (linksMobile && f.links) {
    linksMobile.innerHTML = '';
    f.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      linksMobile.appendChild(a);
    });
    if (f.cta_text) {
      const ctaMobile = document.createElement('a');
      ctaMobile.href = f.cta_url;
      ctaMobile.textContent = f.cta_text;
      ctaMobile.className = 'mt-4 px-8 py-3 bg-primary text-white font-bold rounded-lg text-lg';
      linksMobile.appendChild(ctaMobile);
    }
  }

  const ctaBtn = el.querySelector('[data-field="cta_text"]');
  if (ctaBtn && f.cta_text) { ctaBtn.textContent = f.cta_text; ctaBtn.href = f.cta_url; }
}

/* --- Hero --- */
function renderHero(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'headline', f.headline);
  setText(el, 'subheadline', f.subheadline);

  // Background image
  const bgImg = el.querySelector('.hero-bg');
  if (bgImg && f.background_image) bgImg.src = f.background_image;

  const cta = el.querySelector('[data-field="cta_text"]');
  if (cta) { cta.textContent = f.cta_text; cta.href = f.cta_url; }

  const ctaSec = el.querySelector('[data-field="cta_secondary_text"]');
  if (ctaSec) { ctaSec.textContent = f.cta_secondary_text; ctaSec.href = f.cta_secondary_url; }
}

/* --- About --- */
function renderAbout(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'label', f.label);
  setText(el, 'headline', f.headline);
  setText(el, 'text', f.text);
  setText(el, 'text_2', f.text_2);
  setImage(el, 'image', f.image);

  const featuresList = el.querySelector('.about-features-list');
  if (featuresList && f.features) {
    featuresList.innerHTML = '';
    f.features.forEach(feat => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-3 stagger-item';
      div.dataset.section = section.id;
      div.dataset.field = 'features';
      div.dataset.item = feat.id;
      div.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <i data-lucide="check" class="w-3.5 h-3.5 text-primary"></i>
        </div>
        <span class="text-dark font-medium">${feat.text}</span>
      `;
      featuresList.appendChild(div);
    });
  }
}

/* --- Services Grid (Bento) --- */
function renderServicesGrid(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'label', f.label);
  setText(el, 'headline', f.headline);
  setText(el, 'subheadline', f.subheadline);

  const grid = el.querySelector('.services-bento-grid');
  if (!grid || !f.items) return;

  grid.innerHTML = '';
  f.items.forEach(item => {
    const card = document.createElement('div');
    const isFeatured = item.featured === true;
    card.className = `service-bento-card stagger-item${isFeatured ? ' featured' : ''}`;
    card.dataset.section = section.id;
    card.dataset.field = 'items';
    card.dataset.item = item.id;

    const iconBg = isFeatured ? 'bg-primary/20' : 'bg-primary/10';
    const titleColor = isFeatured ? 'text-white' : 'text-dark';
    const descColor = isFeatured ? 'text-white/50' : 'text-gray-500';

    card.innerHTML = `
      <div class="w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5 text-primary">
        <i data-lucide="${item.icon}" class="w-6 h-6"></i>
      </div>
      <h3 class="font-heading text-lg font-bold ${titleColor} mb-2" data-field="title">${item.title}</h3>
      <p class="${descColor} text-sm leading-relaxed" data-field="description">${item.description}</p>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

/* --- Brands --- */
function renderBrands(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'headline', f.headline);

  const container = el.querySelector('.brands-container');
  if (!container || !f.items) return;

  container.innerHTML = '';
  f.items.forEach(item => {
    const span = document.createElement('span');
    span.className = 'brand-item stagger-item';
    span.textContent = item.name;
    span.dataset.section = section.id;
    span.dataset.field = 'items';
    span.dataset.item = item.id;
    container.appendChild(span);
  });
}

/* --- Gallery (Collage Grid) --- */
function renderGallery(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'label', f.label);
  setText(el, 'headline', f.headline);
  setText(el, 'subheadline', f.subheadline);

  const grid = el.querySelector('.gallery-grid');
  if (!grid || !f.items) return;

  grid.innerHTML = '';
  f.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-grid-item stagger-item';
    div.dataset.section = section.id;
    div.dataset.field = 'items';
    div.dataset.item = item.id;
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title || ''}" loading="lazy" data-field="image">
    `;
    grid.appendChild(div);
  });
}

/* --- Features (Numbered) --- */
function renderFeatures(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'label', f.label);
  setText(el, 'headline', f.headline);

  const grid = el.querySelector('.features-numbered');
  if (!grid || !f.items) return;

  grid.innerHTML = '';
  f.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feature-numbered-card stagger-item';
    card.dataset.section = section.id;
    card.dataset.field = 'items';
    card.dataset.item = item.id;
    card.innerHTML = `
      <div class="feature-number" data-field="number">${item.number}</div>
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
          <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="font-heading text-lg font-bold text-white" data-field="title">${item.title}</h3>
      </div>
      <p class="text-white/45 text-sm leading-relaxed" data-field="description">${item.description}</p>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

/* --- CTA Banner --- */
function renderCTA(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  const bgImg = el.querySelector('.cta-bg');
  if (bgImg) bgImg.src = f.background_image;

  setText(el, 'headline', f.headline);
  setText(el, 'text', f.text);

  const cta = el.querySelector('[data-field="cta_text"]');
  if (cta) { cta.textContent = f.cta_text; cta.href = f.cta_url; }
}

/* --- Contact --- */
function renderContact(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'label', f.label);
  setText(el, 'headline', f.headline);
  setText(el, 'subheadline', f.subheadline);
  setText(el, 'address', f.address);
  setText(el, 'phone', f.phone);
  setText(el, 'email', f.email);
  setText(el, 'working_hours', f.working_hours);

  setFormField(el, 'name', f.form_name_label, f.form_name_placeholder);
  setFormField(el, 'phone-input', f.form_phone_label, f.form_phone_placeholder);
  setFormField(el, 'email-input', f.form_email_label, f.form_email_placeholder);
  setFormField(el, 'message', f.form_message_label, f.form_message_placeholder);

  const submitBtn = el.querySelector('[data-field="form_submit_text"]');
  if (submitBtn) submitBtn.textContent = f.form_submit_text;
}

/* --- Footer --- */
function renderFooter(section) {
  const el = document.getElementById(section.id);
  if (!el) return;
  const f = section.fields;

  setText(el, 'description', f.description);
  setText(el, 'copyright_text', f.copyright_text);
  setText(el, 'contact_phone', f.contact_phone);
  setText(el, 'contact_email', f.contact_email);
  setText(el, 'contact_address', f.contact_address);

  const linksContainer = el.querySelector('.footer-nav-links');
  if (linksContainer && f.links) {
    linksContainer.innerHTML = '';
    f.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.className = 'text-white/35 hover:text-primary transition-colors duration-300 text-sm';
      a.dataset.section = section.id;
      a.dataset.field = 'links';
      a.dataset.item = link.id;
      linksContainer.appendChild(a);
    });
  }
}

/* --- Helpers --- */
function setText(parent, field, value) {
  if (!value) return;
  const el = parent.querySelector(`[data-field="${field}"]`);
  if (el) el.textContent = value;
}

function setImage(parent, field, value) {
  if (!value) return;
  const el = parent.querySelector(`[data-field="${field}"]`);
  if (el) el.src = value;
}

function setFormField(parent, inputId, label, placeholder) {
  const labelEl = parent.querySelector(`label[for="${inputId}"]`);
  if (labelEl && label) labelEl.textContent = label;
  const inputEl = parent.querySelector(`#${inputId}`);
  if (inputEl && placeholder) inputEl.placeholder = placeholder;
}

/* --- Animations --- */
function initAnimations() {
  const animClasses = ['.fade-up', '.slide-right', '.scale-in', '.stagger-parent'];
  const selector = animClasses.join(',');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('[data-count]').forEach(counter => {
          if (counter.dataset.count) animateCounter(counter);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  if (isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const duration = 2000;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, stepTime);
}

/* --- Navbar scroll --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar-corporate');
  if (!navbar) return;

  const logoWrap = navbar.querySelector('.nav-logo-text');
  const logoSpan = logoWrap ? logoWrap.querySelector('[data-field="logo_text"]') : null;
  const navLinks = navbar.querySelectorAll('.nav-link-text');
  const hamburgerSpans = navbar.querySelectorAll('.hamburger span');

  const onScroll = () => {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('scrolled', scrolled);

    // Switch text colors: white on hero → dark when scrolled
    if (logoSpan) {
      logoSpan.style.color = scrolled ? '#1B1B1F' : '#ffffff';
    }
    navLinks.forEach(link => {
      link.classList.toggle('text-white/80', !scrolled);
      link.classList.toggle('text-dark/70', scrolled);
    });
    hamburgerSpans.forEach(span => {
      span.style.background = scrolled ? '#1B1B1F' : '#ffffff';
    });
  };

  // Re-run after links are rendered by JS
  const observer = new MutationObserver(() => {
    const scrolled = window.scrollY > 60;
    navbar.querySelectorAll('.nav-link-text').forEach(link => {
      link.classList.toggle('text-white/80', !scrolled);
      link.classList.toggle('text-dark/70', scrolled);
    });
    if (logoSpan) logoSpan.style.color = scrolled ? '#1B1B1F' : '#ffffff';
  });
  const linksContainer = navbar.querySelector('.nav-links-desktop');
  if (linksContainer) observer.observe(linksContainer, { childList: true });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* --- Scroll to Top --- */
function initScrollTopButton() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.querySelector('.contact-form-el');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (!data.name || !data.email || !data.message) {
      alert('Prosím vyplňte všetky povinné polia.');
      return;
    }
    console.log('Form submitted:', data);
    alert('Ďakujeme za váš dopyt! Ozveme sa vám čo najskôr.');
    form.reset();
  });
}
