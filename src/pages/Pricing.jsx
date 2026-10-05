import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Info,
  IndianRupee,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react'

import { Badge, Button, Card, Chip, ProgressBar, SectionHeading, SourceNote, Toggle, toneOf } from '../components/ui/primitives'
import { useApp } from '../store/AppStore'
import { MARKET, PRICING_LABEL, PRICING_PLANS, SECONDARY_REVENUE, STUDENT } from '../data/mockData'

function PlanCard({ plan, current, onChoose }) {
  const t = toneOf(plan.highlighted ? 'brand' : 'muted')
  return (
    <Card
      className={`p-6 sm:p-7 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        plan.highlighted ? 'border-brand/40 shadow-lg' : ''
      }`}
    >
      {plan.highlighted && (
        <>
          <div className="absolute inset-x-0 top-0 h-1.5 grad-brand" />
          <div className="absolute inset-x-0 -top-16 h-32 opacity-20 grad-brand blur-2xl" />
        </>
      )}

      <div className="relative">
        {plan.badge && (
          <span className="absolute right-0 top-0 rounded-full grad-brand px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-white shadow-sm">
            {plan.badge}
          </span>
        )}

        <p className="text-[13px] font-bold uppercase tracking-wider text-muted">{plan.name}</p>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-[44px] font-extrabold tracking-tight tnum text-ink leading-none">{plan.price}</span>
          <span className="text-[14px] font-bold text-muted">{plan.period}</span>
        </div>
        <p className="mt-3 text-[13px] text-ink-2 leading-relaxed">{plan.tagline}</p>

        {current === plan.id && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent-soft border border-accent/25 px-3 py-2">
            <CheckCircle2 size={15} className="text-accent" />
            <p className="text-[12.5px] font-bold text-ink">
              {plan.id === 'premium' ? 'Premium features unlocked' : 'Active plan — Free'}
            </p>
          </div>
        )}

        <ul className="mt-5 space-y-2.5 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full mt-px ${
                  plan.highlighted ? 'grad-brand text-white' : 'bg-surface-3 text-accent'
                }`}
              >
                <Check size={12} strokeWidth={3.5} />
              </span>
              <span className="text-[13px] text-ink-2">{f}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.highlighted ? 'primary' : 'outline'}
          size="lg"
          full
          className="mt-6"
          iconRight={ArrowRight}
          onClick={() => onChoose(plan)}
        >
          {plan.id === 'free' ? 'Stay on Free' : 'Go Premium'}
        </Button>
      </div>
    </Card>
  )
}

export default function Pricing() {
  const navigate = useNavigate()
  const { state, dispatch, toast } = useApp()
  const [annual, setAnnual] = useState(true)
  const [commissionOn, setCommissionOn] = useState(true)

  useEffect(() => {
    document.title = 'Pricing · SkillSync'
  }, [])

  const premiumPrice = annual ? '₹948' : '₹99'
  const premiumPeriod = annual ? '/year' : '/month'

  const choose = (plan) => {
    dispatch({ type: 'SET_PLAN', plan: plan.id })
    if (plan.id === 'premium') {
      toast('Premium plan selected in this demo. No payment is processed.', {
        tone: 'success',
        title: 'Premium unlocked',
      })
    } else {
      toast('Switched back to the Free plan.', { tone: 'info' })
    }
  }

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="relative overflow-hidden rounded-3xl grad-brand text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="absolute -right-20 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14 text-center">
          <Badge className="!bg-white/15 !text-white">
            <IndianRupee size={12} />
            {PRICING_LABEL.toUpperCase()}
          </Badge>
          <h2 className="mt-5 text-[30px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] max-w-2xl mx-auto">
            ₹99 a month to be taken seriously in one career
          </h2>
          <p className="mt-4 text-[14.5px] text-white/80 leading-relaxed max-w-2xl mx-auto">
            Student-led peer exchange has near-zero marginal cost, which is the only reason a price this low can carry
            the whole business. The free tier is not a trial — it is the top of the funnel.
          </p>

          <div className="mt-7 inline-flex items-center gap-1 rounded-2xl bg-white/12 border border-white/20 p-1.5 backdrop-blur">
            <button
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`rounded-xl px-4 py-2 text-[12.5px] font-bold transition-colors ${
                !annual ? 'bg-white text-brand' : 'text-white/70 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              onClick={() => setAnnual((a) => !a)}
              className={`relative h-6 w-11 rounded-full transition-colors ${annual ? 'grad-accent' : 'bg-white/25'}`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${annual ? 'left-[22px]' : 'left-0.5'}`}
              />
            </button>
            <button
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`rounded-xl px-4 py-2 text-[12.5px] font-bold transition-colors ${
                annual ? 'bg-white text-brand' : 'text-white/70 hover:text-white'
              }`}
            >
              Annual <span className={annual ? 'text-accent' : 'text-emerald-300'}>· save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* plans */}
      <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto w-full">
        <PlanCard plan={PRICING_PLANS[0]} current={state.plan} onChoose={choose} />
        <PlanCard plan={PRICING_PLANS[1]} current={state.plan} onChoose={choose} />
      </div>

      <div className="flex justify-center">
        <SourceNote tone="brand" icon={Info}>
          {PRICING_LABEL} — figures are founder proposals for demonstration, not live prices. This demo processes no
          payments.
        </SourceNote>
      </div>

      {/* comparison table */}
      <Card className="p-6">
        <SectionHeading eyebrow="Compare" title="What each plan unlocks" />
        <div className="mt-6 overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted pb-3">Feature</th>
                <th className="text-center text-[11px] font-bold uppercase tracking-wider text-muted pb-3 w-32">Free</th>
                <th className="text-center text-[11px] font-bold uppercase tracking-wider text-brand pb-3 w-32">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { l: 'Skill profile', f: true, p: true },
                { l: 'Basic matching', f: true, p: true },
                { l: 'Peer discovery', f: true, p: true },
                { l: 'Basic skill exchange', f: true, p: true },
                { l: 'Advanced AI matching', f: false, p: true },
                { l: 'Skill-gap analysis', f: false, p: true },
                { l: 'Personalized recommendations', f: false, p: true },
                { l: 'Enhanced progress tracking', f: false, p: true },
                { l: 'Verified profile', f: false, p: true },
              ].map((row) => (
                <tr key={row.l}>
                  <td className="py-3 text-[13px] font-medium text-ink-2">{row.l}</td>
                  <td className="py-3 text-center">
                    {row.f ? (
                      <CheckCircle2 size={17} className="inline text-accent" />
                    ) : (
                      <X size={15} className="inline text-muted/50" />
                    )}
                  </td>
                  <td className="py-3 text-center bg-brand-soft/50">
                    {row.p ? (
                      <CheckCircle2 size={17} className="inline text-brand" />
                    ) : (
                      <X size={15} className="inline text-muted/50" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* secondary revenue */}
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                <IndianRupee size={19} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Secondary revenue</p>
                <h3 className="text-[19px] font-extrabold text-ink tracking-tight">
                  {SECONDARY_REVENUE.commission}% commission
                </h3>
              </div>
            </div>
            <p className="mt-3.5 text-[13.5px] text-ink-2 leading-relaxed">{SECONDARY_REVENUE.body}</p>
          </div>
          <Toggle checked={commissionOn} onChange={setCommissionOn} label="Commission model" id="comm" />
        </div>

        {commissionOn && (
          <div className="mt-6 grid sm:grid-cols-4 gap-4 animate-[pop_0.3s_ease-out]">
            {[
              { l: 'Session price', v: '₹500', s: 'expert-led session' },
              { l: 'Platform take', v: '₹50', s: '10% commission' },
              { l: 'Expert keeps', v: '₹450', s: '90% share' },
              { l: 'At 100 sessions/mo', v: '₹60,000', s: 'gross to platform' },
            ].map((x) => (
              <div key={x.l} className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{x.l}</p>
                <p className="mt-1.5 text-[20px] font-extrabold tnum text-ink">{x.v}</p>
                <p className="text-[11px] text-muted mt-0.5">{x.s}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* revenue mix */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <SectionHeading eyebrow="Sanity check" title="Where the revenue comes from" />
          <div className="mt-5 space-y-4">
            {[
              { l: 'Subscriptions (Year 3)', v: '₹416 lakh', w: 92, tone: 'brand' },
              { l: 'Expert session commission', v: 'Illustrative', w: 8, tone: 'accent' },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="text-[12.5px] font-semibold text-ink-2">{r.l}</span>
                  <span className="text-[12.5px] font-extrabold tnum text-ink">{r.v}</span>
                </div>
                <ProgressBar value={r.w} tone={r.tone} size="sm" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-muted leading-relaxed">
            Subscriptions carry the model. Commission is an upside layer that only applies when a peer exchange escalates
            into a paid expert session — it is deliberately secondary.
          </p>
          <Button variant="subtle" size="sm" className="mt-3" iconRight={ArrowRight} onClick={() => navigate('/financials')}>
            See the 3-year model
          </Button>
        </Card>

        <Card className="p-6">
          <SectionHeading eyebrow="For investors" title="Why ₹99 holds" />
          <div className="mt-5 space-y-3">
            {[
              { i: Users, t: '₹99 is below student budget pain', d: 'Less than one textbook. No approval cycle in a hostel room.' },
              { i: Zap, t: 'Marginal cost is genuinely low', d: 'Peer exchange costs SkillSync almost nothing to serve.' },
              { i: TrendingUp, t: 'Annual revenue of ₹1,188', d: 'Supports a ₹948 annual contribution before CAC.' },
              { i: Building2, t: 'Contribution funds acquisition', d: 'A ₹450 blended CAC against a ₹2,370 LTV is the bet.' },
            ].map((x) => {
              const I = x.i
              return (
                <div key={x.t} className="flex gap-3 rounded-xl border border-line bg-surface-2 p-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <I size={16} />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-ink">{x.t}</p>
                    <p className="mt-0.5 text-[12px] text-muted leading-relaxed">{x.d}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <SourceNote tone="brand" className="mt-4">
            LTV and CAC are {PRICING_LABEL.toLowerCase()} planning assumptions to be validated through a pilot.
          </SourceNote>
        </Card>
      </div>

      <Card className="relative overflow-hidden border-transparent">
        <div className="absolute inset-0 grad-brand" />
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="relative p-8 text-center text-white">
          <Rocket size={26} className="mx-auto mb-3" />
          <h3 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">
            Start free. Upgrade when the gap is clear.
          </h3>
          <p className="mt-2.5 text-[14px] text-white/80 max-w-lg mx-auto">
            The free tier is enough to prove the exchange works. Premium is for the student who has decided on one career
            and needs the plan behind it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="dark"
              className="!bg-white !text-brand hover:!bg-white/90"
              icon={Rocket}
              onClick={() => navigate('/dashboard')}
            >
              Open the demo dashboard
            </Button>
            <Chip tone="brand" className="!bg-white/15 !text-white !border !border-white/25 !text-[12px] !py-2 !px-3.5">
              {premiumPrice} {premiumPeriod} · billed {annual ? 'annually' : 'monthly'}
            </Chip>
          </div>
        </div>
      </Card>
    </div>
  )
}
