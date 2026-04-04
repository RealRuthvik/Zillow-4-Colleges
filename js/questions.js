// ========================================
// PLACEMENT QUESTIONS PAGE (v2) — Pagination
// ========================================

import { COLLEGES, getAllPlacementQuestions } from './data.js';
import { createPQCard } from './components.js';

let searchQuery = '';
let filterDifficulty = 'all';
let filterCollege = 'all';
let currentPage = 1;
const itemsPerPage = 6;

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
      <input type="text" class="explore__search-input" id="q-search" placeholder="Search by company..." autocomplete="off" value="${searchQuery}" />
    </div>
    <div class="questions-filters">
      <select class="questions-select" id="q-college">
        <option value="all">All Colleges</option>
        ${COLLEGES.map(c => `<option value="${c.id}" ${filterCollege === c.id ? 'selected' : ''}>${c.shortName}</option>`).join('')}
      </select>
      <select class="questions-select" id="q-difficulty">
        <option value="all" ${filterDifficulty === 'all' ? 'selected' : ''}>All Difficulty</option>
        <option value="Very Easy" ${filterDifficulty === 'Very Easy' ? 'selected' : ''}>Very Easy</option>
        <option value="Easy" ${filterDifficulty === 'Easy' ? 'selected' : ''}>Easy</option>
        <option value="Easy-Medium" ${filterDifficulty === 'Easy-Medium' ? 'selected' : ''}>Easy-Medium</option>
        <option value="Medium" ${filterDifficulty === 'Medium' ? 'selected' : ''}>Medium</option>
        <option value="Hard" ${filterDifficulty === 'Hard' ? 'selected' : ''}>Hard</option>
        <option value="Very Hard" ${filterDifficulty === 'Very Hard' ? 'selected' : ''}>Very Hard</option>
      </select>
    </div>
  `;
  container.appendChild(controls);

  // Questions list container
  const listWrap = document.createElement('div');
  listWrap.className = 'questions-list-wrap animate-fade-up stagger-3';
  container.appendChild(listWrap);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'page-footer animate-fade-up';
  footer.innerHTML = `<p class="page-footer__text" style="font-family: var(--font-sub); font-size: 11px; letter-spacing: 2px; color: var(--grey-light);">ALL DATA IS CROWD-SOURCED & ANONYMOUS</p>`;
  container.appendChild(footer);

  renderQList(listWrap);

  // Event handlers
  document.getElementById('q-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    currentPage = 1;
    renderQList(listWrap);
  });

  document.getElementById('q-college').addEventListener('change', (e) => {
    filterCollege = e.target.value;
    currentPage = 1;
    renderQList(listWrap);
  });

  document.getElementById('q-difficulty').addEventListener('change', (e) => {
    filterDifficulty = e.target.value;
    currentPage = 1;
    renderQList(listWrap);
  });
}

function renderQList(wrap) {
  wrap.innerHTML = '';
  const listContainer = document.createElement('div');
  listContainer.className = 'questions-list';

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

  // Pagination Logic
  const totalPages = Math.ceil(questions.length / itemsPerPage) || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = questions.slice(start, start + itemsPerPage);

  if (questions.length === 0) {
    listContainer.innerHTML = `
      <div class="no-results" style="padding: 60px 20px; text-align: center; border: 1px solid var(--grey-mid); background: var(--grey-dark);">
        <div class="no-results__text" style="font-size: 24px;">No questions matched your filters.</div>
      </div>
    `;
    wrap.appendChild(listContainer);
    return;
  }

  paginated.forEach((pq, i) => {
    listContainer.appendChild(createPQCard(pq, pq.collegeName, i));
  });

  wrap.appendChild(listContainer);

  // Pagination Controls
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  paginationDiv.innerHTML = `
    <button class="pagination__btn" id="q-prev" ${currentPage <= 1 ? 'disabled' : ''}>← Prev</button>
    <span style="color: var(--grey-light); font-family: var(--font-sub); font-size: 12px; font-weight: 700; letter-spacing: 2px; padding: 0 10px;">
      PAGE ${currentPage} OF ${totalPages}
    </span>
    <button class="pagination__btn" id="q-next" ${currentPage >= totalPages ? 'disabled' : ''}>Next →</button>
  `;
  wrap.appendChild(paginationDiv);

  // Pagination Handlers
  const prevBtn = paginationDiv.querySelector('#q-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderQList(wrap);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  const nextBtn = paginationDiv.querySelector('#q-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderQList(wrap);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}