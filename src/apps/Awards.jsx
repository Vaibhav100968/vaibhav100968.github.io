import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'
import { FONT, Icon, GlassButton, GlassTabBar, LargeTitle, push } from '../components/ios'
import profilePic from '../assets/profile.jpg'

const base = import.meta.env.BASE_URL

const MOVE = '#FA114F'
const EXERCISE = '#A6FF00'
const STAND = '#00D9FF'
const CARD = '#1C1C1E'
const GRAY = 'rgba(235,235,245,0.6)'

// Publications appear like workouts in the Fitness "Sessions" list.
const publications = [
  { title: 'Productive Failure in Agentic Mathematics', venue: 'NeurIPS MATH-AI', year: '2026', role: 'First author', url: null },
  { title: 'Modeling Cognitive Energy from EEG Transitions using Schrödinger Bridge Problem', venue: 'IEEE SMC', year: '2026', role: 'SBP modeling applied to Stroop task EEG data.', url: `${base}pdfs/eeg-cognitive-energy.pdf` },
  { title: 'StrokeSentry: A Novel Edge AI Mobile Application for Rapid Stroke Detection', venue: 'IEEE ICBAIE', year: '2025', role: 'Accepted for publication in IEEE Xplore.', url: `${base}pdfs/strokesentry.pdf` },
  { title: 'Federated TinyML for Lightweight Anomaly Detection in IoMT Using MQTT', venue: 'IEEE iSES', year: '2025', role: 'Accepted for IEEE Xplore.', url: `${base}pdfs/tinyml-iomt.pdf` },
  { title: 'Embedding the Windkessel Model as Trainable ODEs in Neural Networks', venue: 'ICBES', year: '2025', role: 'Hybrid neural ODE blood pressure prediction research.', url: `${base}pdfs/windkessel-abstract.pdf` },
  { title: 'Grey Wolf Optimizer', venue: 'Open Source', year: '2025', role: 'Open-source nature-inspired optimization algorithm.', url: 'https://github.com/Vaibhav100968/opengreywolfoptimizer', linkLabel: 'GitHub' },
]

const pending = [
  { title: 'Hybrid Windkessel-Neural BP Monitor', venue: 'In Review', year: '', role: 'Achieved Grade A BHS accuracy.', url: `${base}pdfs/windkessel-bp.pdf` },
]

// Medallion look per category: [shape, light metal, dark metal]
const STYLE = {
  Hackathons: ['octagon', '#7DE2FF', '#0A6BC2'],
  Research: ['hexagon', '#E5B8FF', '#6E2BB5'],
  Leadership: ['shield', '#FFE08A', '#B8860B'],
  Entrepreneurship: ['circle', '#FFB088', '#C2410C'],
  'Olympiads & Competitions': ['circle', '#FFF1A8', '#B8901A'],
}

const awards = [
  { cat: 'Hackathons', name: '2nd Place — Meta Closer Together AI Hackathon', short: 'Meta Hackathon', glyph: '2nd', date: '2026',
    desc: 'Invite-only final at Meta HQ in Menlo Park with about 75 builders. Built Landing, an AI feature that helps young adults move to a new city, from finding an apartment to finding their people.' },
  { cat: 'Hackathons', name: 'Meta Track Top Performer — HackTX', short: 'HackTX Meta Track', glyph: 'TX', date: '2026',
    desc: 'Earned an invite to Meta’s Closer Together AI Hackathon with RoboRumble, a robot fighting game where every move is invented.' },
  { cat: 'Hackathons', name: '2nd Place — CS Base Hack4Health', short: 'Hack4Health', glyph: '2nd', desc: 'Second place at CS Base Hack4Health.' },
  { cat: 'Hackathons', name: '3rd Place — DFW IT Association AI Talent Competition ($500)', short: 'DFW ITA AI Talent', glyph: '3rd', desc: 'Third place and $500 at the DFW IT Association AI Talent Competition.' },

  { cat: 'Research', name: 'TAMS Summer Research Scholarship — $4,000', short: 'TAMS Scholarship', glyph: '$4K', desc: '$4,000 scholarship supporting summer research.' },
  { cat: 'Research', name: 'UNT Undergraduate Research Fellowship — $500', short: 'UNT URF', glyph: '$500', desc: '$500 fellowship supporting continued research at UNT.' },
  { cat: 'Research', name: 'NeurIPS MATH-AI Paper Acceptance', short: 'NeurIPS MATH-AI', glyph: 'MATH', date: '2026', desc: '“Productive Failure in Agentic Mathematics,” first author, NeurIPS MATH-AI 2026.' },
  { cat: 'Research', name: 'IEEE SMC Paper Acceptance', short: 'IEEE SMC', glyph: 'SMC', date: '2026', desc: 'Cognitive energy modeling from EEG transitions, first author, IEEE SMC 2026.' },
  { cat: 'Research', name: 'IEEE ICBAIE Paper Acceptance', short: 'IEEE ICBAIE', glyph: 'BAIE', date: '2025', desc: 'StrokeSentry, accepted for publication in IEEE Xplore.' },
  { cat: 'Research', name: 'IEEE iSES Paper Acceptance', short: 'IEEE iSES', glyph: 'iSES', date: '2025', desc: 'Federated TinyML for IoMT anomaly detection, first author.' },
  { cat: 'Research', name: 'ICBES Paper Acceptance', short: 'ICBES', glyph: 'BES', desc: 'Embedding the Windkessel model as trainable ODEs in neural networks.' },

  { cat: 'Leadership', name: 'HackTAMS Director', short: 'HackTAMS', glyph: '230+', date: '2024–26', desc: 'Directed 2 years, scaling 30 to 230+ attendees and raising $20K+, top Texas hackathon.' },
  { cat: 'Leadership', name: 'Microsoft Copilot Ambassador', short: 'Copilot Ambassador', glyph: '1/150', date: '2026', desc: '1 of 150 nationwide, leading campus AI-tool adoption, workshops, and events.' },

  { cat: 'Entrepreneurship', name: 'Ultra Venture Fellowship — Top 1 Percentile', short: 'Ultra Venture', glyph: '1%', desc: 'Top 1 percentile of the Ultra Venture Fellowship.' },
  { cat: 'Entrepreneurship', name: 'YC Startup School 2026', short: 'YC Startup School', glyph: 'YC', date: '2026', desc: 'Y Combinator Startup School 2026.' },
  { cat: 'Entrepreneurship', name: 'Alta Capital Fall 2026 Cohort', short: 'Alta Capital', glyph: 'ALTA', date: 'Fall 2026', desc: 'Member of the Alta Capital Fall 2026 cohort.' },

  { cat: 'Olympiads & Competitions', name: 'International Logic Olympiad Gold Scholar', short: 'Logic Olympiad', glyph: 'Au', desc: 'Gold Scholar at the International Logic Olympiad.' },
  { cat: 'Olympiads & Competitions', name: '1st Place — HOSA Regionals (Forensic Science)', short: 'HOSA Regionals', glyph: '1st', desc: 'First place in Forensic Science at HOSA Regionals.' },
  { cat: 'Olympiads & Competitions', name: '1st Place — BPA Regionals (Broadcast News Production)', short: 'BPA Regionals', glyph: '1st', desc: 'First place in Broadcast News Production at BPA Regionals.' },
  { cat: 'Olympiads & Competitions', name: 'AP Scholar', short: 'AP Scholar', glyph: 'AP', desc: 'AP Scholar award from the College Board.' },
]

const categories = [...new Set(awards.map(a => a.cat))]

const shapePath = {
  circle: 'M50 4a46 46 0 1 1 0 92a46 46 0 1 1 0-92Z',
  hexagon: 'M50 3l41 23.5v47L50 97 9 73.5v-47Z',
  octagon: 'M31 4h38l27 27v38L69 96H31L4 69V31Z',
  shield: 'M50 3l42 14v29c0 26-18 44-42 51C26 90 8 72 8 46V17Z',
}

function Medallion({ award, size = 92, idx = 0 }) {
  const [shape, light, dark] = STYLE[award.cat]
  const id = `m${idx}-${size}`
  const d = shapePath[shape]
  const len = award.glyph.length
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.25" stopColor={light} />
          <stop offset="0.7" stopColor={dark} />
          <stop offset="1" stopColor={light} />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark} />
          <stop offset="1" stopColor={light} />
        </linearGradient>
        <clipPath id={`${id}c`}><path d={d} /></clipPath>
      </defs>
      <path d={d} fill={`url(#${id}a)`} />
      <g clipPath={`url(#${id}c)`}>
        <path d={d} fill={`url(#${id}b)`} transform="translate(50 50) scale(0.8) translate(-50 -50)" />
        <path d="M-10 30 L110 -10 L110 20 L-10 60Z" fill="white" opacity="0.18" />
      </g>
      <text x="50" y="50" dy="0.35em" textAnchor="middle" fill="white" fontFamily={FONT} fontWeight="800"
        fontSize={len <= 2 ? 34 : len === 3 ? 28 : len === 4 ? 22 : 18}
        style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.25)', strokeWidth: 1.5 }}>
        {award.glyph}
      </text>
    </svg>
  )
}

function Ring({ r, stroke, color, progress }) {
  const c = 2 * Math.PI * r
  return (
    <>
      <circle cx="60" cy="60" r={r} stroke={color} strokeOpacity="0.22" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx="60" cy="60" r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - progress) }}
        transition={{ duration: 1.2, ease: 'easeOut' }} transform="rotate(-90 60 60)"
      />
    </>
  )
}

function Card({ children, onClick, style }) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      style={{ background: CARD, borderRadius: '22px', padding: '16px', cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </motion.div>
  )
}

function CardTitle({ children, chevron }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div style={{ fontSize: '17px', fontWeight: 600, color: 'white' }}>{children}</div>
      {chevron && <Icon name="chevronRight" size={14} color={GRAY} />}
    </div>
  )
}

function SessionRow({ p, last }) {
  const Tag = p.url ? 'a' : 'div'
  return (
    <Tag
      {...(p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: last ? 'none' : '0.5px solid rgba(84,84,88,0.6)', textDecoration: 'none' }}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(166,255,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="doc" size={22} color={EXERCISE} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', lineHeight: 1.3 }}>{p.title}</div>
        <div style={{ fontSize: '13px', color: GRAY, marginTop: '2px' }}>{p.role}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', gap: '8px' }}>
          <span style={{ fontSize: '17px', fontWeight: 600, color: EXERCISE }}>{p.venue}</span>
          <span style={{ fontSize: '13px', color: GRAY, alignSelf: 'flex-end' }}>
            {p.year}{p.url ? ` · ${p.linkLabel || 'PDF'}` : ''}
          </span>
        </div>
      </div>
    </Tag>
  )
}

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()

function Summary({ onAward, onAllAwards }) {
  const pubCount = publications.filter(p => p.venue !== 'Open Source').length
  const winCount = awards.filter(a => a.cat === 'Hackathons' || a.cat === 'Olympiads & Competitions').length
  const leadCount = awards.filter(a => a.cat === 'Leadership' || a.cat === 'Entrepreneurship').length
  const rings = [
    { label: 'Publications', value: pubCount, unit: 'PAPERS', color: MOVE },
    { label: 'Wins', value: winCount, unit: 'AWARDS', color: EXERCISE },
    { label: 'Leadership', value: leadCount, unit: 'ROLES', color: STAND },
  ]
  return (
    <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Card>
        <CardTitle>Activity Rings</CardTitle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {rings.map(r => (
              <div key={r.label}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{r.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: r.color, fontFamily: 'ui-rounded, ' + FONT, lineHeight: 1.1 }}>
                  {r.value}/{r.value}<span style={{ fontSize: '15px', marginLeft: '4px' }}>{r.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <svg width="130" height="130" viewBox="0 0 120 120">
            <Ring r={50} stroke={15} color={MOVE} progress={1} />
            <Ring r={33} stroke={15} color={EXERCISE} progress={1} />
            <Ring r={16} stroke={15} color={STAND} progress={1} />
          </svg>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {[
          ['Research Funding', '$4.5K', MOVE, 'TAMS + UNT URF'],
          ['Hackathon Podiums', '3', EXERCISE, 'incl. Meta HQ final'],
          ['Attendees Led', '230+', STAND, 'HackTAMS Director'],
          ['Selected', '1 of 150', '#FFD60A', 'Copilot Ambassador'],
        ].map(([t, v, c, s]) => (
          <Card key={t} style={{ padding: '14px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{t}</div>
            <div style={{ fontSize: '26px', fontWeight: 600, color: c, fontFamily: 'ui-rounded, ' + FONT, marginTop: '6px' }}>{v}</div>
            <div style={{ fontSize: '12px', color: GRAY }}>{s}</div>
          </Card>
        ))}
      </div>

      <Card onClick={onAllAwards}>
        <CardTitle chevron>Awards</CardTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {awards.slice(0, 4).map((a, i) => (
            <div key={a.name} onClick={e => { e.stopPropagation(); onAward(a) }} style={{ cursor: 'pointer', textAlign: 'center', width: '74px' }}>
              <Medallion award={a} size={70} idx={i} />
              <div style={{ fontSize: '11px', color: GRAY, marginTop: '4px', lineHeight: 1.2 }}>{a.short}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Publications</CardTitle>
        {publications.map((p, i) => <SessionRow key={p.title} p={p} last={i === publications.length - 1} />)}
      </Card>

      <Card>
        <CardTitle>Pending Publications</CardTitle>
        {pending.map((p, i) => <SessionRow key={p.title} p={p} last={i === pending.length - 1} />)}
      </Card>
    </div>
  )
}

function AwardsGrid({ onAward }) {
  return (
    <div>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', padding: '0 20px 12px' }}>{cat}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px 6px', padding: '0 12px' }}>
            {awards.filter(a => a.cat === cat).map(a => (
              <motion.button
                key={a.name}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => onAward(a)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', fontFamily: FONT }}
              >
                <Medallion award={a} size={90} idx={awards.indexOf(a)} />
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginTop: '6px', lineHeight: 1.2 }}>{a.short}</div>
                {a.date && <div style={{ fontSize: '12px', color: GRAY, marginTop: '1px' }}>{a.date}</div>}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AwardDetail({ award, onBack }) {
  return (
    <motion.div {...push} style={{ minHeight: '100%', background: 'black' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '54px 16px 0' }}>
        <GlassButton icon="chevronLeft" label="Back" onClick={onBack} color="white" dark />
        <GlassButton icon="share" label="Share" color="white" dark />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 28px 40px', textAlign: 'center' }}>
        <motion.div
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
          initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          style={{ cursor: 'grab' }}
        >
          <Medallion award={award} size={220} idx={999} />
        </motion.div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', marginTop: '26px', lineHeight: 1.2 }}>{award.name}</h1>
        <p style={{ fontSize: '15px', color: GRAY, marginTop: '10px', lineHeight: 1.45 }}>{award.desc}</p>
        <div style={{ marginTop: '20px', fontSize: '15px', fontWeight: 600, color: EXERCISE }}>
          {award.date ? `Earned ${award.date}` : 'Earned'} · {award.cat}
        </div>
      </div>
    </motion.div>
  )
}

const TABS = [
  { id: 'summary', label: 'Summary', icon: 'rings' },
  { id: 'awards', label: 'Awards', icon: 'medal' },
]

export default function Awards({ isOpen, onClose }) {
  const [tab, setTab] = useState('summary')
  const [award, setAward] = useState(null)
  const handleClose = () => { setAward(null); setTab('summary'); onClose() }

  return (
    <AppWindow isOpen={isOpen} onClose={handleClose} title="" headerColor="#000000">
      <div style={{ fontFamily: FONT, background: 'black', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait" initial={false}>
            {award ? (
              <AwardDetail key={award.name} award={award} onBack={() => setAward(null)} />
            ) : (
              <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '52px', paddingBottom: '10px' }}>
                <LargeTitle
                  dark
                  subtitle={tab === 'summary' ? today : `${awards.length} Earned`}
                  right={<img src={profilePic} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', marginBottom: '4px' }} />}
                >
                  {tab === 'summary' ? 'Summary' : 'Awards'}
                </LargeTitle>
                {tab === 'summary'
                  ? <Summary onAward={setAward} onAllAwards={() => setTab('awards')} />
                  : <AwardsGrid onAward={setAward} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!award && <GlassTabBar tabs={TABS} active={tab} onChange={setTab} accent={EXERCISE} dark />}
      </div>
    </AppWindow>
  )
}
