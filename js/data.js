// ========================================
// MOCK DATA — Indian Colleges (v3)
// Reddit-style student reports, per-report trust
// ========================================

const COLLEGES = [
  {
    id: "srm-chennai",
    name: "SRM Institute of Science & Technology",
    shortName: "SRM IST",
    location: "Chennai, Tamil Nadu",
    type: "Deemed University",
    trustScore: 28,
    hasHiddenBond: true,
    bondDetails: "2-year service bond worth ₹2,00,000 — not disclosed during admission counselling.",
    searchCount: 2847,
    summary: {
      claimedCTC: "12.5 LPA",
      reportedMedian: "3.6 LPA",
      reportedAverage: "4.1 LPA",
      reportedLowest: "2.2 LPA",
      reportedHighest: "42 LPA",
      totalReports: 47,
      topRecruiters: ["TCS", "Infosys", "Cognizant", "Wipro", "Zoho"],
      placementRate: "72%",
      batchSize: "~8,000"
    },
    onlineSources: [
      { name: "NIRF Ranking Data 2025", trustLevel: "High", finding: "Median salary reported to NIRF: ₹4.0 LPA" },
      { name: "Glassdoor Reviews (120+)", trustLevel: "Medium", finding: "Average fresher salary: ₹3.2-4.5 LPA" },
      { name: "AmbitionBox", trustLevel: "Medium", finding: "Reported average package: 4.1 LPA" },
      { name: "College Website", trustLevel: "Low", finding: "Claims 'average CTC of 12.5 LPA' — includes variable, bonus, and non-recurring components" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 72,
        upvotes: 34,
        reportType: "personal",
        company: "TCS",
        role: "Systems Engineer",
        ctcOffered: "7.0 LPA",
        ctcBreakdown: { basePay: "3.36 LPA", variablePay: "1.44 LPA", joiningBonus: "₹50,000", relocation: "₹30,000", other: "Insurance, meal coupons" },
        comment: "They told us average package is 12 LPA. My offer letter says 7 LPA CTC but my monthly in-hand is ₹25,000. Nobody talks about the actual take-home.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2023",
        branch: "CSE",
        timestamp: "5 months ago",
        trustScore: 85,
        upvotes: 67,
        reportType: "personal",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "Bond paper was slipped into admission docs. Found out in final year when I wanted to switch jobs. 2 lakh bond for 2 years. Nobody warned us.",
        dataReported: { type: "bond_report", bondAmount: "₹2,00,000", bondDuration: "2 years" }
      },
      {
        id: "r3",
        author: "Anonymous #3",
        batch: "2024",
        branch: "ECE",
        timestamp: "1 month ago",
        trustScore: 68,
        upvotes: 22,
        reportType: "personal",
        company: "Infosys",
        role: "Systems Engineer",
        ctcOffered: "6.25 LPA",
        ctcBreakdown: { basePay: "3.6 LPA", variablePay: "1.15 LPA", joiningBonus: "₹75,000", relocation: "—", other: "—" },
        comment: "ECE branch, got Infosys. CTC on paper is 6.25 but fixed base is 3.6. Most of my batch is in the 3-4 LPA base range. Claimed 12.5 average is a joke.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r4",
        author: "Anonymous #4",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 weeks ago",
        trustScore: 55,
        upvotes: 15,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "Batch stats from our placement WhatsApp group — out of ~2000 CSE students, only about 180 got offers above 5 LPA base. Rest are in 2.5-4 LPA range. The 42 LPA package? ONE person, Google.",
        dataReported: { type: "batch_stats", median: "3.5 LPA", average: "4.2 LPA", above5LPA: "~9%", placed: "~68%" }
      },
      {
        id: "r5",
        author: "Anonymous #5",
        batch: "2023",
        branch: "Mechanical",
        timestamp: "4 months ago",
        trustScore: 61,
        upvotes: 41,
        reportType: "multi_personal",
        company: "Cognizant",
        role: "Programmer Analyst Trainee",
        ctcOffered: "4.0 LPA",
        ctcBreakdown: { basePay: "2.8 LPA", variablePay: "0.6 LPA", joiningBonus: "—", relocation: "₹15,000", other: "—" },
        comment: "Mech student here. Had to learn coding on my own. Got Cognizant as a mass recruiter offer. Base is 2.8 LPA. If you're not CSE, don't expect anything above 3 LPA base.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r6",
        author: "Anonymous #6",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 weeks ago",
        trustScore: 45,
        upvotes: 8,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "If you have below 75% attendance they won't even let you sit for placements. My friend had 74.8% and was disqualified. They gate placements behind attendance not skill.",
        dataReported: { type: "practice_report" }
      },
      {
        id: "r7",
        author: "Anonymous #7",
        batch: "2024",
        branch: "IT",
        timestamp: "6 days ago",
        trustScore: 78,
        upvotes: 19,
        reportType: "personal",
        company: "Zoho",
        role: "Member Technical Staff",
        ctcOffered: "14.0 LPA",
        ctcBreakdown: { basePay: "8.4 LPA", variablePay: "2.0 LPA", joiningBonus: "₹1,00,000", relocation: "₹50,000", other: "Free meals, travel allowance" },
        comment: "I'm one of the lucky ones. Zoho interview was brutal — 6 rounds. But base is genuinely 8.4 LPA. However, I know only 3 others in my batch who got similar or better. The 'average' stat is pulled up by us few outliers.",
        dataReported: { type: "individual_offer" }
      }
    ],
    placementQuestions: [
      { company: "TCS", role: "Systems Engineer", year: 2024, date: "September 2024", questions: ["Explain OOP concepts with examples", "Write a program to reverse a linked list", "SQL query to find second highest salary", "What is normalization?"], difficulty: "Easy" },
      { company: "Infosys", role: "Systems Engineer", year: 2024, date: "October 2024", questions: ["Difference between process and thread", "Write a binary search implementation", "Explain REST API", "Puzzle: 8 balls problem"], difficulty: "Easy-Medium" },
      { company: "Cognizant", role: "Programmer Analyst Trainee", year: 2024, date: "August 2024", questions: ["Automata coding round — 2 questions", "Basic SQL queries", "Communication assessment", "HR: Why Cognizant?"], difficulty: "Easy" },
      { company: "Zoho", role: "Member Technical Staff", year: 2023, date: "November 2023", questions: ["Advanced DSA: Dynamic programming question", "System design: URL shortener", "Matrix manipulation problem", "Debugging a given code snippet"], difficulty: "Hard" }
    ],
    tags: ["Bond Alert", "CTC Inflated", "Mass Recruiter Heavy"]
  },
  {
    id: "vit-vellore",
    name: "VIT University",
    shortName: "VIT",
    location: "Vellore, Tamil Nadu",
    type: "Deemed University",
    trustScore: 42,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 3201,
    summary: {
      claimedCTC: "10.8 LPA",
      reportedMedian: "4.2 LPA",
      reportedAverage: "4.8 LPA",
      reportedLowest: "2.5 LPA",
      reportedHighest: "54 LPA",
      totalReports: 63,
      topRecruiters: ["Amazon", "Wipro", "Capgemini", "TCS", "Deloitte"],
      placementRate: "78%",
      batchSize: "~10,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹5.0 LPA — closer to reality than marketing" },
      { name: "Glassdoor Reviews (200+)", trustLevel: "Medium", finding: "Average fresher salary: ₹3.8-5.0 LPA" },
      { name: "LinkedIn Alumni (150 sampled)", trustLevel: "Medium", finding: "Average first job: ₹4.5 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "1 month ago",
        trustScore: 70,
        upvotes: 45,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "VIT's claimed average is misleading. Remove the top 5% outliers and actual average drops to 4-5 LPA base. The Amazon packages and international offers skew everything.",
        dataReported: { type: "batch_stats", median: "4.0 LPA", average: "4.8 LPA", above5LPA: "~15%", placed: "~75%" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 weeks ago",
        trustScore: 65,
        upvotes: 30,
        reportType: "personal",
        company: "Wipro",
        role: "Project Engineer",
        ctcOffered: "6.5 LPA",
        ctcBreakdown: { basePay: "3.5 LPA", variablePay: "1.2 LPA", joiningBonus: "₹50,000", relocation: "₹40,000", other: "—" },
        comment: "No bond which is good. But the management fee keeps increasing every semester with no justification. Wipro offer looks decent on paper but base is only 3.5.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r3",
        author: "Anonymous #3",
        batch: "2023",
        branch: "IT",
        timestamp: "4 months ago",
        trustScore: 58,
        upvotes: 22,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "They include PPO from internships in placement stats. Technically correct but very misleading. Also FFCS scheduling conflicts made interview prep hell.",
        dataReported: { type: "practice_report" }
      }
    ],
    placementQuestions: [
      { company: "Amazon", role: "SDE-1", year: 2024, date: "August 2024", questions: ["Two coding questions — array manipulation and graph BFS", "System design: Design a notification service", "Behavioral: Tell me about a time you disagreed with a team member"], difficulty: "Hard" },
      { company: "Wipro", role: "Project Engineer", year: 2024, date: "September 2024", questions: ["Aptitude test — 60 questions", "Essay writing", "Technical MCQs on Java/C++", "HR interview"], difficulty: "Easy" },
      { company: "Capgemini", role: "Analyst", year: 2023, date: "October 2023", questions: ["Game-based aptitude round", "Coding: 2 easy-medium questions", "Communication assessment", "HR round"], difficulty: "Easy-Medium" }
    ],
    tags: ["CTC Inflated", "No Bonds", "Outlier Driven Stats"]
  },
  {
    id: "manipal-karnataka",
    name: "Manipal Institute of Technology",
    shortName: "MIT Manipal",
    location: "Manipal, Karnataka",
    type: "Deemed University",
    trustScore: 68,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 1956,
    summary: {
      claimedCTC: "9.5 LPA",
      reportedMedian: "5.8 LPA",
      reportedAverage: "6.2 LPA",
      reportedLowest: "3.0 LPA",
      reportedHighest: "45 LPA",
      totalReports: 38,
      topRecruiters: ["Microsoft", "Goldman Sachs", "TCS Digital", "Cisco", "SAP"],
      placementRate: "82%",
      batchSize: "~3,500"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹6.2 LPA — relatively honest reporting" },
      { name: "Glassdoor (80+ reviews)", trustLevel: "Medium", finding: "Average fresher salary: ₹5.5-6.5 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 82,
        upvotes: 56,
        reportType: "personal",
        company: "Microsoft",
        role: "SDE",
        ctcOffered: "18 LPA",
        ctcBreakdown: { basePay: "14.5 LPA", variablePay: "2.0 LPA", joiningBonus: "₹1,50,000", relocation: "—", other: "Stocks" },
        comment: "Honestly one of the better colleges. Base pay reality is closer to what they claim compared to others. But this is CSE — other branches have a very different story.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2023",
        branch: "Mechanical",
        timestamp: "5 months ago",
        trustScore: 75,
        upvotes: 38,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "No bond, decent placements, but you're stuck in a small town. Off-campus hustle is all on you. Mech placement rate is maybe 40% honestly. Fees 20L+ for 4 years and base pay under 4 LPA for mech.",
        dataReported: { type: "batch_stats", median: "3.5 LPA", average: "3.8 LPA", placed: "~40%" }
      },
      {
        id: "r3",
        author: "Anonymous #3",
        batch: "2024",
        branch: "CSE",
        timestamp: "1 month ago",
        trustScore: 70,
        upvotes: 25,
        reportType: "personal",
        company: "Goldman Sachs",
        role: "Analyst",
        ctcOffered: "22 LPA",
        ctcBreakdown: { basePay: "16 LPA", variablePay: "3.5 LPA", joiningBonus: "₹2,00,000", relocation: "₹50,000", other: "—" },
        comment: "GS was hard to crack but compensation is real. However, only 5 students got GS from our batch. The average is heavily weighted by a handful of us.",
        dataReported: { type: "individual_offer" }
      }
    ],
    placementQuestions: [
      { company: "Microsoft", role: "SDE", year: 2024, date: "July 2024", questions: ["3 coding rounds: Trees, DP, Graphs", "System design: Design a chat application", "Behavioral round with skip-level manager"], difficulty: "Hard" },
      { company: "Goldman Sachs", role: "Analyst", year: 2024, date: "August 2024", questions: ["Quantitative aptitude + Coding", "System design basics", "HR + Technical mix round"], difficulty: "Hard" }
    ],
    tags: ["No Bonds", "Verified Base CTC", "High Fees"]
  },
  {
    id: "amity-noida",
    name: "Amity University",
    shortName: "Amity",
    location: "Noida, Uttar Pradesh",
    type: "Private University",
    trustScore: 18,
    hasHiddenBond: true,
    bondDetails: "₹1,50,000 bond for 1 year with partner companies.",
    searchCount: 1523,
    summary: {
      claimedCTC: "8.0 LPA",
      reportedMedian: "2.8 LPA",
      reportedAverage: "3.1 LPA",
      reportedLowest: "1.8 LPA",
      reportedHighest: "12 LPA",
      totalReports: 29,
      topRecruiters: ["Amity Group Companies", "Concentrix", "Genpact", "HCL"],
      placementRate: "55%",
      batchSize: "~6,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹3.0 LPA — massive gap from claimed 8 LPA" },
      { name: "AmbitionBox", trustLevel: "Medium", finding: "Average fresher salary: ₹2.5-3.5 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "1 month ago",
        trustScore: 80,
        upvotes: 89,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "Brand name is all marketing. Actual placements are dismal. Most of batch ends up in BPO roles. They count Amity employees hiring Amity students as 'placements'. The conflict of interest is unreal.",
        dataReported: { type: "practice_report" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 weeks ago",
        trustScore: 72,
        upvotes: 45,
        reportType: "personal",
        company: "Concentrix",
        role: "Process Associate",
        ctcOffered: "2.8 LPA",
        ctcBreakdown: { basePay: "2.4 LPA", variablePay: "0.4 LPA", joiningBonus: "—", relocation: "—", other: "—" },
        comment: "This is what 'placements' look like at Amity. A BPO role at 2.8 LPA CTC after paying 15L in fees. The bond makes it worse — you can't leave for 1 year.",
        dataReported: { type: "individual_offer" }
      }
    ],
    placementQuestions: [
      { company: "Concentrix", role: "Process Associate", year: 2024, date: "September 2024", questions: ["English communication test", "Typing speed test", "Voice/accent assessment", "HR round"], difficulty: "Easy" }
    ],
    tags: ["Bond Alert", "CTC Inflated", "Self-Placements"]
  },
  {
    id: "lpu-punjab",
    name: "Lovely Professional University",
    shortName: "LPU",
    location: "Phagwara, Punjab",
    type: "Private University",
    trustScore: 32,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 2105,
    summary: {
      claimedCTC: "7.5 LPA",
      reportedMedian: "3.0 LPA",
      reportedAverage: "3.4 LPA",
      reportedLowest: "2.0 LPA",
      reportedHighest: "42 LPA",
      totalReports: 85,
      topRecruiters: ["TCS", "Byju's", "Infosys", "Wipro", "Amazon"],
      placementRate: "65%",
      batchSize: "~10,000+"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹3.2 LPA" },
      { name: "Glassdoor", trustLevel: "Medium", finding: "Average: ₹3.0-3.5 LPA for LPU freshers" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 75,
        upvotes: 52,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "10,000 students. Think about that. Even if 2000 get placed well, what about the other 8000? The CTC they advertise is the HIGHEST package, not average. Very misleading.",
        dataReported: { type: "batch_stats", median: "2.8 LPA", average: "3.4 LPA", above5LPA: "~8%", placed: "~62%" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 weeks ago",
        trustScore: 60,
        upvotes: 28,
        reportType: "personal",
        company: "TCS",
        role: "Systems Engineer",
        ctcOffered: "7.0 LPA",
        ctcBreakdown: { basePay: "3.36 LPA", variablePay: "1.44 LPA", joiningBonus: "₹50,000", relocation: "₹30,000", other: "—" },
        comment: "TCS offer — looks like 7 LPA on paper but base is only 3.36. No bond at least. Infrastructure is great honestly. Campus is beautiful. But academics and placements are two different stories.",
        dataReported: { type: "individual_offer" }
      }
    ],
    placementQuestions: [
      { company: "TCS", role: "Systems Engineer", year: 2024, date: "September 2024", questions: ["TCS NQT based — aptitude + coding", "Email writing", "HR interview"], difficulty: "Easy" },
      { company: "Infosys", role: "Systems Engineer", year: 2024, date: "October 2024", questions: ["InfyTQ platform test", "3 coding questions (easy)", "HR interview"], difficulty: "Easy" }
    ],
    tags: ["No Bonds", "CTC Inflated", "Mega Batch Size"]
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    shortName: "BITS",
    location: "Pilani, Rajasthan",
    type: "Deemed University",
    trustScore: 82,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 4521,
    summary: {
      claimedCTC: "18.0 LPA",
      reportedMedian: "12.5 LPA",
      reportedAverage: "14.2 LPA",
      reportedLowest: "6.0 LPA",
      reportedHighest: "1.2 Cr",
      totalReports: 55,
      topRecruiters: ["Google", "Microsoft", "Tower Research", "Goldman Sachs", "Uber"],
      placementRate: "88%",
      batchSize: "~2,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹14.0 LPA — among highest in India" },
      { name: "LinkedIn Alumni", trustLevel: "High", finding: "Strong alumni network. First job avg: ₹12-15 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "1 month ago",
        trustScore: 88,
        upvotes: 72,
        reportType: "personal",
        company: "Google",
        role: "SDE-2",
        ctcOffered: "45 LPA",
        ctcBreakdown: { basePay: "25 LPA", variablePay: "8 LPA", joiningBonus: "₹5,00,000", relocation: "₹2,00,000", other: "Stocks, RSUs" },
        comment: "BITS is genuinely good. No bonds, strong peer group, real alumni network. But PS-2 (Practice School) is basically unpaid labor sometimes. Fees are astronomical — 25L+ for 4 years.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2024",
        branch: "EEE",
        timestamp: "2 months ago",
        trustScore: 80,
        upvotes: 45,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "One of the few colleges where CTC is somewhat real. But the stat includes all campuses (Goa, Hyderabad) consolidated. Pilani campus alone might be higher. Still, non-CS branches range 6-10 LPA base which is honest.",
        dataReported: { type: "batch_stats", median: "12 LPA", average: "14 LPA", placed: "~85%" }
      }
    ],
    placementQuestions: [
      { company: "Google", role: "SDE-2", year: 2024, date: "July 2024", questions: ["4 coding rounds: Heavy DSA", "System design: Design Google Maps routing", "Googleyness & Leadership round"], difficulty: "Very Hard" },
      { company: "Tower Research", role: "Quant Developer", year: 2024, date: "August 2024", questions: ["Probability puzzles", "C++ optimization problems", "Low-latency system design", "Brain teasers"], difficulty: "Very Hard" },
      { company: "Microsoft", role: "SDE", year: 2023, date: "September 2023", questions: ["3 coding rounds", "System design: Message queue", "Behavioral round"], difficulty: "Hard" }
    ],
    tags: ["No Bonds", "Verified Base CTC", "High Fees", "Elite Tier"]
  },
  {
    id: "chitkara-punjab",
    name: "Chitkara University",
    shortName: "Chitkara",
    location: "Rajpura, Punjab",
    type: "Private University",
    trustScore: 35,
    hasHiddenBond: true,
    bondDetails: "Mandatory 6-month internship acts as de-facto bond. Leaving early = degree withheld.",
    searchCount: 876,
    summary: {
      claimedCTC: "8.2 LPA",
      reportedMedian: "3.8 LPA",
      reportedAverage: "4.0 LPA",
      reportedLowest: "2.5 LPA",
      reportedHighest: "15 LPA",
      totalReports: 21,
      topRecruiters: ["Infosys", "Partner Companies (NDA)", "HCL", "Wipro"],
      placementRate: "70%",
      batchSize: "~2,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹3.5 LPA" },
      { name: "College Dunia", trustLevel: "Low-Medium", finding: "Listed average: 5.5 LPA — likely college-submitted data" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 70,
        upvotes: 18,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "The mandatory internship is basically free labor for companies the college has deals with. Good teaching quality but placement model is exploitative. You work 6 months for ₹8,000-12,000/month.",
        dataReported: { type: "practice_report" }
      }
    ],
    placementQuestions: [
      { company: "Infosys", role: "Systems Engineer", year: 2024, date: "October 2024", questions: ["Standard InfyTQ assessment", "Coding: 2 problems", "HR interview"], difficulty: "Easy" }
    ],
    tags: ["Bond Alert", "Forced Internship", "CTC Inflated"]
  },
  {
    id: "thapar-punjab",
    name: "Thapar Institute of Engineering & Technology",
    shortName: "Thapar",
    location: "Patiala, Punjab",
    type: "Deemed University",
    trustScore: 65,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 1342,
    summary: {
      claimedCTC: "9.0 LPA",
      reportedMedian: "5.5 LPA",
      reportedAverage: "5.8 LPA",
      reportedLowest: "2.5 LPA",
      reportedHighest: "35 LPA",
      totalReports: 32,
      topRecruiters: ["Adobe", "Deloitte", "TCS Digital", "Infosys", "Wipro"],
      placementRate: "80%",
      batchSize: "~2,500"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹5.8 LPA — reasonably honest" },
      { name: "LinkedIn Alumni (80 sampled)", trustLevel: "Medium", finding: "First job average: ₹5.5 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 months ago",
        trustScore: 85,
        upvotes: 40,
        reportType: "personal",
        company: "Adobe",
        role: "MTS",
        ctcOffered: "21 LPA",
        ctcBreakdown: { basePay: "15 LPA", variablePay: "3 LPA", joiningBonus: "₹2,00,000", relocation: "₹50,000", other: "Stocks" },
        comment: "Solid college for Punjab region. No shady bonds. Placements are decent for CS/IT. Good faculty, reasonable fees compared to VIT/Manipal. Base CTC reporting is mostly honest.",
        dataReported: { type: "individual_offer" }
      },
      {
        id: "r2",
        author: "Anonymous #2",
        batch: "2023",
        branch: "Civil",
        timestamp: "5 months ago",
        trustScore: 78,
        upvotes: 33,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "If you're not CS, placement scene is rough. Mech/Civil students struggle a lot here. I switched to IT services after graduating. Civil placements are maybe 25-30%.",
        dataReported: { type: "batch_stats", median: "2.8 LPA", placed: "~28%" }
      }
    ],
    placementQuestions: [
      { company: "Adobe", role: "MTS", year: 2024, date: "August 2024", questions: ["Online test: 3 coding + MCQs", "Technical: DSA deep dive", "System design round", "Hiring manager round"], difficulty: "Hard" },
      { company: "Deloitte", role: "Analyst", year: 2024, date: "September 2024", questions: ["Game-based assessment", "Group case study", "Technical + HR combined"], difficulty: "Medium" }
    ],
    tags: ["No Bonds", "Verified Base CTC", "Branch Dependent"]
  },
  {
    id: "sharda-noida",
    name: "Sharda University",
    shortName: "Sharda",
    location: "Greater Noida, Uttar Pradesh",
    type: "Private University",
    trustScore: 15,
    hasHiddenBond: true,
    bondDetails: "1-year service bond. ₹50,000 to ₹2,00,000 depending on company.",
    searchCount: 645,
    summary: {
      claimedCTC: "6.5 LPA",
      reportedMedian: "2.2 LPA",
      reportedAverage: "2.5 LPA",
      reportedLowest: "1.5 LPA",
      reportedHighest: "8 LPA",
      totalReports: 15,
      topRecruiters: ["Concentrix", "Teleperformance", "Genpact"],
      placementRate: "40%",
      batchSize: "~4,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹2.5 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 82,
        upvotes: 56,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "Don't come here for placements. Most offers are call center jobs dressed up as 'analyst' roles. They charge a separate placement fee on top of tuition. ₹25,000-50,000 extra. And then the companies that come are bottom-tier BPOs.",
        dataReported: { type: "practice_report" }
      }
    ],
    placementQuestions: [
      { company: "Concentrix", role: "Process Associate", year: 2024, date: "August 2024", questions: ["English proficiency test", "Typing test", "Voice assessment", "HR — 5 min"], difficulty: "Very Easy" }
    ],
    tags: ["Bond Alert", "CTC Inflated", "BPO Heavy", "Extra Fees"]
  },
  {
    id: "chandigarh-univ",
    name: "Chandigarh University",
    shortName: "CU",
    location: "Mohali, Punjab",
    type: "Private University",
    trustScore: 25,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 1876,
    summary: {
      claimedCTC: "9.0 LPA",
      reportedMedian: "3.2 LPA",
      reportedAverage: "3.5 LPA",
      reportedLowest: "2.0 LPA",
      reportedHighest: "30 LPA",
      totalReports: 52,
      topRecruiters: ["Wipro", "HCLTech", "TCS", "Infosys"],
      placementRate: "60%",
      batchSize: "~30,000+"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹3.0 LPA" },
      { name: "YouTube (Organic)", trustLevel: "Low", finding: "Heavily sponsored content. Finding unsponsored reviews is difficult." }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "1 month ago",
        trustScore: 73,
        upvotes: 65,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "CU is all about marketing. Guinness records, YouTube ads. 30,000 students — let that sink in. The placement stats they show are percentages, not absolute numbers. No bond which is nice, but you're competing with thousands.",
        dataReported: { type: "batch_stats", median: "3.0 LPA", average: "3.5 LPA", above5LPA: "~5%", placed: "~58%" }
      }
    ],
    placementQuestions: [
      { company: "Wipro", role: "Project Engineer", year: 2024, date: "September 2024", questions: ["Online aptitude test", "Essay writing", "Technical MCQs", "HR interview"], difficulty: "Easy" }
    ],
    tags: ["No Bonds", "CTC Inflated", "Mega Batch Size", "Marketing Heavy"]
  },
  {
    id: "symbiosis-pune",
    name: "Symbiosis Institute of Technology",
    shortName: "SIT Pune",
    location: "Pune, Maharashtra",
    type: "Deemed University",
    trustScore: 55,
    hasHiddenBond: false,
    bondDetails: "",
    searchCount: 1234,
    summary: {
      claimedCTC: "8.5 LPA",
      reportedMedian: "4.5 LPA",
      reportedAverage: "5.0 LPA",
      reportedLowest: "2.8 LPA",
      reportedHighest: "20 LPA",
      totalReports: 24,
      topRecruiters: ["Persistent Systems", "Infosys", "TCS", "Accenture"],
      placementRate: "75%",
      batchSize: "~1,500"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹5.0 LPA" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "3 months ago",
        trustScore: 68,
        upvotes: 20,
        reportType: "personal",
        company: "Persistent Systems",
        role: "Software Engineer",
        ctcOffered: "6.5 LPA",
        ctcBreakdown: { basePay: "4.2 LPA", variablePay: "1.0 LPA", joiningBonus: "₹50,000", relocation: "₹35,000", other: "—" },
        comment: "Pune location is a huge plus for off-campus. On-campus placements don't justify the fees though. No bonds, decent faculty. Symbiosis charges a premium for the name.",
        dataReported: { type: "individual_offer" }
      }
    ],
    placementQuestions: [
      { company: "Persistent Systems", role: "Software Engineer", year: 2024, date: "August 2024", questions: ["Online coding test — 3 problems", "Technical interview: OOP + DBMS", "HR round"], difficulty: "Medium" }
    ],
    tags: ["No Bonds", "Brand Premium", "Location Advantage"]
  },
  {
    id: "kiit-odisha",
    name: "KIIT University",
    shortName: "KIIT",
    location: "Bhubaneswar, Odisha",
    type: "Deemed University",
    trustScore: 30,
    hasHiddenBond: true,
    bondDetails: "Some partner companies require 1-year commitment facilitated by college.",
    searchCount: 1567,
    summary: {
      claimedCTC: "7.8 LPA",
      reportedMedian: "3.5 LPA",
      reportedAverage: "3.8 LPA",
      reportedLowest: "2.0 LPA",
      reportedHighest: "25 LPA",
      totalReports: 36,
      topRecruiters: ["TCS", "LTIMindtree", "Accenture", "Wipro"],
      placementRate: "68%",
      batchSize: "~8,000"
    },
    onlineSources: [
      { name: "NIRF Data 2025", trustLevel: "High", finding: "Median salary: ₹3.8 LPA" },
      { name: "AmbitionBox", trustLevel: "Medium", finding: "Average: ₹3.2-4.0 LPA for KIIT freshers" }
    ],
    reports: [
      {
        id: "r1",
        author: "Anonymous #1",
        batch: "2024",
        branch: "CSE",
        timestamp: "2 months ago",
        trustScore: 72,
        upvotes: 38,
        reportType: "aggregate",
        company: null,
        role: null,
        ctcOffered: null,
        ctcBreakdown: null,
        comment: "KIIT grew too fast. 5 years ago it was better. Now every branch is overcrowded. Bond through company (not college) confirmed — college says it's 'company policy' but students have no choice.",
        dataReported: { type: "practice_report" }
      }
    ],
    placementQuestions: [
      { company: "TCS", role: "Systems Engineer", year: 2024, date: "September 2024", questions: ["TCS NQT — standard format", "Email writing", "HR interview"], difficulty: "Easy" },
      { company: "Accenture", role: "ASE", year: 2023, date: "September 2023", questions: ["Cognitive + Technical assessment", "Coding: 2 problems", "Communication assessment"], difficulty: "Easy-Medium" }
    ],
    tags: ["Bond Alert", "CTC Inflated", "Overcrowded"]
  }
];

// Gather all placement questions across all colleges
function getAllPlacementQuestions() {
  const all = [];
  COLLEGES.forEach(college => {
    if (college.placementQuestions) {
      college.placementQuestions.forEach(pq => {
        all.push({ ...pq, collegeId: college.id, collegeName: college.shortName });
      });
    }
  });
  return all;
}

export { COLLEGES, getAllPlacementQuestions };
