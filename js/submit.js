// ========================================
// SUBMIT PAGE — Anonymous data submission
// Persona 5 themed multi-step form
// ========================================

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
      <h1 class="submit-hero__title">SUBMIT <span>INFO</span></h1>
      <p class="submit-hero__subtitle">Help fellow students. Share your placement reality — 100% anonymous.</p>
    </div>

    <div class="submit-layout">
      <!-- LEFT: Trust info -->
      <aside class="submit-trust">
        <div class="submit-trust__card">
          <div class="submit-trust__icon">ANON</div>
          <h3 class="submit-trust__title">100% Anonymous</h3>
          <p class="submit-trust__text">Your identity is never collected. No login required. No tracking.</p>
        </div>
        <div class="submit-trust__card">
          <div class="submit-trust__icon">✓</div>
          <h3 class="submit-trust__title">Verified by Community</h3>
          <p class="submit-trust__text">Each submission gets a trust score based on detail level and cross-verification.</p>
        </div>
        <div class="submit-trust__card">
          <div class="submit-trust__icon">DATA</div>
          <h3 class="submit-trust__title">Real Impact</h3>
          <p class="submit-trust__text">Your data helps thousands of students make informed college decisions.</p>
        </div>
        <div class="submit-trust__stats">
          <div class="submit-trust__stat">
            <span class="submit-trust__stat-value">${COLLEGES.reduce((a, c) => a + c.summary.totalReports, 0)}+</span>
            <span class="submit-trust__stat-label">Reports Submitted</span>
          </div>
          <div class="submit-trust__stat">
            <span class="submit-trust__stat-value">${COLLEGES.length}</span>
            <span class="submit-trust__stat-label">Colleges Covered</span>
          </div>
        </div>
      </aside>

      <!-- RIGHT: Form -->
      <div class="submit-form-wrap">
        <form class="submit-form" id="submit-form">
          <!-- Step indicator -->
          <div class="submit-steps">
            <div class="submit-step submit-step--active" data-step="1">
              <span class="submit-step__num">1</span>
              <span class="submit-step__label">College</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="2">
              <span class="submit-step__num">2</span>
              <span class="submit-step__label">Details</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="3">
              <span class="submit-step__num">3</span>
              <span class="submit-step__label">Review</span>
            </div>
          </div>

          <!-- STEP 1: College & Type -->
          <div class="submit-panel submit-panel--active" id="step-1">
            <h2 class="submit-panel__title">Select Your College</h2>

            <div class="submit-field">
              <label class="submit-field__label">College</label>
              <select class="submit-field__select" id="submit-college" required>
                <option value="">— Choose a college —</option>
                ${COLLEGES.map(c => `<option value="${c.id}">${c.name} — ${c.location}</option>`).join('')}
                <option value="__other">My college is not listed</option>
              </select>
            </div>

            <div class="submit-field" id="other-college-field" style="display:none;">
              <label class="submit-field__label">College Name</label>
              <input class="submit-field__input" type="text" id="submit-other-name" placeholder="Full college name" />
            </div>

            <div class="submit-field">
              <label class="submit-field__label">Report Type</label>
              <div class="submit-type-grid">
                <label class="submit-type-card submit-type-card--active" data-type="personal">
                  <input type="radio" name="reportType" value="personal" checked hidden>
                  <div class="submit-type-card__icon">01</div>
                  <div class="submit-type-card__name">Personal</div>
                  <div class="submit-type-card__desc">Your own offer, CTC, experience</div>
                </label>
                <label class="submit-type-card" data-type="aggregate">
                  <input type="radio" name="reportType" value="aggregate" hidden>
                  <div class="submit-type-card__icon">02</div>
                  <div class="submit-type-card__name">Aggregate</div>
                  <div class="submit-type-card__desc">Batch-level stats you observed</div>
                </label>
                <label class="submit-type-card" data-type="question">
                  <input type="radio" name="reportType" value="question" hidden>
                  <div class="submit-type-card__icon">03</div>
                  <div class="submit-type-card__name">Interview Questions</div>
                  <div class="submit-type-card__desc">Questions asked during placements</div>
                </label>
              </div>
            </div>

            <div class="submit-field">
              <label class="submit-field__label">Year / Batch</label>
              <select class="submit-field__select" id="submit-batch">
                <option value="2026">2026</option>
                <option value="2025" selected>2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div class="submit-field">
              <label class="submit-field__label">Branch / Department</label>
              <input class="submit-field__input" type="text" id="submit-branch" placeholder="e.g. CSE, ECE, Mechanical" />
            </div>

            <button type="button" class="submit-btn submit-btn--next" id="btn-next-1">
              Next <span>→</span>
            </button>
          </div>

          <!-- STEP 2: Data Entry -->
          <div class="submit-panel" id="step-2">
            <h2 class="submit-panel__title">Share the Data</h2>

            <!-- Personal fields -->
            <div class="submit-group" id="personal-fields">
              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">Company Name</label>
                  <input class="submit-field__input" type="text" id="submit-company" placeholder="e.g. TCS, Google" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Role</label>
                  <input class="submit-field__input" type="text" id="submit-role" placeholder="e.g. SDE-1, Analyst" />
                </div>
              </div>

              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">CTC Offered</label>
                  <input class="submit-field__input" type="text" id="submit-ctc" placeholder="e.g. 8.5 LPA" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Base Pay</label>
                  <input class="submit-field__input" type="text" id="submit-base" placeholder="e.g. 5.0 LPA" />
                </div>
              </div>

              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">Variable Pay</label>
                  <input class="submit-field__input" type="text" id="submit-variable" placeholder="e.g. 1.5 LPA" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Joining Bonus</label>
                  <input class="submit-field__input" type="text" id="submit-bonus" placeholder="e.g. ₹50,000" />
                </div>
              </div>
            </div>

            <!-- Aggregate fields -->
            <div class="submit-group" id="aggregate-fields" style="display:none;">
              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">Median Package</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. 4.5 LPA" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Average Package</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. 6.2 LPA" />
                </div>
              </div>
              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">Highest Package</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. 45 LPA" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">% Placed</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. 78%" />
                </div>
              </div>
            </div>

            <!-- Question fields -->
            <div class="submit-group" id="question-fields" style="display:none;">
              <div class="submit-field-row">
                <div class="submit-field">
                  <label class="submit-field__label">Company</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. Amazon" />
                </div>
                <div class="submit-field">
                  <label class="submit-field__label">Role</label>
                  <input class="submit-field__input" type="text" placeholder="e.g. SDE-1" />
                </div>
              </div>
              <div class="submit-field">
                <label class="submit-field__label">Difficulty</label>
                <select class="submit-field__select">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option selected>Medium-Hard</option>
                  <option>Hard</option>
                  <option>Very Hard</option>
                </select>
              </div>
              <div class="submit-field">
                <label class="submit-field__label">Questions Asked</label>
                <textarea class="submit-field__textarea" rows="4" placeholder="One question per line&#10;e.g.&#10;1. Reverse a linked list&#10;2. System design: URL shortener"></textarea>
              </div>
            </div>

            <!-- Common: Comment -->
            <div class="submit-field">
              <label class="submit-field__label">Your Comment / Experience</label>
              <textarea class="submit-field__textarea" id="submit-comment" rows="4" placeholder="Share your honest experience. This will be shown anonymously."></textarea>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-2">← Back</button>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-2">Review <span>→</span></button>
            </div>
          </div>

          <!-- STEP 3: Review -->
          <div class="submit-panel" id="step-3">
            <h2 class="submit-panel__title">Review & Submit</h2>

            <div class="submit-review" id="submit-review">
              <!-- Filled dynamically -->
            </div>

            <div class="submit-disclaimer">
              <p>By submitting, you confirm this is truthful information to the best of your knowledge. All data is anonymous and will be reviewed before being published.</p>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-3">← Back</button>
              <button type="submit" class="submit-btn submit-btn--submit" id="btn-submit">
                <span class="submit-btn__icon">✦</span> Submit Report
              </button>
            </div>
          </div>

          <!-- SUCCESS state -->
          <div class="submit-panel" id="step-success" style="display:none;">
            <div class="submit-success">
              <div class="submit-success__icon">✓</div>
              <h2 class="submit-success__title">Report Submitted!</h2>
              <p class="submit-success__text">Thank you for helping the community. Your submission will be reviewed and added to the database.</p>
              <div class="submit-success__actions">
                <a href="#/" class="submit-btn submit-btn--next">Go Home</a>
                <button type="button" class="submit-btn submit-btn--back" id="btn-another">Submit Another</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  container.appendChild(page);

  // --- Interactivity ---
  const steps = page.querySelectorAll('.submit-step');
  const panels = page.querySelectorAll('.submit-panel');
  const typeCards = page.querySelectorAll('.submit-type-card');
  const collegeSelect = page.querySelector('#submit-college');
  const otherField = page.querySelector('#other-college-field');

  let currentStep = 1;

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

  // Type selection
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('submit-type-card--active'));
      card.classList.add('submit-type-card--active');
      card.querySelector('input').checked = true;

      const type = card.dataset.type;
      page.querySelector('#personal-fields').style.display = type === 'personal' ? '' : 'none';
      page.querySelector('#aggregate-fields').style.display = type === 'aggregate' ? '' : 'none';
      page.querySelector('#question-fields').style.display = type === 'question' ? '' : 'none';
    });
  });

  // College "other" toggle
  collegeSelect.addEventListener('change', () => {
    otherField.style.display = collegeSelect.value === '__other' ? '' : 'none';
  });

  // Navigation
  page.querySelector('#btn-next-1').addEventListener('click', () => {
    if (!collegeSelect.value) {
      collegeSelect.focus();
      collegeSelect.style.borderColor = 'var(--red)';
      return;
    }
    goToStep(2);
  });

  page.querySelector('#btn-back-2').addEventListener('click', () => goToStep(1));

  page.querySelector('#btn-next-2').addEventListener('click', () => {
    // Build review summary
    const collegeName = collegeSelect.value === '__other'
      ? (page.querySelector('#submit-other-name').value || 'New College')
      : (collegeSelect.options[collegeSelect.selectedIndex]?.text || '');
    const reportType = page.querySelector('input[name="reportType"]:checked')?.value || 'personal';
    const batch = page.querySelector('#submit-batch').value;
    const branch = page.querySelector('#submit-branch').value || 'Not specified';
    const comment = page.querySelector('#submit-comment').value || 'No comment';

    let dataHtml = '';
    if (reportType === 'personal') {
      dataHtml = `
        <div class="submit-review__row"><span>Company</span><span>${page.querySelector('#submit-company').value || 'N/A'}</span></div>
        <div class="submit-review__row"><span>Role</span><span>${page.querySelector('#submit-role').value || 'N/A'}</span></div>
        <div class="submit-review__row"><span>CTC</span><span>${page.querySelector('#submit-ctc').value || 'N/A'}</span></div>
        <div class="submit-review__row"><span>Base Pay</span><span>${page.querySelector('#submit-base').value || 'N/A'}</span></div>
      `;
    } else if (reportType === 'aggregate') {
      dataHtml = `<div class="submit-review__row"><span>Type</span><span>Aggregate / Batch Stats</span></div>`;
    } else {
      dataHtml = `<div class="submit-review__row"><span>Type</span><span>Interview Questions</span></div>`;
    }

    page.querySelector('#submit-review').innerHTML = `
      <div class="submit-review__row"><span>College</span><span>${collegeName}</span></div>
      <div class="submit-review__row"><span>Batch</span><span>${batch}</span></div>
      <div class="submit-review__row"><span>Branch</span><span>${branch}</span></div>
      <div class="submit-review__row"><span>Report Type</span><span>${reportType}</span></div>
      ${dataHtml}
      <div class="submit-review__comment">
        <span>Comment</span>
        <p>${comment}</p>
      </div>
    `;
    goToStep(3);
  });

  page.querySelector('#btn-back-3').addEventListener('click', () => goToStep(2));

  // Submit
  page.querySelector('#submit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    panels.forEach(p => { p.classList.remove('submit-panel--active'); p.style.display = 'none'; });
    steps.forEach(s => s.classList.add('submit-step--done'));
    const success = page.querySelector('#step-success');
    success.style.display = '';
    success.classList.add('submit-panel--active');
  });

  // Submit another
  page.querySelector('#btn-another')?.addEventListener('click', () => {
    renderSubmit(container);
  });
}
