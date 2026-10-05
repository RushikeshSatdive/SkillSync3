import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  GraduationCap,
  Landmark,
  Plus,
  Save,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
  UserRound,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Chip, Field, Input, ProgressBar, SectionHeading, Select, SourceNote } from '../components/ui/primitives'
import { MatchRing } from '../components/ui/MatchRing'
import { useApp } from '../store/AppStore'
import { GAP_SKILLS, SKILL_COLORS, STUDENT } from '../data/mockData'

const SKILL_BANK = [
  'Financial Analysis',
  'Digital Marketing',
  'Financial Modelling',
  'Valuation',
  'Advanced Excel',
  'Excel',
  'Business Analysis',
  'Data Analytics',
  'Python',
  'SQL',
  'SEO',
  'Social Media Marketing',
  'Content Strategy',
  'Communication',
  'Leadership',
  'Product Management',
  'Canva',
  'Public Speaking',
  'Financial Statement Analysis',
]

const SELF_RATED = [
  { name: 'Financial Analysis', level: 80, evidence: '6 peer sessions · capstone reviewed' },
  { name: 'Excel', level: 65, evidence: 'Coursework + campus project' },
  { name: 'Business Analysis', level: 55, evidence: 'Self-assessed' },
]

const CAREERS = [
  'Investment Banking',
  'Equity Research',
  'Corporate Finance',
  'Product Management',
  'Data Science',
  'Digital Marketing',
  'Brand Management',
  'Marketing Analytics',
  'Financial Advisory',
  'Management Consulting',
]

export default function SkillProfile() {
  const { toast } = useApp()
  const navigate = useNavigate()

  const [teach, setTeach] = useState(STUDENT.canTeach)
  const [learn, setLearn] = useState(STUDENT.wantToLearn)
  const [career, setCareer] = useState(STUDENT.careerGoal)
  const [availability, setAvailability] = useState('Weekdays')
  const [slot, setSlot] = useState('7 PM – 9 PM')
  const [style, setStyle] = useState('Hands-on')
  const [bio, setBio] = useState(STUDENT.bio)
  const [rate, setRate] = useState('Intermediate')
  const [draft, setDraft] = useState('')
  const [draftLearn, setDraftLearn] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    document.title = 'Skill Profile · SkillSync'
  }, [])

  const addSkill = (target, value, setter) => {
    const v = value.trim()
    if (!v) {
      toast('Type a skill name first.', { tone: 'warn' })
      return
    }
    const list = target === 'teach' ? teach : learn
    if (list.some((s) => s.toLowerCase() === v.toLowerCase())) {
      toast(`“${v}” is already in that list.`, { tone: 'warn' })
      return
    }
    if (!SKILL_BANK.includes(v)) {
      toast(`“${v}” is not in the demo skill bank. Pick one from the suggestions.`, { tone: 'warn', duration: 4200 })
      return
    }
    setter([...list, v])
    if (target === 'teach') setDraft('')
    else setDraftLearn('')
    setDirty(true)
  }

  const removeSkill = (target, name) => {
    if (target === 'teach') {
      setTeach(teach.filter((s) => s !== name))
    } else {
      setLearn(learn.filter((s) => s !== name))
    }
    setDirty(true)
  }

  const completeness = useMemo(() => {
    let score = 30
    if (teach.length) score += 20
    if (learn.length) score += 15
    if (bio.trim().length > 40) score += 15
    if (career) score += 10
    if (availability) score += 5
    if (rate) score += 5
    return Math.min(100, score)
  }, [teach, learn, bio, career, availability, rate])

  const save = () => {
    setDirty(false)
    toast('Skill profile updated for this demo session.', {
      tone: 'success',
      title: 'Profile saved',
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        {/* ---------------------------------------------------------- main */}
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-2xl grad-brand text-[22px] font-extrabold text-white shadow-lg">
                  {STUDENT.initials}
                </span>
                <div>
                  <h2 className="text-[20px] font-extrabold text-ink tracking-tight">{STUDENT.name}</h2>
                  <p className="text-[13px] text-muted mt-0.5">
                    {STUDENT.role} · {STUDENT.campus}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Chip tone="brand" icon={Landmark}>
                      {career}
                    </Chip>
                    <Chip tone="accent" icon={BadgeCheck}>
                      Verified student
                    </Chip>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted">Profile complete</p>
                <p className="text-[26px] font-extrabold tnum grad-text leading-none mt-1">{completeness}%</p>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={completeness} />
            </div>
            {completeness < 100 && (
              <p className="mt-2 text-[11.5px] text-muted">
                Add more teaching skills and a longer bio to strengthen peer matching.
              </p>
            )}
          </Card>

          {/* teach / learn */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="p-5 flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                  <GraduationCap size={17} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">I Teach</h3>
                  <p className="text-[11.5px] text-muted">Skills others can learn from you</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  size="sm"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill('teach', draft, setTeach)}
                  placeholder="Add a skill…"
                  list="skill-bank"
                  aria-label="Add a skill you can teach"
                />
                <Button size="sm" variant="primary" icon={Plus} onClick={() => addSkill('teach', draft, setTeach)}>
                  Add
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 min-h-[36px]">
                {teach.length === 0 ? (
                  <p className="text-[12px] text-muted">Nothing listed yet.</p>
                ) : (
                  teach.map((s) => (
                    <Chip key={s} tone="accent" className="!py-1.5 !px-3">
                      {s}
                      <button onClick={() => removeSkill('teach', s)} aria-label={`Remove ${s}`} className="hover:text-rose ml-0.5">
                        <X size={12} />
                      </button>
                    </Chip>
                  ))
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-line">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Suggestions</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_BANK.filter((s) => !teach.includes(s))
                    .slice(0, 6)
                    .map((s) => (
                      <button
                        key={s}
                        onClick={() => addSkill('teach', s, setTeach)}
                        className="rounded-lg border border-dashed border-line-strong px-2 py-1 text-[11px] font-medium text-muted hover:border-accent hover:text-accent transition-colors"
                      >
                        + {s}
                      </button>
                    ))}
                </div>
              </div>
            </Card>

            <Card className="p-5 flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Target size={17} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">I Want to Learn</h3>
                  <p className="text-[11.5px] text-muted">Drives matching and your gap analysis</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  size="sm"
                  value={draftLearn}
                  onChange={(e) => setDraftLearn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill('learn', draftLearn, setLearn)}
                  placeholder="Add a skill…"
                  list="skill-bank"
                  aria-label="Add a skill you want to learn"
                />
                <Button size="sm" variant="primary" icon={Plus} onClick={() => addSkill('learn', draftLearn, setLearn)}>
                  Add
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 min-h-[36px]">
                {learn.length === 0 ? (
                  <p className="text-[12px] text-muted">Nothing listed yet.</p>
                ) : (
                  learn.map((s) => (
                    <Chip key={s} tone="brand" className="!py-1.5 !px-3">
                      {s}
                      <button onClick={() => removeSkill('learn', s)} aria-label={`Remove ${s}`} className="hover:text-rose ml-0.5">
                        <X size={12} />
                      </button>
                    </Chip>
                  ))
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-line">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Suggested gaps</p>
                <div className="flex flex-wrap gap-1.5">
                  {GAP_SKILLS.filter((g) => !learn.includes(g.name))
                    .map((g) => (
                      <button
                        key={g.id}
                        onClick={() => addSkill('learn', g.name, setLearn)}
                        className="rounded-lg border border-dashed border-line-strong px-2 py-1 text-[11px] font-medium text-muted hover:border-brand hover:text-brand transition-colors"
                      >
                        + {g.name}
                      </button>
                    ))}
                </div>
              </div>
            </Card>
          </div>

          <datalist id="skill-bank">
            {SKILL_BANK.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>

          {/* career + preferences */}
          <Card className="p-5">
            <h3 className="text-[15px] font-bold text-ink mb-4">Career goal &amp; preferences</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Career goal" id="career">
                <Select id="career" value={career} onChange={(e) => { setCareer(e.target.value); setDirty(true) }}>
                  {CAREERS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Current level" id="rate">
                <Select id="rate" value={rate} onChange={(e) => { setRate(e.target.value); setDirty(true) }}>
                  {['Beginner', 'Intermediate', 'Advanced'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Availability" id="avail">
                <Select id="avail" value={availability} onChange={(e) => { setAvailability(e.target.value); setDirty(true) }}>
                  {['Weekdays', 'Weekends', 'Flexible'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Preferred time slot" id="slot">
                <Select id="slot" value={slot} onChange={(e) => { setSlot(e.target.value); setDirty(true) }}>
                  {['6 PM – 8 PM', '7 PM – 9 PM', '8 PM – 9 PM', 'Weekend mornings', 'Weekend afternoons'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Learning style" id="style">
                <Select id="style" value={style} onChange={(e) => { setStyle(e.target.value); setDirty(true) }}>
                  {['Hands-on', 'Conceptual', 'Structured', 'Discussion', 'Self-paced'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="About you" id="bio" hint={`${bio.length}/280 characters`}>
                <Input id="bio" value={bio} onChange={(e) => { setBio(e.target.value); setDirty(true) }} maxLength={280} />
              </Field>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button variant="primary" icon={Save} onClick={save} disabled={!dirty}>
                {dirty ? 'Save profile' : 'Saved'}
              </Button>
              <Button
                variant="outline"
                icon={Sparkles}
                onClick={() => navigate('/gap')}
                iconRight={ArrowRight}
              >
                Run skill-gap analysis
              </Button>
              {dirty && (
                <Button
                  variant="ghost"
                  icon={Trash2}
                  onClick={() => {
                    setTeach(STUDENT.canTeach)
                    setLearn(STUDENT.wantToLearn)
                    setCareer(STUDENT.careerGoal)
                    setBio(STUDENT.bio)
                    setDirty(false)
                    toast('Changes discarded.', { tone: 'info' })
                  }}
                >
                  Discard
                </Button>
              )}
            </div>
          </Card>

          <div className="grid sm:grid-cols-3 gap-4">
            {SELF_RATED.map((s) => (
              <Card key={s.name} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-bold text-ink truncate">{s.name}</p>
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ background: SKILL_COLORS[s.name] ?? '#4f46e5' }}
                  />
                </div>
                <p className="mt-2 text-[22px] font-extrabold tnum text-ink leading-none">{s.level}%</p>
                <ProgressBar value={s.level} size="sm" className="mt-2.5" />
                <p className="mt-2 text-[11px] text-muted">{s.evidence}</p>
              </Card>
            ))}
          </div>

          <SourceNote tone="brand">
            Self-ratings are illustrative seed values for the demo student. No assessment engine runs behind this page.
          </SourceNote>
        </div>

        {/* --------------------------------------------------------- aside */}
        <div className="space-y-5">
          <Card className="p-5 text-center">
            <h3 className="text-[14px] font-bold text-ink mb-3">Match readiness</h3>
            <div className="flex justify-center">
              <MatchRing value={94} size={150} stroke={9} label="Top Match" />
            </div>
            <p className="mt-3 text-[11.5px] text-muted leading-relaxed">
              Peers are matched on complementarity, level, style and schedule overlap.
            </p>
            <Button variant="subtle" size="sm" full className="mt-3" iconRight={ArrowRight} onClick={() => navigate('/matching')}>
              See matches
            </Button>
          </Card>

          <Card className="p-5">
            <h3 className="text-[14px] font-bold text-ink mb-3">Exchange snapshot</h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-accent-soft border border-accent/20 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">I teach</p>
                {teach.length ? (
                  teach.map((s) => (
                    <p key={s} className="mt-1 text-[13px] font-bold text-ink">
                      {s}
                    </p>
                  ))
                ) : (
                  <p className="mt-1 text-[12px] text-muted">None listed</p>
                )}
              </div>
              <div className="flex justify-center">
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand">
                  <ArrowRight size={15} className="rotate-90" />
                </span>
              </div>
              <div className="rounded-xl bg-brand-soft border border-brand/20 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand">I want to learn</p>
                {learn.length ? (
                  learn.map((s) => (
                    <p key={s} className="mt-1 text-[13px] font-bold text-ink">
                      {s}
                    </p>
                  ))
                ) : (
                  <p className="mt-1 text-[12px] text-muted">None listed</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-[14px] font-bold text-ink mb-3">Profile checklist</h3>
            <ul className="space-y-2.5">
              {[
                { l: 'Career goal defined', ok: !!career },
                { l: 'At least one teaching skill', ok: teach.length > 0 },
                { l: 'At least one learning goal', ok: learn.length > 0 },
                { l: 'Bio above 40 characters', ok: bio.trim().length > 40 },
                { l: 'Availability selected', ok: !!availability },
                { l: 'Learning style selected', ok: !!style },
              ].map((c) => (
                <li key={c.l} className="flex items-center gap-2.5">
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full ${
                      c.ok ? 'grad-accent text-white' : 'bg-surface-3 text-muted'
                    }`}
                  >
                    {c.ok ? <Check size={12} strokeWidth={3.5} /> : <UserRound size={11} />}
                  </span>
                  <span className={`text-[12.5px] ${c.ok ? 'text-ink-2 font-medium' : 'text-muted'}`}>{c.l}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
