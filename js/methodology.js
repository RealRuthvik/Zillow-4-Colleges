// ========================================
// METHODOLOGY PAGE — Disclosure & transparency
// How CollegeExposed operates
// ========================================

export function renderMethodology(container) {
  container.innerHTML = '';
  container.className = 'page page-enter';

  const page = document.createElement('div');
  page.className = 'methodology-page';

  page.innerHTML = `
    <div class="methodology-hero">
      <div class="methodology-hero__accent"></div>
      <h1 class="methodology-hero__title">HOW IT <span>WORKS</span></h1>
      <p class="methodology-hero__subtitle">Full transparency on our data, scoring, and methodology</p>
    </div>

    <div class="methodology-layout">
      <!-- SIDEBAR NAV -->
      <nav class="methodology-nav">
        <a class="methodology-nav__item methodology-nav__item--active" href="#/methodology#tiers" data-section="tiers">Tier System</a>
        <a class="methodology-nav__item" href="#/methodology#trust-score" data-section="trust-score">Trust Scores</a>
        <a class="methodology-nav__item" href="#/methodology#data-sources" data-section="data-sources">Data Sources</a>
        <a class="methodology-nav__item" href="#/methodology#verification" data-section="verification">Verification</a>
        <a class="methodology-nav__item" href="#/methodology#calculations" data-section="calculations">Calculations</a>
        <a class="methodology-nav__item" href="#/methodology#reporting" data-section="reporting">Report Types</a>
        <a class="methodology-nav__item" href="#/methodology#disclaimer" data-section="disclaimer">Disclaimer</a>
      </nav>

      <!-- CONTENT -->
      <div class="methodology-content">

        <!-- TIERS -->
        <section class="methodology-section" id="tiers">
          <h2 class="methodology-section__title">The Tier System</h2>
          <p class="methodology-section__intro">Every college on CollegeExposed is assigned a tier based on its Trust Score. This score reflects data accuracy, transparency, and student-reported alignment with advertised claims.</p>

          <div class="methodology-tier-grid">
            <div class="methodology-tier-card" style="--t-color: var(--tier-s);">
              <div class="methodology-tier-card__letter">S</div>
              <div class="methodology-tier-card__info">
                <h3>ELITE</h3>
                <p class="methodology-tier-card__range">Score 80 - 100</p>
                <p>Reported data closely matches or exceeds advertised claims. Multiple verified reports confirm consistency. Exceptional placement transparency.</p>
              </div>
            </div>
            <div class="methodology-tier-card" style="--t-color: var(--tier-a);">
              <div class="methodology-tier-card__letter">A</div>
              <div class="methodology-tier-card__info">
                <h3>GREAT</h3>
                <p class="methodology-tier-card__range">Score 65 - 79</p>
                <p>Minor discrepancies between reported and advertised data. Generally trustworthy with good placement practices. Some inflation detected but within reasonable bounds.</p>
              </div>
            </div>
            <div class="methodology-tier-card" style="--t-color: var(--tier-b);">
              <div class="methodology-tier-card__letter">B</div>
              <div class="methodology-tier-card__info">
                <h3>GOOD</h3>
                <p class="methodology-tier-card__range">Score 50 - 64</p>
                <p>Noticeable gap between advertised and reported numbers. CTC figures may be inflated by 20-40%. Placement rate claims partially verified.</p>
              </div>
            </div>
            <div class="methodology-tier-card" style="--t-color: var(--tier-c);">
              <div class="methodology-tier-card__letter">C</div>
              <div class="methodology-tier-card__info">
                <h3>AVERAGE</h3>
                <p class="methodology-tier-card__range">Score 35 - 49</p>
                <p>Significant gap between claims and reality. CTC figures likely inflated by 40-60%. Mass recruiters dominate placements. Limited transparency.</p>
              </div>
            </div>
            <div class="methodology-tier-card" style="--t-color: var(--tier-d);">
              <div class="methodology-tier-card__letter">D</div>
              <div class="methodology-tier-card__info">
                <h3>POOR</h3>
                <p class="methodology-tier-card__range">Score 20 - 34</p>
                <p>Major discrepancies detected. Advertised CTC rarely matches actual offers. Hidden bonds, forced placement opt-ins, or misleading statistics likely present.</p>
              </div>
            </div>
            <div class="methodology-tier-card" style="--t-color: var(--tier-f);">
              <div class="methodology-tier-card__letter">F</div>
              <div class="methodology-tier-card__info">
                <h3>AVOID</h3>
                <p class="methodology-tier-card__range">Score 0 - 19</p>
                <p>Extreme data manipulation detected. Advertised figures bear no resemblance to reported reality. Multiple red flags including undisclosed bonds, fake placement percentages, or fabricated recruiter lists.</p>
              </div>
            </div>
          </div>

          <div class="methodology-note">
            <strong>NOTE:</strong> Tiers are calculated from crowd-sourced data and may not reflect the complete picture. They serve as a starting point for research, not a definitive judgment.
          </div>
        </section>

        <!-- TRUST SCORE -->
        <section class="methodology-section" id="trust-score">
          <h2 class="methodology-section__title">Trust Score Calculation</h2>
          <p class="methodology-section__intro">The Trust Score (0-100) for each college is determined by comparing advertised placement data against student-reported data across multiple dimensions.</p>

          <div class="methodology-factors">
            <div class="methodology-factor">
              <div class="methodology-factor__weight">35%</div>
              <div class="methodology-factor__info">
                <h4>CTC Accuracy</h4>
                <p>How closely do advertised CTC figures match reported median/average packages? Larger gaps reduce the score.</p>
              </div>
            </div>
            <div class="methodology-factor">
              <div class="methodology-factor__weight">25%</div>
              <div class="methodology-factor__info">
                <h4>Placement Rate Verification</h4>
                <p>Does the claimed placement percentage hold up against reported numbers? Mass recruiters counting as "placed" is penalized.</p>
              </div>
            </div>
            <div class="methodology-factor">
              <div class="methodology-factor__weight">20%</div>
              <div class="methodology-factor__info">
                <h4>Transparency</h4>
                <p>Does the college disclose bond terms, CTC breakdowns, and branch-wise data? Hidden conditions reduce trust.</p>
              </div>
            </div>
            <div class="methodology-factor">
              <div class="methodology-factor__weight">10%</div>
              <div class="methodology-factor__info">
                <h4>Report Volume</h4>
                <p>More reports from diverse batches and branches increase confidence in the data.</p>
              </div>
            </div>
            <div class="methodology-factor">
              <div class="methodology-factor__weight">10%</div>
              <div class="methodology-factor__info">
                <h4>External Corroboration</h4>
                <p>Cross-checking with NIRF data, Glassdoor, LinkedIn, and other third-party sources.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- DATA SOURCES -->
        <section class="methodology-section" id="data-sources">
          <h2 class="methodology-section__title">Data Sources</h2>
          <p class="methodology-section__intro">CollegeExposed aggregates data from multiple sources to build each college's profile.</p>

          <div class="methodology-sources-grid">
            <div class="methodology-source">
              <h4>Student Reports</h4>
              <p>Anonymous submissions from current students and alumni. This is our primary data source and forms the backbone of all placement statistics.</p>
              <span class="methodology-source__tag">PRIMARY</span>
            </div>
            <div class="methodology-source">
              <h4>NIRF Data</h4>
              <p>Official data submitted by colleges to the National Institutional Ranking Framework. Useful for baseline salary and placement rate comparison.</p>
              <span class="methodology-source__tag">OFFICIAL</span>
            </div>
            <div class="methodology-source">
              <h4>Job Portals</h4>
              <p>Glassdoor, AmbitionBox, and LinkedIn salary data for companies that recruit from each college.</p>
              <span class="methodology-source__tag">THIRD-PARTY</span>
            </div>
            <div class="methodology-source">
              <h4>College Websites</h4>
              <p>Official placement brochures and advertised statistics. This is what we compare reported data against.</p>
              <span class="methodology-source__tag">REFERENCE</span>
            </div>
          </div>
        </section>

        <!-- VERIFICATION -->
        <section class="methodology-section" id="verification">
          <h2 class="methodology-section__title">Verification Process</h2>
          <p class="methodology-section__intro">Reports can be either Verified or Unverified. Here's how the verification works.</p>

          <div class="methodology-verify-grid">
            <div class="methodology-verify-card methodology-verify-card--verified">
              <h4>VERIFIED</h4>
              <p>A report is marked as Verified when any of the following conditions are met:</p>
              <ul>
                <li>Offer letter screenshot submitted and reviewed</li>
                <li>Data cross-verified with 3+ independent reports</li>
                <li>Company HR data or LinkedIn confirmation obtained</li>
                <li>NIRF or government data corroboration</li>
              </ul>
              <p>Click the <strong>VERIFIED</strong> badge on any report to see the specific verification method used.</p>
            </div>
            <div class="methodology-verify-card methodology-verify-card--unverified">
              <h4>UNVERIFIED</h4>
              <p>An Unverified report means:</p>
              <ul>
                <li>The data has not yet been cross-checked</li>
                <li>The reporter chose not to provide supporting evidence</li>
                <li>There are insufficient other reports to corroborate</li>
              </ul>
              <p>Unverified data is still displayed but should be considered with appropriate skepticism.</p>
            </div>
          </div>
        </section>

        <!-- CALCULATIONS -->
        <section class="methodology-section" id="calculations">
          <h2 class="methodology-section__title">How Numbers Are Calculated</h2>
          <p class="methodology-section__intro">All aggregate numbers shown on college profiles are derived directly from student reports.</p>

          <div class="methodology-calc-list">
            <div class="methodology-calc">
              <h4>Reported Median</h4>
              <p>The middle value when all reported CTC offers are sorted from lowest to highest. This is more reliable than the average as it's less affected by outlier packages.</p>
            </div>
            <div class="methodology-calc">
              <h4>Reported Average</h4>
              <p>Sum of all reported CTC offers divided by number of offers. Note: this can be skewed by one or two very high packages, which is why we emphasize the median.</p>
            </div>
            <div class="methodology-calc">
              <h4>Placement Rate</h4>
              <p>Percentage of students who received at least one job offer through campus placements, as reported by students. This may differ from college-advertised numbers which sometimes include internship conversions or off-campus offers.</p>
            </div>
            <div class="methodology-calc">
              <h4>Advertised CTC</h4>
              <p>The highest or average CTC figure promoted by the college in their official materials, shown with a strikethrough to indicate it may not reflect actual student experience.</p>
            </div>
          </div>
        </section>

        <!-- REPORTING -->
        <section class="methodology-section" id="reporting">
          <h2 class="methodology-section__title">Report Types</h2>
          <p class="methodology-section__intro">CollegeExposed accepts three distinct types of student reports.</p>

          <div class="methodology-report-types">
            <div class="methodology-report-type">
              <div class="methodology-report-type__num">01</div>
              <h4>Personal</h4>
              <p>An individual student's own placement offer. Includes company name, role, CTC, and optional breakdown of base pay, variable, and bonuses. Most verifiable type of report.</p>
            </div>
            <div class="methodology-report-type">
              <div class="methodology-report-type__num">02</div>
              <h4>Aggregate</h4>
              <p>Batch-level observations based on the reporter's personal knowledge. Includes median/average stats, placement percentages, and general batch outcomes. Useful for trend analysis.</p>
            </div>
            <div class="methodology-report-type">
              <div class="methodology-report-type__num">03</div>
              <h4>Interview Questions</h4>
              <p>Questions asked during campus placement interviews. Includes company, role, difficulty level, and specific questions. Helps future students prepare.</p>
            </div>
          </div>
        </section>

        <!-- DISCLAIMER -->
        <section class="methodology-section" id="disclaimer">
          <h2 class="methodology-section__title">Disclaimer</h2>
          <div class="methodology-disclaimer">
            <p>CollegeExposed is a crowd-sourced platform. All data is submitted anonymously by students and alumni. We do not independently verify every claim.</p>
            <p>Numbers, tiers, and scores shown on this platform are derived from user submissions and should be treated as indicative, not authoritative. They are meant to supplement your own research, not replace it.</p>
            <p>No college pays us. No data is altered to favor or penalize any institution. Transparency is the only agenda.</p>
            <p>If you believe any data is inaccurate, please submit corrected information through our Submit page. The community self-corrects over time.</p>
            <p><strong>Use this data responsibly. Make informed decisions.</strong></p>
          </div>
        </section>

      </div>
    </div>
  `;

  container.appendChild(page);

  // --- Scroll to section if hash includes an anchor ---
  setTimeout(() => {
    const hash = window.location.hash;
    const anchor = hash.includes('#') ? hash.split('#').pop() : null;
    if (anchor) {
      const target = document.getElementById(anchor);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, 100);

  // --- Sidebar scroll tracking ---
  const navItems = page.querySelectorAll('.methodology-nav__item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.dataset.section;
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navItems.forEach(n => n.classList.remove('methodology-nav__item--active'));
      item.classList.add('methodology-nav__item--active');
    });
  });

  window.scrollTo(0, 0);
}
