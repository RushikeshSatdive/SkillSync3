/* ============================================================================
   SKILLSYNC — MOCK DATA
   ----------------------------------------------------------------------------
   Source of truth: SkillSync_Numeric_Data.xlsx (project deck)
   Every numeric figure below is either (a) ACTUAL/SOURCE data, (b) ILLUSTRATIVE,
   (c) a FUTURE TARGET, or (d) PROPOSED. These labels are surfaced in the UI so
   the distinction is never lost. Nothing here is invented traction.
   ========================================================================== */

/* ---------------------------------------------------------------- PROBLEMS */
export const SOURCE_STATS = [
  {
    id: 'enrolment',
    value: 4.33,
    decimals: 2,
    suffix: ' crore',
    label: 'Enrolled higher-education students',
    tag: 'AISHE 2021–22',
    kind: 'actual',
  },
  {
    id: 'ger',
    value: 28.4,
    decimals: 1,
    suffix: '%',
    label: 'Gross Enrolment Ratio (GER)',
    tag: 'AISHE 2021–22',
    kind: 'actual',
  },
  {
    id: 'employability',
    value: 54.81,
    decimals: 2,
    suffix: '%',
    label: 'Graduates expected to be employable',
    tag: 'India Skills Report 2025',
    kind: 'actual',
  },
]

export const SOURCE_CITATION = 'AISHE 2021–22 · India Skills Report 2025'

export const PROBLEM_CARDS = [
  {
    id: 'goal',
    n: '01',
    title: 'Goal without a map',
    headline: 'Career goal',
    body: 'Most students pick a career from a list. Almost none can name the exact skills that job screens for on day one.',
    icon: 'Compass',
    tone: 'brand',
  },
  {
    id: 'gap',
    n: '02',
    title: 'You don’t know what you don’t know',
    headline: 'Unknown skill gap',
    body: 'Without a benchmark, effort goes into skills you already have. The real gaps stay invisible until interview day.',
    icon: 'ScanSearch',
    tone: 'sky',
  },
  {
    id: 'cost',
    n: '03',
    title: 'A lot of content, very little signal',
    headline: 'Expensive or generic courses',
    body: 'Course catalogues optimise for volume, not for your specific gap. Completion rates stay low and fees stay high.',
    icon: 'Wallet',
    tone: 'amber',
  },
  {
    id: 'person',
    n: '04',
    title: 'The right person is a stranger',
    headline: 'Hard to find the right person',
    body: 'Mentors, seniors and peers with the exact skill exist — but they are scattered across campuses and networks.',
    icon: 'Search',
    tone: 'rose',
  },
  {
    id: 'practice',
    n: '05',
    title: 'Watching is not doing',
    headline: 'Low practical exposure',
    body: 'Students consume theory but rarely build the artefacts — models, audits, decks — that hiring managers actually read.',
    icon: 'Dumbbell',
    tone: 'accent',
  },
  {
    id: 'proof',
    n: '06',
    title: 'Nothing portable to show',
    headline: 'Weak skill proof',
    body: 'Hours spent learning rarely convert into a verifiable record. The CV stays a list of courses, not evidence of work.',
    icon: "BadgeX",
    tone: 'brand-2',
  },
]

/* ------------------------------------------------------------- COMPARISON */
export const COMPARISON = [
  {
    kind: 'content',
    title: 'Content',
    examples: 'YouTube · Coursera · Udemy',
    delivers: 'Information',
    icon: 'PlaySquare',
    bullets: ['Very broad library', 'High-quality instruction', 'Little personal targeting'],
  },
  {
    kind: 'mentorship',
    title: 'Mentorship',
    examples: 'Experienced professionals',
    delivers: 'Guidance',
    icon: 'UserRoundSearch',
    bullets: ['High-signal advice', 'Career context', 'Limited and costly access'],
  },
  {
    kind: 'social',
    title: 'Social networks',
    examples: 'LinkedIn',
    delivers: 'Connections',
    icon: 'Share2',
    bullets: ['Professional reach', 'Recruiter visibility', 'Connection ≠ collaboration'],
  },
  {
    kind: 'exchange',
    title: 'Skill exchange',
    examples: 'Peer platforms',
    delivers: 'Exchange',
    icon: 'ArrowLeftRight',
    bullets: ['Two-way learning', 'Low cost', 'Usually self-directed'],
  },
]

export const SKILLSYNC_THESIS = {
  title: 'SkillSync',
  delivers: 'Personalised skill development',
  pillars: ['Discovery', 'Matching', 'Progress'],
  note: 'SkillSync positioning thesis.',
}

/* ------------------------------------------------------------ HOW IT WORKS */
export const JOURNEY_STEPS = [
  {
    id: 1,
    title: 'Create skill profile',
    short: 'Profile',
    icon: 'UserPlus',
    detail:
      'Start with a structured profile: your branch, year, career goal and the skills you rate yourself at. Takes under three minutes and it becomes the input for every later recommendation.',
    output: 'Structured skill profile',
    time: '~3 min',
  },
  {
    id: 2,
    title: 'Add skills I can teach',
    short: 'I Teach',
    icon: 'GraduationCap',
    detail:
      'Every skill you list as teachable becomes a reason another student may pick you. Teaching a skill is the fastest way to consolidate it — and it builds proof.',
    output: 'Teachable skill inventory',
    time: '~2 min',
  },
  {
    id: 3,
    title: 'Add skills I want to learn',
    short: 'I Want',
    icon: 'Target',
    detail:
      'Name the skills you want to build. These become the search vector for peer matching and the raw material for your gap analysis.',
    output: 'Learning wishlist',
    time: '~2 min',
  },
  {
    id: 4,
    title: 'Define career goal',
    short: 'Career',
    icon: 'Compass',
    detail:
      'Pick a target role. The career goal is what turns a loose skill list into an ordered, prioritised plan — it decides what is a gap and what is optional.',
    output: 'Target role anchored',
    time: '~1 min',
  },
  {
    id: 5,
    title: 'AI identifies skill gaps',
    short: 'Gap Analysis',
    icon: 'ScanSearch',
    detail:
      'Your profile is compared against a role-specific skill benchmark, producing a current level and a target level per skill — and a priority order.',
    output: 'Ranked skill gap report',
    time: 'Simulated',
  },
  {
    id: 6,
    title: 'AI recommends peers',
    short: 'Matching',
    icon: 'Users',
    detail:
      'Peers are ranked by complementarity: who can teach what you lack, and wants to learn what you already have — plus style, level and schedule compatibility.',
    output: 'Ranked peer shortlist',
    time: 'Simulated',
  },
  {
    id: 7,
    title: 'Learn + practice',
    short: 'Practice',
    icon: 'Dumbbell',
    detail:
      'Short, focused practice activities and structured exchange sessions convert knowledge into output. Build the artefact, not just the theory.',
    output: 'Worked artefacts',
    time: '20 min / activity',
  },
  {
    id: 8,
    title: 'Track progress + build skill proof',
    short: 'Proof',
    icon: 'BadgeCheck',
    detail:
      'Every completed activity and session is logged into a portable record you can show — the layer that turns effort into evidence.',
    output: 'Verifiable skill record',
    time: 'Ongoing',
  },
]

export const FLOATING_SKILLS = [
  'Financial Analysis',
  'Digital Marketing',
  'Python',
  'Data Analytics',
  'Excel',
  'Leadership',
  'Communication',
  'Product Management',
]

/* --------------------------------------------------------- DEMO STUDENT */
export const STUDENT = {
  name: 'Sakshi Jadhav',
  firstName: 'Sakshi',
  initials: 'SJ',
  role: 'B.Com · Final Year',
  campus: 'Symbiosis Institute, Pune',
  careerGoal: 'Investment Banking',
  careerGoalIcon: 'Landmark',
  canTeach: ['Financial Analysis'],
  wantToLearn: ['Digital Marketing'],
  streakDays: 12,
  skillsCompleted: 6,
  progress: 68,
  recommendedMatch: 94,
  peersConsidered: 3,
  bio: 'Final-year commerce student aiming for investment banking. Comfortable with financial statements and Excel; currently trying to close modelling and valuation gaps.',
}

export const DASHBOARD_CARDS = [
  { id: 'goal', label: 'Career Goal', value: 'Investment Banking', icon: 'Landmark', tone: 'brand' },
  { id: 'gap', label: 'AI Skill Gap', value: '3 skills to close', icon: 'ScanSearch', tone: 'amber' },
  { id: 'match', label: 'Recommended Match', value: '94%', icon: 'Target', tone: 'accent' },
  { id: 'progress', label: 'Progress', value: '68%', icon: 'TrendingUp', tone: 'sky' },
]

export const GAP_SKILLS = [
  {
    id: 'modelling',
    name: 'Financial Modelling',
    current: 45,
    target: 85,
    priority: 'High',
    weight: 30,
    weeks: 4,
    why: 'Core deliverable for every IB interview loop — 3-statement models are built or tested in nearly every process.',
    modules: ['Structure & drivers', '3-statement link', 'Scenario & sensitivity'],
  },
  {
    id: 'valuation',
    name: 'Valuation',
    current: 35,
    target: 80,
    priority: 'High',
    weight: 30,
    weeks: 3,
    why: 'DCF, trading comps and precedent transactions are tested directly; 35% is the single largest gap in your profile.',
    modules: ['DCF mechanics', 'Trading comparables', 'Precedent transactions'],
  },
  {
    id: 'excel',
    name: 'Advanced Excel',
    current: 55,
    target: 90,
    priority: 'Medium',
    weight: 20,
    weeks: 2,
    why: 'Speed and auditability. Weak Excel visibly caps modelling ability even when the concepts are understood.',
    modules: ['Pivot & Power Query', 'Lookups & dynamic arrays', 'Audit trails'],
  },
  {
    id: 'communication',
    name: 'Client Communication',
    current: 60,
    target: 85,
    priority: 'Medium',
    weight: 20,
    weeks: 3,
    why: 'Banking is client-facing. Presentation and written clarity are scored separately from technical skill.',
    modules: ['Deck structure', 'Pyramid writing', 'Q&A handling'],
  },
]

export const GAP_PRIMARY = GAP_SKILLS.slice(0, 3)

export const CURRENT_SKILLS = [
  { name: 'Financial Analysis', level: 80 },
  { name: 'Excel', level: 65 },
  { name: 'Business Analysis', level: 55 },
]

export const REQUIRED_SKILLS = ['Financial Modelling', 'Valuation', 'Advanced Excel']

/* --------------------------------------------------------------- PEERS */
export const MATCH_DIMENSIONS = [
  { id: 'skill', label: 'Skill Compatibility', value: 95 },
  { id: 'career', label: 'Career Alignment', value: 92 },
  { id: 'preference', label: 'Learning Preference', value: 90 },
  { id: 'availability', label: 'Availability', value: 88 },
]

export const MATCH_DISCLAIMER =
  '94% is an illustrative product example and not a validated outcome.'

export const PEERS = [
  {
    id: 'aarav-mehta',
    name: 'Aarav Mehta',
    initials: 'AM',
    score: 94,
    rank: 'Top Match',
    teaching: ['Digital Marketing', 'SEO', 'Social Media Marketing'],
    learning: ['Financial Analysis'],
    careerGoal: 'Brand Management',
    level: 'Intermediate',
    availability: 'Weekdays',
    slot: '7 PM – 9 PM',
    style: 'Hands-on',
    rating: 4.8,
    sessions: 24,
    exchanged: 8,
    branch: 'BBA · Final Year',
    campus: 'Symbiosis Institute, Pune',
    bio: 'Brand-focused BBA student who has run two live campus campaigns. I learn fast on anything with numbers — I want to actually understand the financial side of brand decisions, not just the creative side.',
    accent: 'from-violet-500 to-indigo-600',
    verified: true,
    badges: ['Top Match', 'Verified Student'],
    strengths: ['Has run live campaigns', 'Builds case studies', 'Consistent weekly availability'],
    why: [
      'Complementary teaching and learning skills',
      'Aligned learning preferences',
      'Compatible availability',
    ],
    tags: ['Digital Marketing', 'SEO', 'Brand Management'],
  },
  {
    id: 'priya-shah',
    name: 'Priya Shah',
    initials: 'PS',
    score: 88,
    rank: 'Strong Match',
    teaching: ['Financial Modelling', 'Excel', 'Valuation'],
    learning: ['Data Analytics'],
    careerGoal: 'Equity Research',
    level: 'Advanced',
    availability: 'Weekends',
    slot: '10 AM – 1 PM',
    style: 'Conceptual',
    rating: 4.9,
    sessions: 41,
    exchanged: 15,
    branch: 'B.Sc. Statistics · Final Year',
    campus: 'Fergusson College, Pune',
    bio: 'Statistics student heading into equity research. Comfortable with three-statement models and comps. Looking to get hands-on with data tools — I want to build dashboards, not read about them.',
    accent: 'from-emerald-500 to-teal-600',
    verified: true,
    badges: ['Strong Match', 'Verified Student'],
    strengths: ['Model review experience', 'Strong at comps', 'Weekend availability'],
    why: [
      'Teaches two of your priority gaps',
      'Explicit skill exchange with you',
      'Weekend scheduling overlap',
    ],
    tags: ['Financial Modelling', 'Excel', 'Equity Research'],
  },
  {
    id: 'rahul-kulkarni',
    name: 'Rahul Kulkarni',
    initials: 'RK',
    score: 82,
    rank: 'Good Match',
    teaching: ['Financial Statement Analysis', 'Excel'],
    learning: ['Product Management'],
    careerGoal: 'Corporate Finance',
    level: 'Intermediate',
    availability: 'Weekdays',
    slot: '6 PM – 8 PM',
    style: 'Structured',
    rating: 4.6,
    sessions: 17,
    exchanged: 6,
    branch: 'BBA · Third Year',
    campus: 'MIT World Peace University, Pune',
    bio: 'Corporate finance aspirant. I break statements down until they make sense. I want product thinking — how do you decide what a roadmap should contain?',
    accent: 'from-sky-500 to-blue-600',
    verified: true,
    badges: ['Good Match'],
    strengths: ['Patient explainer', 'Statement deep-dives', 'Regular weekday slots'],
    why: [
      'Teaches financial statement analysis',
      'Structured session format',
      'Weekday evening overlap',
    ],
    tags: ['Financial Statements', 'Excel', 'Corporate Finance'],
  },
  {
    id: 'ananya-deshmukh',
    name: 'Ananya Deshmukh',
    initials: 'AD',
    score: 79,
    rank: 'Good Match',
    teaching: ['Digital Marketing', 'Content Strategy', 'Canva'],
    learning: ['Communication'],
    careerGoal: 'Marketing Analytics',
    level: 'Beginner',
    availability: 'Flexible',
    slot: 'Any evening',
    style: 'Hands-on',
    rating: 4.7,
    sessions: 12,
    exchanged: 9,
    branch: 'B.A. English · Second Year',
    campus: 'Symbiosis Institute, Pune',
    bio: 'English student who loves brand storytelling and runs our campus magazine. I want to sharpen how I present — presentations, pitches, formal writing.',
    accent: 'from-amber-500 to-orange-600',
    verified: false,
    badges: ['Good Match'],
    strengths: ['Fast on content tools', 'Flexible schedule', 'Creative portfolio help'],
    why: [
      'Can teach Digital Marketing',
      'Flexible availability',
      'Mutual skill exchange',
    ],
    tags: ['Digital Marketing', 'Content', 'Marketing Analytics'],
  },
  {
    id: 'rohan-patel',
    name: 'Rohan Patel',
    initials: 'RP',
    score: 76,
    rank: 'Fair Match',
    teaching: ['Python', 'Data Analytics', 'SQL'],
    learning: ['Excel'],
    careerGoal: 'Data Science',
    level: 'Intermediate',
    availability: 'Weekends',
    slot: '4 PM – 7 PM',
    style: 'Self-paced',
    rating: 4.5,
    sessions: 9,
    exchanged: 4,
    branch: 'B.Tech IT · Third Year',
    campus: 'SCOE, Pune',
    bio: 'CS student into data science. I can get you from confused to building pandas pipelines in a few sessions. Looking for solid Excel fundamentals to stop me being the bottleneck in my own group work.',
    accent: 'from-rose-500 to-pink-600',
    verified: true,
    badges: ['Fair Match'],
    strengths: ['Practical code sessions', 'Patient debugging', 'Project-based'],
    why: [
      'Strong technical teaching',
      'Mutual skill exchange on Excel',
      'Weekend availability',
    ],
    tags: ['Python', 'Data Analytics', 'Data Science'],
  },
  {
    id: 'meera-nair',
    name: 'Meera Nair',
    initials: 'MN',
    score: 71,
    rank: 'Fair Match',
    teaching: ['Communication', 'Public Speaking'],
    learning: ['Financial Modelling'],
    careerGoal: 'Investment Banking',
    level: 'Beginner',
    availability: 'Weekdays',
    slot: '8 PM – 9 PM',
    style: 'Discussion',
    rating: 4.4,
    sessions: 14,
    exchanged: 3,
    branch: 'B.A. Economics · Second Year',
    campus: 'St. Xavier’s College, Mumbai',
    bio: 'Economics student aiming at the same desks you are. I want to learn modelling from the ground up, and I can coach you on pitch structure and speaking under pressure.',
    accent: 'from-indigo-500 to-violet-600',
    verified: false,
    badges: ['Fair Match'],
    strengths: ['Debate background', 'Same career goal', 'Pitch coaching'],
    why: [
      'Identical career goal',
      'Wants to learn Financial Modelling',
      'Complementary soft skills',
    ],
    tags: ['Communication', 'Public Speaking', 'Investment Banking'],
  },
]

export const MATCH_FILTERS = {
  skill: ['All skills', ...Array.from(new Set(PEERS.flatMap((p) => p.teaching)))].sort(),
  careerGoal: ['All career goals', ...Array.from(new Set(PEERS.map((p) => p.careerGoal)))].sort(),
  availability: ['Any availability', 'Weekdays', 'Weekends', 'Flexible'],
  skillLevel: ['Any level', 'Beginner', 'Intermediate', 'Advanced'],
  learningPreference: ['Any preference', 'Hands-on', 'Conceptual', 'Structured', 'Discussion', 'Self-paced'],
}

export const SORT_OPTIONS = [
  { id: 'score', label: 'Sort by Match Score' },
  { id: 'sessions', label: 'Sort by Sessions Completed' },
  { id: 'rating', label: 'Sort by Rating' },
  { id: 'name', label: 'Sort by Name (A–Z)' },
]

/* --------------------------------------------------------- LEARNING PATH */
export const LEARNING_PATH = [
  {
    id: 'step-1',
    n: 1,
    title: 'Advanced Excel',
    subtitle: 'Build the tool you will use every day',
    est: '6 hours',
    skill: 'Advanced Excel',
    activity: 'Excel Dashboard Challenge',
    status: 'in-progress',
    progress: 80,
    outcomes: ['Dynamic arrays & lookups', 'Power Query refresh workflow', 'Audit-friendly modelling'],
    lessons: [
      { id: 'l1', title: 'Dynamic arrays & LET', done: true },
      { id: 'l2', title: 'XLOOKUP vs INDEX-MATCH', done: true },
      { id: 'l3', title: 'Power Query for clean inputs', done: true },
      { id: 'l4', title: 'Building a linked dashboard', done: false },
    ],
  },
  {
    id: 'step-2',
    n: 2,
    title: 'Financial Modelling',
    subtitle: 'From blank sheet to a linked 3-statement model',
    est: '10 hours',
    skill: 'Financial Modelling',
    activity: 'Financial Modelling',
    status: 'in-progress',
    progress: 60,
    outcomes: ['Driver-based revenue build', 'Balance sheet that balances', 'Sensitivity tables'],
    lessons: [
      { id: 'l5', title: 'Model structure & conventions', done: true },
      { id: 'l6', title: 'Revenue drivers & assumptions', done: true },
      { id: 'l7', title: 'Linking the three statements', done: false },
      { id: 'l8', title: 'Circularity and plugs', done: false },
    ],
  },
  {
    id: 'step-3',
    n: 3,
    title: 'Valuation',
    subtitle: 'DCF, comps and precedent transactions',
    est: '9 hours',
    skill: 'Valuation',
    activity: 'Marketing Case Breakdown',
    status: 'in-progress',
    progress: 45,
    outcomes: ['Discounted cash flow', 'Trading comparables', 'Precedent transactions'],
    lessons: [
      { id: 'l9', title: 'FCF and WACC', done: true },
      { id: 'l10', title: 'DCF mechanics', done: false },
      { id: 'l11', title: 'Trading comps screen', done: false },
      { id: 'l12', title: 'Precedent transactions', done: false },
    ],
  },
  {
    id: 'step-4',
    n: 4,
    title: 'Financial Statement Analysis',
    subtitle: 'Read three statements like a prospectus',
    est: '7 hours',
    skill: 'Financial Statement Analysis',
    activity: 'Pitch Your Product',
    status: 'not-started',
    progress: 0,
    outcomes: ['Ratio benchmarking', 'Quality of earnings', 'Red-flag spotting'],
    lessons: [
      { id: 'l13', title: 'Three-statement anatomy', done: false },
      { id: 'l14', title: 'Ratio analysis vs peers', done: false },
      { id: 'l15', title: 'Reading notes to accounts', done: false },
    ],
  },
  {
    id: 'step-5',
    n: 5,
    title: 'Case Practice',
    subtitle: 'Timed, structured cases under real conditions',
    est: '12 hours',
    skill: 'Case Practice',
    activity: 'Marketing Case Breakdown',
    status: 'not-started',
    progress: 0,
    outcomes: ['Market sizing', 'Unit economics framing', 'Recommendation structure'],
    lessons: [
      { id: 'l16', title: 'Case prompt dissection', done: false },
      { id: 'l17', title: 'First 5 minutes plan', done: false },
      { id: 'l18', title: 'Deliverable templates', done: false },
    ],
  },
  {
    id: 'step-6',
    n: 6,
    title: 'Peer Review',
    subtitle: 'Have your work critiqued by a matched peer',
    est: '4 hours',
    skill: 'Peer Review',
    activity: 'Excel Dashboard Challenge',
    status: 'not-started',
    progress: 0,
    outcomes: ['Structured critique', 'Revision loops', 'Reviewer credibility'],
    lessons: [
      { id: 'l19', title: 'How to give a useful review', done: false },
      { id: 'l20', title: 'Requesting a review', done: false },
    ],
  },
  {
    id: 'step-7',
    n: 7,
    title: 'Skill Proof',
    subtitle: 'Convert completed work into a portable record',
    est: '1 hour',
    skill: 'Skill Proof',
    activity: 'Pitch Your Product',
    status: 'not-started',
    progress: 0,
    outcomes: ['Verified skill badges', 'Work samples', 'Shareable certificate record'],
    lessons: [
      { id: 'l21', title: 'What counts as evidence', done: false },
      { id: 'l22', title: 'Building your work sample index', done: false },
    ],
  },
]

/* -------------------------------------------------------------- PRACTICE */
export const ACTIVITIES = [
  {
    id: 'act-modelling',
    title: 'Financial Modelling',
    minutes: 20,
    level: 'Intermediate',
    skill: 'Financial Modelling',
    category: 'Core',
    steps: [
      'Build a 3-year revenue schedule driven by volume × price',
      'Add a linked cost line with a fixed/variable split',
      'Add one scenario toggle (base / downside)',
    ],
    brief:
      'Open a blank sheet. Build a driver-based revenue block for three years, then link it to a cost block. Finish with a base vs downside scenario toggle.',
    xp: 40,
  },
  {
    id: 'act-marketing-audit',
    title: 'Digital Marketing Audit',
    minutes: 20,
    level: 'Beginner',
    skill: 'Digital Marketing',
    category: 'Growth',
    steps: [
      'Pick one brand with a public ad library presence',
      'Log 5 ad creatives with headline + format',
      'Write one insight per creative — hook, offer, proof',
    ],
    brief:
      'Audit five live ads from one brand. Capture the hook, the offer and the proof device in a table, then write one sharp insight per ad.',
    xp: 35,
  },
  {
    id: 'act-excel-dashboard',
    title: 'Excel Dashboard Challenge',
    minutes: 20,
    level: 'Intermediate',
    skill: 'Advanced Excel',
    category: 'Tools',
    steps: [
      'Load a raw dataset and clean it with Power Query',
      'Build 3 KPI cells with dynamic formulas',
      'Add a pivot summary and one conditional-format insight',
    ],
    brief:
      'Clean a raw export, derive three KPIs with dynamic formulas, then summarise with a pivot. One conditional format must surface an outlier.',
    xp: 40,
  },
  {
    id: 'act-case-breakdown',
    title: 'Marketing Case Breakdown',
    minutes: 20,
    level: 'Advanced',
    skill: 'Case Practice',
    category: 'Casework',
    steps: [
      'Read the prompt and list the decision to be made',
      'Identify the two numbers that matter most',
      'Draft a one-paragraph recommendation',
    ],
    brief:
      'A classic case prompt. Spend five minutes planning before you answer. Name the decision, the two numbers that drive it, and your recommendation in one paragraph.',
    xp: 50,
  },
  {
    id: 'act-pitch',
    title: 'Pitch Your Product',
    minutes: 20,
    level: 'Beginner',
    skill: 'Communication',
    category: 'Communication',
    steps: [
      'Write a one-line positioning statement',
      'Build a 5-slide structure (problem, insight, proof, plan, ask)',
      'Record a 90-second verbal pitch',
    ],
    brief:
      'Pick any product you use daily. Write the positioning line, map five slides, then record yourself for 90 seconds. Play it back once.',
    xp: 35,
  },
]

export const ACTIVITY_COMPLETION_XP = ACTIVITIES.reduce((s, a) => s + a.xp, 0)

/* -------------------------------------------------------------- PROGRESS */
export const PROGRESS_SUMMARY = {
  readiness: 72,
  practiceHours: 18.5,
  sessions: 12,
  proofs: 5,
  streak: 12,
  skillsCompleted: 6,
}

export const SKILL_PROGRESS = [
  { name: 'Financial Modelling', value: 60, target: 85, delta: 14 },
  { name: 'Valuation', value: 45, target: 80, delta: 11 },
  { name: 'Advanced Excel', value: 80, target: 90, delta: 19 },
  { name: 'Communication', value: 60, target: 85, delta: 8 },
  { name: 'Data Analytics', value: 35, target: 70, delta: 6 },
]

export const ACTIVITY_SERIES = {
  '7': [
    { d: 'Mon', minutes: 40, sessions: 1 },
    { d: 'Tue', minutes: 25, sessions: 1 },
    { d: 'Wed', minutes: 0, sessions: 0 },
    { d: 'Thu', minutes: 60, sessions: 2 },
    { d: 'Fri', minutes: 35, sessions: 1 },
    { d: 'Sat', minutes: 80, sessions: 2 },
    { d: 'Sun', minutes: 45, sessions: 2 },
  ],
  '30': [
    { d: 'W1', minutes: 165, sessions: 5 },
    { d: 'W2', minutes: 210, sessions: 6 },
    { d: 'W3', minutes: 240, sessions: 7 },
    { d: 'W4', minutes: 180, sessions: 5 },
    { d: 'W5', minutes: 150, sessions: 4 },
  ],
  '90': [
    { d: 'Jan', minutes: 420, sessions: 12 },
    { d: 'Feb', minutes: 560, sessions: 16 },
    { d: 'Mar', minutes: 640, sessions: 18 },
    { d: 'Apr', minutes: 720, sessions: 21 },
  ],
}

export const SKILL_TREND_SERIES = {
  '7': [
    { w: 'W-3', FinancialModelling: 38, Valuation: 30, AdvancedExcel: 62 },
    { w: 'W-2', FinancialModelling: 42, Valuation: 33, AdvancedExcel: 68 },
    { w: 'W-1', FinancialModelling: 44, Valuation: 34, AdvancedExcel: 74 },
    { w: 'Now', FinancialModelling: 45, Valuation: 35, AdvancedExcel: 80 },
  ],
  '30': [
    { w: 'W-1', FinancialModelling: 30, Valuation: 24, AdvancedExcel: 50 },
    { w: 'W-2', FinancialModelling: 34, Valuation: 26, AdvancedExcel: 56 },
    { w: 'W-3', FinancialModelling: 38, Valuation: 29, AdvancedExcel: 62 },
    { w: 'W-4', FinancialModelling: 41, Valuation: 32, AdvancedExcel: 70 },
    { w: 'Now', FinancialModelling: 45, Valuation: 35, AdvancedExcel: 80 },
  ],
  '90': [
    { w: 'M-3', FinancialModelling: 20, Valuation: 14, AdvancedExcel: 38 },
    { w: 'M-2', FinancialModelling: 28, Valuation: 22, AdvancedExcel: 50 },
    { w: 'M-1', FinancialModelling: 36, Valuation: 29, AdvancedExcel: 66 },
    { w: 'Now', FinancialModelling: 45, Valuation: 35, AdvancedExcel: 80 },
  ],
}

export const READINESS_SERIES = {
  '7': [
    { w: 'D-6', readiness: 66 },
    { w: 'D-5', readiness: 66 },
    { w: 'D-4', readiness: 67 },
    { w: 'D-3', readiness: 68 },
    { w: 'D-2', readiness: 69 },
    { w: 'D-1', readiness: 71 },
    { w: 'Now', readiness: 72 },
  ],
  '30': [
    { w: 'W-1', readiness: 55 },
    { w: 'W-2', readiness: 61 },
    { w: 'W-3', readiness: 66 },
    { w: 'W-4', readiness: 69 },
    { w: 'Now', readiness: 72 },
  ],
  '90': [
    { w: 'M-3', readiness: 31 },
    { w: 'M-2', readiness: 44 },
    { w: 'M-1', readiness: 58 },
    { w: 'Now', readiness: 72 },
  ],
}

export const SESSIONS_SERIES = {
  '7': [
    { d: 'Mon', v: 1 },
    { d: 'Tue', v: 1 },
    { d: 'Wed', v: 0 },
    { d: 'Thu', v: 2 },
    { d: 'Fri', v: 1 },
    { d: 'Sat', v: 2 },
    { d: 'Sun', v: 2 },
  ],
  '30': [
    { d: 'W1', v: 5 },
    { d: 'W2', v: 6 },
    { d: 'W3', v: 7 },
    { d: 'W4', v: 5 },
    { d: 'W5', v: 4 },
  ],
  '90': [
    { d: 'Jan', v: 12 },
    { d: 'Feb', v: 16 },
    { d: 'Mar', v: 18 },
    { d: 'Apr', v: 21 },
  ],
}

export const RANGE_OPTIONS = [
  { id: '7', label: '7 days' },
  { id: '30', label: '30 days' },
  { id: '90', label: '90 days' },
]

/* ------------------------------------------------------------ SKILL PROOF */
export const CERTIFICATES = [
  {
    id: 'c1',
    title: 'Financial Analysis',
    kind: 'Completed',
    issued: '12 Aug 2026',
    verified: true,
    detail: 'Completed full track · 6 peer sessions · capstone reviewed',
    issuer: 'SkillSync',
    serial: 'SS-FA-2026-0142',
    tone: 'brand',
  },
  {
    id: 'c2',
    title: 'Advanced Excel',
    kind: 'Verified Practice',
    issued: '28 Sep 2026',
    verified: true,
    detail: 'Dashboard challenge submitted and peer-reviewed · score 92/100',
    issuer: 'SkillSync',
    serial: 'SS-AE-2026-0311',
    tone: 'accent',
  },
  {
    id: 'c3',
    title: 'Peer Teaching',
    kind: '5 Sessions',
    issued: '30 Sep 2026',
    verified: true,
    detail: '5 sessions delivered to matched peers · 4.8 average rating',
    issuer: 'SkillSync',
    serial: 'SS-PT-2026-0057',
    tone: 'amber',
  },
  {
    id: 'c4',
    title: 'Digital Marketing',
    kind: 'In Progress',
    issued: null,
    verified: false,
    detail: '1 of 4 modules complete · target completion Nov 2026',
    issuer: 'SkillSync',
    serial: null,
    tone: 'muted',
  },
]

export const BADGES = [
  { id: 'b1', label: 'Skill Sharer', icon: 'GraduationCap', tone: 'brand', earned: true },
  { id: 'b2', label: '12-Day Streak', icon: 'Flame', tone: 'amber', earned: true },
  { id: 'b3', label: 'First Exchange', icon: 'ArrowLeftRight', tone: 'accent', earned: true },
  { id: 'b4', label: 'Practice x10', icon: 'Dumbbell', tone: 'sky', earned: true },
  { id: 'b5', label: 'Peer Mentor', icon: 'Users', tone: 'brand-2', earned: true },
  { id: 'b6', label: 'Modelling Track', icon: 'LineChart', tone: 'accent', earned: false },
  { id: 'b7', label: 'Valuation Track', icon: 'Calculator', tone: 'amber', earned: false },
  { id: 'b8', label: 'Top 10% Ready', icon: 'Trophy', tone: 'rose', earned: false },
]

/* -------------------------------------------------------------- COMMUNITY */
export const COMMUNITY_POSTS = [
  {
    id: 'p1',
    author: 'Meera Nair',
    initials: 'MN',
    time: '12 min ago',
    tag: 'Question',
    tone: 'brand',
    title: 'Best resources to learn financial modelling?',
    body: 'Starting a three-statement model from scratch. Tutorials are great until it comes to actually linking the statements — then everything breaks. What finally made it click for you?',
    likes: 24,
    comments: 11,
    saved: false,
    liked: false,
  },
  {
    id: 'p2',
    author: 'Ananya Deshmukh',
    initials: 'AD',
    time: '48 min ago',
    tag: 'Offering',
    tone: 'accent',
    title: 'I can teach Canva. Looking to learn Excel.',
    body: 'I design posters, decks and campus creatives all day — happy to trade 30 minutes of Canva basics for someone patient to walk me through Excel formulas. Beginner level.',
    likes: 41,
    comments: 17,
    saved: false,
    liked: false,
  },
  {
    id: 'p3',
    author: 'Rohan Patel',
    initials: 'RP',
    time: '2 hrs ago',
    tag: 'Question',
    tone: 'sky',
    title: 'Anyone preparing for product management interviews?',
    body: 'Looking to do mock case rounds with someone also targeting PM. Happy to trade product teardown practice for help with SQL and pandas.',
    likes: 33,
    comments: 9,
    saved: false,
    liked: false,
  },
  {
    id: 'p4',
    author: 'Priya Shah',
    initials: 'PS',
    time: '5 hrs ago',
    tag: 'Showcase',
    tone: 'brand-2',
    title: 'Built my first comps screen — feedback welcome',
    body: 'Finally got the trading comparables table to tie out. Spent three evenings on it. Sharing the layout in case it helps anyone else, especially the EV/EBITDA normalisation step.',
    likes: 58,
    comments: 22,
    saved: true,
    liked: true,
  },
  {
    id: 'p5',
    author: 'Rahul Kulkarni',
    initials: 'RK',
    time: 'Yesterday',
    tag: 'Challenge',
    tone: 'amber',
    title: 'Weekend challenge: explain a company’s balance sheet in 3 minutes',
    body: 'Pick any listed mid-cap Indian company, explain what funds its assets in three minutes, then drop it in the comments. I’ll start with Infosys this evening.',
    likes: 29,
    comments: 14,
    saved: false,
    liked: false,
  },
]

export const TRENDING_SKILLS = [
  { name: 'Excel', delta: 34, count: 1240 },
  { name: 'Financial Modelling', delta: 29, count: 860 },
  { name: 'Digital Marketing', delta: 24, count: 742 },
  { name: 'Python', delta: 21, count: 1105 },
  { name: 'Data Analytics', delta: 19, count: 690 },
  { name: 'Communication', delta: 16, count: 598 },
  { name: 'Product Management', delta: 14, count: 470 },
  { name: 'Canva', delta: 12, count: 385 },
]

export const POPULAR_GOALS = [
  { name: 'Investment Banking', count: 1240, pct: 92 },
  { name: 'Product Management', count: 986, pct: 78 },
  { name: 'Data Science', count: 874, pct: 69 },
  { name: 'Digital Marketing', count: 762, pct: 61 },
  { name: 'Corporate Finance', count: 618, pct: 49 },
  { name: 'Brand Management', count: 505, pct: 40 },
]

export const CHALLENGES = [
  {
    id: 'ch1',
    title: '7-Day Excel Sprint',
    desc: 'Complete one Excel activity every day for a week.',
    joined: 412,
    days: 7,
    prize: 'Verified Practice badge',
    joinedByUser: false,
  },
  {
    id: 'ch2',
    title: 'First Model in 14 Days',
    desc: 'Ship one linked three-statement model.',
    joined: 186,
    days: 14,
    prize: 'Modelling Track badge',
    joinedByUser: false,
  },
  {
    id: 'ch3',
    title: 'Teach 3 Sessions',
    desc: 'Help three peers with a skill you already have.',
    joined: 268,
    days: 21,
    prize: 'Peer Mentor badge',
    joinedByUser: false,
  },
  {
    id: 'ch4',
    title: 'Marketing Audit Drop',
    desc: 'Publish one teardown of a live campaign.',
    joined: 331,
    days: 10,
    prize: 'Community badge',
    joinedByUser: false,
  },
]

export const WORKSHOPS = [
  {
    id: 'w1',
    title: 'Building Your First 3-Statement Model',
    host: 'Priya Shah',
    date: 'Sat, 11 Oct',
    time: '11:00 AM',
    seats: 40,
    filled: 31,
    mode: 'Live · Online',
  },
  {
    id: 'w2',
    title: 'Excel to Dashboard in 60 Minutes',
    host: 'Rohan Patel',
    date: 'Tue, 14 Oct',
    time: '6:30 PM',
    seats: 60,
    filled: 44,
    mode: 'Live · Campus Lab',
  },
  {
    id: 'w3',
    title: 'Campus Brand Campaign Teardown',
    host: 'Aarav Mehta',
    date: 'Thu, 17 Oct',
    time: '5:00 PM',
    seats: 35,
    filled: 12,
    mode: 'Live · Online',
  },
]

export const POST_TABS = ['Trending Skills', 'Skill Challenges', 'Peer Discussions', 'Upcoming Workshops']
export const GOAL_FILTERS = ['All', 'Investment Banking', 'Product Management', 'Data Science', 'Digital Marketing']

/* ---------------------------------------------------------- SOCIAL IMPACT */
export const IMPACT_METRICS = [
  { id: 'children', value: 500, suffix: '+', label: 'Children', icon: 'HeartHandshake', tone: 'brand' },
  { id: 'educators', value: 100, suffix: '+', label: 'Educators', icon: 'UserRoundCheck', tone: 'accent' },
  { id: 'hours', value: 2000, suffix: '+', label: 'Teaching Hours', icon: 'Clock', tone: 'amber' },
  { id: 'sessions', value: 1000, suffix: '+', label: 'Sessions', icon: 'CalendarCheck', tone: 'sky' },
]

export const IMPACT_LABEL = 'Illustrative 12-month targets'

export const IMPACT_AUDIENCES = [
  {
    id: 'children',
    title: 'For Children',
    icon: 'Baby',
    tone: 'brand',
    points: [
      {
        title: 'Academic support',
        body: 'One-to-one help in maths, science and English from verified student volunteers.',
        icon: 'BookOpen',
      },
      {
        title: 'New skills',
        body: 'First exposure to digital tools, coding and communication — skills the classroom rarely covers.',
        icon: 'Sparkles',
      },
      {
        title: 'Career awareness',
        body: 'Exposure to real careers, so aspirations form around possibilities rather than assumptions.',
        icon: 'Compass',
      },
    ],
  },
  {
    id: 'volunteers',
    title: 'For Volunteers',
    icon: 'HeartHandshake',
    tone: 'accent',
    points: [
      {
        title: 'Verified certificate',
        body: 'A credential that records what you actually taught, not just that you logged hours.',
        icon: 'BadgeCheck',
      },
      {
        title: 'Contribution record',
        body: 'A running, portfolio-ready log of sessions delivered and impact created.',
        icon: 'History',
      },
      {
        title: 'Portfolio credential',
        body: 'Social-impact work that strengthens a CV instead of sitting outside it.',
        icon: 'FolderCheck',
      },
    ],
  },
]

export const RESPONSIBLE_IMPLEMENTATION = [
  {
    title: 'NGO partners',
    body: 'Delivery happens with vetted non-profits already operating in the target communities. SkillSync does not go directly to children.',
    icon: 'Handshake',
  },
  {
    title: 'Screening',
    body: 'Every volunteer clears identity and background verification before any session is scheduled.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Safeguarding',
    body: 'Sessions are supervised, recorded and governed by partner safeguarding policy. One-to-one off-platform contact is prohibited.',
    icon: 'ShieldAlert',
  },
  {
    title: 'Data privacy',
    body: 'Children are referred to as beneficiaries, never profiled. Minimal data, consented collection, partner-held records.',
    icon: 'LockKeyhole',
  },
]

export const IMPACT_DISCLAIMER =
  'These are internal planning targets for a 12-month pilot, not achieved outcomes or reported impact.'

/* --------------------------------------------------------------- PRICING */
export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    tagline: 'Everything you need to start.',
    cta: 'Start with Free',
    features: [
      'Skill profile',
      'Basic matching',
      'Peer discovery',
      'Basic skill exchange',
    ],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹99',
    period: '/month',
    tagline: 'For students serious about one specific career.',
    cta: 'Go Premium',
    badge: 'Recommended',
    features: [
      'Advanced AI matching',
      'Skill-gap analysis',
      'Personalized recommendations',
      'Enhanced progress tracking',
      'Verified profile',
    ],
    highlighted: true,
  },
]

export const PRICING_LABEL = 'Proposed pricing'

export const SECONDARY_REVENUE = {
  commission: 10,
  body: '10% commission on paid expert sessions and workshops. Applied only when a student chooses to move from a peer exchange to a paid expert session.',
}

/* ----------------------------------------------------------------- MARKET */
export const MARKET = {
  tam: {
    label: 'TAM',
    name: 'Total Addressable Market',
    value: 5144,
    unit: 'crore',
    formula: '4.33 crore students × ₹1,188 / year',
    inputs: [
      { k: 'Students in higher education', v: '4.33 crore' },
      { k: 'Annual revenue per student', v: '₹1,188' },
    ],
    note: 'All enrolled higher-education students in India paying an annual SkillSync subscription.',
  },
  sam: {
    label: 'SAM',
    name: 'Serviceable Available Market',
    value: 1029,
    unit: 'crore',
    formula: '86.6 lakh students — 20% reachable at launch',
    inputs: [
      { k: 'Reachable share', v: '20%' },
      { k: 'Students in scope', v: '86.6 lakh' },
    ],
    note: 'Students in campuses with the digital access and intent to adopt at launch.',
  },
  som: {
    label: 'SOM',
    name: 'Serviceable Obtainable Market — Year 3',
    value: 4.158,
    unit: 'crore',
    formula: '35,000 paying users × ₹1,188 / year',
    inputs: [
      { k: 'Year-3 paying users', v: '35,000' },
      { k: 'Annual revenue per user', v: '₹1,188' },
    ],
    note: 'Three-year realistic capture from the SAM — the near-term revenue target.',
  },
}

export const MARKET_LABEL = 'Revenue pool assumptions / illustrative projections'

export const MARKET_NOTES = [
  {
    title: 'SOM arithmetic corrected',
    body: 'The original ₹41.6 crore headline is inconsistent with the stated calculation; 35,000 × ₹1,188 = ₹4.158 crore.',
    type: 'correction',
  },
  {
    title: 'SAM as stated in source data',
    body: 'The ₹1,029 crore SAM figure is reproduced exactly as it appears in the source deck. The stated inputs (86.6 lakh × ₹1,188) arithmetically yield ₹102.9 crore — worth reconciling before the deck goes out.',
    type: 'methodology',
  },
]

/* -------------------------------------------------------- UNIT ECONOMICS */
export const UNIT_ECONOMICS = {
  revenue: 1188,
  variableCost: 240,
  contribution: 948,
  ltv: 2370,
  cac: 450,
  ratio: 5.3,
  years: 2.5,
  label: 'Planning assumptions — to be validated through pilot',
  rows: [
    { k: 'Annual revenue', v: 1188, note: '₹99 × 12 months', tone: 'brand' },
    { k: 'Variable cost', v: 240, note: '₹20 / month · infra, payments, support', tone: 'rose' },
    { k: 'Annual contribution', v: 948, note: '₹1,188 − ₹240', tone: 'accent' },
    { k: 'LTV', v: 2370, note: '₹948 × ~2.5 years retained', tone: 'brand-2' },
    { k: 'CAC', v: 450, note: 'Blended campus-led acquisition', tone: 'amber' },
  ],
}

/* ------------------------------------------------------------ GTM / FUNNEL */
export const GTM_CHANNELS = [
  { id: 'ambassadors', name: 'Campus Ambassadors', detail: 'Student-led, incentive per activation', target: '34 campuses', pct: 85, tone: 'brand' },
  { id: 'clubs', name: 'Clubs & Communities', detail: 'Partnership with finance, analytics and marketing clubs', target: '18 partnerships', pct: 72, tone: 'accent' },
  { id: 'placement', name: 'Placement Cells', detail: 'Bulk onboarding ahead of recruitment season', target: '12 cells', pct: 60, tone: 'sky' },
  { id: 'workshops', name: 'Workshops', detail: 'Free skill clinics as the top-of-funnel event', target: '40 events', pct: 76, tone: 'amber' },
  { id: 'competitions', name: 'Inter-college Competitions', detail: 'Case and modelling contests with peer jury', target: '6 events', pct: 54, tone: 'rose' },
  { id: 'referrals', name: 'Referrals', detail: 'Give a month, get a month', target: '18% of signups', pct: 66, tone: 'brand-2' },
  { id: 'invites', name: 'Peer Invitations', detail: 'Every profile invites the people they teach', target: '2.4 invites / user', pct: 88, tone: 'accent' },
  { id: 'challenges', name: 'Skill Challenges', detail: 'Cohort-based streaks that reward finishing', target: '25 challenges', pct: 48, tone: 'sky' },
]

export const FUNNEL = [
  { id: 'registered', label: 'Registered', value: 5000, pct: 100, tone: 'brand' },
  { id: 'active', label: 'Active (weekly)', value: 1500, pct: 30, tone: 'brand-2' },
  { id: 'paying', label: 'Paying', value: 500, pct: 10, tone: 'accent' },
]

export const GTM_TARGETS = [
  { id: 'campuses', label: 'Campuses reached', value: 100, suffix: '', icon: 'School' },
  { id: 'partners', label: 'Partnerships', value: 25, suffix: '', icon: 'Handshake' },
]

export const GTM_LABEL = 'Future targets, not current traction'

/* ----------------------------------------------------------- FINANCIALS */
export const FINANCIALS = {
  years: ['Year 1', 'Year 2', 'Year 3'],
  rows: [
    { id: 'users', label: 'Paying users', values: [5000, 15000, 35000], unit: 'users', type: 'count' },
    { id: 'revenue', label: 'Revenue', values: [59, 178, 416], unit: '₹ lakh', type: 'money' },
    { id: 'expenses', label: 'Operating expenses', values: [75, 127, 203], unit: '₹ lakh', type: 'money' },
    { id: 'net', label: 'Net income', values: [-15.6, 51.2, 212.8], unit: '₹ lakh', type: 'money' },
    { id: 'margin', label: 'Net margin', values: [-26.3, 28.7, 51.2], unit: '%', type: 'percent' },
  ],
  headcount: [4, 7, 11],
  expensesBreakdown: [
    { id: 'team', label: 'Team & salaries', y1: 36, y2: 62, y3: 96 },
    { id: 'marketing', label: 'Marketing & campus', y1: 18, y2: 33, y3: 48 },
    { id: 'tech', label: 'Technology & infra', y1: 12, y2: 18, y3: 26 },
    { id: 'ops', label: 'Operations & support', y1: 6, y2: 10, y3: 23 },
    { id: 'other', label: 'Compliance & other', y1: 3, y2: 4, y3: 10 },
  ],
}

export const FINANCIALS_LABEL = 'Illustrative projections, not actual results'

export const BREAK_EVEN_NOTE =
  'Break-even falls inside Year 2. The model is contribution-positive from the first paying cohort; the Year 1 loss is driven by fixed team cost ahead of revenue.'

/* -------------------------------------------------------------- FUNDING */
export const FUNDING = {
  ask: 25,
  askUnit: 'lakh',
  equity: 10,
  postMoney: 2.5,
  preMoney: 2.25,
  label: 'Founder-proposed fundraising assumption',
  uses: [
    { id: 'product', label: 'Product & Engineering', pct: 40, amount: 10, note: '2 engineers + 1 designer for 12 months', tone: 'brand' },
    { id: 'acquisition', label: 'Acquisition', pct: 25, amount: 6.25, note: 'Campus activations and ambassador program', tone: 'accent' },
    { id: 'pilot', label: 'Pilot', pct: 15, amount: 3.75, note: 'First 5 campuses + social impact pilot', tone: 'sky' },
    { id: 'pmf', label: 'PMF validation', pct: 12, amount: 3, note: 'Research, cohort studies, iteration', tone: 'amber' },
    { id: 'scale', label: 'Scale & reserves', pct: 8, amount: 2, note: 'Runway buffer and contingency', tone: 'brand-2' },
  ],
  productAcquisition: 65,
  milestones: [
    '5,000 registered students across 100 campuses',
    'Proof of the matching loop: 3 completed exchanges per active user',
    'Social impact pilot live with 2 NGO partners',
    'CAC held at or below ₹450 with contribution margin above 79%',
  ],
}

/* ----------------------------------------------------------------- TEAM */
export const TEAM = [
  {
    id: 'sakshi',
    name: 'Sakshi Jadhav',
    role: 'Founder',
    initials: 'SJ',
    accent: 'from-indigo-500 to-violet-600',
    focus: ['Vision', 'Product Direction', 'Marketing Strategy', 'Business Development'],
    bio: 'Final-year commerce student with hands-on experience running campus initiatives. Owns the product thesis, the go-to-market motion and partner conversations.',
    links: [{ label: 'LinkedIn', icon: 'Linkedin' }],
  },
  {
    id: 'ishaan',
    name: 'Ishaan Shukla',
    role: 'Co-Founder',
    initials: 'IS',
    accent: 'from-emerald-500 to-teal-600',
    focus: ['Finance', 'Market Research', 'Business Planning'],
    bio: 'Handles the financial model, unit economics and market sizing. Focused on making every assumption in the deck traceable and testable.',
    links: [{ label: 'LinkedIn', icon: 'Linkedin' }],
  },
]

export const ABOUT_PILLARS = [
  {
    title: 'Matching over content',
    body: 'There is no shortage of courses. There is a shortage of the right person, at the right level, available this week. SkillSync optimises for the match.',
    icon: 'Users',
  },
  {
    title: 'Exchange, not transaction',
    body: 'Students teach what they know and learn what they need. The cost of the platform approaches zero, which is why a ₹99 price point works.',
    icon: 'ArrowLeftRight',
  },
  {
    title: 'Evidence over hours',
    body: 'Logging hours proves attendance. SkillSync logs artefacts — models, audits, sessions taught — because that is what a hiring manager reads.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Honest about limits',
    body: 'Every number in this product is labelled as source data, illustrative, a target, or a proposal. A demo that hides its assumptions teaches the wrong lesson.',
    icon: 'ShieldCheck',
  },
]

export const DATA_INTEGRITY = [
  { label: 'Actual / source data', tone: 'accent', items: ['AISHE 2021–22 enrolment & GER', 'India Skills Report 2025 employability'] },
  { label: 'Illustrative', tone: 'brand', items: ['94% match score', 'Social-impact targets', 'Financial projections', 'LTV / CAC', 'Market revenue assumptions'] },
  { label: 'Future targets', tone: 'amber', items: ['100 campuses', '25 partnerships', 'Funnel: 5,000 / 1,500 / 500'] },
  { label: 'Proposed', tone: 'brand-2', items: ['₹99 / month pricing', '10% commission', 'Funding assumptions'] },
]

export const DATA_TAGS = {
  actual: { label: 'Source data', tone: 'accent' },
  illustrative: { label: 'Illustrative', tone: 'brand' },
  target: { label: 'Future target', tone: 'amber' },
  proposed: { label: 'Proposed', tone: 'brand-2' },
}

/* ---------------------------------------------------------------- PALETTE */

export const SKILL_COLORS = {
  'Financial Analysis': '#0d9488',
  'Digital Marketing': '#d97706',
  Python: '#4f46e5',
  'Data Analytics': '#0284c7',
  Excel: '#0d9488',
  Leadership: '#9333ea',
  Communication: '#e11d48',
  'Product Management': '#4f46e5',
  SEO: '#d97706',
  'Social Media Marketing': '#e11d48',
  Valuation: '#9333ea',
  'Financial Modelling': '#4f46e5',
  'Content Strategy': '#0284c7',
  Canva: '#d97706',
  SQL: '#0284c7',
  'Public Speaking': '#e11d48',
  'Business Analysis': '#4f46e5',
  'Financial Statement Analysis': '#9333ea',
  'Case Practice': '#0d9488',
  'Peer Review': '#0284c7',
}

/* ---------------------------------------------------------------- FOOTER */
export const FOOTER = {
  tagline: 'Find the Right Skill. Find the Right Person. Build the Right Career.',
  year: 2026,
  notice: 'Demo Prototype | Frontend Only',
}
