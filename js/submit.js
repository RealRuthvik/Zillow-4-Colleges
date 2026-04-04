// ========================================
// SUBMIT PAGE — Anonymous data submission
// Persona 5 themed multi-step form
// ========================================

import { COLLEGES } from './data.js';
import { navigateTo } from './app.js';

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
      <p class="submit-hero__subtitle">Report incorrect information or share new placement realities - 100% anonymous.</p>
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
          <h3 class="submit-trust__title">All moderators are volunteers.</h3>
          <p class="submit-trust__text">Each submission gets a trust score based on detail level and cross-verification.</p>
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

      <div class="submit-form-wrap">
        <form class="submit-form" id="submit-form">
          
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
              <span class="submit-step__label">Proof</span>
            </div>
            <div class="submit-step__line"></div>
            <div class="submit-step" data-step="4">
              <span class="submit-step__num">4</span>
              <span class="submit-step__label">Review</span>
            </div>
          </div>

          <div class="submit-panel submit-panel--active" id="step-1">
            <h2 class="submit-panel__title">Select Your College</h2>

            <div class="submit-field">
              <label class="submit-field__label">College</label>
              <select class="submit-field__select" id="submit-college" required>
                <option value="">- Choose a college -</option>
                ${COLLEGES.map(c => `<option value="${c.id}">${c.name} - ${c.location}</option>`).join('')}
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
                  <div class="submit-type-card__name">Individual</div>
                  <div class="submit-type-card__desc">Your own or Someone's offer, CTC, experience</div>
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
              Next <span>></span>
            </button>
          </div>

          <div class="submit-panel" id="step-2">
            <h2 class="submit-panel__title">Share the Data</h2>

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
                  <input class="submit-field__input" type="text" id="submit-bonus" placeholder="e.g. 50,000" />
                </div>
              </div>
            </div>

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
                <textarea class="submit-field__textarea" rows="4" placeholder="One question per line\ne.g.\n1. Reverse a linked list\n2. System design: URL shortener"></textarea>
              </div>
            </div>

            <div class="submit-field">
              <label class="submit-field__label">Your Comment / Experience</label>
              <textarea class="submit-field__textarea" id="submit-comment" rows="4" placeholder="Share your honest experience. This will be shown anonymously. You can include any links to images or documents that support your submission."></textarea>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-2">< Back</button>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-2">Next <span>></span></button>
            </div>
          </div>

          <div class="submit-panel" id="step-3">
            <h2 class="submit-panel__title">Add Proof (Recommended)</h2>

            <div class="submit-review" style="border-color: var(--tier-s); margin-bottom: var(--space-xl);">
              <h3 style="color: var(--tier-s); font-family: var(--font-sub); font-size: 18px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Get the "Verified" Badge</h3>
              <p style="font-family: var(--font-body); font-size: 14px; color: var(--grey-light); line-height: 1.6; margin-bottom: 16px;">
                Submissions with proof are marked as <strong>VERIFIED</strong> and carry much more weight. You can censor your name, photo, and exact dates — we just need to see the numbers, company, or college name.
              </p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div>
                  <h4 style="color: var(--white); font-family: var(--font-sub); font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Accepted Documents:</h4>
                  <ul style="list-style: none; padding: 0; font-family: var(--font-body); font-size: 13px; color: var(--grey-light); line-height: 1.8;">
                    <li>✓ Offer Letter (CTC page)</li>
                    <li>✓ Campus Placement Email</li>
                    <li>✓ Placement Portal Screenshot</li>
                  </ul>
                </div>
                <div>
                  <h4 style="color: var(--white); font-family: var(--font-sub); font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Alternative Proofs:</h4>
                  <ul style="list-style: none; padding: 0; font-family: var(--font-body); font-size: 13px; color: var(--grey-light); line-height: 1.8;">
                    <li>✓ Salary Slip (First month)</li>
                    <li>✓ College ID Card</li>
                    <li>✓ Unofficial WhatsApp/Group Chats</li>
                  </ul>
                </div>
              </div>

              <div style="background: rgba(88, 101, 242, 0.1); border: 1px solid #5865F2; padding: 16px; border-radius: 4px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <h4 style="color: #5865F2; font-family: var(--font-heading); font-size: 22px; letter-spacing: 1px; margin: 0;">SEND TO DISCORD</h4>
                </div>
                <p style="font-family: var(--font-body); font-size: 14px; color: var(--white); line-height: 1.5; margin: 0;">
                  DM your screenshots to the server owner or drop the images to: <strong style="color: #5865F2; font-size: 16px; cursor: text;">https://discord.gg/AbX4xCaQ7m</strong><br>
                  <span style="font-size: 12px; color: var(--grey-light); display: inline-block; margin-top: 4px;">Please mention the College and Company you are submitting for so we can link it!</span>
                </p>
              </div>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-3">< Back</button>
              <button type="button" class="submit-btn submit-btn--next" id="btn-next-3">Review <span>></span></button>
            </div>
          </div>

          <div class="submit-panel" id="step-4">
            <h2 class="submit-panel__title">Review & Submit</h2>

            <div class="submit-review" id="submit-review">
            </div>

            <div class="submit-disclaimer">
              <p>By submitting, you confirm this is truthful information to the best of your knowledge. All data is anonymous and will be reviewed before being published.</p>
            </div>

            <div class="submit-btn-row">
              <button type="button" class="submit-btn submit-btn--back" id="btn-back-4">< Back</button>
              <button type="submit" class="submit-btn submit-btn--submit" id="btn-submit">
                <span class="submit-btn__icon">*</span> Submit Report
              </button>
            </div>
          </div>

          <div class="submit-panel" id="step-success" style="display:none;">
            <div class="submit-success">
              <div class="submit-success__icon">Y</div>
              <h2 class="submit-success__title">Report Submitted!</h2>
              <p class="submit-success__text">Thank you for helping the community. Your submission will be reviewed and added to the database.</p>
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

  collegeSelect.addEventListener('change', () => {
    otherField.style.display = collegeSelect.value === '__other' ? '' : 'none';
  });

  page.querySelector('#btn-next-1').addEventListener('click', () => {
    if (!collegeSelect.value) {
      collegeSelect.focus();
      collegeSelect.style.borderColor = 'var(--red)';
      return;
    }
    goToStep(2);
  });

  page.querySelector('#btn-back-2').addEventListener('click', () => goToStep(1));

  // Step 2 to 3 (Proof Step)
  page.querySelector('#btn-next-2').addEventListener('click', () => {
    goToStep(3);
  });

  // Proof Step back button
  page.querySelector('#btn-back-3').addEventListener('click', () => goToStep(2));

  // Proof Step next button -> Generates Review and goes to Step 4
  page.querySelector('#btn-next-3').addEventListener('click', () => {
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
    goToStep(4);
  });

  // Review step back button
  page.querySelector('#btn-back-4').addEventListener('click', () => goToStep(3));

  // Submit Final
  page.querySelector('#submit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = page.querySelector('#btn-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const collegeName = collegeSelect.value === '__other' ? (page.querySelector('#submit-other-name').value || 'New College') : (collegeSelect.options[collegeSelect.selectedIndex]?.text || 'Unknown');
    const reportType = page.querySelector('input[name="reportType"]:checked')?.value || 'personal';
    const batch = page.querySelector('#submit-batch').value;
    const branch = page.querySelector('#submit-branch').value || 'Not specified';
    const comment = page.querySelector('#submit-comment').value || 'No comment';

    let fields = [
      { name: "College", value: collegeName, inline: true },
      { name: "Batch", value: batch, inline: true },
      { name: "Branch", value: branch, inline: true },
      { name: "Type", value: reportType, inline: true }
    ];

    if (reportType === 'personal') {
      fields.push({ name: "Company", value: page.querySelector('#submit-company').value || 'N/A', inline: true });
      fields.push({ name: "Role", value: page.querySelector('#submit-role').value || 'N/A', inline: true });
      fields.push({ name: "CTC", value: page.querySelector('#submit-ctc').value || 'N/A', inline: true });
      fields.push({ name: "Base Pay", value: page.querySelector('#submit-base').value || 'N/A', inline: true });
    } else if (reportType === 'aggregate') {
      const aggInputs = page.querySelectorAll('#aggregate-fields .submit-field__input');
      fields.push({ name: "Median Package", value: aggInputs[0].value || 'N/A', inline: true });
      fields.push({ name: "Average Package", value: aggInputs[1].value || 'N/A', inline: true });
      fields.push({ name: "Highest Package", value: aggInputs[2].value || 'N/A', inline: true });
      fields.push({ name: "% Placed", value: aggInputs[3].value || 'N/A', inline: true });
    } else if (reportType === 'question') {
      const qInputs = page.querySelectorAll('#question-fields .submit-field__input');
      const qSelect = page.querySelector('#question-fields .submit-field__select');
      const qText = page.querySelector('#question-fields .submit-field__textarea');
      fields.push({ name: "Company", value: qInputs[0].value || 'N/A', inline: true });
      fields.push({ name: "Role", value: qInputs[1].value || 'N/A', inline: true });
      fields.push({ name: "Difficulty", value: qSelect.value || 'N/A', inline: true });
      fields.push({ name: "Questions", value: qText.value || 'N/A', inline: false });
    }

    fields.push({ name: "Comment", value: comment, inline: false });

    const payload = {
      username: "CollegeUnredacted System",
      embeds: [{
        title: "[NEW SUBMISSION] College Report",
        color: 15073298,
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
      console.error(e);
    }

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