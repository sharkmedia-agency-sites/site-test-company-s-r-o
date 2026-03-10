/* ============================================
   VYBAGRUJEMSB.SK - Content Loader & Animations
   Vanilla JS - No frameworks
   ============================================ */

// SVG Icon Library
const ICONS = {
  foundation: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V2"/><path d="M2 10h20"/><path d="M6 18v4"/><path d="M18 18v4"/></svg>',
  pipe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 5h20"/><path d="M3 3v4"/><path d="M7 3v4"/><path d="M17 3v4"/><path d="M21 3v4"/><path d="M5 19h14"/></svg>',
  terrain: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  demolition: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  truck: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 13.52 9H12V18m3 0a3 3 0 1 1-6 0m12 0a3 3 0 1 1-6 0"/></svg>',
  precision: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  shovel: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l6-6"/><path d="M8.5 15.5l2-2"/><path d="M14 11l-3-3"/><path d="M11 8l5-5a2.83 2.83 0 1 1 4 4l-5 5"/></svg>',
  level: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 12h22"/><circle cx="12" cy="12" r="2"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  building: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  quote: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>'
};

// ============================================
// Content Loading
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(res => res.json())
    .then(data => {
      const sections = data.sections.sort((a, b) => a.order - b.order);
      sections.forEach(section => renderSection(section));
      initAnimations();
      initNavigation();
      initMobileMenu();
      initContactForm();
      initCounters();
      
      // Trigger Hero animations immediately after render
      setTimeout(() => {
        document.querySelectorAll('.hero-section .fade-up').forEach(el => {
          el.classList.add('visible');
        });
      }, 50);
    })
    .catch(err => console.error('Error loading content:', err));
});

// ============================================
// Section Renderers
// ============================================
function renderSection(section) {
  const container = document.getElementById(section.id);
  if (!container) return;

  const fields = section.fields;

  switch (section.type) {
    case 'navigation':
      renderNavigation(container, section);
      break;
    case 'hero':
      renderHero(container, section);
      break;
    case 'about':
      renderAbout(container, section);
      break;
    case 'services_grid':
      renderServices(container, section);
      break;
    case 'features':
      renderFeatures(container, section);
      break;
    case 'gallery':
      renderGallery(container, section);
      break;
    case 'stats':
      renderStats(container, section);
      break;
    case 'cta_banner':
      renderCTA(container, section);
      break;
    case 'testimonials':
      renderTestimonials(container, section);
      break;
    case 'service_area':
      renderServiceArea(container, section);
      break;
    case 'contact':
      renderContact(container, section);
      break;
    case 'footer':
      renderFooter(container, section);
      break;
    default:
      renderGeneric(container, section);
  }
}

function renderNavigation(container, section) {
  const f = section.fields;
  const linksHtml = f.links.map(link =>
    `<a href="${link.url}" data-section="${section.id}" data-field="links" data-item="${link.id}">${link.label}</a>`
  ).join('');

  container.innerHTML = `
    <div class="container">
      <a href="#hero_1" class="nav-logo" data-section="${section.id}" data-field="logo_image">
        <img src="${f.logo_image}" alt="${f.logo_text}${f.logo_highlight}" class="nav-logo-img">
      </a>
      <div class="nav-links" id="nav-links">
        ${linksHtml}
      </div>
      <a href="tel:${f.phone}" class="nav-phone" data-section="${section.id}" data-field="phone">
        ${ICONS.phone}
        <span>${f.phone}</span>
      </a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
}

function renderHero(container, section) {
  const f = section.fields;
  container.innerHTML = `
    <div class="hero-bg">
      <img src="${f.background_image}" alt="Hero background" data-section="${section.id}" data-field="background_image">
    </div>
    <div class="container">
      <div class="hero-content">
        <h1 class="fade-up" data-section="${section.id}" data-field="headline">${f.headline}</h1>
        <p class="fade-up" style="transition-delay: 0.1s" data-section="${section.id}" data-field="subheadline">${f.subheadline}</p>
        <div class="hero-buttons fade-up" style="transition-delay: 0.2s">
          <a href="${f.cta_url}" class="btn btn-primary" data-section="${section.id}" data-field="cta_text">
            ${ICONS.phone} ${f.cta_text}
          </a>
          <a href="${f.cta_secondary_url}" class="btn btn-outline" data-section="${section.id}" data-field="cta_secondary_text">
            ${f.cta_secondary_text} ${ICONS.chevronRight}
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderAbout(container, section) {
  const f = section.fields;
  container.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-image animate-on-scroll">
          <img src="${f.image}" alt="O nás" loading="lazy" data-section="${section.id}" data-field="image">
          <div class="about-badge">
            <span class="number" data-section="${section.id}" data-field="experience_years">${f.experience_years}</span>
            <span class="label" data-section="${section.id}" data-field="experience_label">${f.experience_label}</span>
          </div>
        </div>
        <div class="about-text animate-on-scroll">
          <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
          <span class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</span>
          <p data-section="${section.id}" data-field="text">${f.text}</p>
          <p data-section="${section.id}" data-field="text_2">${f.text_2}</p>
        </div>
      </div>
    </div>
  `;
}

function renderServices(container, section) {
  const f = section.fields;
  const cardsHtml = f.items.map(item => `
    <div class="service-card stagger-item" data-section="${section.id}" data-field="items" data-item="${item.id}">
      <div class="service-card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" data-field="image">
      </div>
      <div class="service-card-body">
        <div class="service-card-icon">${ICONS[item.icon] || ICONS.foundation}</div>
        <h3 data-field="title">${item.title}</h3>
        <p data-field="description">${item.description}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="services-grid stagger-children animate-on-scroll">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function renderFeatures(container, section) {
  const f = section.fields;
  const specsHtml = f.specs.map(spec => `
    <tr data-section="${section.id}" data-field="specs" data-item="${spec.id}">
      <td data-field="label">${spec.label}</td>
      <td data-field="value">${spec.value}</td>
    </tr>
  `).join('');

  const accessoriesHtml = f.accessories.map(acc => `
    <div class="accessory-card" data-section="${section.id}" data-field="accessories" data-item="${acc.id}">
      <div class="accessory-icon">${ICONS[acc.icon] || ICONS.shovel}</div>
      <div>
        <h4 data-field="title">${acc.title}</h4>
        <p data-field="description">${acc.description}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="features-layout">
        <div class="features-image animate-on-scroll">
          <img src="${f.machine_image}" alt="${f.machine_name}" loading="lazy" data-section="${section.id}" data-field="machine_image">
          <div class="machine-name-badge" data-section="${section.id}" data-field="machine_name">${f.machine_name}</div>
        </div>
        <div class="features-info animate-on-scroll">
          <p class="features-description" data-section="${section.id}" data-field="machine_description">${f.machine_description}</p>
          <table class="specs-table">
            <tbody>${specsHtml}</tbody>
          </table>
          <h3>Príslušenstvo</h3>
          <div class="accessories-grid">
            ${accessoriesHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGallery(container, section) {
  const f = section.fields;
  const itemsHtml = f.items.map(item => `
    <div class="gallery-item stagger-item" data-section="${section.id}" data-field="items" data-item="${item.id}">
      <img src="${item.image}" alt="${item.caption}" loading="lazy" data-field="image">
      <div class="gallery-caption" data-field="caption">${item.caption}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="gallery-grid stagger-children animate-on-scroll">
        ${itemsHtml}
      </div>
    </div>
  `;
}

function renderStats(container, section) {
  const f = section.fields;
  const itemsHtml = f.items.map(item => `
    <div class="stat-item stagger-item" data-section="${section.id}" data-field="items" data-item="${item.id}">
      <div class="stat-value">
        <span class="counter" data-target="${item.value}">0</span><span class="stat-suffix" data-field="suffix">${item.suffix}</span>
      </div>
      <div class="stat-label" data-field="label">${item.label}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
      </div>
      <div class="stats-grid stagger-children animate-on-scroll" id="stats-grid">
        ${itemsHtml}
      </div>
    </div>
  `;
}

function renderCTA(container, section) {
  const f = section.fields;
  container.innerHTML = `
    <div class="cta-bg">
      <img src="${f.background_image}" alt="" data-section="${section.id}" data-field="background_image">
    </div>
    <div class="container animate-on-scroll">
      <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
      <p data-section="${section.id}" data-field="text">${f.text}</p>
      <a href="${f.cta_url}" class="btn btn-primary" data-section="${section.id}" data-field="cta_text">
        ${ICONS.phone} ${f.cta_text}
      </a>
    </div>
  `;
}

function renderTestimonials(container, section) {
  const f = section.fields;
  const cardsHtml = f.items.map(item => {
    const starsHtml = Array(item.rating).fill(ICONS.star).join('');
    const initial = item.name.charAt(0).toUpperCase();
    return `
      <div class="testimonial-card stagger-item" data-section="${section.id}" data-field="items" data-item="${item.id}">
        <div class="quote-icon">${ICONS.quote}</div>
        <div class="testimonial-stars">${starsHtml}</div>
        <p class="testimonial-text" data-field="text">${item.text}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${initial}</div>
          <div class="testimonial-author-info">
            <h4 data-field="name">${item.name}</h4>
            <span data-field="role">${item.role}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="testimonials-grid stagger-children animate-on-scroll">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function renderServiceArea(container, section) {
  const f = section.fields;
  const areasHtml = f.areas.map(area => `
    <div class="area-tag" data-section="${section.id}" data-field="areas" data-item="${area.id}">
      ${ICONS.mapPin}
      <span data-field="name">${area.name}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="service-area-layout">
        <div class="service-area-info animate-on-scroll">
          <p data-section="${section.id}" data-field="text">${f.text}</p>
          <div class="areas-list">
            ${areasHtml}
          </div>
        </div>
        <div class="service-area-map animate-on-scroll">
          <iframe src="${f.map_embed_url}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-section="${section.id}" data-field="map_embed_url"></iframe>
        </div>
      </div>
    </div>
  `;
}

function renderContact(container, section) {
  const f = section.fields;
  container.innerHTML = `
    <div class="container">
      <div class="section-header animate-on-scroll">
        <h2 data-section="${section.id}" data-field="headline">${f.headline}</h2>
        <p class="subtitle" data-section="${section.id}" data-field="subtitle">${f.subtitle}</p>
      </div>
      <div class="contact-layout">
        <div class="contact-info-card animate-on-scroll">
          <h3 data-section="${section.id}" data-field="owner_name">${f.owner_name}</h3>
          <span class="contact-role" data-section="${section.id}" data-field="owner_role">${f.owner_role}</span>
          <div class="contact-item">
            <div class="contact-item-icon">${ICONS.phone}</div>
            <div class="contact-item-text">
              <span class="label">Telefon</span>
              <a href="tel:+421918232437" class="value" data-section="${section.id}" data-field="phone">${f.phone}</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-item-icon">${ICONS.mail}</div>
            <div class="contact-item-text">
              <span class="label">E-mail</span>
              <a href="mailto:${f.email}" class="value" data-section="${section.id}" data-field="email">${f.email}</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-item-icon">${ICONS.mapPin}</div>
            <div class="contact-item-text">
              <span class="label">Adresa</span>
              <span class="value" data-section="${section.id}" data-field="address">${f.address}</span>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-item-icon">${ICONS.building}</div>
            <div class="contact-item-text">
              <span class="label">Firma</span>
              <span class="value" data-section="${section.id}" data-field="company">${f.company}</span>
              <br><span style="font-size:0.8rem;opacity:0.7">ICO: ${f.ico} | DIC: ${f.dic}</span>
            </div>
          </div>
          <div class="contact-social" id="contact-social"></div>
        </div>
        <div class="contact-form animate-on-scroll">
          <h3>Napiste nam</h3>
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="cf-name">Meno</label>
                <input type="text" id="cf-name" name="name" placeholder="Vase meno" required>
              </div>
              <div class="form-group">
                <label for="cf-surname">Priezvisko</label>
                <input type="text" id="cf-surname" name="surname" placeholder="Vase priezvisko">
              </div>
            </div>
            <div class="form-group">
              <label for="cf-phone">Telefon</label>
              <input type="tel" id="cf-phone" name="phone" placeholder="+421 ...">
            </div>
            <div class="form-group">
              <label for="cf-email">E-mail</label>
              <input type="email" id="cf-email" name="email" placeholder="vas@email.sk" required>
            </div>
            <div class="form-group">
              <label for="cf-message">Sprava</label>
              <textarea id="cf-message" name="message" placeholder="Napiste nam vasu otazku alebo spravu..." required></textarea>
            </div>
            <button type="submit" class="btn-submit">Odoslat spravu</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderFooter(container, section) {
  const f = section.fields;
  const linksHtml = f.links.map(link =>
    `<li><a href="${link.url}" data-section="${section.id}" data-field="links" data-item="${link.id}">${link.label}</a></li>`
  ).join('');

  const socialHtml = f.social.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener noreferrer" data-section="${section.id}" data-field="social" data-item="${s.id}" aria-label="${s.platform}">${ICONS[s.platform] || ''}</a>`
  ).join('');

  container.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#hero_1" class="nav-logo"><img src="images/logo.png" alt="Vybagrujemsb.sk" class="footer-logo-img"></a>
          <p>Profesionalne zemne a vykopove prace v okresoch Presov a Sabinov.</p>
        </div>
        <div class="footer-links">
          <h4>Navigacia</h4>
          <ul>${linksHtml}</ul>
        </div>
        <div class="footer-social-col">
          <h4>Sledujte nas</h4>
          <div class="footer-social-icons">${socialHtml}</div>
        </div>
      </div>
      <div class="footer-bottom">
        <p data-section="${section.id}" data-field="copyright_text">${f.copyright_text}</p>
      </div>
    </div>
  `;
}

function renderGeneric(container, section) {
  // Fallback renderer for unknown section types
  Object.entries(section.fields).forEach(([key, value]) => {
    if (typeof value === 'string') {
      const el = container.querySelector(`[data-field="${key}"]`);
      if (el) {
        if (el.tagName === 'IMG') el.src = value;
        else el.textContent = value;
      }
    }
  });
}

// ============================================
// Animations
// ============================================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth scroll for all nav links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 72;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

      // Close mobile menu if open
      const navLinks = document.getElementById('nav-links');
      const hamburger = document.getElementById('hamburger');
      if (navLinks) navLinks.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Odosielam...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Odoslane!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2000);
    }, 1000);
  });
}

// ============================================
// Stat Counters
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countersInView = entry.target.querySelectorAll('.counter');
        countersInView.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          animateCounter(counter, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.getElementById('stats-grid');
  if (statsGrid) statsObserver.observe(statsGrid);
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  function update() {
    current += step;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = Math.floor(current);
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
