import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Compass,
  HandHeart,
  Home,
  Layers,
  LineChart,
  MessagesSquare,
  PiggyBank,
  Route,
  ScanSearch,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const NAV_SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: Home, desc: 'Your SkillSync overview' },
      { to: '/profile', label: 'Skill Profile', icon: Sparkles, desc: 'Skills you teach and want' },
      { to: '/gap', label: 'Skill Gap Analysis', icon: ScanSearch, desc: 'AI career gap report' },
      { to: '/matching', label: 'Peer Matching', icon: Users, desc: 'Find the right person' },
      { to: '/path', label: 'Learning Path', icon: Route, desc: 'Your career roadmap' },
      { to: '/practice', label: 'Practice Activities', icon: CalendarCheck, desc: '20-minute drills' },
      { to: '/progress', label: 'Progress & Proof', icon: BarChart3, desc: 'Charts and certificates' },
    ],
  },
  {
    label: 'Network',
    items: [
      { to: '/community', label: 'Community', icon: MessagesSquare, desc: 'Peers, posts, challenges' },
      { to: '/impact', label: 'Social Impact', icon: HandHeart, desc: 'Skills into opportunity' },
    ],
  },
  {
    label: 'The Business',
    items: [
      { to: '/pricing', label: 'Pricing', icon: Wallet, desc: 'Free vs Premium' },
      { to: '/market', label: 'Market Opportunity', icon: Building2, desc: 'TAM · SAM · SOM' },
      { to: '/unit-economics', label: 'Unit Economics', icon: PiggyBank, desc: 'LTV, CAC, contribution' },
      { to: '/go-to-market', label: 'Go-To-Market', icon: BriefcaseBusiness, desc: 'Channels and funnel' },
      { to: '/financials', label: 'Financials', icon: LineChart, desc: '3-year projections' },
      { to: '/funding', label: 'Funding', icon: Target, desc: 'Raise and use of funds' },
    ],
  },
  {
    label: 'Company',
    items: [{ to: '/about', label: 'About SkillSync', icon: Compass, desc: 'Story and team' }],
  },
]

export const ALL_NAV = NAV_SECTIONS.flatMap((s) => s.items)

export const MOBILE_NAV = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/gap', label: 'Gap', icon: ScanSearch },
  { to: '/matching', label: 'Match', icon: Users },
  { to: '/path', label: 'Path', icon: Route },
  { to: '/community', label: 'Community', icon: MessagesSquare },
]

export const PAGE_META = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Your SkillSync at a glance', icon: Home },
  '/profile': { title: 'Skill Profile', subtitle: 'What you can teach and what you want to learn', icon: Sparkles },
  '/gap': { title: 'Skill Gap Analysis', subtitle: 'Investment Banking · role benchmark comparison', icon: ScanSearch },
  '/matching': { title: 'Peer Matching', subtitle: 'Complementary peers, ranked', icon: Users },
  '/path': { title: 'Learning Path', subtitle: 'Seven steps to career-ready', icon: Route },
  '/practice': { title: 'Practice Activities', subtitle: '20-minute skill drills', icon: CalendarCheck },
  '/progress': { title: 'Progress & Skill Proof', subtitle: 'Evidence, not hours', icon: BarChart3 },
  '/community': { title: 'Community', subtitle: 'Trending, challenges and discussions', icon: MessagesSquare },
  '/impact': { title: 'Social Impact', subtitle: 'Turning skills into opportunity', icon: HandHeart },
  '/pricing': { title: 'Pricing', subtitle: 'Free and Premium plans', icon: Wallet },
  '/market': { title: 'Market Opportunity', subtitle: 'TAM · SAM · SOM', icon: Building2 },
  '/unit-economics': { title: 'Unit Economics', subtitle: 'Contribution, LTV and CAC', icon: PiggyBank },
  '/go-to-market': { title: 'Go-To-Market', subtitle: 'Acquisition channels and funnel', icon: BriefcaseBusiness },
  '/financials': { title: 'Financial Projections', subtitle: 'Three-year model', icon: LineChart },
  '/funding': { title: 'Funding', subtitle: '₹25 lakh for 10%', icon: Target },
  '/about': { title: 'About SkillSync', subtitle: 'Who we are and why', icon: Compass },
}

export const BUSINESS_NAV = NAV_SECTIONS.find((s) => s.label === 'The Business').items

export const COLORS = {
  brand: '#4f46e5',
  brand2: '#9333ea',
  accent: '#0d9488',
  amber: '#d97706',
  sky: '#0284c7',
  rose: '#e11d48',
  muted: '#94a3b8',
}

export const SKILL_COLORS = {
  'Financial Analysis': COLORS.accent,
  'Digital Marketing': COLORS.amber,
  Python: COLORS.brand,
  'Data Analytics': COLORS.sky,
  Excel: COLORS.accent,
  Leadership: COLORS.brand2,
  Communication: COLORS.rose,
  'Product Management': COLORS.brand,
  SEO: COLORS.amber,
  'Social Media Marketing': COLORS.rose,
  Valuation: COLORS.brand2,
  'Financial Modelling': COLORS.brand,
  'Content Strategy': COLORS.sky,
  Canva: COLORS.amber,
  Python: COLORS.brand,
  SQL: COLORS.sky,
  'Public Speaking': COLORS.rose,
}

export const BOOK_ICON = BookOpen
export const LAYERS_ICON = Layers
