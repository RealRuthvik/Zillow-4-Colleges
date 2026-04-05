import { renderLanding } from './landing.js';
import { renderDetail } from './detail.js';
import { renderExplore } from './explore.js';
import { renderQuestions } from './questions.js';
import { renderSubmit } from './submit.js';
import { renderMethodology } from './methodology.js';
import { renderNotFound } from './notfound.js';

const app = document.getElementById('app');

export function navigateTo(path) {
  window.history.pushState({}, '', path);
  router();
}

function router() {
  const path = window.location.pathname;
  const pageContainer = document.getElementById('page-container');

  if (!pageContainer) return;

  window.scrollTo(0, 0);

  if (path === '/' || path === '') {
    renderLanding(pageContainer);
    updateActiveNav('home');
  } else if (path === '/explore') {
    renderExplore(pageContainer);
    updateActiveNav('explore');
  } else if (path === '/questions') {
    renderQuestions(pageContainer);
    updateActiveNav('questions');
  } else if (path === '/submit') {
    renderSubmit(pageContainer);
    updateActiveNav('');
  } else if (path.startsWith('/methodology')) {
    renderMethodology(pageContainer);
    updateActiveNav('');
  } else if (path.startsWith('/college/')) {
    const collegeId = path.replace('/college/', '');
    renderDetail(pageContainer, collegeId);
    updateActiveNav('');
  } else {
    renderNotFound(pageContainer);
    updateActiveNav('');
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
        <div class="nav__logo" id="nav-logo">COLLEGE<span>UNREDACTED</span></div>
        <div class="nav__links">
          <a class="nav__link nav__link--active" data-nav="home" href="/" data-link>Home</a>
          <a class="nav__link" data-nav="explore" href="/explore" data-link>Explore</a>
          <a class="nav__link" data-nav="questions" href="/questions" data-link>Questions</a>
        </div>
      </div>
      <div class="nav__right">
        <a class="nav__methodology-btn" href="/methodology" data-link>Methodology</a>
        <a class="nav__submit-btn" href="/submit" data-link>SUBMIT / REPORT DATA</a>
      </div>
    </nav>
    <main id="page-container" class="page"></main>
  `;

  document.getElementById('nav-logo').addEventListener('click', () => {
    navigateTo('/');
  });

  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
      e.preventDefault();
      const target = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
      navigateTo(target.getAttribute('href'));
    }
  });

  window.addEventListener('popstate', router);
  router();
}

document.addEventListener('DOMContentLoaded', init);