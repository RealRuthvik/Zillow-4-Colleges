// ========================================
// APP — Router & Initialization (v4)
// ========================================

import { renderLanding } from './landing.js';
import { renderDetail } from './detail.js';
import { renderExplore } from './explore.js';
import { renderQuestions } from './questions.js';
import { renderAdmin } from './admin.js';
import { renderSubmit } from './submit.js';
import { renderMethodology } from './methodology.js';

const app = document.getElementById('app');

function router() {
  const hash = window.location.hash || '#/';
  const pageContainer = document.getElementById('page-container');

  if (hash === '#/' || hash === '' || hash === '#') {
    renderLanding(pageContainer);
    updateActiveNav('home');
  } else if (hash === '#/explore') {
    renderExplore(pageContainer);
    updateActiveNav('explore');
  } else if (hash === '#/questions') {
    renderQuestions(pageContainer);
    updateActiveNav('questions');
  } else if (hash === '#/admin') {
    renderAdmin(pageContainer);
    updateActiveNav('');
  } else if (hash === '#/submit') {
    renderSubmit(pageContainer);
    updateActiveNav('');
  } else if (hash.startsWith('#/methodology')) {
    renderMethodology(pageContainer);
    updateActiveNav('');
  } else if (hash.startsWith('#/college/')) {
    const collegeId = hash.replace('#/college/', '');
    renderDetail(pageContainer, collegeId);
    updateActiveNav('');
  } else {
    renderLanding(pageContainer);
    updateActiveNav('home');
  }
}

function updateActiveNav(active) {
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.toggle('nav__link--active', link.dataset.nav === active);
  });
}

function init() {
  app.innerHTML = `
    <nav class="nav">
      <div class="nav__left">
        <div class="nav__logo" id="nav-logo">COLLEGE<span>EXPOSED</span></div>
        <div class="nav__links">
          <a class="nav__link nav__link--active" data-nav="home" href="#/">Home</a>
          <a class="nav__link" data-nav="explore" href="#/explore">Explore</a>
          <a class="nav__link" data-nav="questions" href="#/questions">Questions</a>
        </div>
      </div>
      <a class="nav__submit-btn" href="#/submit">+ SUBMIT INFO</a>
    </nav>
    <main id="page-container" class="page"></main>
  `;

  document.getElementById('nav-logo').addEventListener('click', () => {
    window.location.hash = '#/';
  });

  window.addEventListener('hashchange', router);
  router();
}

document.addEventListener('DOMContentLoaded', init);
