// ========================================
// SHARED UI COMPONENTS (v5)
// Tier system, accordion cards, 3 report types
// ========================================

import { navigateTo } from './app.js';

export function getTier(score) {
  if (score >= 80) return { letter: 'S', color: 'var(--tier-s)', label: 'Elite' };
  if (score >= 65) return { letter: 'A', color: 'var(--tier-a)', label: 'Great' };
  if (score >= 50) return { letter: 'B', color: 'var(--tier-b)', label: 'Good' };
  if (score >= 35) return { letter: 'C', color: 'var(--tier-c)', label: 'Average' };
  if (score >= 20) return { letter: 'D', color: 'var(--tier-d)', label: 'Poor' };
  return { letter: 'F', color: 'var(--tier-f)', label: 'Avoid' };
}

export function getTrustColor(score) {
  return getTier(score).color;
}

export function tierBadgeHTML(score, size = 'md') {
  const tier = getTier(score);
  const sizeClass = `tier-badge--${size}`;
  return `<span class="tier-badge ${sizeClass}" style="--tier-color: ${tier.color}" title="Trust Score: ${score}/100" data-score="${score}">
    <span class="tier-badge__letter">${tier.letter}</span>
    <span class="tier-badge__score">${score}</span>
  </span>`;
}

export function formatFullCTC(ctcStr) {
  if (!ctcStr || typeof ctcStr !== 'string') return null;
  const matchLPA = ctcStr.match(/([\d\.]+)\s*LPA/i);
  const matchCR = ctcStr.match(/([\d\.]+)\s*CR/i);

  let num = 0;
  if (matchLPA) {
    num = parseFloat(matchLPA[1]) * 100000;
  } else if (matchCR) {
    num = parseFloat(matchCR[1]) * 10000000;
  } else {
    return null;
  }

  return '₹' + num.toLocaleString('en-IN');
}

export function renderDetailedCTC(ctcStr) {
  const full = formatFullCTC(ctcStr);
  if (!full) return ctcStr;

  return `<div class="ctc-detailed">
    <div class="ctc-detailed__main">${full}</div>
    <div class="ctc-detailed__sub">${ctcStr} CTC</div>
  </div>`;
}

function getReportTypeInfo(report) {
  if (report.reportType === 'aggregate') {
    return { label: 'Aggregate', icon: '', class: 'report-type--aggregate', desc: 'Based on batch-wide observation' };
  }
  if (report.reportType === 'multi_personal') {
    return { label: 'Multi-Personal', icon: '', class: 'report-type--multi', desc: 'Reporting for multiple students' };
  }
  return { label: 'Personal', icon: '', class: 'report-type--personal', desc: 'Individual experience' };
}

export function createCollegeCard(college, index = 0) {
  const card = document.createElement('div');
  card.className = `college-card animate-fade-up stagger-${Math.min(index + 1, 12)}`;
  card.dataset.id = college.id;

  let warningHTML = '';
  if (college.hasHiddenBond) {
    warningHTML = `<div class="warning-banner">Hidden Bond</div>`;
  }

  card.innerHTML = `
    ${warningHTML}
    <div class="college-card__top">
      <div>
        <div class="college-card__name">${college.shortName || college.name}</div>
        <div class="college-card__location">${college.location}</div>
      </div>
      ${tierBadgeHTML(college.trustScore, 'lg')}
    </div>
    <div class="college-card__divider"></div>
    <div class="college-card__stats">
      <div class="college-card__stat">
        <div class="college-card__stat-label">Advertised</div>
        <div class="college-card__stat-value college-card__stat-value--muted">${college.summary.claimedCTC}</div>
      </div>
      <div class="college-card__stat">
        <div class="college-card__stat-label">Reported Median</div>
        <div class="college-card__stat-value">${college.summary.reportedMedian}</div>
      </div>
      <div class="college-card__stat">
        <div class="college-card__stat-label">Reports</div>
        <div class="college-card__stat-value">${college.summary.totalReports}</div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    navigateTo(`/college/${college.id}`);
  });

  return card;
}

export function createReportCard(report, index = 0) {
  const card = document.createElement('div');
  card.className = `report-card animate-fade-up stagger-${Math.min(index + 1, 12)}`;
  card.dataset.reportId = report.id;

  const tier = getTier(report.trustScore);
  const typeInfo = getReportTypeInfo(report);

  let headerTags = `<span class="report-card__type-tag ${typeInfo.class}">${typeInfo.label}</span>`;
  if (report.company) headerTags += `<span class="report-card__tag report-card__tag--company">${report.company}</span>`;
  if (report.ctcOffered) headerTags += `<span class="report-card__tag">${report.ctcOffered}</span>`;

  let bodyHTML = `<p class="report-card__comment">${report.comment}</p>`;

  if (report.ctcOffered) {
    bodyHTML += `<div class="report-card__section-label">INDIVIDUAL EXPERIENCE</div>`;
    let breakdownHTML = '';
    if (report.ctcBreakdown) {
      const b = report.ctcBreakdown;
      const rows = [
        ['Base Pay', b.basePay],
        ['Variable Pay', b.variablePay],
        ['Joining Bonus', formatFullCTC(b.joiningBonus) || b.joiningBonus],
        ['Relocation', formatFullCTC(b.relocation) || b.relocation],
      ].filter(([, v]) => v && v !== '—');

      let otherHTML = b.other && b.other !== '—' ? `<div class="report-card__breakdown-other">+ ${b.other}</div>` : '';
      breakdownHTML = `
        <details class="report-card__breakdown-details">
          <summary class="report-card__breakdown-summary">CTC Breakdown</summary>
          <div class="report-card__breakdown-content">
            ${rows.map(([label, value]) => `
              <div class="report-card__breakdown-row"><span>${label}</span><span>${value}</span></div>
            `).join('')}
            ${otherHTML}
          </div>
        </details>
      `;
    }

    bodyHTML += `
      <div class="report-card__offer">
        <div class="report-card__offer-header">
          <div>
            <div class="report-card__offer-company">${report.company}</div>
            <div class="report-card__offer-role">${report.role}</div>
          </div>
          <div class="report-card__offer-ctc-wrap">
            ${renderDetailedCTC(report.ctcOffered)}
          </div>
        </div>
        ${breakdownHTML}
      </div>
    `;
  }

  if (report.dataReported) {
    const d = report.dataReported;
    bodyHTML += `<div class="report-card__section-label">BATCH REPORTING</div>`;
    if (d.type === 'batch_stats') {
      const items = [];
      if (d.median) items.push(`Median: ${d.median}`);
      if (d.average) items.push(`Avg: ${d.average}`);
      if (d.placed) items.push(`Placed: ${d.placed}`);
      if (d.above5LPA) items.push(`Above 5 LPA: ${d.above5LPA}`);
      bodyHTML += `
        <div class="report-card__data-badge report-card__data-badge--stats">
          <div class="report-card__data-badge-title">BATCH STATS REPORTED</div>
          <div class="report-card__data-badge-items">
            ${items.map(s => `<span class="report-card__data-item">${s}</span>`).join('')}
          </div>
        </div>
      `;
    } else if (d.type === 'bond_report') {
      bodyHTML += `
        <div class="report-card__data-badge report-card__data-badge--bond">
          <div class="report-card__data-badge-title">BOND REPORT</div>
          <div class="report-card__data-badge-items">
            <span class="report-card__data-item">Amount: ${d.bondAmount}</span>
            <span class="report-card__data-item">Duration: ${d.bondDuration}</span>
          </div>
        </div>
      `;
    } else if (d.type === 'practice_report') {
      bodyHTML += `
        <div class="report-card__data-badge report-card__data-badge--practice">
          <div class="report-card__data-badge-title">PRACTICE / POLICY REPORT</div>
        </div>
      `;
    }
  }

  const isVerified = report.trustScore >= 65;
  const verificationMethod = report.verificationMethod || (isVerified ? 'Cross-verified with multiple sources' : null);
  const verifyBadgeHTML = isVerified
    ? `<span class="report-verify-badge report-verify-badge--verified" title="${verificationMethod}">VERIFIED <span class="report-verify-badge__info">i</span></span>`
    : `<span class="report-verify-badge report-verify-badge--unverified">UNVERIFIED</span>`;

  card.innerHTML = `
    <div class="report-card__header">
      <div class="report-card__header-left">
        <span class="report-card__author">${report.author}</span>
        <div class="report-card__meta-tags">
          <span class="report-card__tag">${report.batch} · ${report.branch}</span>
          ${headerTags}
        </div>
      </div>
      <div class="report-card__header-right">
        ${verifyBadgeHTML}
        <span class="report-card__expand-icon">▼</span>
      </div>
    </div>
    <div class="report-card__body">${bodyHTML}</div>
  `;

  return card;
}

export function createSourceCard(source) {
  const el = document.createElement('div');
  el.className = 'source-card';
  el.innerHTML = `
    <span class="source-card__trust source-card__trust--${source.trustLevel}">${source.trustLevel}</span>
    <div class="source-card__body">
      <div class="source-card__name">${source.name}</div>
      <div class="source-card__finding">${source.finding}</div>
    </div>
  `;
  return el;
}

export function createPQCard(pq, collegeName, index = 0) {
  const card = document.createElement('div');
  card.className = `pq-card animate-fade-up stagger-${Math.min(index + 1, 12)}`;
  const diffClass = pq.difficulty.replace(/\s/g, '-');

  card.innerHTML = `
    <div class="pq-card__header">
      <div>
        <div class="pq-card__company">${pq.company}</div>
        <div class="pq-card__role">${pq.role}${collegeName ? ` · ${collegeName}` : ''}</div>
      </div>
      <span class="pq-card__difficulty pq-card__difficulty--${diffClass}">${pq.difficulty}</span>
    </div>
    <div class="pq-card__meta">
      <span>${pq.date}</span>
    </div>
    <ol class="pq-card__questions">
      ${pq.questions.map(q => `<li class="pq-card__question">${q}</li>`).join('')}
    </ol>
  `;

  return card;
}