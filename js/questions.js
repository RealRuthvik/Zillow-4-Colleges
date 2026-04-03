// ========================================
// PLACEMENT QUESTIONS PAGE (separate page)
// ========================================

import { COLLEGES, getAllPlacementQuestions } from './data.js';
import { createPQCard } from './components.js';

let searchQuery = '';
let filterDifficulty = 'all';
let filterCollege = 'all';

/**
 * Render the questions page
 */
export function renderQuestions(container) {
  container.innerHTML = '';
  container.className = 'page explore page-enter';

  // Header
  const header = document.createElement('div');
  header.className = 'explore__header animate-slam';
  header.innerHTML = `
    <h1 class="explore__title">Placement Questions</h1>
    <p class="explore__subtitle">Real interview questions reported by students</p>
  `;
  container.appendChild(header);

  // Controls
  const controls = document.createElement('div');
  controls.className = 'questions-controls animate-fade-up stagger-2';
  controls.innerHTML = `
    <div class="explore__search">
      <input type="text" class="explore__search-input" id="q-search" placeholder="Search by company..." autocomplete="off" />
    </div>
    <div class="questions-filters">
      <select class="questions-select" id="q-college">
        <option value="all">All Colleges</option>
        ${COLLEGES.map(c => `<option value="${c.id}">${c.shortName}</option>`).join('')}
      </select>
      <select class="questions-select" id="q-difficulty">
        <option value="all">All Difficulty</option>
        <option value="Very Easy">Very Easy</option>
        <option value="Easy">Easy</option>
        <option value="Easy-Medium">Easy-Medium</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Very Hard">Very Hard</option>
      </select>
    </div>
  `;
  container.appendChild(controls);

  // Questions list
  const listContainer = document.createElement('div');
  listContainer.className = 'questions-list';
  listContainer.id = 'questions-list';
  container.appendChild(listContainer);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'page-footer animate-fade-up';
  footer.innerHTML = `<p class="page-footer__text">ALL DATA IS CROWD-SOURCED & ANONYMOUS</p>`;
  container.appendChild(footer);

  renderQList(listContainer);

  // Event handlers
  document.getElementById('q-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderQList(listContainer);
  });

  document.getElementById('q-college').addEventListener('change', (e) => {
    filterCollege = e.target.value;
    renderQList(listContainer);
  });

  document.getElementById('q-difficulty').addEventListener('change', (e) => {
    filterDifficulty = e.target.value;
    renderQList(listContainer);
  });
}

function renderQList(container) {
  container.innerHTML = '';

  let questions = getAllPlacementQuestions();

  if (searchQuery) {
    questions = questions.filter(q =>
      q.company.toLowerCase().includes(searchQuery) ||
      q.role.toLowerCase().includes(searchQuery)
    );
  }

  if (filterCollege !== 'all') {
    questions = questions.filter(q => q.collegeId === filterCollege);
  }

  if (filterDifficulty !== 'all') {
    questions = questions.filter(q => q.difficulty === filterDifficulty);
  }

  // Sort by year desc
  questions.sort((a, b) => b.year - a.year);

  if (questions.length === 0) {
    container.innerHTML = `
      <div class="no-results" style="padding: 60px 20px; text-align: center;">
        <div class="no-results__text" style="font-size: 24px;">No questions matched your filters.</div>
      </div>
    `;
    return;
  }

  questions.forEach((pq, i) => {
    container.appendChild(createPQCard(pq, pq.collegeName, i));
  });
}
