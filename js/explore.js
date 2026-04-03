// ========================================
// EXPLORE PAGE (v5) — Tier system
// ========================================

import { COLLEGES } from './data.js';
import { getTier, tierBadgeHTML } from './components.js';

let sortField = 'trustScore';
let sortDir = 'desc';
let searchQuery = '';

export function renderExplore(container) {
  container.innerHTML = '';
  container.className = 'page explore page-enter';

  const header = document.createElement('div');
  header.className = 'explore__header animate-slam';
  header.innerHTML = `
    <h1 class="explore__title">Explore Colleges</h1>
    <p class="explore__subtitle">Sort, compare, and find the truth</p>
  `;
  container.appendChild(header);

  const controls = document.createElement('div');
  controls.className = 'explore__controls animate-fade-up stagger-2';
  controls.innerHTML = `
    <div class="explore__search">
      <input type="text" class="explore__search-input" id="explore-search" placeholder="Filter by name or location..." autocomplete="off" />
    </div>
    <div class="explore__sort-info" id="sort-info">
      Sorted by: <span>${getSortLabel(sortField)}</span> (${sortDir === 'desc' ? '↓' : '↑'})
    </div>
  `;
  container.appendChild(controls);

  const tableWrap = document.createElement('div');
  tableWrap.className = 'explore__table-wrap animate-fade-up stagger-3';
  tableWrap.id = 'table-wrap';
  container.appendChild(tableWrap);

  const footer = document.createElement('footer');
  footer.className = 'page-footer animate-fade-up';
  footer.innerHTML = `
    <div class="page-footer__heart">♥</div>
    <p class="page-footer__tagline">Made for students, by students.</p>
    <p class="page-footer__honesty">Every number on this platform is crowd-sourced, unverified, and shown as-is.<br/>No data is altered. No college pays us. Transparency is the only agenda.</p>
    <p class="page-footer__disclaimer">ALL DATA IS CROWD-SOURCED & UNVERIFIED · FOR AWARENESS ONLY</p>
  `;
  container.appendChild(footer);

  renderTable(tableWrap);

  document.getElementById('explore-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTable(tableWrap);
  });
}

function getSortLabel(field) {
  const labels = {
    trustScore: 'Trust Score',
    reportedMedian: 'Reported Median',
    claimedCTC: 'Claimed CTC',
    name: 'Name',
    searchCount: 'Popularity',
  };
  return labels[field] || field;
}

function renderTable(wrap) {
  let filtered = [...COLLEGES];

  if (searchQuery) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.shortName.toLowerCase().includes(searchQuery) ||
      c.location.toLowerCase().includes(searchQuery)
    );
  }

  filtered.sort((a, b) => {
    let aVal, bVal;
    switch (sortField) {
      case 'trustScore': aVal = a.trustScore; bVal = b.trustScore; break;
      case 'reportedMedian': aVal = parseFloat(a.summary.reportedMedian); bVal = parseFloat(b.summary.reportedMedian); break;
      case 'claimedCTC': aVal = parseFloat(a.summary.claimedCTC); bVal = parseFloat(b.summary.claimedCTC); break;
      case 'name': aVal = a.shortName; bVal = b.shortName; break;
      case 'searchCount': aVal = a.searchCount; bVal = b.searchCount; break;
      default: aVal = a.trustScore; bVal = b.trustScore;
    }
    if (sortField === 'name') return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const columns = [
    { id: 'name', label: 'College' },
    { id: 'trustScore', label: 'Tier' },
    { id: 'reportedMedian', label: 'Median CTC' },
    { id: 'claimedCTC', label: 'Advertised' },
    { id: 'searchCount', label: 'Searches' },
    { id: 'bond', label: 'Bond', sortable: false },
    { id: 'reports', label: 'Reports', sortable: false },
  ];

  wrap.innerHTML = `
    <table class="explore-table">
      <thead>
        <tr>
          ${columns.map(col => {
            const isSorted = sortField === col.id;
            const sortable = col.sortable !== false;
            const arrow = isSorted ? (sortDir === 'desc' ? '▼' : '▲') : '';
            return `<th data-sort="${col.id}" class="${isSorted ? 'sorted' : ''}" ${!sortable ? 'style="cursor:default"' : ''}>
              ${col.label}${arrow ? `<span class="sort-arrow">${arrow}</span>` : ''}
            </th>`;
          }).join('')}
        </tr>
      </thead>
      <tbody>
        ${filtered.map(c => {
          return `
            <tr data-id="${c.id}">
              <td>
                <div class="explore-table__name">${c.shortName}</div>
                <div class="explore-table__location">${c.location}</div>
              </td>
              <td>
                <div class="explore-tier-cell">
                  ${tierBadgeHTML(c.trustScore, 'sm')}
                </div>
              </td>
              <td><div class="explore-ctc-actual">${c.summary.reportedMedian}</div></td>
              <td><div class="explore-ctc-claimed">${c.summary.claimedCTC}</div></td>
              <td>${c.searchCount.toLocaleString()}</td>
              <td>
                <span class="explore-bond explore-bond--${c.hasHiddenBond ? 'yes' : 'no'}">
                  ${c.hasHiddenBond ? 'YES' : 'NO'}
                </span>
              </td>
              <td style="font-family: var(--font-heading); font-size: 18px; color: var(--white);">${c.summary.totalReports}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  wrap.querySelectorAll('th[data-sort]').forEach(th => {
    const field = th.dataset.sort;
    if (field === 'bond' || field === 'reports') return;
    th.addEventListener('click', () => {
      if (sortField === field) {
        sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      } else {
        sortField = field;
        sortDir = field === 'name' ? 'asc' : 'desc';
      }
      const sortInfo = document.getElementById('sort-info');
      if (sortInfo) sortInfo.innerHTML = `Sorted by: <span>${getSortLabel(sortField)}</span> (${sortDir === 'desc' ? '↓' : '↑'})`;
      renderTable(wrap);
    });
  });

  wrap.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', () => {
      window.location.hash = `#/college/${row.dataset.id}`;
    });
  });
}
