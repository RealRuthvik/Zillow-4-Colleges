// ========================================
// LANDING PAGE (v3) — Dropdown search, improved footer
// ========================================

import { COLLEGES } from './data.js';
import { createCollegeCard, tierBadgeHTML } from './components.js';

/**
 * Render the full landing page
 */
export function renderLanding(container) {
  container.innerHTML = '';
  container.className = 'page landing page-enter';

  // -- HERO --
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <div class="hero__title-wrap animate-slam">
      <h1 class="hero__title">EXPOSE THE <span>TRUTH</span></h1>
    </div>
    <p class="hero__subtitle animate-fade-up stagger-2">Stop believing brochures. See real placement data.</p>
    <div class="hero__search-wrap animate-fade-up stagger-3">
      <div class="search-bar" id="search-bar">
        <input 
          type="text" 
          class="search-bar__input" 
          id="search-input"
          placeholder="Search colleges..." 
          autocomplete="off"
        />
        <span class="search-bar__icon">⌕</span>
      </div>
      <div class="search-dropdown" id="search-dropdown"></div>
    </div>
  `;
  container.appendChild(hero);

  // -- RECENTLY SEARCHED SECTION --
  const section = document.createElement('section');
  section.className = 'recently-searched';
  section.innerHTML = `
    <div class="recently-searched__header animate-slide-left">
      <h2 class="recently-searched__title">Most Searched</h2>
      <div class="recently-searched__line"></div>
    </div>
  `;

  const cardGrid = document.createElement('div');
  cardGrid.className = 'card-grid';
  cardGrid.id = 'card-grid';
  section.appendChild(cardGrid);
  container.appendChild(section);

  // -- FOOTER --
  const footer = document.createElement('footer');
  footer.className = 'page-footer animate-fade-up';
  footer.innerHTML = `
    <div class="page-footer__heart">♥</div>
    <p class="page-footer__tagline">Made for students, by students.</p>
    <p class="page-footer__honesty">Every number on this platform is crowd-sourced, unverified, and shown as-is.<br/>No data is altered. No college pays us. Transparency is the only agenda.</p>
    <p class="page-footer__disclaimer">ALL DATA IS CROWD-SOURCED & UNVERIFIED · FOR AWARENESS ONLY</p>
  `;
  container.appendChild(footer);

  // Render cards (always show all, sorted by search count — never filtered)
  renderCards(cardGrid);

  // Search dropdown handler
  const searchInput = hero.querySelector('#search-input');
  const dropdown = hero.querySelector('#search-dropdown');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    renderDropdown(dropdown, query);
  });

  searchInput.addEventListener('focus', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) renderDropdown(dropdown, query);
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hero__search-wrap')) {
      dropdown.classList.remove('search-dropdown--open');
    }
  });

  // Focus search on page load
  setTimeout(() => searchInput.focus(), 500);
}

/**
 * Render dropdown results
 */
function renderDropdown(dropdown, query) {
  if (!query || query.length < 1) {
    dropdown.classList.remove('search-dropdown--open');
    dropdown.innerHTML = '';
    return;
  }

  const matches = COLLEGES.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.shortName.toLowerCase().includes(query) ||
    c.location.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="search-dropdown__empty">
        <div class="search-dropdown__empty-icon">🔍</div>
        <div class="search-dropdown__empty-text">No colleges found for "${query}"</div>
        <div class="search-dropdown__empty-cta">
          Know about this college? <a href="#/submit" class="search-dropdown__submit-link">Submit information</a>
        </div>
      </div>
    `;
    dropdown.classList.add('search-dropdown--open');
    return;
  }

  dropdown.innerHTML = matches.map(c => `
    <div class="search-dropdown__item" data-id="${c.id}">
      <div class="search-dropdown__item-left">
        <div class="search-dropdown__item-name">${c.name}</div>
        <div class="search-dropdown__item-location">📍 ${c.location}</div>
      </div>
      <div class="search-dropdown__item-right">
        ${tierBadgeHTML(c.trustScore, 'sm')}
      </div>
    </div>
  `).join('');

  dropdown.classList.add('search-dropdown--open');

  // Click handlers
  dropdown.querySelectorAll('.search-dropdown__item').forEach(item => {
    item.addEventListener('click', () => {
      window.location.hash = `#/college/${item.dataset.id}`;
    });
  });
}

/**
 * Render college cards (always full list, never filtered by search)
 */
function renderCards(grid) {
  grid.innerHTML = '';

  const sorted = [...COLLEGES].sort((a, b) => b.searchCount - a.searchCount);

  sorted.forEach((college, i) => {
    const card = createCollegeCard(college, i);
    grid.appendChild(card);
  });
}
