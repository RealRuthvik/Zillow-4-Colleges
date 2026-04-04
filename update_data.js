import fs from 'fs';

const dataPath = './js/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

// A cheap way to extract and replace the array
const prefix = `// ========================================
// MOCK DATA — Indian Colleges (v3)
// Reddit-style student reports, per-report trust
// ========================================

export const COLLEGES = `;

let arrayStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);

let fnBody = `return ${arrayStr}`;
let getColleges = new Function(fnBody);
let colleges = getColleges();

// Mapping logic
const getTags = (company) => {
    let name = company.toLowerCase();
    if (['google', 'apple', 'meta', 'facebook', 'amazon', 'microsoft', 'netflix'].includes(name)) return ['Big Tech', 'Overseas'];
    if (['tcs', 'wipro', 'infosys', 'cognizant', 'capgemini', 'accenture', 'ibm'].includes(name)) return ['Mass Recruiter'];
    if (['zoho', 'razorpay', 'zerodha', 'cred', 'swiggy', 'zomato', 'flipkart'].includes(name)) return ['Startup'];
    return [];
};

// Filter out SRM, LPU, Amity
colleges = colleges.filter(c => !['srm-chennai', 'lpu-phagwara', 'amity-noida'].includes(c.id));

// Update existing
colleges.forEach(c => {
    if (c.id === 'bits-pilani') c.studentTier = 'Tier 1';
    else if (c.id === 'vit-vellore') c.studentTier = 'Tier 2';
    else if (c.id === 'manipal') c.studentTier = 'Tier 2';
    else c.studentTier = 'Tier 3';
    
    delete c.type;

    c.summary.topRecruiters = c.summary.topRecruiters.map(r => ({
        name: r,
        tags: getTags(r)
    }));

    c.reports.forEach(r => {
        if (r.trustScore >= 75) r.verificationLevel = 'L3';
        else if (r.trustScore >= 50) r.verificationLevel = 'L2';
        else r.verificationLevel = 'L1';
    });
});

// Add new generic IIT/NIT
const iitb = JSON.parse(JSON.stringify(colleges.find(c => c.id === 'bits-pilani')));
iitb.id = 'iit-bombay'; iitb.name = 'Indian Institute of Technology, Bombay'; iitb.shortName = 'IITB';
iitb.location = 'Mumbai, Maharashtra'; iitb.studentTier = 'Tier 1';
iitb.searchCount = 15420; iitb.summary.claimedCTC = "25.0 LPA"; iitb.summary.reportedMedian = "18.5 LPA";
iitb.summary.reportedAverage = "21.0 LPA"; iitb.summary.reportedLowest = "8.0 LPA"; iitb.summary.topRecruiters = [{name: 'Google', tags: ['Big Tech', 'Overseas']}, {name:'Tower Research', tags:['Big Tech']}, {name:'QuantBox', tags:['Startup']}];
colleges.unshift(iitb);

const nitt = JSON.parse(JSON.stringify(colleges.find(c => c.id === 'vit-vellore')));
nitt.id = 'nit-trichy'; nitt.name = 'National Institute of Technology, Tiruchirappalli'; nitt.shortName = 'NITT';
nitt.location = 'Tiruchirappalli, Tamil Nadu'; nitt.studentTier = 'Tier 1';
nitt.searchCount = 9800; nitt.summary.claimedCTC = "15.0 LPA"; nitt.summary.reportedMedian = "11.5 LPA";
nitt.summary.topRecruiters = [{name: 'Amazon', tags: ['Big Tech']}, {name:'Wipro', tags:['Mass Recruiter']}];
colleges.push(nitt);

const iiith = JSON.parse(JSON.stringify(colleges.find(c => c.id === 'manipal')));
iiith.id = 'iiit-hyderabad'; iiith.name = 'International Institute of Information Technology'; iiith.shortName = 'IIITH';
iiith.location = 'Hyderabad, Telangana'; iiith.studentTier = 'Tier 1';
iiith.searchCount = 12500; iiith.summary.claimedCTC = "30.0 LPA"; iiith.summary.reportedMedian = "26.5 LPA";
iiith.summary.reportedAverage = "28.0 LPA"; iitb.summary.reportedLowest = "12.0 LPA";
iiith.summary.topRecruiters = [{name: 'Meta', tags: ['Big Tech', 'Overseas']}, {name:'Sprinklr', tags:['Big Tech']}, {name:'Uber', tags:['Big Tech']}];
colleges.push(iiith);

const output = prefix + JSON.stringify(colleges, null, 2) + ';\n';
fs.writeFileSync(dataPath, output);
console.log('Done mapping.');
