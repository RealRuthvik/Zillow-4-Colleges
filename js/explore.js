import { COLLEGES } from './data.js';
import { getTier, tierBadgeHTML } from './components.js';
import { navigateTo } from './app.js';

let sortField = 'trustScore';
let sortDir = 'desc';
let searchQuery = '';
let currentPage = 1;
const itemsPerPage = 6;

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
      <input type="text" class="explore__search-input" id="explore-search" placeholder="Filter by name or location..." autocomplete="off" value="${searchQuery}" />
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
    currentPage = 1;
    renderTable(tableWrap);
  });
}

function getSortLabel(field) {
  const labels = {
    trustScore: 'Trust Score',
    reportedHighest: 'Highest CTC',
    reportedAverage: 'Average CTC',
    reportedMedian: 'Median CTC',
    reportedLowest: 'Lowest CTC',
    claimedCTC: 'Advertised Median',
    name: 'Name'
  };
  return labels[field] || field;
}

function parseCTC(val) {
  if (!val) return 0;
  const str = val.toString().toUpperCase();
  let num = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return 0;
  if (str.includes('CPA')) {
    num *= 100;
  }
  return num;
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
      case 'reportedHighest': aVal = parseCTC(a.summary.reportedHighest); bVal = parseCTC(b.summary.reportedHighest); break;
      case 'reportedAverage': aVal = parseCTC(a.summary.reportedAverage); bVal = parseCTC(b.summary.reportedAverage); break;
      case 'reportedMedian': aVal = parseCTC(a.summary.reportedMedian); bVal = parseCTC(b.summary.reportedMedian); break;
      case 'reportedLowest': aVal = parseCTC(a.summary.reportedLowest); bVal = parseCTC(b.summary.reportedLowest); break;
      case 'claimedCTC': aVal = parseCTC(a.summary.claimedCTC); bVal = parseCTC(b.summary.claimedCTC); break;
      case 'name': aVal = a.shortName; bVal = b.shortName; break;
      default: aVal = a.trustScore; bVal = b.trustScore;
    }
    if (sortField === 'name') return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const columns = [
    { id: 'name', label: 'College' },
    { id: 'trustScore', label: 'Tier' },
    { id: 'reportedHighest', label: 'Highest CTC' },
    { id: 'reportedAverage', label: 'Average CTC' },
    { id: 'reportedMedian', label: 'Median CTC' },
    { id: 'reportedLowest', label: 'Lowest CTC' },
    { id: 'claimedCTC', label: 'Advertised Median' }
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
        ${paginated.map(c => {
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
              <td><div class="explore-ctc-actual">${c.summary.reportedHighest || 'N/A'}</div></td>
              <td><div class="explore-ctc-actual">${c.summary.reportedAverage || 'N/A'}</div></td>
              <td><div class="explore-ctc-actual">${c.summary.reportedMedian || 'N/A'}</div></td>
              <td><div class="explore-ctc-actual">${c.summary.reportedLowest || 'N/A'}</div></td>
              <td><div class="explore-ctc-claimed ${c.summary.claimedCTC === c.summary.reportedMedian ? 'explore-ctc-claimed--verified' : ''}">${c.summary.claimedCTC || 'N/A'}</div></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    
    <div class="pagination" style="padding: 20px; background: var(--grey-dark); border-top: 1px solid var(--grey-mid);">
      <button class="pagination__btn" id="explore-prev" ${currentPage <= 1 ? 'disabled' : ''}>← Prev</button>
      <span style="color: var(--grey-light); font-family: var(--font-sub); font-size: 12px; font-weight: 700; letter-spacing: 2px; padding: 0 10px;">
        PAGE ${currentPage} OF ${totalPages}
      </span>
      <button class="pagination__btn" id="explore-next" ${currentPage >= totalPages ? 'disabled' : ''}>Next →</button>
    </div>
  `;

  wrap.querySelectorAll('th[data-sort]').forEach(th => {
    const field = th.dataset.sort;
    if (field === 'reports') return;
    th.addEventListener('click', () => {
      if (sortField === field) {
        sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      } else {
        sortField = field;
        sortDir = field === 'name' ? 'asc' : 'desc';
      }
      currentPage = 1;
      const sortInfo = document.getElementById('sort-info');
      if (sortInfo) sortInfo.innerHTML = `Sorted by: <span>${getSortLabel(sortField)}</span> (${sortDir === 'desc' ? '↓' : '↑'})`;
      renderTable(wrap);
    });
  });

  wrap.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('.tier-badge-help')) return;
      navigateTo(`/college/${row.dataset.id}`);
    });
  });

  const prevBtn = wrap.querySelector('#explore-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable(wrap);
        window.scrollTo({ top: wrap.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  const nextBtn = wrap.querySelector('#explore-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable(wrap);
        window.scrollTo({ top: wrap.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }
}