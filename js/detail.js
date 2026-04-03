// ========================================
// COLLEGE DETAIL PAGE (v5) — Accordion cards,
// Recruiter tiles, sidebar fix, tier badges,
// 3 report types
// ========================================

import { COLLEGES } from './data.js';
import { getTier, tierBadgeHTML, getTrustColor, createReportCard, createSourceCard, createPQCard } from './components.js';

const REPORTS_PER_PAGE = 5;

export function renderDetail(container, collegeId) {
  const college = COLLEGES.find(c => c.id === collegeId);

  if (!college) {
    container.innerHTML = `
      <div class="page" style="text-align:center; padding: 160px 40px;">
        <h1 style="font-family: var(--font-heading); font-size: 64px; color: var(--grey-light);">NOT FOUND</h1>
        <p style="margin-top: 16px;"><a href="#/" style="color: var(--white);">← Go back</a></p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  container.className = 'page page-enter';

  const tier = getTier(college.trustScore);

  // -- STICKY HEADER --
  const sticky = document.createElement('div');
  sticky.className = 'detail-sticky';
  sticky.innerHTML = `
    <div class="detail-sticky__top-row">
      <button class="detail-sticky__back" id="sticky-back">◄</button>
      <div class="detail-sticky__name-block" style="padding-left: 10px;">
        <h1 class="detail-sticky__name">${college.name}</h1>
        <div class="detail-sticky__sub-row">
          <span class="detail-sticky__location">📍 ${college.location}</span>
          <span class="detail-sticky__type">${college.type}</span>
          ${college.hasHiddenBond ? '<span class="detail-sticky__bond">⚠ BOND</span>' : ''}
        </div>
      </div>
      <div class="detail-sticky__right">
        ${tierBadgeHTML(college.trustScore, 'lg')}
      </div>
    </div>
  `;
  sticky.querySelector('#sticky-back').addEventListener('click', () => window.location.hash = '#/');
  container.appendChild(sticky);

  // Hide main nav on scroll so only the college header shows
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.style.transform = 'translateY(-100%)';
        nav.style.transition = 'transform 0.25s ease';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    };
    window.addEventListener('scroll', onScroll);
    // Cleanup when navigating away
    window.addEventListener('hashchange', () => {
      nav.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', onScroll);
    }, { once: true });
  }

  // -- LAYOUT --
  const layout = document.createElement('div');
  layout.className = 'detail';

  // -- SIDEBAR INDEX --
  const sidebar = document.createElement('nav');
  sidebar.className = 'detail-index';
  sidebar.id = 'detail-index';

  const sections = [
    { id: 'summary', label: 'Summary' },
    { id: 'student-reports', label: 'Student Reports' },
    { id: 'recruiters', label: 'Recruiters' },
    { id: 'online-sources', label: 'Online Sources' },
  ];

  sidebar.innerHTML = `
    <ul class="detail-index__list">
      ${sections.map((s, i) => `
        <li class="detail-index__item ${i === 0 ? 'detail-index__item--active' : ''}" data-section="${s.id}">
          ${s.label}
        </li>
      `).join('')}
    </ul>
  `;
  layout.appendChild(sidebar);

  // -- MAIN CONTENT --
  const main = document.createElement('div');
  main.className = 'detail-main';

  // === SECTION: Summary ===
  const summarySection = document.createElement('section');
  summarySection.className = 'detail-section';
  summarySection.id = 'summary';

  const s = college.summary;
  summarySection.innerHTML = `
    <div class="detail-section__title">Summary</div>
    <div class="detail-summary">
      <div class="summary-stat">
        <div class="summary-stat__value summary-stat__value--muted">${s.claimedCTC}</div>
        <div class="summary-stat__label">Advertised CTC</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.reportedMedian}</div>
        <div class="summary-stat__label">Reported Median</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.reportedAverage}</div>
        <div class="summary-stat__label">Reported Avg</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.reportedLowest}</div>
        <div class="summary-stat__label">Lowest</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.reportedHighest}</div>
        <div class="summary-stat__label">Highest</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.totalReports}</div>
        <div class="summary-stat__label">Reports</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.placementRate}</div>
        <div class="summary-stat__label">Placed</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value">${s.batchSize}</div>
        <div class="summary-stat__label">Batch Size</div>
      </div>
    </div>
    ${college.hasHiddenBond ? `<div class="bond-alert">⚠ HIDDEN BOND: ${college.bondDetails}</div>` : ''}
  `;
  main.appendChild(summarySection);

  // === SECTION: Student Reports ===
  const reportsSection = document.createElement('section');
  reportsSection.className = 'detail-section';
  reportsSection.id = 'student-reports';
  reportsSection.innerHTML = `<div class="detail-section__title">Student Reports</div>`;

  // Tabs
  const tabBar = document.createElement('div');
  tabBar.className = 'report-tabs';
  tabBar.innerHTML = `
    <button class="report-tab report-tab--active" data-tab="overview">Overview</button>
    <button class="report-tab" data-tab="detailed">Detailed Reports</button>
  `;
  reportsSection.appendChild(tabBar);

  const overviewContent = document.createElement('div');
  overviewContent.className = 'report-tab-content report-tab-content--active';
  overviewContent.appendChild(buildOverview(college));
  reportsSection.appendChild(overviewContent);

  const detailedContent = document.createElement('div');
  detailedContent.className = 'report-tab-content';
  reportsSection.appendChild(detailedContent);

  tabBar.querySelectorAll('.report-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabBar.querySelectorAll('.report-tab').forEach(t => t.classList.remove('report-tab--active'));
      tab.classList.add('report-tab--active');
      overviewContent.classList.toggle('report-tab-content--active', tab.dataset.tab === 'overview');
      detailedContent.classList.toggle('report-tab-content--active', tab.dataset.tab === 'detailed');
      if (tab.dataset.tab === 'detailed' && detailedContent.children.length === 0) {
        renderDetailedReports(detailedContent, college.reports, 1);
      }
    });
  });

  main.appendChild(reportsSection);

  // === SECTION: Recruiters ===
  const recruitersSection = document.createElement('section');
  recruitersSection.className = 'detail-section';
  recruitersSection.id = 'recruiters';
  recruitersSection.innerHTML = `<div class="detail-section__title">Recruiters</div>`;
  recruitersSection.appendChild(buildRecruiters(college));
  main.appendChild(recruitersSection);

  // === SECTION: Online Sources ===
  const sourcesSection = document.createElement('section');
  sourcesSection.className = 'detail-section';
  sourcesSection.id = 'online-sources';
  sourcesSection.innerHTML = `<div class="detail-section__title">Online Sources</div>`;
  if (college.onlineSources && college.onlineSources.length > 0) {
    const sourcesList = document.createElement('div');
    sourcesList.className = 'sources-list';
    college.onlineSources.forEach(src => sourcesList.appendChild(createSourceCard(src)));
    sourcesSection.appendChild(sourcesList);
  }
  main.appendChild(sourcesSection);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'page-footer';
  footer.innerHTML = `
    <div class="page-footer__heart">♥</div>
    <p class="page-footer__tagline">Made for students, by students.</p>
    <p class="page-footer__honesty">Every number on this platform is crowd-sourced, unverified, and shown as-is.<br/>No data is altered. No college pays us. Transparency is the only agenda.</p>
    <p class="page-footer__disclaimer">ALL DATA IS CROWD-SOURCED & UNVERIFIED · FOR AWARENESS ONLY</p>
  `;
  main.appendChild(footer);

  layout.appendChild(main);
  container.appendChild(layout);

  setupScrollTracking(sidebar, sections);
  window.scrollTo(0, 0);
}

// ---- OVERVIEW ----
function buildOverview(college) {
  const frag = document.createDocumentFragment();
  const reports = college.reports;

  const offerReports = reports.filter(r => r.ctcOffered);
  const batchReports = reports.filter(r => r.dataReported && r.dataReported.type === 'batch_stats');
  const bondReports = reports.filter(r => r.dataReported && r.dataReported.type === 'bond_report');

  const personalCount = reports.filter(r => (r.reportType || 'personal') === 'personal').length;
  const aggCount = reports.filter(r => r.reportType === 'aggregate').length;
  const multiCount = reports.filter(r => r.reportType === 'multi_personal').length;

  const avgTrust = Math.round(reports.reduce((sum, r) => sum + r.trustScore, 0) / reports.length);

  const grid = document.createElement('div');
  grid.className = 'overview-grid';

  // Card 1: Report breakdown by type
  grid.innerHTML += `
    <div class="overview-card">
      <div class="overview-card__title">Report Breakdown</div>
      <div class="overview-stats-row">
        <div class="overview-stat-item"><div class="overview-stat-item__value">${reports.length}</div><div class="overview-stat-item__label">Total</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${personalCount}</div><div class="overview-stat-item__label">👤 Personal</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${aggCount}</div><div class="overview-stat-item__label">📊 Aggregate</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${multiCount}</div><div class="overview-stat-item__label">👥 Multi</div></div>
      </div>
    </div>
  `;

  // Card 2: Average tier
  grid.innerHTML += `
    <div class="overview-card">
      <div class="overview-card__title">Report Credibility</div>
      <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px;">
        ${tierBadgeHTML(avgTrust, 'xl')}
        <div style="font-family: var(--font-body); font-size: 13px; color: var(--grey-light); line-height: 1.6;">Average trust across ${reports.length} reports. Higher tiers = more verifiable data.</div>
      </div>
    </div>
  `;

  // Card 3: CTC range
  if (offerReports.length > 0) {
    const ctcValues = offerReports.map(r => parseFloat(r.ctcOffered));
    const minCTC = Math.min(...ctcValues);
    const maxCTC = Math.max(...ctcValues);
    const avgCTC = (ctcValues.reduce((a, b) => a + b, 0) / ctcValues.length).toFixed(1);
    grid.innerHTML += `
      <div class="overview-card">
        <div class="overview-card__title">CTC Range (From Offers)</div>
        <div class="overview-range">
          <div class="overview-range__item"><div class="overview-range__value">${minCTC} LPA</div><div class="overview-range__label">Lowest</div></div>
          <div class="overview-range__item"><div class="overview-range__value" style="font-size: 36px;">${avgCTC} LPA</div><div class="overview-range__label">Average</div></div>
          <div class="overview-range__item"><div class="overview-range__value">${maxCTC} LPA</div><div class="overview-range__label">Highest</div></div>
        </div>
      </div>
    `;
  }

  // Card 4: Companies
  if (offerReports.length > 0) {
    const companies = [...new Set(offerReports.map(r => r.company))];
    grid.innerHTML += `
      <div class="overview-card">
        <div class="overview-card__title">Companies Reported</div>
        <div class="overview-companies">${companies.map(c => `<span class="overview-company-tag">${c}</span>`).join('')}</div>
      </div>
    `;
  }

  frag.appendChild(grid);

  // Key findings
  if (reports.length > 0) {
    const findings = document.createElement('div');
    findings.className = 'overview-findings';
    findings.innerHTML = `
      <div class="overview-findings__title">Key Findings from Students</div>
      ${reports.slice(0, 3).map(r => `
        <div class="overview-findings__item">
          <span class="overview-findings__author">${r.author} (${r.batch}):</span> "${r.comment.substring(0, 140)}${r.comment.length > 140 ? '...' : ''}"
        </div>
      `).join('')}
    `;
    frag.appendChild(findings);
  }

  return frag;
}

// ---- DETAILED REPORTS (accordion + pagination) ----
function renderDetailedReports(container, reports, page) {
  container.innerHTML = '';

  const totalPages = Math.ceil(reports.length / REPORTS_PER_PAGE);
  const start = (page - 1) * REPORTS_PER_PAGE;
  const pageReports = reports.slice(start, start + REPORTS_PER_PAGE);

  const list = document.createElement('div');
  list.className = 'report-list';

  pageReports.forEach((report, i) => {
    const card = createReportCard(report, i);
    list.appendChild(card);
  });

  // ACCORDION: only one open at a time
  list.addEventListener('click', (e) => {
    const header = e.target.closest('.report-card__header');
    if (!header) return;

    const card = header.closest('.report-card');
    const wasExpanded = card.classList.contains('report-card--expanded');

    // Close all
    list.querySelectorAll('.report-card--expanded').forEach(c => c.classList.remove('report-card--expanded'));

    // Toggle clicked
    if (!wasExpanded) {
      card.classList.add('report-card--expanded');
    }
  });

  container.appendChild(list);

  // Pagination
  if (totalPages > 1) {
    const pag = document.createElement('div');
    pag.className = 'pagination';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination__btn';
    prevBtn.textContent = '← Prev';
    prevBtn.disabled = page <= 1;
    prevBtn.addEventListener('click', () => renderDetailedReports(container, reports, page - 1));
    pag.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = `pagination__btn ${i === page ? 'pagination__btn--active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => renderDetailedReports(container, reports, i));
      pag.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination__btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = page >= totalPages;
    nextBtn.addEventListener('click', () => renderDetailedReports(container, reports, page + 1));
    pag.appendChild(nextBtn);

    container.appendChild(pag);
  }
}

// ---- RECRUITERS (tiles, click to expand) ----
function buildRecruiters(college) {
  const frag = document.createDocumentFragment();

  const companyMap = {};
  college.reports.forEach(r => {
    if (r.company) {
      if (!companyMap[r.company]) companyMap[r.company] = { offers: [], questions: [] };
      companyMap[r.company].offers.push(r);
    }
  });
  if (college.placementQuestions) {
    college.placementQuestions.forEach(pq => {
      if (!companyMap[pq.company]) companyMap[pq.company] = { offers: [], questions: [] };
      companyMap[pq.company].questions.push(pq);
    });
  }

  const companies = Object.keys(companyMap);

  if (companies.length === 0) {
    const empty = document.createElement('p');
    empty.style.cssText = 'color: var(--grey-light); font-style: italic;';
    empty.textContent = 'No recruiter data reported yet.';
    frag.appendChild(empty);
    return frag;
  }

  const grid = document.createElement('div');
  grid.className = 'recruiter-grid';

  companies.forEach(company => {
    const data = companyMap[company];
    const tile = document.createElement('div');
    tile.className = 'recruiter-tile';

    // Tile header — just company name + logo initial
    tile.innerHTML = `
      <div class="recruiter-tile__header">
        <div class="recruiter-tile__logo">${company.charAt(0)}</div>
        <div class="recruiter-tile__name">${company}</div>
      </div>
      <div class="recruiter-tile__body">
        ${buildRecruiterBody(data)}
      </div>
    `;

    tile.querySelector('.recruiter-tile__header').addEventListener('click', () => {
      const wasOpen = tile.classList.contains('recruiter-tile--open');
      // Close others
      grid.querySelectorAll('.recruiter-tile--open').forEach(t => t.classList.remove('recruiter-tile--open'));
      if (!wasOpen) tile.classList.add('recruiter-tile--open');
    });

    grid.appendChild(tile);
  });

  frag.appendChild(grid);
  return frag;
}

function buildRecruiterBody(data) {
  let html = '';

  if (data.offers.length > 0) {
    const offer = data.offers[0];
    html += `<div class="recruiter-detail-grid">`;
    html += `<div class="recruiter-detail-card"><div class="recruiter-detail-card__label">Role</div><div class="recruiter-detail-card__value">${offer.role || 'N/A'}</div></div>`;
    html += `<div class="recruiter-detail-card"><div class="recruiter-detail-card__label">CTC</div><div class="recruiter-detail-card__value">${offer.ctcOffered || 'N/A'}</div></div>`;
    if (offer.ctcBreakdown) {
      html += `<div class="recruiter-detail-card"><div class="recruiter-detail-card__label">Base Pay</div><div class="recruiter-detail-card__value">${offer.ctcBreakdown.basePay}</div></div>`;
      html += `<div class="recruiter-detail-card"><div class="recruiter-detail-card__label">Variable</div><div class="recruiter-detail-card__value">${offer.ctcBreakdown.variablePay}</div></div>`;
    }
    html += `</div>`;
  }

  if (data.questions.length > 0) {
    html += `<div class="recruiter-questions-section">`;
    html += `<div class="recruiter-questions-title">Interview Questions</div>`;
    data.questions.forEach(pq => {
      const diffClass = pq.difficulty.replace(/\s/g, '-');
      html += `
        <div class="recruiter-question-block">
          <div class="recruiter-question-block__header">
            <span>${pq.role} · ${pq.date}</span>
            <span class="pq-card__difficulty pq-card__difficulty--${diffClass}">${pq.difficulty}</span>
          </div>
          <ol class="recruiter-question-block__list">
            ${pq.questions.map(q => `<li>${q}</li>`).join('')}
          </ol>
        </div>
      `;
    });
    html += `</div>`;
  }

  return html;
}

// ---- SCROLL TRACKING ----
function setupScrollTracking(sidebar, sections) {
  const items = sidebar.querySelectorAll('.detail-index__item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach(item => {
          item.classList.toggle('detail-index__item--active', item.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
}
