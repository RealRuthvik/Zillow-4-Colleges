import { getTier, tierBadgeHTML } from '/js/components.js';

let COLLEGES = [];
let currentPage = 1;
const itemsPerPage = 5;
let searchQuery = '';

async function loadData() {
  const res = await fetch('/api/data');
  COLLEGES = await res.json();
  renderDashboard(document.getElementById('admin-root'));
}

async function pushData() {
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(COLLEGES)
  });
  renderDashboard(document.getElementById('admin-root'));
}

function getFormattedDate() {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getShortDate() {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function renderDashboard(container) {
  const openEditorId = document.getElementById('ed-id')?.value;
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'admin-header';
  header.innerHTML = `
    <div>
      <h1 class="admin-header__title">Local Admin Panel</h1>
      <p class="admin-header__sub">${COLLEGES.length} colleges in database</p>
    </div>
    <div class="admin-header__actions">
      <input type="text" id="admin-search" placeholder="Search colleges..." class="admin-login__input" style="width: 250px;" value="${searchQuery}" />
      <button class="admin-btn admin-btn--primary" id="admin-sync-data" style="background: var(--tier-s); color: var(--black);">SYNC TO DATA.JS</button>
      <button class="admin-btn admin-btn--primary" id="admin-add-college">+ ADD COLLEGE</button>
    </div>
  `;
  container.appendChild(header);

  const list = document.createElement('div');
  list.className = 'admin-college-list';
  list.id = 'admin-college-list';
  container.appendChild(list);

  renderCollegeList(list);

  const editor = document.createElement('div');
  editor.className = 'admin-editor';
  editor.id = 'admin-editor';
  container.appendChild(editor);

  if (openEditorId) {
    const c = COLLEGES.find(col => col.id === openEditorId);
    if (c) renderEditor(editor, c);
  }

  header.querySelector('#admin-add-college').addEventListener('click', () => {
    renderEditor(editor, null);
  });

  header.querySelector('#admin-sync-data').addEventListener('click', async (e) => {
    const btn = e.target;
    const origText = btn.textContent;
    btn.textContent = 'SYNCING...';
    try {
      await fetch('/api/sync', { method: 'POST' });
      btn.textContent = 'SYNCED OK';
      btn.style.background = 'var(--tier-a)';
    } catch (err) {
      btn.textContent = 'ERROR';
      btn.style.background = 'var(--red)';
    }
    setTimeout(() => {
      btn.textContent = origText;
      btn.style.background = 'var(--tier-s)';
    }, 2000);
  });

  header.querySelector('#admin-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    currentPage = 1;
    renderCollegeList(list);
  });
}

function renderCollegeList(list) {
  let filtered = COLLEGES.filter(c => 
    c.name.toLowerCase().includes(searchQuery) || 
    c.shortName.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  list.innerHTML = `
    <div class="admin-list-header">
      <div class="admin-list-header__col admin-list-header__col--name">College</div>
      <div class="admin-list-header__col">Tier</div>
      <div class="admin-list-header__col">Reports</div>
      <div class="admin-list-header__col admin-list-header__col--actions">Actions</div>
    </div>
    ${paginated.map(c => {
      return `
        <div class="admin-college-row" data-id="${c.id}" style="grid-template-columns: 2fr 80px 80px 120px;">
          <div class="admin-college-row__name">
            <strong>${c.shortName}</strong>
            <span class="admin-college-row__fullname">${c.name}</span>
            <span class="admin-college-row__location">${c.location}</span>
          </div>
          <div class="admin-college-row__tier">
            ${tierBadgeHTML(c.trustScore, 'sm')}
          </div>
          <div class="admin-college-row__reports">${c.reports.length}</div>
          <div class="admin-college-row__actions">
            <button class="admin-btn admin-btn--sm admin-btn--edit" data-edit="${c.id}">EDIT</button>
            <button class="admin-btn admin-btn--sm admin-btn--danger" data-delete="${c.id}">DEL</button>
          </div>
        </div>
      `;
    }).join('')}
    
    <div class="pagination" style="margin-top: 20px; justify-content: flex-end;">
      <button class="admin-btn admin-btn--ghost" id="page-prev" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
      <span style="color: var(--white); font-family: var(--font-sub); margin: 0 15px;">Page ${currentPage} of ${totalPages || 1}</span>
      <button class="admin-btn admin-btn--ghost" id="page-next" ${currentPage >= totalPages ? 'disabled' : ''}>Next Page</button>
    </div>
  `;

  const prevBtn = list.querySelector('#page-prev');
  if(prevBtn) prevBtn.addEventListener('click', () => { if(currentPage > 1) { currentPage--; renderCollegeList(list); } });
  
  const nextBtn = list.querySelector('#page-next');
  if(nextBtn) nextBtn.addEventListener('click', () => { if(currentPage < totalPages) { currentPage++; renderCollegeList(list); } });

  list.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const college = COLLEGES.find(c => c.id === btn.dataset.edit);
      if (college) renderEditor(document.getElementById('admin-editor'), college);
      document.getElementById('admin-editor').scrollIntoView({ behavior: 'smooth' });
    });
  });

  list.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm(`Delete college "${btn.dataset.delete}"?`)) {
        const idx = COLLEGES.findIndex(c => c.id === btn.dataset.delete);
        if (idx !== -1) {
          COLLEGES.splice(idx, 1);
          await pushData();
        }
      }
    });
  });
}

function renderEditor(editorEl, college) {
  const isNew = !college;
  const c = college || {
    id: '', name: '', shortName: '', location: '', type: 'Private University',
    trustScore: 50, hasWarning: false, warningLabel: '', warningDetails: '', searchCount: 0,
    lastUpdated: getShortDate(), lastUpdatedFull: getFormattedDate(),
    summary: { claimedCTC: '', reportedMedian: '', reportedAverage: '', reportedLowest: '', reportedHighest: '', totalReports: 0, topRecruiters: [], placementRate: '', batchSize: '', advertisedSameAsReported: false, branches: [] },
    summaryDates: {},
    onlineSources: [], reports: [], placementQuestions: [], tags: []
  };

  let parsedTags = (c.tags || []).map(t => {
    if (typeof t === 'string') return { text: t, color: 'grey', featured: false };
    return t;
  });

  const hasWarn = c.hasWarning || c.hasHiddenBond;
  const warnLabel = c.warningLabel || (c.hasHiddenBond ? 'HIDDEN BOND' : '');
  const warnDetails = c.warningDetails || c.bondDetails || '';
  const advSame = c.summary.advertisedSameAsReported || false;
  const branches = c.summary.branches || [];
  const sDates = c.summaryDates || {};

  const standardTags = ['BOND ALERT', 'CTC INFLATED', 'NO BONDS', 'MASS RECRUITER HEAVY', 'VERIFIED BASE CTC', 'HIGH FEES', 'BRANCH DEPENDENT', 'MEGA BATCH SIZE', 'MARKETING HEAVY', 'BPO HEAVY', 'SELF-PLACEMENTS', 'FORCED INTERNSHIP', 'LOCATION ADVANTAGE', 'BRAND PREMIUM', 'OUTLIER DRIVEN STATS', 'EXTRA FEES', 'OVERCROWDED', 'ELITE TIER'];

  editorEl.innerHTML = `
    <div class="admin-editor__header" style="position: sticky; top: 0; z-index: 100;">
      <h2 class="admin-editor__title">${isNew ? 'Add New College' : `Edit: ${c.shortName || c.name}`}</h2>
      <div style="display: flex; gap: 10px;">
        <button class="admin-btn admin-btn--primary" id="ed-save-master">SAVE ALL CHANGES</button>
        <button class="admin-btn admin-btn--ghost" id="editor-close">CLOSE</button>
      </div>
    </div>

    <div class="admin-editor__body">
      
      <div class="admin-section" id="sec-basic">
        <div class="admin-section__title">Basic Information <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="basic">Save Section</button></div>
        <div class="admin-form-grid">
          <div class="admin-field"><label>Full Name</label><input type="text" id="ed-name" value="${c.name}" /></div>
          <div class="admin-field"><label>Short Name</label><input type="text" id="ed-shortName" value="${c.shortName}" /></div>
          <div class="admin-field"><label>ID (slug)</label><input type="text" id="ed-id" value="${c.id}" ${isNew ? '' : 'disabled'} /></div>
          <div class="admin-field"><label>Location</label><input type="text" id="ed-location" value="${c.location}" /></div>
          <div class="admin-field">
            <label>Type</label>
            <input type="text" id="ed-type" value="${c.type}" list="type-options" autocomplete="off" />
            <datalist id="type-options">
              ${['Deemed University', 'Private University', 'State University', 'Central University', 'IIT', 'NIT', 'IIIT'].map(t => `<option value="${t}">`).join('')}
            </datalist>
          </div>
          <div class="admin-field"><label>Trust Score</label><input type="number" id="ed-trustScore" value="${c.trustScore}" /></div>
          <div class="admin-field"><label>Search Count</label><input type="number" id="ed-searchCount" value="${c.searchCount}" /></div>
        </div>
      </div>

      <div class="admin-section" id="sec-tags">
        <div class="admin-section__title">Header & Featured Tags <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="tags">Save Section</button></div>
        <p style="color: var(--grey-light); font-size: 12px; margin-bottom: 15px;">All tags added here show up next to the college location. Mark ONE as "Featured" to display it on the most searched card.</p>
        
        <div id="ed-tags-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
          ${parsedTags.map((t, i) => renderTagRow(t, i)).join('')}
        </div>

        <div style="display: flex; gap: 10px; align-items: center; background: rgba(255,255,255,0.02); padding: 10px; border: 1px dashed var(--grey-mid);">
          <select id="tag-preset" class="admin-login__input" style="flex: 1;">
            <option value="">-- Select Standard Tag --</option>
            ${standardTags.map(st => `<option value="${st}">${st}</option>`).join('')}
          </select>
          <span style="color: var(--grey-light);">OR</span>
          <input type="text" id="tag-custom" class="admin-login__input" style="flex: 1;" placeholder="Type custom tag..." />
          <button class="admin-btn admin-btn--primary" id="ed-add-tag">ADD TAG</button>
        </div>
      </div>

      <div class="admin-section" id="sec-warning" style="border-left: 3px solid var(--red); padding-left: 20px; background: rgba(230,0,18,0.03);">
        <div class="admin-section__title" style="color: var(--red);">
          Summary Warning Alert
          <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="warning">Save Section</button>
        </div>
        <div class="admin-form-grid">
          <div class="admin-field admin-field--checkbox">
            <label><input type="checkbox" id="ed-hasWarning" ${hasWarn ? 'checked' : ''} /> Enable Warning Alert Box</label>
          </div>
          <div class="admin-field">
            <label>Warning Title</label>
            <input type="text" id="ed-warningLabel" value="${warnLabel}" placeholder="e.g. HIDDEN BOND" />
          </div>
          <div class="admin-field admin-field--full">
            <label>Warning Details (Description)</label>
            <input type="text" id="ed-warningDetails" value="${warnDetails}" placeholder="e.g. 2 year service bond worth 2L..." />
          </div>
        </div>
      </div>

      <div class="admin-section" id="sec-summary">
        <div class="admin-section__title">Placement Summary <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="summary">Save Section</button></div>
        <div class="admin-form-grid">
          <div class="admin-field admin-field--checkbox admin-field--full">
            <label><input type="checkbox" id="ed-advertisedSame" ${advSame ? 'checked' : ''} /> Advertised is same as Reported</label>
          </div>
          <div class="admin-field"><label>Advertised CTC</label><input type="text" id="ed-claimedCTC" value="${c.summary.claimedCTC}" /></div>
          
          <div class="admin-field">
            <label>Reported Median</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-reportedMedian" value="${c.summary.reportedMedian}" style="flex: 2;" />
              <input type="text" id="ed-dateMedian" value="${sDates.median || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>
          
          <div class="admin-field">
            <label>Reported Average</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-reportedAverage" value="${c.summary.reportedAverage}" style="flex: 2;" />
              <input type="text" id="ed-dateAverage" value="${sDates.average || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>
          
          <div class="admin-field">
            <label>Reported Lowest</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-reportedLowest" value="${c.summary.reportedLowest}" style="flex: 2;" />
              <input type="text" id="ed-dateLowest" value="${sDates.lowest || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>
          
          <div class="admin-field">
            <label>Reported Highest</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-reportedHighest" value="${c.summary.reportedHighest}" style="flex: 2;" />
              <input type="text" id="ed-dateHighest" value="${sDates.highest || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>
          
          <div class="admin-field"><label>Total Reports</label><input type="number" id="ed-totalReports" value="${c.summary.totalReports}" /></div>
          
          <div class="admin-field">
            <label>Placement Rate</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-placementRate" value="${c.summary.placementRate}" style="flex: 2;" />
              <input type="text" id="ed-datePlacementRate" value="${sDates.placementRate || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>
          
          <div class="admin-field">
            <label>Batch Size</label>
            <div style="display:flex; gap: 4px;">
              <input type="text" id="ed-batchSize" value="${c.summary.batchSize}" style="flex: 2;" />
              <input type="text" id="ed-dateBatchSize" value="${sDates.batchSize || ''}" placeholder="Date" style="flex: 1;" />
            </div>
          </div>

          <div class="admin-field">
            <label>Companies Reported Date</label>
            <input type="text" id="ed-dateCompanies" value="${sDates.companies || ''}" placeholder="e.g. As of Apr 2026" />
          </div>
        </div>

        <div style="margin-top: 25px;">
          <div style="display:flex; gap: 10px; align-items: center; margin-bottom: 15px;">
            <h4 style="font-family: var(--font-sub); font-size: 12px; color: var(--white); text-transform: uppercase;">Branch Placement Data</h4>
            <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-branch">+ ADD BRANCH</button>
          </div>
          <div class="admin-branches-list" id="ed-branches-list">
            ${branches.map((b, i) => renderBranchRow(b, i, false)).join('')}
          </div>
        </div>
      </div>

      <div class="admin-section" id="sec-reports">
        <div class="admin-section__title">Student Reports
          <div style="display:flex; gap: 10px; margin-left: auto;">
            <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-report">+ ADD REPORT</button>
            <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="reports">Save Section</button>
          </div>
        </div>
        <div class="admin-reports-list" id="ed-reports-list">${c.reports.map((r, i) => renderReportRow(r, i, false)).join('')}</div>
      </div>

      <div class="admin-section" id="sec-recruiters">
        <div class="admin-section__title">Recruiters & Interview Data
          <div style="display:flex; gap: 10px; margin-left: auto;">
            <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-pq">+ ADD RECRUITER</button>
            <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="recruiters">Save Section</button>
          </div>
        </div>
        <div class="admin-pq-list" id="ed-pq-list">${c.placementQuestions.map((pq, i) => renderPQRow(pq, i, false)).join('')}</div>
      </div>

      <div class="admin-section" id="sec-sources">
        <div class="admin-section__title">Online Sources
          <div style="display:flex; gap: 10px; margin-left: auto;">
            <button class="admin-btn admin-btn--sm admin-btn--primary" id="ed-add-source">+ ADD SOURCE</button>
            <button class="admin-btn admin-btn--sm admin-btn--ghost ed-save-section" data-target="sources">Save Section</button>
          </div>
        </div>
        <div class="admin-sources-list" id="ed-sources-list">${c.onlineSources.map((s, i) => renderSourceRow(s, i, false)).join('')}</div>
      </div>
    </div>
  `;

  editorEl.querySelector('#editor-close').addEventListener('click', () => { editorEl.innerHTML = ''; });

  editorEl.querySelector('#ed-add-tag').addEventListener('click', () => {
    const preset = editorEl.querySelector('#tag-preset').value;
    const custom = editorEl.querySelector('#tag-custom').value.trim();
    const val = custom || preset;
    if (!val) return;
    
    const listEl = editorEl.querySelector('#ed-tags-list');
    listEl.insertAdjacentHTML('beforeend', renderTagRow({ text: val, color: 'grey', featured: false }, Date.now()));
    
    editorEl.querySelector('#tag-preset').value = '';
    editorEl.querySelector('#tag-custom').value = '';
  });

  editorEl.querySelector('#ed-add-branch').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-branches-list');
    listEl.insertAdjacentHTML('beforeend', renderBranchRow({ name: '', low: '', high: '', median: '', average: '' }, Date.now(), true));
  });

  editorEl.querySelector('#ed-add-report').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-reports-list');
    listEl.insertAdjacentHTML('afterbegin', renderReportRow({ id: `r${Date.now()}`, author: '', batch: '', branch: '', timestamp: 'Just now', trustScore: 50, reportType: 'personal', company: '', role: '', ctcOffered: '', ctcBreakdown: null, comment: '', dataReported: { type: 'individual_offer' } }, Date.now(), true));
  });

  editorEl.querySelector('#ed-add-source').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-sources-list');
    listEl.insertAdjacentHTML('afterbegin', renderSourceRow({ name: '', trustLevel: 'Medium', finding: '', fileUrl: '' }, Date.now(), true));
  });

  editorEl.querySelector('#ed-add-pq').addEventListener('click', () => {
    const listEl = editorEl.querySelector('#ed-pq-list');
    listEl.insertAdjacentHTML('afterbegin', renderPQRow({ company: '', role: '', logo: '', ctc: '', year: new Date().getFullYear(), date: '', questions: [], difficulty: 'Medium' }, Date.now(), true));
  });

  editorEl.addEventListener('change', async (e) => {
    if (e.target.classList.contains('src-file')) {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          const row = e.target.closest('.admin-source-item');
          row.querySelector('.src-file-url').value = data.url;
          row.querySelector('.src-file-label').textContent = file.name;
        }
      } catch (err) {}
    }
    
    if (e.target.classList.contains('pq-has-questions')) {
      const section = e.target.closest('.admin-sub-card__body').querySelector('.pq-questions-section');
      section.style.display = e.target.checked ? 'block' : 'none';
    }
  });

  editorEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-remove-row')) {
      e.target.closest('.admin-sub-card, .admin-tag-row, .admin-branch-item').remove();
    }
    if (e.target.classList.contains('toggle-row-btn')) {
      const body = e.target.closest('.admin-sub-card').querySelector('.admin-sub-card__body');
      body.style.display = body.style.display === 'none' ? 'block' : 'none';
      e.target.textContent = body.style.display === 'none' ? 'Edit' : 'Collapse';
    }
  });

  editorEl.querySelectorAll('.ed-save-section').forEach(btn => {
    btn.addEventListener('click', () => saveCollege(editorEl, c, isNew, btn.dataset.target));
  });

  editorEl.querySelector('#ed-save-master').addEventListener('click', () => saveCollege(editorEl, c, isNew, 'all'));
}

function renderBranchRow(b, i, isNew) {
  return `
    <div class="admin-branch-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span>Branch: ${b.name || 'New'}</span>
        <div style="display:flex; gap: 8px;">
          <button class="admin-btn admin-btn--sm admin-btn--ghost toggle-row-btn">${isNew ? 'Collapse' : 'Edit'}</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">X</button>
        </div>
      </div>
      <div class="admin-sub-card__body" style="display: ${isNew ? 'block' : 'none'}; padding: 15px;">
        <div class="admin-form-grid admin-form-grid--compact">
          <div class="admin-field"><label>Branch Name</label><input type="text" class="br-name" value="${b.name || ''}" /></div>
          <div class="admin-field"><label>Lowest CTC</label><input type="text" class="br-low" value="${b.low || ''}" /></div>
          <div class="admin-field"><label>Highest CTC</label><input type="text" class="br-high" value="${b.high || ''}" /></div>
          <div class="admin-field"><label>Median CTC</label><input type="text" class="br-median" value="${b.median || ''}" /></div>
          <div class="admin-field"><label>Average CTC</label><input type="text" class="br-avg" value="${b.average || ''}" /></div>
        </div>
      </div>
    </div>`;
}

function renderTagRow(t, i) {
  return `
    <div class="admin-tag-row admin-sub-card" style="padding: 10px; display: flex; gap: 15px; align-items: center; margin-bottom: 0;">
      <input type="text" class="tag-text admin-login__input" value="${t.text}" style="flex: 1;" placeholder="Tag Name" />
      <select class="tag-color admin-login__input" style="width: 150px;">
        <option value="grey" ${t.color === 'grey' ? 'selected' : ''}>Grey</option>
        <option value="red" ${t.color === 'red' ? 'selected' : ''}>Red</option>
        <option value="yellow" ${t.color === 'yellow' ? 'selected' : ''}>Yellow</option>
        <option value="blue" ${t.color === 'blue' ? 'selected' : ''}>Blue</option>
        <option value="orange" ${t.color === 'orange' ? 'selected' : ''}>Orange</option>
        <option value="green" ${t.color === 'green' ? 'selected' : ''}>Green</option>
      </select>
      <label style="display: flex; align-items: center; gap: 5px; color: var(--white); font-family: var(--font-sub); font-size: 12px; min-width: 130px;">
        <input type="checkbox" class="tag-featured" ${t.featured ? 'checked' : ''} /> Featured
      </label>
      <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">X</button>
    </div>
  `;
}

function renderReportRow(r, i, isNew) {
  const b = r.ctcBreakdown || { basePay: '', variablePay: '', joiningBonus: '', relocation: '', other: '' };
  return `
    <div class="admin-report-item admin-sub-card" data-index="${i}" data-id="${r.id}">
      <div class="admin-sub-card__header">
        <span>Report: ${r.author || 'New'}</span>
        <div style="display:flex; gap: 8px;">
          <button class="admin-btn admin-btn--sm admin-btn--ghost toggle-row-btn">${isNew ? 'Collapse' : 'Edit'}</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">X</button>
        </div>
      </div>
      <div class="admin-sub-card__body" style="display: ${isNew ? 'block' : 'none'}; padding: 15px;">
        <div class="admin-form-grid admin-form-grid--compact">
          <div class="admin-field"><label>Author</label><input type="text" class="rpt-author" value="${r.author}" /></div>
          <div class="admin-field"><label>Batch</label><input type="text" class="rpt-batch" value="${r.batch}" /></div>
          <div class="admin-field"><label>Branch</label><input type="text" class="rpt-branch" value="${r.branch}" /></div>
          <div class="admin-field"><label>Trust Score</label><input type="number" class="rpt-trust" value="${r.trustScore}" /></div>
          <div class="admin-field"><label>Type</label><select class="rpt-type"><option value="personal" ${r.reportType === 'personal' ? 'selected' : ''}>Personal</option><option value="aggregate" ${r.reportType === 'aggregate' ? 'selected' : ''}>Aggregate</option></select></div>
          <div class="admin-field"><label>Company</label><input type="text" class="rpt-company" value="${r.company || ''}" /></div>
          <div class="admin-field"><label>Role</label><input type="text" class="rpt-role" value="${r.role || ''}" /></div>
          <div class="admin-field"><label>Total CTC</label><input type="text" class="rpt-ctc" value="${r.ctcOffered || ''}" /></div>
          <div class="admin-field"><label>Base Pay</label><input type="text" class="rpt-b-base" value="${b.basePay || ''}" /></div>
          <div class="admin-field"><label>Variable Pay</label><input type="text" class="rpt-b-var" value="${b.variablePay || ''}" /></div>
          <div class="admin-field"><label>Joining Bonus</label><input type="text" class="rpt-b-join" value="${b.joiningBonus || ''}" /></div>
          <div class="admin-field"><label>Relocation</label><input type="text" class="rpt-b-rel" value="${b.relocation || ''}" /></div>
          <div class="admin-field admin-field--full"><label>Comment</label><textarea class="rpt-comment">${r.comment}</textarea></div>
        </div>
      </div>
    </div>`;
}

function renderSourceRow(s, i, isNew) {
  return `
    <div class="admin-source-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span>Source: ${s.name || 'New'}</span>
        <div style="display:flex; gap: 8px;">
          <button class="admin-btn admin-btn--sm admin-btn--ghost toggle-row-btn">${isNew ? 'Collapse' : 'Edit'}</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">X</button>
        </div>
      </div>
      <div class="admin-sub-card__body" style="display: ${isNew ? 'block' : 'none'}; padding: 15px;">
        <div class="admin-form-grid admin-form-grid--compact">
          <div class="admin-field"><label>Name</label><input type="text" class="src-name" value="${s.name}" /></div>
          <div class="admin-field"><label>Trust Level</label><select class="src-trust"><option ${s.trustLevel === 'High' ? 'selected' : ''}>High</option><option ${s.trustLevel === 'Medium' ? 'selected' : ''}>Medium</option><option ${s.trustLevel === 'Low' ? 'selected' : ''}>Low</option></select></div>
          <div class="admin-field">
            <label>Upload Excel File</label>
            <input type="file" class="src-file" accept=".xlsx,.xls,.csv" />
            <input type="hidden" class="src-file-url" value="${s.fileUrl || ''}" />
            <div class="src-file-label" style="font-size: 11px; color: var(--tier-a); margin-top: 5px;">${s.fileUrl ? 'File attached' : ''}</div>
          </div>
          <div class="admin-field admin-field--full"><label>Finding</label><input type="text" class="src-finding" value="${s.finding}" /></div>
        </div>
      </div>
    </div>`;
}

function renderPQRow(pq, i, isNew) {
  const hasQ = pq.questions && pq.questions.length > 0;
  return `
    <div class="admin-pq-item admin-sub-card" data-index="${i}">
      <div class="admin-sub-card__header">
        <span>Recruiter: ${pq.company || 'New'}</span>
        <div style="display:flex; gap: 8px;">
          <button class="admin-btn admin-btn--sm admin-btn--ghost toggle-row-btn">${isNew ? 'Collapse' : 'Edit'}</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger admin-remove-row">X</button>
        </div>
      </div>
      <div class="admin-sub-card__body" style="display: ${isNew ? 'block' : 'none'}; padding: 15px;">
        
        <div class="admin-form-grid admin-form-grid--compact">
          <div class="admin-field"><label>Company</label><input type="text" class="pq-company" value="${pq.company || ''}" /></div>
          <div class="admin-field"><label>Company Logo URL</label><input type="text" class="pq-logo" value="${pq.logo || ''}" placeholder="https://..." /></div>
          <div class="admin-field"><label>Role / Position</label><input type="text" class="pq-role" value="${pq.role || ''}" /></div>
          <div class="admin-field"><label>CTC</label><input type="text" class="pq-ctc" value="${pq.ctc || ''}" placeholder="e.g. 12 LPA" /></div>
          <div class="admin-field"><label>Year</label><input type="number" class="pq-year" value="${pq.year || new Date().getFullYear()}" /></div>
          <div class="admin-field"><label>Date / Month</label><input type="text" class="pq-date" value="${pq.date || ''}" /></div>
        </div>

        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed var(--grey-mid);">
          <div class="admin-field admin-field--checkbox" style="margin-bottom: 15px;">
            <label><input type="checkbox" class="pq-has-questions" ${hasQ ? 'checked' : ''} /> Enable Interview Questions</label>
          </div>
          
          <div class="pq-questions-section" style="display: ${hasQ ? 'block' : 'none'};">
            <div class="admin-form-grid admin-form-grid--compact" style="margin-bottom: 15px;">
              <div class="admin-field"><label>Difficulty</label><select class="pq-difficulty"><option ${pq.difficulty === 'Easy' ? 'selected' : ''}>Easy</option><option ${pq.difficulty === 'Medium' ? 'selected' : ''}>Medium</option><option ${pq.difficulty === 'Hard' ? 'selected' : ''}>Hard</option></select></div>
            </div>
            <div class="admin-field admin-field--full"><label>Questions Asked (newline separated)</label><textarea class="pq-questions">${(pq.questions || []).join('\n')}</textarea></div>
          </div>
        </div>

      </div>
    </div>`;
}

async function saveCollege(editorEl, original, isNew, sectionTarget) {
  const id = editorEl.querySelector('#ed-id').value.trim();
  if (!id) return alert('ID required');

  const newReports = [...editorEl.querySelectorAll('.admin-report-item')].map(item => {
    let breakdown = null;
    const base = item.querySelector('.rpt-b-base').value;
    const vr = item.querySelector('.rpt-b-var').value;
    const jb = item.querySelector('.rpt-b-join').value;
    const rel = item.querySelector('.rpt-b-rel').value;
    if (base || vr || jb || rel) {
      breakdown = { basePay: base, variablePay: vr, joiningBonus: jb, relocation: rel, other: '' };
    }
    return {
      id: item.dataset.id || `r${Math.random().toString(36).substr(2, 5)}`,
      author: item.querySelector('.rpt-author').value,
      batch: item.querySelector('.rpt-batch').value,
      branch: item.querySelector('.rpt-branch').value,
      timestamp: 'Recently',
      trustScore: parseInt(item.querySelector('.rpt-trust').value) || 50,
      upvotes: 0,
      reportType: item.querySelector('.rpt-type').value,
      company: item.querySelector('.rpt-company').value,
      role: item.querySelector('.rpt-role').value,
      ctcOffered: item.querySelector('.rpt-ctc').value,
      ctcBreakdown: breakdown,
      comment: item.querySelector('.rpt-comment').value,
      dataReported: { type: 'individual_offer' }
    };
  });

  const newPQs = [...editorEl.querySelectorAll('.admin-pq-item')].map(item => {
    const hasQuestions = item.querySelector('.pq-has-questions').checked;
    return {
      company: item.querySelector('.pq-company').value,
      logo: item.querySelector('.pq-logo').value.trim(),
      role: item.querySelector('.pq-role').value,
      ctc: item.querySelector('.pq-ctc').value.trim(),
      year: parseInt(item.querySelector('.pq-year').value) || 2024,
      date: item.querySelector('.pq-date').value,
      questions: hasQuestions ? item.querySelector('.pq-questions').value.split('\n').filter(Boolean) : [],
      difficulty: hasQuestions ? item.querySelector('.pq-difficulty').value : 'Medium'
    };
  });

  const newTags = [...editorEl.querySelectorAll('.admin-tag-row')].map(row => ({
    text: row.querySelector('.tag-text').value.trim(),
    color: row.querySelector('.tag-color').value,
    featured: row.querySelector('.tag-featured').checked
  })).filter(t => t.text);

  const newBranches = [...editorEl.querySelectorAll('.admin-branch-item')].map(row => ({
    name: row.querySelector('.br-name').value.trim(),
    low: row.querySelector('.br-low').value.trim(),
    high: row.querySelector('.br-high').value.trim(),
    median: row.querySelector('.br-median').value.trim(),
    average: row.querySelector('.br-avg').value.trim()
  })).filter(b => b.name);

  const summaryDates = {
    median: editorEl.querySelector('#ed-dateMedian').value.trim(),
    average: editorEl.querySelector('#ed-dateAverage').value.trim(),
    lowest: editorEl.querySelector('#ed-dateLowest').value.trim(),
    highest: editorEl.querySelector('#ed-dateHighest').value.trim(),
    placementRate: editorEl.querySelector('#ed-datePlacementRate').value.trim(),
    batchSize: editorEl.querySelector('#ed-dateBatchSize').value.trim(),
    companies: editorEl.querySelector('#ed-dateCompanies').value.trim()
  };

  const collegeData = {
    id: id, 
    name: editorEl.querySelector('#ed-name').value.trim(),
    shortName: editorEl.querySelector('#ed-shortName').value.trim(),
    location: editorEl.querySelector('#ed-location').value.trim(),
    type: editorEl.querySelector('#ed-type').value,
    trustScore: parseInt(editorEl.querySelector('#ed-trustScore').value) || 50,
    hasWarning: editorEl.querySelector('#ed-hasWarning').checked,
    warningLabel: editorEl.querySelector('#ed-warningLabel').value.trim(),
    warningDetails: editorEl.querySelector('#ed-warningDetails').value.trim(),
    searchCount: parseInt(editorEl.querySelector('#ed-searchCount').value) || 0,
    lastUpdated: sectionTarget === 'all' || sectionTarget !== 'basic' ? getShortDate() : original.lastUpdated,
    lastUpdatedFull: sectionTarget === 'all' || sectionTarget !== 'basic' ? getFormattedDate() : original.lastUpdatedFull,
    summary: {
      advertisedSameAsReported: editorEl.querySelector('#ed-advertisedSame').checked,
      branches: newBranches,
      claimedCTC: editorEl.querySelector('#ed-claimedCTC').value.trim(), 
      reportedMedian: editorEl.querySelector('#ed-reportedMedian').value.trim(),
      reportedAverage: editorEl.querySelector('#ed-reportedAverage').value.trim(), 
      reportedLowest: editorEl.querySelector('#ed-reportedLowest').value.trim(),
      reportedHighest: editorEl.querySelector('#ed-reportedHighest').value.trim(), 
      totalReports: parseInt(editorEl.querySelector('#ed-totalReports').value) || 0,
      placementRate: editorEl.querySelector('#ed-placementRate').value.trim(), 
      batchSize: editorEl.querySelector('#ed-batchSize').value.trim()
    },
    summaryDates: summaryDates,
    onlineSources: [...editorEl.querySelectorAll('.admin-source-item')].map(item => ({ 
      name: item.querySelector('.src-name').value, 
      trustLevel: item.querySelector('.src-trust').value, 
      finding: item.querySelector('.src-finding').value,
      fileUrl: item.querySelector('.src-file-url').value 
    })),
    reports: newReports,
    placementQuestions: newPQs,
    tags: newTags
  };

  if (isNew) COLLEGES.unshift(collegeData);
  else COLLEGES[COLLEGES.findIndex(c => c.id === collegeData.id)] = collegeData;

  await pushData();
  
  const saveBtn = editorEl.querySelector(sectionTarget === 'all' ? '#ed-save-master' : `[data-target="${sectionTarget}"]`);
  const origText = saveBtn.textContent;
  saveBtn.textContent = 'SAVED OK';
  saveBtn.style.background = 'var(--tier-a)';
  saveBtn.style.color = 'var(--black)';
  setTimeout(() => {
    saveBtn.textContent = origText;
    saveBtn.style.background = '';
    saveBtn.style.color = '';
  }, 1500);
}

document.addEventListener('DOMContentLoaded', loadData);