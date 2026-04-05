import { COLLEGES } from './data.js';
import { getTier, tierBadgeHTML, createReportCard, createSourceCard, formatFullCTC } from './components.js';
import { navigateTo } from './app.js';
import { renderNotFound } from './notfound.js';

const REPORTS_PER_PAGE = 5;

export function renderDetail(container, collegeId) {
  const college = COLLEGES.find(c => c.id === collegeId);

  if (!college) {
    renderNotFound(container);
    return;
  }

  container.innerHTML = '';
  container.className = 'page page-enter';

  const tier = getTier(college.trustScore);

  let headerTagsHTML = '';
  if (college.tags) {
    headerTagsHTML = college.tags.map(t => {
      if (typeof t === 'string') return `<span class="detail-sticky__type" style="background: var(--grey-mid);">${t}</span>`;
      
      let bg = 'var(--grey-mid)';
      let shadow = 'var(--black)';
      if (t.color === 'red') { bg = 'var(--red)'; shadow = 'var(--red-dark)'; }
      if (t.color === 'yellow') { bg = 'var(--tier-s)'; shadow = '#B89C00'; }
      if (t.color === 'blue') { bg = 'var(--tier-b)'; shadow = '#008ba3'; }
      if (t.color === 'orange') { bg = 'var(--tier-c)'; shadow = '#c67100'; }
      if (t.color === 'green') { bg = 'var(--tier-a)'; shadow = '#00b35c'; }

      const textCol = t.color === 'yellow' ? 'var(--black)' : 'var(--white)';
      return `<span class="detail-sticky__bond" style="background: ${bg}; color: ${textCol}; box-shadow: 2px 2px 0 ${shadow};">${t.text}</span>`;
    }).join('');
  }

  const sticky = document.createElement('div');
  sticky.className = 'detail-sticky';
  sticky.innerHTML = `
    <div class="detail-sticky__top-row">
      <button class="detail-sticky__back" id="sticky-back">◄</button>
      <div class="detail-sticky__name-block">
        <h1 class="detail-sticky__name">${college.name}</h1>
        <div class="detail-sticky__sub-row">
          <span class="detail-sticky__location">${college.location}</span>
          <span class="detail-sticky__type">${college.type}</span>
          ${headerTagsHTML}
        </div>
      </div>
      <div class="detail-sticky__right">
        ${tierBadgeHTML(college.trustScore, 'lg')}
      </div>
    </div>
  `;
  sticky.querySelector('#sticky-back').addEventListener('click', () => navigateTo('/'));
  container.appendChild(sticky);

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
    const cleanUp = () => {
      nav.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', cleanUp);
    };
    window.addEventListener('popstate', cleanUp);
  }

  const layout = document.createElement('div');
  layout.className = 'detail';

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

  const main = document.createElement('div');
  main.className = 'detail-main';

  const summarySection = document.createElement('section');
  summarySection.className = 'detail-section';
  summarySection.id = 'summary';

  const s = college.summary;
  const sDates = college.summaryDates || {};
  const updatedFull = college.lastUpdatedFull || 'N/A';
  
  const hasWarn = college.hasWarning || college.hasHiddenBond;
  const warnLabel = college.warningLabel || (college.hasHiddenBond ? 'HIDDEN BOND' : 'WARNING');
  const warnDetails = college.warningDetails || college.bondDetails || '';

  const advFull = formatFullCTC(s.claimedCTC) || s.claimedCTC;
  let advBlock = `
    <div class="summary-stat__value summary-stat__value--muted" style="font-size: 24px; margin-bottom: 2px;">${advFull}</div>
    <div class="summary-stat__label summary-stat__value--muted" style="font-size: 12px; margin-bottom: 8px;">${s.claimedCTC}</div>
  `;
  const medFull = formatFullCTC(s.reportedMedian) || s.reportedMedian;
  if (s.advertisedSameAsReported) {
    advBlock = `
      <div class="summary-stat__value" style="color: var(--tier-a); font-size: 22px; margin-bottom: 2px;">${medFull}</div>
      <div class="summary-stat__label" style="color: var(--tier-a); font-size: 12px; margin-bottom: 8px;">${s.reportedMedian}</div>
    `;
  }

  const avgFull = formatFullCTC(s.reportedAverage) || s.reportedAverage;
  const lowFull = formatFullCTC(s.reportedLowest) || s.reportedLowest;
  const highFull = formatFullCTC(s.reportedHighest) || s.reportedHighest;

  summarySection.innerHTML = `
    <div class="detail-section__title">
      Summary
      <span class="detail-section__updated">Updated ${updatedFull}</span>
    </div>
    <div class="detail-summary">
      <div class="summary-stat">
        ${advBlock}
        <div class="summary-stat__label">Advertised CTC</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${medFull}</div>
        ${medFull !== s.reportedMedian ? `<div class="summary-stat__label" style="font-size: 12px; color: var(--grey-light); margin-bottom: 8px;">${s.reportedMedian}</div>` : ''}
        <div class="summary-stat__label">Reported Median</div>
        ${sDates.median ? `<div class="summary-stat__date">${sDates.median}</div>` : ''}
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${avgFull}</div>
        ${avgFull !== s.reportedAverage ? `<div class="summary-stat__label" style="font-size: 12px; color: var(--grey-light); margin-bottom: 8px;">${s.reportedAverage}</div>` : ''}
        <div class="summary-stat__label">Reported Avg</div>
        ${sDates.average ? `<div class="summary-stat__date">${sDates.average}</div>` : ''}
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${lowFull}</div>
        ${lowFull !== s.reportedLowest ? `<div class="summary-stat__label" style="font-size: 12px; color: var(--grey-light); margin-bottom: 8px;">${s.reportedLowest}</div>` : ''}
        <div class="summary-stat__label">Lowest</div>
        ${sDates.lowest ? `<div class="summary-stat__date">${sDates.lowest}</div>` : ''}
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${highFull}</div>
        ${highFull !== s.reportedHighest ? `<div class="summary-stat__label" style="font-size: 12px; color: var(--grey-light); margin-bottom: 8px;">${s.reportedHighest}</div>` : ''}
        <div class="summary-stat__label">Highest</div>
        ${sDates.highest ? `<div class="summary-stat__date">${sDates.highest}</div>` : ''}
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${s.totalReports}</div>
        <div class="summary-stat__label">Reports</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${s.placementRate}</div>
        <div class="summary-stat__label">Placed</div>
        ${sDates.placementRate ? `<div class="summary-stat__date">${sDates.placementRate}</div>` : ''}
      </div>
      <div class="summary-stat">
        <div class="summary-stat__value" style="font-size: 24px; margin-bottom: 2px;">${s.batchSize}</div>
        <div class="summary-stat__label">Batch Size</div>
        ${sDates.batchSize ? `<div class="summary-stat__date">${sDates.batchSize}</div>` : ''}
      </div>
    </div>
    ${hasWarn ? `<div class="bond-alert"><strong>${warnLabel}</strong> * ${warnDetails}</div>` : ''}
  `;
  main.appendChild(summarySection);

  const reportsSection = document.createElement('section');
  reportsSection.className = 'detail-section';
  reportsSection.id = 'student-reports';
  reportsSection.innerHTML = `<div class="detail-section__title">Student Reports<span class="detail-section__updated">Updated ${updatedFull}</span></div>`;

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

  const recruitersSection = document.createElement('section');
  recruitersSection.className = 'detail-section';
  recruitersSection.id = 'recruiters';
  recruitersSection.innerHTML = `<div class="detail-section__title">Recruiters<span class="detail-section__updated">Updated ${updatedFull}</span></div>`;
  recruitersSection.appendChild(buildRecruiters(college));
  main.appendChild(recruitersSection);

  const sourcesSection = document.createElement('section');
  sourcesSection.className = 'detail-section';
  sourcesSection.id = 'online-sources';
  sourcesSection.innerHTML = `<div class="detail-section__title">Online Sources<span class="detail-section__updated">Updated ${updatedFull}</span></div>`;
  if (college.onlineSources && college.onlineSources.length > 0) {
    const sourcesList = document.createElement('div');
    sourcesList.className = 'sources-list';
    college.onlineSources.forEach(src => sourcesList.appendChild(createSourceCard(src)));
    sourcesSection.appendChild(sourcesList);
  }
  main.appendChild(sourcesSection);

  const footer = document.createElement('footer');
  footer.className = 'page-footer';
  footer.innerHTML = `
    <div class="page-footer__heart">♥</div>
    <p class="page-footer__tagline">Made for students, by students.</p>
    <p class="page-footer__honesty">Every number on this platform is crowd-sourced, unverified, and shown as-is.<br/>No data is altered. No college pays us. Transparency is the only agenda.</p>
    <p class="page-footer__disclaimer">ALL DATA IS CROWD-SOURCED & UNVERIFIED * FOR AWARENESS ONLY</p>
  `;
  main.appendChild(footer);

  layout.appendChild(main);
  container.appendChild(layout);

  setupScrollTracking(sidebar, sections);
  window.scrollTo(0, 0);
}

function buildOverview(college) {
  const frag = document.createDocumentFragment();
  const reports = college.reports;
  const sDates = college.summaryDates || {};

  const personalCount = reports.filter(r => (r.reportType || 'personal') === 'personal').length;
  const aggCount = reports.filter(r => r.reportType === 'aggregate').length;
  const multiCount = reports.filter(r => r.reportType === 'multi_personal').length;
  const avgTrust = Math.round(reports.reduce((sum, r) => sum + r.trustScore, 0) / Math.max(reports.length, 1));

  const grid = document.createElement('div');
  grid.className = 'overview-grid';

  grid.innerHTML += `
    <div class="overview-card">
      <div class="overview-card__title">Report Breakdown</div>
      <div class="overview-stats-row">
        <div class="overview-stat-item"><div class="overview-stat-item__value">${reports.length}</div><div class="overview-stat-item__label">Total</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${personalCount}</div><div class="overview-stat-item__label">Personal</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${aggCount}</div><div class="overview-stat-item__label">Aggregate</div></div>
        <div class="overview-stat-item"><div class="overview-stat-item__value">${multiCount}</div><div class="overview-stat-item__label">Multi</div></div>
      </div>
    </div>
  `;

  grid.innerHTML += `
    <div class="overview-card">
      <div class="overview-card__title">Report Credibility</div>
      <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px;">
        ${tierBadgeHTML(avgTrust, 'xl')}
        <div style="font-family: var(--font-body); font-size: 13px; color: var(--grey-light); line-height: 1.6;">Average trust across ${reports.length} reports. Higher tiers = more verifiable data.</div>
      </div>
    </div>
  `;

  const s = college.summary;
  if (s.reportedLowest || s.reportedAverage || s.reportedMedian || s.reportedHighest) {
    grid.innerHTML += `
      <div class="overview-card">
        <div class="overview-card__title">Placement Data From User Submissions</div>
        <div class="overview-range" style="justify-content: space-around; flex-wrap: wrap; padding-top: 10px;">
          ${s.reportedLowest ? `<div class="overview-range__item"><div class="overview-range__value">${s.reportedLowest}</div><div class="overview-range__label">Lowest</div></div>` : ''}
          ${s.reportedAverage ? `<div class="overview-range__item"><div class="overview-range__value">${s.reportedAverage}</div><div class="overview-range__label">Average</div></div>` : ''}
          ${s.reportedMedian ? `<div class="overview-range__item"><div class="overview-range__value" style="color: var(--tier-a);">${s.reportedMedian}</div><div class="overview-range__label">Median</div></div>` : ''}
          ${s.reportedHighest ? `<div class="overview-range__item"><div class="overview-range__value">${s.reportedHighest}</div><div class="overview-range__label">Highest</div></div>` : ''}
        </div>
      </div>
    `;
  }

  const companySet = new Set();
  college.reports?.forEach(r => { if(r.company) companySet.add(r.company.trim()); });
  college.placementQuestions?.forEach(pq => { if(pq.company) companySet.add(pq.company.trim()); });
  const companies = Array.from(companySet);

  if (companies.length > 0) {
    grid.innerHTML += `
      <div class="overview-card">
        <div class="overview-card__title">
          Companies Reported 
          ${sDates.companies ? `<span style="float:right; font-size:9px; color:var(--grey-light); text-transform:uppercase;">As of ${sDates.companies}</span>` : ''}
        </div>
        <div class="overview-companies">${companies.map(c => `<span class="overview-company-tag">${c}</span>`).join('')}</div>
      </div>
    `;
  }

  if (college.summary.branches && college.summary.branches.length > 0) {
    const branchDiv = document.createElement('div');
    branchDiv.className = 'overview-card';
    branchDiv.style.gridColumn = '1 / -1';
    
    let branchRows = college.summary.branches.map(b => `
      <tr style="border-bottom: 1px solid var(--grey-mid);">
        <td style="padding: 12px 16px; font-weight: 700;">${b.name}</td>
        <td style="padding: 12px 16px; color: var(--grey-light);">${b.low}</td>
        <td style="padding: 12px 16px; color: var(--grey-light);">${b.high}</td>
        <td style="padding: 12px 16px; color: var(--white);">${b.median}</td>
        <td style="padding: 12px 16px; color: var(--grey-light);">${b.average}</td>
      </tr>
    `).join('');

    branchDiv.innerHTML = `
      <div class="overview-card__title">Branch Placement Data</div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: var(--font-body); font-size: 14px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--grey-mid); font-family: var(--font-sub); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--grey-light);">
              <th style="padding: 12px 16px;">Branch</th>
              <th style="padding: 12px 16px;">Lowest CTC</th>
              <th style="padding: 12px 16px;">Highest CTC</th>
              <th style="padding: 12px 16px;">Median CTC</th>
              <th style="padding: 12px 16px;">Average CTC</th>
            </tr>
          </thead>
          <tbody>
            ${branchRows}
          </tbody>
        </table>
      </div>
    `;
    grid.appendChild(branchDiv);
  }

  frag.appendChild(grid);

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

  list.addEventListener('click', (e) => {
    const header = e.target.closest('.report-card__header');
    if (!header) return;
    const card = header.closest('.report-card');
    const wasExpanded = card.classList.contains('report-card--expanded');
    list.querySelectorAll('.report-card--expanded').forEach(c => c.classList.remove('report-card--expanded'));
    if (!wasExpanded) card.classList.add('report-card--expanded');
  });

  container.appendChild(list);

  if (totalPages > 1) {
    const pag = document.createElement('div');
    pag.className = 'pagination';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination__btn';
    prevBtn.textContent = 'BACK';
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
    nextBtn.textContent = 'NEXT';
    nextBtn.disabled = page >= totalPages;
    nextBtn.addEventListener('click', () => renderDetailedReports(container, reports, page + 1));
    pag.appendChild(nextBtn);

    container.appendChild(pag);
  }
}

function buildRecruiters(college) {
  const frag = document.createDocumentFragment();
  const companyMap = {};
  
  college.reports.forEach(r => {
    if (r.company) {
      if (!companyMap[r.company]) companyMap[r.company] = { offers: [], adminData: [], logo: '' };
      companyMap[r.company].offers.push(r);
    }
  });

  if (college.placementQuestions) {
    college.placementQuestions.forEach(pq => {
      if (!companyMap[pq.company]) companyMap[pq.company] = { offers: [], adminData: [], logo: pq.logo };
      if (pq.logo && !companyMap[pq.company].logo) companyMap[pq.company].logo = pq.logo;
      companyMap[pq.company].adminData.push(pq); 
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
    
    const logoHtml = data.logo 
       ? `<img src="${data.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;background:#fff;" />`
       : company.charAt(0);

    tile.innerHTML = `
      <div class="recruiter-tile__header">
        <div class="recruiter-tile__logo">${logoHtml}</div>
        <div class="recruiter-tile__name">${company}</div>
      </div>
      <div class="recruiter-tile__body">
        ${buildRecruiterBody(data)}
      </div>
    `;

    tile.querySelector('.recruiter-tile__header').addEventListener('click', () => {
      const wasOpen = tile.classList.contains('recruiter-tile--open');
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
  
  const offer = data.offers.length > 0 ? data.offers[0] : null;
  const adminEntry = data.adminData && data.adminData.length > 0 ? data.adminData[0] : null;
  
  if (offer || adminEntry) {
    const role = offer?.role || adminEntry?.role || 'N/A';
    const ctc = offer?.ctcOffered || adminEntry?.ctc || 'N/A';
    const year = offer?.batch || adminEntry?.year || 'N/A';
    
    html += `<div class="recruiter-detail-strip">`;
    html += `<div class="recruiter-detail-item"><div class="recruiter-detail-item__label">Role / Position</div><div class="recruiter-detail-item__value">${role}</div></div>`;
    html += `<div class="recruiter-detail-item"><div class="recruiter-detail-item__label">Highest CTC</div><div class="recruiter-detail-item__value">${ctc}</div></div>`;
    html += `<div class="recruiter-detail-item"><div class="recruiter-detail-item__label">Year of recruitment</div><div class="recruiter-detail-item__value">${year}</div></div>`;
    
    if (offer && offer.ctcBreakdown) {
      if (offer.ctcBreakdown.basePay) {
        html += `<div class="recruiter-detail-item"><div class="recruiter-detail-item__label">Base Pay</div><div class="recruiter-detail-item__value">${offer.ctcBreakdown.basePay}</div></div>`;
      }
      if (offer.ctcBreakdown.variablePay) {
        html += `<div class="recruiter-detail-item"><div class="recruiter-detail-item__label">Variable</div><div class="recruiter-detail-item__value">${offer.ctcBreakdown.variablePay}</div></div>`;
      }
    }
    html += `</div>`;
  }
  
  const entriesWithQuestions = (data.adminData || []).filter(pq => pq.questions && pq.questions.length > 0);
  
  if (entriesWithQuestions.length > 0) {
    html += `<div class="recruiter-questions-section">`;
    html += `<div class="recruiter-questions-title">Interview Questions</div>`;
    entriesWithQuestions.forEach(pq => {
      const diffClass = pq.difficulty.replace(/\s/g, '-');
      html += `
        <div class="recruiter-question-block">
          <div class="recruiter-question-block__header">
            <span>${pq.role} * ${pq.date || pq.year}</span>
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

function setupScrollTracking(sidebar, sections) {
  const items = sidebar.querySelectorAll('.detail-index__item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.dataset.section === 'summary') {
        const nav = document.querySelector('.nav');
        if (nav) {
          nav.style.transform = 'translateY(-100%)';
          nav.style.transition = 'transform 0.25s ease';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.getElementById(item.dataset.section);
      if (target) {
        const nav = document.querySelector('.nav');
        if (nav) {
          nav.style.transform = 'translateY(-100%)';
          nav.style.transition = 'transform 0.25s ease';
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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