import { COLLEGES } from './data.js';

export function renderSubmit(container) {
  container.innerHTML = '';
  container.className = 'page page-enter';
  window.scrollTo(0, 0);

  const page = document.createElement('div');
  page.className = 'submit-page';

  page.innerHTML = `
    <div class="submit-hero">
      <div class="submit-hero__accent"></div>
      <h1 class="submit-hero__title">SUBMIT / <span>FIX DATA</span></h1>
      <p class="submit-hero__subtitle">Report incorrect information or share new placement realities.</p>
    </div>

    <div class="submit-layout">
      <aside class="submit-trust">
        <div class="submit-trust__card">
          <div class="submit-trust__icon">We are also students</div>
          <h3 class="submit-trust__title">100% Anonymous</h3>
          <p class="submit-trust__text">Your identity is never collected. No login required. No tracking.</p>
        </div>
        <div class="submit-trust__card">
          <div class="submit-trust__icon">Verified by Community</div>
          <h3 class="submit-trust__title">Moderated Data</h3>
          <p class="submit-trust__text">Each submission gets a trust score based on detail level and cross-verification.</p>
        </div>
        <div class="submit-trust__stats">
          <div class="submit-trust__stat">
            <span class="submit-trust__stat-value">${COLLEGES.reduce((a, c) => a + c.summary.totalReports, 0)}+</span>
            <span class="submit-trust__stat-label">Reports</span>
          </div>
          <div class="submit-trust__stat">
            <span class="submit-trust__stat-value">${COLLEGES.length}</span>
            <span class="submit-trust__stat-label">Colleges</span>
          </div>
        </div>
      </aside>

      <div class="submit-form-wrap">
        <form class="submit-form" id="submit-form">
          
          <div class="submit-steps">
            <div class="submit-step submit-step--active" data-step="1">
              <span class="submit-step__num">1</span>
              <span class="submit-step__label">Stats</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="2">
              <span class="submit-step__num">2</span>
              <span class="submit-step__label">Reports</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="3">
              <span class="submit-step__num">3</span>
              <span class="submit-step__label">Proof</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="4">
              <span class="submit-step__num">4</span>
              <span class="submit-step__label">Review</span>
            </div>
          </div>

          <div class="submit-panel submit-panel--active" id="step-1">
            <h2 class="submit-panel__title">Select & Fix College Stats</h2>
            <p class="submit-desc">Leave fields blank if you don't know the information. We only update what you provide.</p>

            <div class="submit-field-row">
              <div class="submit-field">
                <label class="submit-field__label">Target College *</label>
                <select class="submit-field__select" id="submit-college" required>
                  <option value="">Choose a college...</option>
                  ${COLLEGES.map(c => `<option value="${c.id}">${c.name} (${c.location})</option>`).join('')}
                  <option value="__other">My college is not listed</option>
                </select>
              </div>
              <div class="submit-field">
                <label class="submit-field__label">Data Year (e.g. 2023-2024)</label>
                <input class="submit-field__input" type="text" id="submit-stat-year" placeholder="Optional" />
              </div>
            </div>

            <div class="submit-field" id="other-college-field" style="display:none;">
              <label class="submit-field__label">College Name *</label>
              <input class="submit-field__input" type="text" id="submit-other-name" placeholder="Full college name" />
            </div>

            <div id="stats-editor-container" style="display:none;">
              <div class="stats-editor-header">
                <h3 class="submit-panel__subtitle">Suggest Overall Overrides</h3>
              </div>
              <div class="stats-edit-grid" id="stats-grid">
                </div>

              <div class="stats-editor-header" style="margin-top: 32px;">
                <h3 class="submit-panel__subtitle">Branch Specific Stats</h3>
              </div>
              <div id="branch-stats-container">
                </div>
              <button type="button" class="submit-btn submit-btn--outline" id="btn-add-branch">+ Add Branch Stat</button>
            </div>

            <div class="submit-btn-row">
              <div></div>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-1">Next <span>></span></button>
            </div>
          </div>

          <div class="submit-panel" id="step-2">
            <h2 class="submit-panel__title">Add New Reports</h2>
            <p class="submit-desc">Want to add a specific company offer, aggregate stats, or interview questions? Select a type below or skip this step.</p>

            <div class="submit-field">
              <div class="submit-type-grid">
                <label class="submit-type-card submit-type-card--active" data-type="none">
                  <input type="radio" name="reportType" value="none" checked hidden>
                  <div class="submit-type-card__icon">00</div>
                  <div class="submit-type-card__name">Skip</div>
                  <div class="submit-type-card__desc">Just update stats</div>
                </label>
                <label class="submit-type-card" data-type="personal">
                  <input type="radio" name="reportType" value="personal" hidden>
                  <div class="submit-type-card__icon">01</div>
                  <div class="submit-type-card__name">Offer Data</div>
                  <div class="submit-type-card__desc">Specific CTC breakdown</div>
                </label>
                <label class="submit-type-card" data-type="aggregate">
                  <input type="radio" name="reportType" value="aggregate" hidden>
                  <div class="submit-type-card__icon">02</div>
                  <div class="submit-type-card__name">Batch Stats</div>
                  <div class="submit-type-card__desc">New branch data</div>
                </label>
                <label class="submit-type-card" data-type="question">
                  <input type="radio" name="reportType" value="question" hidden>
                  <div class="submit-type-card__icon">03</div>
                  <div class="submit-type-card__name">Interview</div>
                  <div class="submit-type-card__desc">Questions & experience</div>
                </label>
              </div>
            </div>

            <div id="dynamic-report-fields" style="display:none;">
              
              <div class="submit-report-meta">
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">You Are A...</label>
                    <select class="submit-field__select" id="submit-author">
                      <option value="Current Student">Current Student</option>
                      <option value="Alumni">Alumni</option>
                      <option value="Placement Cell">Placement Cell</option>
                      <option value="Anonymous" selected>Anonymous Source</option>
                    </select>
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Exact Date (Optional)</label>
                    <input class="submit-field__input" type="date" id="submit-exact-date" style="color-scheme: dark;" />
                  </div>
                </div>
                
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Drive Type</label>
                    <select class="submit-field__select" id="submit-drive-type">
                      <option value="On-Campus" selected>On-Campus</option>
                      <option value="Off-Campus">Off-Campus</option>
                      <option value="Pool Campus">Pool Campus</option>
                    </select>
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Year / Batch</label>
                    <input class="submit-field__input" type="text" id="submit-batch" placeholder="e.g. 2025" />
                  </div>
                </div>
              </div>

              <div class="submit-group" id="personal-fields" style="display:none;">
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Company Name</label>
                    <input class="submit-field__input" type="text" id="submit-company" placeholder="e.g. TCS, Google" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Role</label>
                    <input class="submit-field__input" type="text" id="submit-role" placeholder="e.g. SDE-1" />
                  </div>
                </div>
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Branch of Student</label>
                    <input class="submit-field__input" type="text" id="submit-personal-branch" placeholder="e.g. CSE" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Total CTC Offered</label>
                    <input class="submit-field__input" type="text" id="submit-ctc" placeholder="e.g. 8.5 LPA" />
                  </div>
                </div>
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Base Pay</label>
                    <input class="submit-field__input" type="text" id="submit-base" placeholder="e.g. 5.0 LPA" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Variable / Bonus</label>
                    <input class="submit-field__input" type="text" id="submit-variable" placeholder="e.g. 1.5 LPA" />
                  </div>
                </div>
              </div>

              <div class="submit-group" id="aggregate-fields" style="display:none;">
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Branch / Department</label>
                    <input class="submit-field__input" type="text" id="submit-agg-branch" placeholder="e.g. Mechanical" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Highest Package</label>
                    <input class="submit-field__input" type="text" id="agg-highest" placeholder="e.g. 45 LPA" />
                  </div>
                </div>
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Average Package</label>
                    <input class="submit-field__input" type="text" id="agg-average" placeholder="e.g. 6.2 LPA" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Median Package</label>
                    <input class="submit-field__input" type="text" id="agg-median" placeholder="e.g. 4.5 LPA" />
                  </div>
                </div>
              </div>

              <div class="submit-group" id="question-fields" style="display:none;">
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Company</label>
                    <input class="submit-field__input" type="text" id="q-company" placeholder="e.g. Amazon" />
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Role</label>
                    <input class="submit-field__input" type="text" id="q-role" placeholder="e.g. SDE-1" />
                  </div>
                </div>
                <div class="submit-field-row">
                  <div class="submit-field">
                    <label class="submit-field__label">Difficulty</label>
                    <select class="submit-field__select" id="q-difficulty">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option selected>Medium-Hard</option>
                      <option>Hard</option>
                      <option>Very Hard</option>
                    </select>
                  </div>
                  <div class="submit-field">
                    <label class="submit-field__label">Interview Rounds</label>
                    <input class="submit-field__input" type="text" id="q-rounds" placeholder="e.g. 1 OA, 2 Tech, 1 HR" />
                  </div>
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Questions Asked / Experience</label>
                  <textarea class="submit-field__textarea" id="q-text" rows="4" placeholder="1. Reverse a linked list..."></textarea>
                </div>
              </div>
            </div>

            <div class="submit-field">
              <label class="submit-field__label">Context / Comments</label>
              <textarea class="submit-field__textarea" id="submit-comment" rows="2" placeholder="Share any extra context regarding the stats or the report."></textarea>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-2">< Back</button>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-2">Next <span>></span></button>
            </div>
          </div>

          <div class="submit-panel" id="step-3">
            <h2 class="submit-panel__title">Provide Proof</h2>
            
            <div class="proof-container">
              <div class="proof-info">
                <h3>Get Verified</h3>
                <p>Submissions with proof update the database faster. Censor personal info. We just need to see the numbers, company, or college name.</p>
                <ul>
                  <li>Offer Letters (CTC page)</li>
                  <li>Campus Placement Emails</li>
                  <li>Salary Slips</li>
                  <li>Placement Portal Screenshots</li>
                </ul>
              </div>

              <div class="proof-inputs">
                <div class="submit-field">
                  <label class="submit-field__label">Upload Images/PDFs</label>
                  <label class="file-upload-btn">
                    <input type="file" id="submit-files" multiple accept="image/*,.pdf" />
                    <span>Choose Files</span>
                  </label>
                  <div id="file-list" class="file-list"></div>
                </div>

                <div class="submit-field">
                  <label class="submit-field__label">External Links (Drive, Imgur, etc.)</label>
                  <textarea class="submit-field__textarea" id="submit-links" rows="2" placeholder="Paste links here..."></textarea>
                </div>
              </div>
            </div>

            <div class="discord-callout">
              <h4>Or send via Discord</h4>
              <p>DM screenshots to the server owner or drop them here: <strong>https://discord.gg/AbX4xCaQ7m</strong></p>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-3">< Back</button>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-3">Review <span>></span></button>
            </div>
          </div>

          <div class="submit-panel" id="step-4">
            <h2 class="submit-panel__title">Review & Submit</h2>

            <div class="submit-review" id="submit-review"></div>

            <div class="submit-disclaimer">
              <p>By submitting, you confirm this is truthful information to the best of your knowledge. All data is anonymous and will be reviewed before being published.</p>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-4">< Back</button>
              <button type="submit" class="submit-btn submit-btn--submit" id="btn-submit">
                <span class="submit-btn__icon">*</span> Submit Data
              </button>
            </div>
          </div>

          <div class="submit-panel" id="step-success" style="display:none;">
            <div class="submit-success">
              <div class="submit-success__icon">Y</div>
              <h2 class="submit-success__title">Data Submitted!</h2>
              <p class="submit-success__text">Thank you for helping the community. Your submission is in the queue for moderator review.</p>
              <div class="submit-success__actions">
                <a href="/" data-link class="submit-btn submit-btn--next">Go Home</a>
                <button type="button" class="submit-btn submit-btn--back" id="btn-another">Submit Another</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  container.appendChild(page);

  // Element References
  const steps = page.querySelectorAll('.submit-step');
  const panels = page.querySelectorAll('.submit-panel');
  const typeCards = page.querySelectorAll('.submit-type-card');
  const collegeSelect = page.querySelector('#submit-college');
  const otherField = page.querySelector('#other-college-field');
  const statsEditor = page.querySelector('#stats-editor-container');
  const statsGrid = page.querySelector('#stats-grid');
  const branchContainer = page.querySelector('#branch-stats-container');
  const dynamicReportFields = page.querySelector('#dynamic-report-fields');
  const fileInput = page.querySelector('#submit-files');
  const fileList = page.querySelector('#file-list');

  let currentStep = 1;
  let activeReportType = 'none';
  let uploadedFiles = [];
  let branchCount = 0;

  function goToStep(n) {
    currentStep = n;
    panels.forEach(p => p.classList.remove('submit-panel--active'));
    steps.forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('submit-step--active', sn === n);
      s.classList.toggle('submit-step--done', sn < n);
    });
    const target = page.querySelector(`#step-${n}`);
    if (target) {
      target.classList.add('submit-panel--active');
      target.style.display = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Generate Stats Grid
  function renderStatsGrid(collegeId) {
    branchContainer.innerHTML = ''; // Reset branches
    branchCount = 0;

    if (collegeId === '__other' || !collegeId) {
      statsEditor.style.display = 'none';
      return;
    }
    const college = COLLEGES.find(c => c.id === collegeId);
    if (!college) return;
    
    statsEditor.style.display = 'block';
    const s = college.summary;
    
    const rows = [
      { key: 'claimedCTC', label: 'Claimed CTC', val: s.claimedCTC },
      { key: 'reportedMedian', label: 'Median Package', val: s.reportedMedian },
      { key: 'reportedAverage', label: 'Average Package', val: s.reportedAverage },
      { key: 'reportedHighest', label: 'Highest Package', val: s.reportedHighest },
      { key: 'reportedLowest', label: 'Lowest Package', val: s.reportedLowest },
      { key: 'placementRate', label: 'Placement Rate', val: s.placementRate },
      { key: 'batchSize', label: 'Batch Size', val: s.batchSize }
    ];

    statsGrid.innerHTML = rows.map(r => `
      <div class="stat-edit-row">
        <div class="stat-edit-label">${r.label}</div>
        <div class="stat-edit-old">${r.val || 'N/A'}</div>
        <div class="stat-edit-arrow">→</div>
        <input type="text" class="stat-edit-input" id="update_${r.key}" placeholder="New...">
      </div>
    `).join('');
  }

  // Add Branch Stat Row
  page.querySelector('#btn-add-branch').addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'branch-edit-row';
    row.innerHTML = `
      <input type="text" class="submit-field__input b-name" placeholder="Branch (e.g. CSE)" />
      <input type="text" class="submit-field__input b-high" placeholder="High" />
      <input type="text" class="submit-field__input b-avg" placeholder="Avg" />
      <input type="text" class="submit-field__input b-med" placeholder="Med" />
      <button type="button" class="branch-edit-remove">×</button>
    `;
    row.querySelector('.branch-edit-remove').addEventListener('click', () => row.remove());
    branchContainer.appendChild(row);
    branchCount++;
  });

  collegeSelect.addEventListener('change', () => {
    otherField.style.display = collegeSelect.value === '__other' ? '' : 'none';
    renderStatsGrid(collegeSelect.value);
  });

  // Report Type Selection
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('submit-type-card--active'));
      card.classList.add('submit-type-card--active');
      card.querySelector('input').checked = true;
      activeReportType = card.dataset.type;

      dynamicReportFields.style.display = activeReportType === 'none' ? 'none' : 'block';
      page.querySelector('#personal-fields').style.display = activeReportType === 'personal' ? 'block' : 'none';
      page.querySelector('#aggregate-fields').style.display = activeReportType === 'aggregate' ? 'block' : 'none';
      page.querySelector('#question-fields').style.display = activeReportType === 'question' ? 'block' : 'none';
    });
  });

  // File Upload
  fileInput.addEventListener('change', (e) => {
    uploadedFiles = Array.from(e.target.files);
    fileList.innerHTML = uploadedFiles.map(f => `<div class="file-item">${f.name}</div>`).join('');
  });

  // Navigation Logic
  page.querySelector('#btn-next-1').addEventListener('click', () => {
    if (!collegeSelect.value) {
      collegeSelect.focus();
      collegeSelect.style.borderColor = 'var(--red)';
      return;
    }
    collegeSelect.style.borderColor = 'var(--grey-mid)';
    goToStep(2);
  });

  page.querySelector('#btn-back-2').addEventListener('click', () => goToStep(1));
  page.querySelector('#btn-next-2').addEventListener('click', () => goToStep(3));
  page.querySelector('#btn-back-3').addEventListener('click', () => goToStep(2));

  page.querySelector('#btn-next-3').addEventListener('click', () => {
    generateReview();
    goToStep(4);
  });

  page.querySelector('#btn-back-4').addEventListener('click', () => goToStep(3));

  // Review Generation
  function generateReview() {
    const collegeName = collegeSelect.value === '__other'
      ? (page.querySelector('#submit-other-name').value || 'New College')
      : (collegeSelect.options[collegeSelect.selectedIndex]?.text || '');
    
    const dataYear = page.querySelector('#submit-stat-year').value || 'Not Specified';

    let html = `
      <div class="submit-review__section">
        <div class="submit-review__row"><span>Target College</span><span>${collegeName}</span></div>
        <div class="submit-review__row"><span>Data Year</span><span>${dataYear}</span></div>
      </div>
    `;

    // Overall Stats
    const statsUpdates = [];
    if (collegeSelect.value !== '__other' && collegeSelect.value !== '') {
      statsGrid.querySelectorAll('.stat-edit-input').forEach(input => {
        if (input.value.trim() !== '') {
          const label = input.closest('.stat-edit-row').querySelector('.stat-edit-label').textContent;
          const old = input.closest('.stat-edit-row').querySelector('.stat-edit-old').textContent;
          statsUpdates.push(`<tr><td>${label}</td><td>${old}</td><td>${input.value}</td></tr>`);
        }
      });
    }

    if (statsUpdates.length > 0) {
      html += `
        <div class="submit-review__section">
          <h4>Overall Stats Updates</h4>
          <table class="review-table">
            <thead><tr><th>Stat</th><th>Current</th><th>Suggested</th></tr></thead>
            <tbody>${statsUpdates.join('')}</tbody>
          </table>
        </div>
      `;
    }

    // Branch Stats
    const branchRows = branchContainer.querySelectorAll('.branch-edit-row');
    if (branchRows.length > 0) {
      let bHtml = `<div class="submit-review__section"><h4>Branch Stats</h4><table class="review-table"><thead><tr><th>Branch</th><th>High</th><th>Avg</th><th>Med</th></tr></thead><tbody>`;
      branchRows.forEach(row => {
        const n = row.querySelector('.b-name').value || '-';
        const h = row.querySelector('.b-high').value || '-';
        const a = row.querySelector('.b-avg').value || '-';
        const m = row.querySelector('.b-med').value || '-';
        if(n !== '-' || h !== '-' || a !== '-' || m !== '-') {
           bHtml += `<tr><td>${n}</td><td>${h}</td><td>${a}</td><td>${m}</td></tr>`;
        }
      });
      bHtml += `</tbody></table></div>`;
      html += bHtml;
    }

    // Report Review
    if (activeReportType !== 'none') {
      const author = page.querySelector('#submit-author').value;
      const date = page.querySelector('#submit-exact-date').value || 'Not Specified';
      const drive = page.querySelector('#submit-drive-type').value;

      html += `<div class="submit-review__section"><h4>New Report: ${activeReportType.toUpperCase()}</h4>`;
      html += `
        <div class="submit-review__row"><span>Author / Date</span><span>${author} | ${date}</span></div>
        <div class="submit-review__row"><span>Drive Type</span><span>${drive}</span></div>
      `;

      if (activeReportType === 'personal') {
        html += `
          <div class="submit-review__row"><span>Company/Role</span><span>${page.querySelector('#submit-company').value || '-'} / ${page.querySelector('#submit-role').value || '-'}</span></div>
          <div class="submit-review__row"><span>CTC</span><span>${page.querySelector('#submit-ctc').value || '-'}</span></div>
        `;
      } else if (activeReportType === 'aggregate') {
        html += `<div class="submit-review__row"><span>Branch</span><span>${page.querySelector('#submit-agg-branch').value || '-'}</span></div>`;
      } else if (activeReportType === 'question') {
        html += `<div class="submit-review__row"><span>Company</span><span>${page.querySelector('#q-company').value || '-'}</span></div>`;
      }
      html += `</div>`;
    }

    const proofLinks = page.querySelector('#submit-links').value.trim();
    const comment = page.querySelector('#submit-comment').value.trim();

    html += `<div class="submit-review__section"><h4>Attachments & Notes</h4>`;
    if (uploadedFiles.length > 0) html += `<p class="review-text"><strong>Files:</strong> ${uploadedFiles.map(f => f.name).join(', ')}</p>`;
    if (proofLinks) html += `<p class="review-text"><strong>Links:</strong> ${proofLinks}</p>`;
    if (comment) html += `<p class="review-text"><strong>Comment:</strong> ${comment}</p>`;
    if (uploadedFiles.length === 0 && !proofLinks && !comment) html += `<p class="review-empty">None provided.</p>`;
    html += `</div>`;

    page.querySelector('#submit-review').innerHTML = html;
  }

  // Webhook Submit logic
  page.querySelector('#submit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = page.querySelector('#btn-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const collegeName = collegeSelect.value === '__other' ? (page.querySelector('#submit-other-name').value || 'New College') : (collegeSelect.options[collegeSelect.selectedIndex]?.text || 'Unknown');
    const fields = [
      { name: "Target", value: `${collegeName} (Year: ${page.querySelector('#submit-stat-year').value || 'N/A'})`, inline: false }
    ];

    // Harvest Stats
    const statsUpdates = [];
    if (collegeSelect.value !== '__other' && collegeSelect.value !== '') {
      statsGrid.querySelectorAll('.stat-edit-input').forEach(input => {
        if (input.value.trim() !== '') {
          const label = input.closest('.stat-edit-row').querySelector('.stat-edit-label').textContent;
          const old = input.closest('.stat-edit-row').querySelector('.stat-edit-old').textContent;
          statsUpdates.push(`${label}: ${old} -> ${input.value}`);
        }
      });
    }
    if (statsUpdates.length > 0) fields.push({ name: "Overall Stats Changes", value: statsUpdates.join('\n'), inline: false });

    // Harvest Branch Stats
    const branchUpdates = [];
    branchContainer.querySelectorAll('.branch-edit-row').forEach(row => {
        const n = row.querySelector('.b-name').value;
        if(n) {
           branchUpdates.push(`${n} - High: ${row.querySelector('.b-high').value || '-'}, Avg: ${row.querySelector('.b-avg').value || '-'}, Med: ${row.querySelector('.b-med').value || '-'}`);
        }
    });
    if (branchUpdates.length > 0) fields.push({ name: "Branch Stats Added", value: branchUpdates.join('\n'), inline: false });

    // Harvest Report Data
    if (activeReportType !== 'none') {
      const meta = `Author: ${page.querySelector('#submit-author').value}\nDate: ${page.querySelector('#submit-exact-date').value || 'N/A'}\nDrive: ${page.querySelector('#submit-drive-type').value}\nBatch: ${page.querySelector('#submit-batch').value || 'N/A'}`;
      fields.push({ name: "Report Meta", value: meta, inline: false });
      
      let rData = `Type: ${activeReportType}\n`;
      if (activeReportType === 'personal') {
        rData += `Company: ${page.querySelector('#submit-company').value}\nRole: ${page.querySelector('#submit-role').value}\nBranch: ${page.querySelector('#submit-personal-branch').value}\nTotal: ${page.querySelector('#submit-ctc').value}\nBase: ${page.querySelector('#submit-base').value}\nBonus: ${page.querySelector('#submit-variable').value}`;
      } else if (activeReportType === 'aggregate') {
        rData += `Branch: ${page.querySelector('#submit-agg-branch').value}\nHighest: ${page.querySelector('#agg-highest').value}\nAvg: ${page.querySelector('#agg-average').value}\nMed: ${page.querySelector('#agg-median').value}`;
      } else if (activeReportType === 'question') {
        rData += `Company: ${page.querySelector('#q-company').value}\nRole: ${page.querySelector('#q-role').value}\nDiff: ${page.querySelector('#q-difficulty').value}\nRounds: ${page.querySelector('#q-rounds').value}\nQs: ${page.querySelector('#q-text').value.substring(0, 500)}`;
      }
      fields.push({ name: "Report Data", value: rData, inline: false });
    }

    const proofLinks = page.querySelector('#submit-links').value;
    const comment = page.querySelector('#submit-comment').value;

    if (uploadedFiles.length > 0) fields.push({ name: "Files Uploaded (Check Discord UI)", value: uploadedFiles.map(f => f.name).join(', '), inline: false });
    if (proofLinks) fields.push({ name: "Proof Links", value: proofLinks, inline: false });
    if (comment) fields.push({ name: "Comments", value: comment, inline: false });

    const payload = {
      username: "CollegeUnredacted Updater",
      embeds: [{
        title: "[NEW SUBMISSION] Data Verification Required",
        color: 15073298, // The red color
        fields: fields,
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch("https://discord.com/api/webhooks/1489975893509279846/pgOPJjrsOQNB7Oa-R_DnlG1SKADTOKtJtzyMKMk36OvhtBKHlhBQnfmNFn8HrfqctGf8", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error("Webhook failed:", e);
    }

    // Show success panel
    panels.forEach(p => { p.classList.remove('submit-panel--active'); p.style.display = 'none'; });
    steps.forEach(s => s.classList.add('submit-step--done'));
    const success = page.querySelector('#step-success');
    success.style.display = '';
    success.classList.add('submit-panel--active');
  });

  page.querySelector('#btn-another')?.addEventListener('click', () => {
    renderSubmit(container);
  });
}