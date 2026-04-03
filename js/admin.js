// ========================================
// ADMIN PAGE — Full CRUD for college data
// Password-gated, persistent management
// ========================================

import { COLLEGES } from './data.js';
import { getTier, tierBadgeHTML } from './components.js';

const ADMIN_PASSWORD = 'expose2024';
let isAuthenticated = false;
let editingCollegeId = null;

export function renderAdmin(container) {
  container.innerHTML = '';
  container.className = 'page admin-page page-enter';

  if (!isAuthenticated) {
    renderLogin(container);
    return;
  }

  renderDashboard(container);
}

// ---- LOGIN GATE ----
function renderLogin(container) {
  const wrap = document.createElement('div');
  wrap.className = 'admin-login';
  wrap.innerHTML = `
    <div class="admin-login__card">
      <div class="admin-login__icon">🔒</div>
      <h2 class="admin-login__title">Admin Access</h2>
      <p class="admin-login__sub">Enter the admin password to continue</p>
      <div class="admin-login__form">
        <input type="password" class="admin-login__input" id="admin-pw" placeholder="Password..." autocomplete="off" />
        <button class="admin-login__btn" id="admin-login-btn">ENTER</button>
      </div>
      <div class="admin-login__error" id="admin-error"></div>
    </div>
  `;
  container.appendChild(wrap);

  const pwInput = wrap.querySelector('#admin-pw');
  const errorEl = wrap.querySelector('#admin-error');

  const tryLogin = () => {
    if (pwInput.value === ADMIN_PASSWORD) {
      isAuthenticated = true;
      renderAdmin(container);
    } else {
      errorEl.textContent = 'WRONG PASSWORD';
      pwInput.value = '';
      pwInput.focus();
    }
  };

  wrap.querySelector('#admin-login-btn').addEventListener('click', tryLogin);
  pwInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryLogin(); });
  setTimeout(() => pwInput.focus(), 300);
}

// ---- DASHBOARD ----
function renderDashboard(container) {
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'admin-header';
  header.innerHTML = `
    <div>
      <h1 class="admin-header__title">Admin Dashboard</h1>
      <p class="admin-header__sub">${COLLEGES.length} colleges in database</p>
    </div>
    <div class="admin-header__actions">
      <button class="admin-btn admin-btn--primary" id="admin-add-college">+ ADD COLLEGE</button>
      <button class="admin-btn admin-btn--ghost" id="admin-logout">LOGOUT</button>
    </div>
  `;
  container.appendChild(header);

  // College list
  const list = document.createElement('div');
  list.className = 'admin-college-list';
  list.id = 'admin-college-list';
  container.appendChild(list);

  renderCollegeList(list);

  // Editor panel
  const editor = document.createElement('div');
  editor.className = 'admin-editor';
  editor.id = 'admin-editor';
  container.appendChild(editor);

  // Events
  header.querySelector('#admin-add-college').addEventListener('click', () => {
    editingCollegeId = null;
    renderEditor(editor, null);
  });
  header.querySelector('#admin-logout').addEventListener('click', () => {
    isAuthenticated = false;
    window.location.hash = '#/';
  });
}

// ---- COLLEGE LIST ----
function renderCollegeList(list) {
  list.innerHTML = `
    <div class="admin-list-header">
      <div class="admin-list-header__col admin-list-header__col--name">College</div>
      <div class="admin-list-header__col">Tier</div>
      <div class="admin-list-header__col">Reports</div>
      <div class="admin-list-header__col">Tags</div>
      <div class="admin-list-header__col admin-list-header__col--actions">Actions</div>
    </div>
    ${COLLEGES.map(c => {
      const tier = getTier(c.trustScore);
      return `
        <div class="admin-college-row" data-id="${c.id}">
          <div class="admin-college-row__name">
            <strong>${c.shortName}</strong>
            <span class="admin-college-row__fullname">${c.name}</span>
            <span class="admin-college-row__location">📍 ${c.location}</span>
          </div>
          <div class="admin-college-row__tier">
            ${tierBadgeHTML(c.trustScore, 'sm')}
          </div>
          <div class="admin-college-row__reports">${c.reports.length}</div>
          <div class="admin-college-row__tags">
            ${(c.tags || []).map(t => `<span class="admin-tag">${t}</span>`).join('')}
          </div>
          <div class="admin-college-row__actions">
            <button class="admin-btn admin-btn--sm admin-btn--edit" data-edit="${c.id}">EDIT</button>
            <button class="admin-btn admin-btn--sm admin-btn--danger" data-delete="${c.id}">DEL</button>
          </div>
        </div>
      `;
    }).join('')}
  `;

  // Edit buttons
  list.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const college = COLLEGES.find(c => c.id === btn.dataset.edit);
      if (college) {
        editingCollegeId = college.id;
        renderEditor(document.getElementById('admin-editor'), college);
      }
    });
  });

  // Delete buttons
  list.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm(`Delete college "${btn.dataset.delete}"? This cannot be undone.`)) {
        const idx = COLLEGES.findIndex(c => c.id === btn.dataset.delete);
        if (idx !== -1) {
          COLLEGES.splice(idx, 1);
          renderCollegeList(list);
          document.getElementById('admin-editor').innerHTML = '';
          // Update header count
          const sub = document.querySelector('.admin-header__sub');
          if (sub) sub.textContent = `${COLLEGES.length} colleges in database`;
        }
      }
    });
  });
}

// ---- EDITOR ----
function renderEditor(editorEl, college) {
  const isNew = !college;
  const c = college || {
    id: '',
    name: '',
    shortName: '',
    location: '',
    type: 'Private University',
    trustScore: 50,
    hasHiddenBond: false,
    bondDetails: '',
    searchCount: 0,
    summary: {
      claimedCTC: '', reportedMedian: '', reportedAverage: '',
      reportedLowest: '', reportedHighest: '', totalReports: 0,
      topRecruiters: [], placementRate: '', batchSize: ''
    },
    onlineSources: [],
    reports: [],
    placementQuestions: [],
    tags: []
  };

  const allTags = ['Bond Alert', 'CTC Inflated', 'No Bonds', 'Mass Recruiter Heavy', 'Verified Base CTC', 'High Fees', 'Branch Dependent', 'Mega Batch Size', 'Marketing Heavy', 'BPO Heavy', 'Self-Placements', 'Forced Internship', 'Location Advantage', 'Brand Premium', 'Outlier Driven Stats', 'Extra Fees', 'Overcrowded', 'Elite Tier'];

  editorEl.innerHTML = `
    <div class="admin-editor__header">
      <h2 class="admin-editor__title">${isNew ? 'Add New College' : `Edit: ${c.shortName || c.name}`}</h2>
      <button class="admin-btn admin-btn--ghost admin-editor__close" id="editor-close">✕ CLOSE</button>
    </div>

    <div class="admin-editor__body">
      <!-- SECTION: Basic Info -->
      <div class="admin-section">
        <div class="admin-section__title">Basic Information</div>
        <div class="admin-form-grid">
          <div class="admin-field">
            <label>Full Name</label>
            <input type="text" id="ed-name" value="${c.name}" placeholder="e.g. SRM Institute of Science & Technology" />
          </div>
          <div class="admin-field">
            <label>Short Name</label>
            <input type="text" id="ed-shortName" value="${c.shortName}" placeholder="e.g. SRM IST" />
          </div>
          <div class="admin-field">
            <label>ID (slug)</label>
            <input type="text" id="ed-id" value="${c.id}" placeholder="e.g. srm-chennai" ${isNew ? '' : 'disabled'} />
          </div>
          <div class="admin-field">
            <label>Location</label>
            <input type="text" id="ed-location" value="${c.location}" placeholder="e.g. Chennai, Tamil Nadu" />
          </div>
          <div class="admin-field">
            <label>Type</label>
            <select id="ed-type">
              ${['Deemed University', 'Private University', 'State University', 'Central University', 'IIT', 'NIT', 'IIIT'].map(t => `<option ${c.type === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="admin-field">
            <label>Trust Score (0-100)</label>
            <input type="number" id="ed-trustScore" value="${c.trustScore}" min="0" max="100" />
          </div>
          <div class="admin-field">
            <label>Search Count</label>
            <input type="number" id="ed-searchCount" value="${c.searchCount}" min="0" />
          </div>
        </div>
      </div>

      <!-- SECTION: Bond -->
      <div class="admin-section">
        <div class="admin-section__title">Bond Information</div>
        <div class="admin-form-grid">
          <div class="admin-field admin-field--checkbox">
            <label>
              <input type="checkbox" id="ed-hasBond" ${c.hasHiddenBond ? 'checked' : ''} />
              Has Hidden Bond
            </label>
          </div>
          <div class="admin-field admin-field--full">
            <label>Bond Details</label>
            <input type="text" id="ed-bondDetails" value="${c.bondDetails}" placeholder="e.g. 2-year service bond worth ₹2,00,000" />
          </div>
        </div>
      </div>

      <!-- SECTION: Summary Stats -->
      <div class="admin-section">
        <div class="admin-section__title">Placement Summary</div>
        <div class="admin-form-grid">
          <div class="admin-field">
            <label>Advertised CTC</label>
            <input type="text" id="ed-claimedCTC" value="${c.summary.claimedCTC}" placeholder="e.g. 12.5 LPA" />
          </div>
          <div class="admin-field">
            <label>Reported Median</label>
            <input type="text" id="ed-reportedMedian" value="${c.summary.reportedMedian}" placeholder="e.g. 3.6 LPA" />
          </div>
          <div class="admin-field">
            <label>Reported Average</label>
            <input type="text" id="ed-reportedAverage" value="${c.summary.reportedAverage}" placeholder="e.g. 4.1 LPA" />
          </div>
          <div class="admin-field">
            <label>Reported Lowest</label>
            <input type="text" id="ed-reportedLowest" value="${c.summary.reportedLowest}" />
          </div>
          <div class="admin-field">
            <label>Reported Highest</label>
            <input type="text" id="ed-reportedHighest" value="${c.summary.reportedHighest}" />
          </div>
          <div class="admin-field">
            <label>Total Reports</label>
            <input type="number" id="ed-totalReports" value="${c.summary.totalReports}" min="0" />
          </div>
          <div class="admin-field">
            <label>Placement Rate</label>
            <input type="text" id="ed-placementRate" value="${c.summary.placementRate}" placeholder="e.g. 72%" />
          </div>
          <div class="admin-field">
            <label>Batch Size</label>
            <input type="text" id="ed-batchSize" value="${c.summary.batchSize}" placeholder="e.g. ~8,000" />
          </div>
          <div class="admin-field admin-field--full">
            <label>Top Recruiters (comma-separated)</label>
            <input type="text" id="ed-topRecruiters" value="${(c.summary.topRecruiters || []).join(', ')}" placeholder="e.g. TCS, Infosys, Wipro" />
          </div>
        </div>
      </div>

      <!-- SECTION: Tags -->
      <div class="admin-section">
        <div class="admin-section__title">Tags</div>
        <div class="admin-tags-grid" id="ed-tags">
          ${allTags.map(tag => `
            <label class="admin-tag-toggle">
              <input type="checkbox" value="${tag}" ${(c.tags || []).includes(tag) ? 'checked' : ''} />
              <span>${tag}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- SECTION: Reports -->
      <div class="admin-section">
        <div class="admin-section__title">
          Student Reports (${c.reports.length})
          <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-report">+ ADD REPORT</button>
        </div>
        <div class="admin-reports-list" id="ed-reports-list">
          ${c.reports.map((r, i) => renderReportRow(r, i)).join('')}
        </div>
      </div>

      <!-- SECTION: Online Sources -->
      <div class="admin-section">
        <div class="admin-section__title">
          Online Sources (${c.onlineSources.length})
          <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-source">+ ADD SOURCE</button>
        </div>
        <div class="admin-sources-list" id="ed-sources-list">
          ${c.onlineSources.map((s, i) => renderSourceRow(s, i)).join('')}
        </div>
      </div>

      <!-- SECTION: Placement Questions -->
      <div class="admin-section">
        <div class="admin-section__title">
          Placement Questions (${c.placementQuestions.length})
          <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-pq">+ ADD QUESTION SET</button>
        </div>
        <div class="admin-pq-list" id="ed-pq-list">
          ${c.placementQuestions.map((pq, i) => renderPQRow(pq, i)).join('')}
        </div>
      </div>
    </div>

    <div class="admin-editor__footer">
      <button class="admin-btn admin-btn--primary admin-btn--lg" id="ed-save">${isNew ? 'CREATE COLLEGE' : 'SAVE CHANGES'}</button>
      <button class="admin-btn admin-btn--ghost" id="ed-cancel">CANCEL</button>
    </div>
  `;

  // Close / Cancel
  editorEl.querySelector('#editor-close').addEventListener('click', () => { editorEl.innerHTML = ''; });
  editorEl.querySelector('#ed-cancel').addEventListener('click', () => { editorEl.innerHTML = ''; });

  // Add report
  editorEl.querySelector('#ed-add-report').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-reports-list');
    const count = listEl.querySelectorAll('.admin-report-item').length;
    listEl.insertAdjacentHTML('beforeend', renderReportRow({
      id: `r${count + 1}`, author: `Anonymous #${count + 1}`, batch: '2024', branch: 'CSE',
      timestamp: 'Just now', trustScore: 50, upvotes: 0, reportType: 'personal',
      company: '', role: '', ctcOffered: '', ctcBreakdown: null, comment: '',
      dataReported: { type: 'individual_offer' }
    }, count));
  });

  // Add source
  editorEl.querySelector('#ed-add-source').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-sources-list');
    const count = listEl.querySelectorAll('.admin-source-item').length;
    listEl.insertAdjacentHTML('beforeend', renderSourceRow({ name: '', trustLevel: 'Medium', finding: '' }, count));
  });

  // Add PQ
  editorEl.querySelector('#ed-add-pq').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-pq-list');
    const count = listEl.querySelectorAll('.admin-pq-item').length;
    listEl.insertAdjacentHTML('beforeend', renderPQRow({ company: '', role: '', year: 2024, date: '', questions: [], difficulty: 'Easy' }, count));
  });

  // SAVE
  editorEl.querySelector('#ed-save').addEventListener('click', () => {
    saveCollege(editorEl, c, isNew);
  });
}

// ---- RENDER ROWS ----
function renderReportRow(r, i) {
  return `
    <div class="admin-report-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span class="admin-sub-card__label">${r.author} · ${r.batch} ${r.branch}</span>
        <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row" data-target="report" data-idx="${i}">✕</button>
      </div>
      <div class="admin-form-grid admin-form-grid--compact">
        <div class="admin-field"><label>Author</label><input type="text" class="rpt-author" value="${r.author}" /></div>
        <div class="admin-field"><label>Batch</label><input type="text" class="rpt-batch" value="${r.batch}" /></div>
        <div class="admin-field"><label>Branch</label><input type="text" class="rpt-branch" value="${r.branch}" /></div>
        <div class="admin-field"><label>Trust (0-100)</label><input type="number" class="rpt-trust" value="${r.trustScore}" min="0" max="100" /></div>
        <div class="admin-field">
          <label>Type</label>
          <select class="rpt-type">
            <option ${r.reportType === 'personal' ? 'selected' : ''} value="personal">Personal</option>
            <option ${r.reportType === 'aggregate' ? 'selected' : ''} value="aggregate">Aggregate</option>
            <option ${r.reportType === 'multi_personal' ? 'selected' : ''} value="multi_personal">Multi-Personal</option>
          </select>
        </div>
        <div class="admin-field"><label>Company</label><input type="text" class="rpt-company" value="${r.company || ''}" /></div>
        <div class="admin-field"><label>Role</label><input type="text" class="rpt-role" value="${r.role || ''}" /></div>
        <div class="admin-field"><label>CTC Offered</label><input type="text" class="rpt-ctc" value="${r.ctcOffered || ''}" /></div>
        <div class="admin-field admin-field--full"><label>Comment</label><textarea class="rpt-comment" rows="2">${r.comment}</textarea></div>
      </div>
    </div>
  `;
}

function renderSourceRow(s, i) {
  return `
    <div class="admin-source-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span class="admin-sub-card__label">${s.name || 'New Source'}</span>
        <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">✕</button>
      </div>
      <div class="admin-form-grid admin-form-grid--compact">
        <div class="admin-field"><label>Source Name</label><input type="text" class="src-name" value="${s.name}" /></div>
        <div class="admin-field">
          <label>Trust Level</label>
          <select class="src-trust">
            <option ${s.trustLevel === 'High' ? 'selected' : ''}>High</option>
            <option ${s.trustLevel === 'Medium' ? 'selected' : ''}>Medium</option>
            <option ${s.trustLevel === 'Low-Medium' ? 'selected' : ''}>Low-Medium</option>
            <option ${s.trustLevel === 'Low' ? 'selected' : ''}>Low</option>
          </select>
        </div>
        <div class="admin-field admin-field--full"><label>Finding</label><input type="text" class="src-finding" value="${s.finding}" /></div>
      </div>
    </div>
  `;
}

function renderPQRow(pq, i) {
  return `
    <div class="admin-pq-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span class="admin-sub-card__label">${pq.company || 'New'} · ${pq.role || 'Role'}</span>
        <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">✕</button>
      </div>
      <div class="admin-form-grid admin-form-grid--compact">
        <div class="admin-field"><label>Company</label><input type="text" class="pq-company" value="${pq.company}" /></div>
        <div class="admin-field"><label>Role</label><input type="text" class="pq-role" value="${pq.role}" /></div>
        <div class="admin-field"><label>Year</label><input type="number" class="pq-year" value="${pq.year}" /></div>
        <div class="admin-field"><label>Date</label><input type="text" class="pq-date" value="${pq.date}" /></div>
        <div class="admin-field">
          <label>Difficulty</label>
          <select class="pq-difficulty">
            ${['Very Easy', 'Easy', 'Easy-Medium', 'Medium', 'Hard', 'Very Hard'].map(d => `<option ${pq.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}
          </select>
        </div>
        <div class="admin-field admin-field--full"><label>Questions (one per line)</label><textarea class="pq-questions" rows="3">${(pq.questions || []).join('\n')}</textarea></div>
      </div>
    </div>
  `;
}

// ---- SAVE ----
function saveCollege(editorEl, original, isNew) {
  const id = editorEl.querySelector('#ed-id').value.trim();
  const name = editorEl.querySelector('#ed-name').value.trim();

  if (!id || !name) {
    alert('ID and Name are required!');
    return;
  }

  // Build college object
  const college = {
    id: id,
    name: name,
    shortName: editorEl.querySelector('#ed-shortName').value.trim() || name,
    location: editorEl.querySelector('#ed-location').value.trim(),
    type: editorEl.querySelector('#ed-type').value,
    trustScore: parseInt(editorEl.querySelector('#ed-trustScore').value) || 50,
    hasHiddenBond: editorEl.querySelector('#ed-hasBond').checked,
    bondDetails: editorEl.querySelector('#ed-bondDetails').value.trim(),
    searchCount: parseInt(editorEl.querySelector('#ed-searchCount').value) || 0,
    summary: {
      claimedCTC: editorEl.querySelector('#ed-claimedCTC').value.trim(),
      reportedMedian: editorEl.querySelector('#ed-reportedMedian').value.trim(),
      reportedAverage: editorEl.querySelector('#ed-reportedAverage').value.trim(),
      reportedLowest: editorEl.querySelector('#ed-reportedLowest').value.trim(),
      reportedHighest: editorEl.querySelector('#ed-reportedHighest').value.trim(),
      totalReports: parseInt(editorEl.querySelector('#ed-totalReports').value) || 0,
      topRecruiters: editorEl.querySelector('#ed-topRecruiters').value.split(',').map(s => s.trim()).filter(Boolean),
      placementRate: editorEl.querySelector('#ed-placementRate').value.trim(),
      batchSize: editorEl.querySelector('#ed-batchSize').value.trim()
    },
    onlineSources: collectSources(editorEl),
    reports: collectReports(editorEl),
    placementQuestions: collectPQs(editorEl),
    tags: collectTags(editorEl)
  };

  if (isNew) {
    COLLEGES.push(college);
  } else {
    const idx = COLLEGES.findIndex(c => c.id === original.id);
    if (idx !== -1) COLLEGES[idx] = college;
  }

  // Refresh
  editorEl.innerHTML = '';
  const listEl = document.getElementById('admin-college-list');
  if (listEl) renderCollegeList(listEl);
  const sub = document.querySelector('.admin-header__sub');
  if (sub) sub.textContent = `${COLLEGES.length} colleges in database`;

  alert(isNew ? 'College created!' : 'Changes saved!');
}

function collectTags(el) {
  return [...el.querySelectorAll('#ed-tags input:checked')].map(cb => cb.value);
}

function collectReports(el) {
  return [...el.querySelectorAll('.admin-report-item')].map(item => ({
    id: `r${Math.random().toString(36).substr(2, 5)}`,
    author: item.querySelector('.rpt-author').value,
    batch: item.querySelector('.rpt-batch').value,
    branch: item.querySelector('.rpt-branch').value,
    timestamp: 'Recently',
    trustScore: parseInt(item.querySelector('.rpt-trust').value) || 50,
    upvotes: 0,
    reportType: item.querySelector('.rpt-type').value,
    company: item.querySelector('.rpt-company').value || null,
    role: item.querySelector('.rpt-role').value || null,
    ctcOffered: item.querySelector('.rpt-ctc').value || null,
    ctcBreakdown: null,
    comment: item.querySelector('.rpt-comment').value,
    dataReported: { type: 'individual_offer' }
  }));
}

function collectSources(el) {
  return [...el.querySelectorAll('.admin-source-item')].map(item => ({
    name: item.querySelector('.src-name').value,
    trustLevel: item.querySelector('.src-trust').value,
    finding: item.querySelector('.src-finding').value
  }));
}

function collectPQs(el) {
  return [...el.querySelectorAll('.admin-pq-item')].map(item => ({
    company: item.querySelector('.pq-company').value,
    role: item.querySelector('.pq-role').value,
    year: parseInt(item.querySelector('.pq-year').value) || 2024,
    date: item.querySelector('.pq-date').value,
    questions: item.querySelector('.pq-questions').value.split('\n').filter(Boolean),
    difficulty: item.querySelector('.pq-difficulty').value
  }));
}
