import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'
import { FONT, SECONDARY, GROUPED_BG, Icon, GlassButton, LargeTitle, push } from '../components/ios'

// Work experience shown as Wallet cards; each bullet reads like a transaction with its metric as the amount.
const cards = [
  {
    id: 'soularis',
    company: 'Soularis',
    role: 'Software Engineering Intern',
    location: 'Austin, TX',
    tag: 'Internship',
    bg: 'linear-gradient(135deg, #6B3FA0 0%, #3B1F66 55%, #1E0F3A 100%)',
    accent: '#B794F4',
    details: [
      { metric: '70%+', title: 'Semantic search relevance', text: 'Built a pgvector search service (HNSW-indexed) with sub-second semantic queries, lifting retrieval relevance 70%+.' },
      { metric: '100%', title: 'RAG schema compliance', text: 'Engineered a RAG service with schema validation, holding 100% response-schema compliance at 2.3s p95 latency.' },
      { metric: '−15%', title: 'Backend error rate', text: 'Consolidated 25 backend endpoints under one Railway schema, cutting parsing logic 20% and error rate 15%.' },
    ],
  },
  {
    id: 'mxr',
    company: 'UNT Mixed Realities Lab',
    role: 'Research Fellow',
    location: 'Denton, TX',
    tag: 'Research',
    bg: 'linear-gradient(135deg, #1FA35C 0%, #00853E 50%, #004D24 100%)',
    accent: '#9AE6B4',
    details: [
      { metric: '512ms', title: 'Real-time sensor streaming', text: 'Built a real-time streaming service over MQTT + WebSockets, delivering sensor data to clients at 512ms latency.' },
      { metric: '16,904', title: 'Records per pipeline run', text: 'Engineered a Python pipeline processing 16,904 records/run with automated ingestion, transformation, and reporting.' },
      { metric: '8+', title: 'REST API endpoints', text: 'Developed a REST API with 8+ endpoints serving datasets to visualization and model clients through one layer.' },
    ],
  },
  {
    id: 'core',
    company: 'CORE',
    badge: 'YC S23',
    role: 'AI Systems Engineering Intern',
    location: 'Remote',
    tag: 'Internship',
    bg: 'linear-gradient(135deg, #48484A 0%, #2C2C2E 45%, #0B0B0C 100%)',
    accent: '#FF9F0A',
    details: [
      { metric: '+30%', title: 'Workflow reliability', text: 'Optimized backend APIs and orchestration, raising workflow reliability 30% across distributed multi-service systems.' },
      { metric: '4+', title: 'MCP-integrated services', text: 'Built a distributed Model Context Protocol (MCP) automating workflows across 4+ integrated backend services.' },
      { metric: '−30%', title: 'Manual engineering work', text: 'Scaled backend infrastructure and internal debugging tools, cutting repetitive manual engineering work by 30%.' },
    ],
  },
  {
    id: 'sesl',
    company: 'UNT Smart Electronic Systems Lab',
    role: 'Research Assistant',
    location: 'Denton, TX',
    tag: 'Research',
    bg: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 55%, #083D3A 100%)',
    accent: '#81E6D9',
    details: [
      { metric: '100%', title: 'Inference accuracy', text: 'Built a TinyFL anomaly detection framework for IoMT edge devices, reaching 100% inference accuracy on test data.' },
      { metric: '−40%', title: 'Inference latency', text: 'Deployed federated models over MQTT on Arduino Nano 33 IoT and Raspberry Pi, cutting inference latency by 40%.' },
      { metric: '−25%', title: 'On-device energy use', text: 'Cut on-device energy use 25% by compressing neural networks for 32 KB-RAM boards, published at IEEE iSES.' },
    ],
  },
  {
    id: 'solaria',
    company: 'Solaria Interactive',
    role: 'Game Development Intern',
    location: 'Remote',
    tag: 'Internship',
    bg: 'linear-gradient(135deg, #FFB347 0%, #FF7A1A 50%, #C2410C 100%)',
    accent: '#FFD8A8',
    details: [
      { metric: '10+', title: 'Gameplay scripts shipped', text: 'Mastered Lua and Roblox Studio in a 5-week 1-on-1 mentorship, shipping 10+ gameplay scripts for Kaiju Revolution.' },
      { metric: '30+', title: 'Game assets integrated', text: 'Built UI systems and integrated 30+ game assets for Kaiju Revolution, raising in-game UI responsiveness by 20%.' },
      { metric: '40+', title: 'Bugs resolved', text: 'Ran playtests and bug triage with a 6-person dev team, resolving 40+ physics and UI bugs ahead of release.' },
    ],
  },
  {
    id: 'kumon',
    company: 'Kumon of Coppell East',
    role: 'Lead Tutor/Manager',
    location: 'Coppell, TX',
    tag: 'Part-time',
    bg: 'linear-gradient(135deg, #3B8FE0 0%, #0067B1 50%, #003A66 100%)',
    accent: '#FF6B6B',
    details: [
      { metric: '20+', title: 'Students taught daily', text: 'Led 3+ daily group sessions for 20+ students aged 8–16, teaching math, reading, and grammar across skill levels.' },
      { metric: '+25%', title: 'Worksheet accuracy', text: 'Designed custom lesson plans from arithmetic to Calculus I, raising average student worksheet accuracy by 25%.' },
      { metric: '5', title: 'Instructors trained', text: 'Trained 5 new instructors on curriculum and teaching strategy while grading 100+ worksheets a day for accuracy.' },
    ],
  },
]

const studentId = {
  id: 'tamu',
  school: 'Texas A&M University',
  name: 'Vaibhav Gollapalli',
  major: 'B.S. Computer Science',
  grad: 'May 2028',
  location: 'College Station, TX',
  coursework: ['Data Structures & Algorithms', 'Discrete Mathematics', 'Linear Algebra', 'Multivariable Calculus', 'Differential Equations', 'Statistics'],
}

const passes = [
  {
    id: 'hacktams',
    org: 'HackTAMS',
    headerLabel: 'ROLE',
    headerValue: 'Director',
    primaryLabel: 'EVENT',
    primary: 'HackTAMS',
    secondary: [['YEARS', '2024–2026'], ['ATTENDEES', '230+'], ['RAISED', '$20K+']],
    note: 'Directed 2 years, scaling 30 to 230+ attendees and raising $20K+, top Texas hackathon.',
    bg: 'linear-gradient(160deg, #2D3A8C 0%, #1A2257 60%, #0D1233 100%)',
    fg: 'white',
    label: '#A3B1FF',
  },
  {
    id: 'copilot',
    org: 'Microsoft',
    headerLabel: 'SELECTED',
    headerValue: '1 of 150',
    primaryLabel: 'PROGRAM',
    primary: 'Copilot Ambassador',
    secondary: [['YEAR', '2026'], ['SCOPE', 'Nationwide'], ['FOCUS', 'AI Adoption']],
    note: '1 of 150 nationwide, leading campus AI-tool adoption, workshops, and events.',
    bg: 'linear-gradient(160deg, #F25022 0%, #7FBA00 33%, #00A4EF 66%, #FFB900 100%)',
    fg: 'white',
    label: 'rgba(255,255,255,0.8)',
  },
]

function Chip() {
  return (
    <svg width="38" height="28" viewBox="0 0 38 28">
      <rect x="0.5" y="0.5" width="37" height="27" rx="5" fill="url(#chipg)" stroke="rgba(0,0,0,0.25)" />
      <defs>
        <linearGradient id="chipg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5E3A3" /><stop offset="1" stopColor="#B8913A" />
        </linearGradient>
      </defs>
      <path d="M0 10h12M0 18h12M26 10h12M26 18h12M12 0v28M26 0v28M12 14h14" stroke="rgba(90,60,10,0.45)" strokeWidth="1" fill="none" />
    </svg>
  )
}

function Contactless({ color = 'white' }) {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M4 7a6 6 0 0 1 0 8" /><path d="M8.5 4.5a10 10 0 0 1 0 13" /><path d="M13 2a14 14 0 0 1 0 18" />
    </svg>
  )
}

function CardFace({ card }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '1.586', borderRadius: '14px', background: card.bg, color: 'white', position: 'relative',
      boxShadow: '0 -1px 0 rgba(255,255,255,0.15) inset, 0 6px 18px rgba(0,0,0,0.22)', overflow: 'hidden', fontFamily: FONT,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.18), transparent 60%)' }} />
      <div style={{ position: 'absolute', top: 16, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{card.company}</div>
        {card.badge ? (
          <span style={{ fontSize: '11px', fontWeight: 700, background: card.accent, color: '#1a1a1a', padding: '3px 7px', borderRadius: '6px', flexShrink: 0 }}>{card.badge}</span>
        ) : (
          <span style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8, flexShrink: 0 }}>{card.tag}</span>
        )}
      </div>
      <div style={{ position: 'absolute', top: '44%', left: 18, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Chip /><Contactless />
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.95 }}>{card.role}</div>
        <div style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, flexShrink: 0 }}>{card.location}</div>
      </div>
    </div>
  )
}

function StudentIdFace() {
  return (
    <div style={{
      width: '100%', aspectRatio: '1.586', borderRadius: '14px', background: 'linear-gradient(135deg, #7A1F1F 0%, #500000 55%, #2B0000 100%)',
      color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.22)', fontFamily: FONT,
    }}>
      <div style={{ position: 'absolute', top: 16, left: 18, right: 18, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '19px', fontWeight: 700 }}>Texas A&M University</div>
        <span style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8 }}>Student ID</span>
      </div>
      <div style={{ position: 'absolute', right: 18, top: '40%', fontSize: '64px', fontWeight: 800, opacity: 0.14, letterSpacing: '-0.04em' }}>ATM</div>
      <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
        <div style={{ fontSize: '20px', fontWeight: 600 }}>{studentId.name}</div>
        <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '2px' }}>{studentId.major} · Class of 2028</div>
      </div>
    </div>
  )
}

function FakeQR({ seed = 7 }) {
  const n = 25
  const cells = []
  let x = seed
  for (let i = 0; i < n * n; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff
    const r = Math.floor(i / n), c = i % n
    const finder = (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7)
    if (finder) {
      const rr = r >= n - 7 ? r - (n - 7) : r, cc = c >= n - 7 ? c - (n - 7) : c
      const on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4)
      if (on) cells.push([r, c])
    } else if ((x >> 8) % 2) {
      cells.push([r, c])
    }
  }
  return (
    <svg width="132" height="132" viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
      {cells.map(([r, c]) => <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000" />)}
    </svg>
  )
}

function PassFace({ pass, full }) {
  return (
    <div style={{
      width: '100%', borderRadius: '12px', background: pass.bg, color: pass.fg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 6px 18px rgba(0,0,0,0.22)', fontFamily: FONT, padding: '14px 16px 18px',
    }}>
      {/* Ticket notch */}
      <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 28, height: 28, borderRadius: '50%', background: full ? GROUPED_BG : 'white' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '17px', fontWeight: 700 }}>{pass.org}</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: pass.label, letterSpacing: '0.04em' }}>{pass.headerLabel}</div>
          <div style={{ fontSize: '17px', fontWeight: 500 }}>{pass.headerValue}</div>
        </div>
      </div>
      <div style={{ marginTop: '14px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: pass.label, letterSpacing: '0.04em' }}>{pass.primaryLabel}</div>
        <div style={{ fontSize: '30px', fontWeight: 300, lineHeight: 1.1 }}>{pass.primary}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', gap: '8px' }}>
        {pass.secondary.map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: pass.label, letterSpacing: '0.04em' }}>{k}</div>
            <div style={{ fontSize: '17px', fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>
      {full && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
          <div style={{ background: 'white', borderRadius: '8px', padding: '10px' }}>
            <FakeQR seed={pass.id.length * 97} />
          </div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.85 }}>{pass.id.toUpperCase()}-VG</div>
        </div>
      )}
    </div>
  )
}

function StackItem({ children, onClick, peek, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 28 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ position: 'relative', height: peek ? '56px' : 'auto', cursor: 'pointer' }}
    >
      <div style={{ position: peek ? 'absolute' : 'relative', top: 0, left: 0, right: 0 }}>{children}</div>
    </motion.div>
  )
}

function TxnRow({ d, accent, last }) {
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '0 0 0 16px', alignItems: 'flex-start' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px', background: accent, marginTop: '12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="briefcase" size={20} color="#1a1a1a" />
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '12px 16px 12px 0', borderBottom: last ? 'none' : '0.5px solid rgba(60,60,67,0.18)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#000' }}>{d.title}</div>
          <div style={{ fontSize: '17px', fontWeight: 500, color: '#000', flexShrink: 0 }}>{d.metric}</div>
        </div>
        <div style={{ fontSize: '14px', color: SECONDARY, marginTop: '3px', lineHeight: 1.4 }}>{d.text}</div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ margin: '0 16px 20px' }}>
      {title && <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000', margin: '0 4px 8px' }}>{title}</h2>}
      <div style={{ background: 'white', borderRadius: '22px', overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

function InfoGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px', padding: '16px' }}>
      {items.map(([k, v]) => (
        <div key={k}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: SECONDARY, letterSpacing: '0.03em' }}>{k}</div>
          <div style={{ fontSize: '16px', color: '#000', marginTop: '2px' }}>{v}</div>
        </div>
      ))}
    </div>
  )
}

function Detail({ item, onDone }) {
  let face, body
  if (item.kind === 'card') {
    const c = item.data
    face = <CardFace card={c} />
    body = (
      <>
        <Section>
          <InfoGrid items={[['ROLE', c.role], ['COMPANY', c.company + (c.badge ? ` (${c.badge})` : '')], ['LOCATION', c.location], ['TYPE', c.tag]]} />
        </Section>
        <Section title="Latest Highlights">
          {c.details.map((d, i) => <TxnRow key={i} d={d} accent={c.accent} last={i === c.details.length - 1} />)}
        </Section>
      </>
    )
  } else if (item.kind === 'id') {
    face = <StudentIdFace />
    body = (
      <>
        <Section>
          <InfoGrid items={[['DEGREE', studentId.major], ['EXPECTED', studentId.grad], ['CAMPUS', studentId.location], ['STATUS', 'Enrolled']]} />
        </Section>
        <Section title="Relevant Coursework">
          {studentId.coursework.map((c, i) => (
            <div key={c} style={{ padding: '0 0 0 16px' }}>
              <div style={{ padding: '13px 16px 13px 0', fontSize: '17px', color: '#000', borderBottom: i === studentId.coursework.length - 1 ? 'none' : '0.5px solid rgba(60,60,67,0.18)' }}>{c}</div>
            </div>
          ))}
        </Section>
      </>
    )
  } else {
    const p = item.data
    face = <PassFace pass={p} full />
    body = (
      <Section title="Details">
        <div style={{ padding: '14px 16px', fontSize: '16px', color: '#000', lineHeight: 1.45 }}>{p.note}</div>
      </Section>
    )
  }

  return (
    <motion.div {...push} style={{ background: GROUPED_BG, minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '54px 16px 14px' }}>
        <GlassButton onClick={onDone} label="Done" color="#000">Done</GlassButton>
        <GlassButton icon="ellipsis" label="More" color="#000" />
      </div>
      <div style={{ padding: '0 16px 20px' }}>{face}</div>
      {body}
    </motion.div>
  )
}

export default function Experience({ isOpen, onClose }) {
  const [selected, setSelected] = useState(null)
  const handleClose = () => { setSelected(null); onClose() }

  const stack = [
    ...cards.map(c => ({ kind: 'card', id: c.id, data: c })),
    { kind: 'id', id: studentId.id, data: studentId },
  ]

  return (
    <AppWindow isOpen={isOpen} onClose={handleClose} title="" headerColor="#FFFFFF">
      <div style={{ fontFamily: FONT, background: selected ? GROUPED_BG : 'white', minHeight: '100%' }}>
        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <Detail key={selected.id} item={selected} onDone={() => setSelected(null)} />
          ) : (
            <motion.div key="wallet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '52px', paddingBottom: '24px' }}>
              <LargeTitle right={
                <div style={{ display: 'flex', gap: '8px', marginBottom: '2px' }}>
                  <GlassButton icon="plus" label="Add" color="#000" />
                  <GlassButton icon="ellipsis" label="More" color="#000" />
                </div>
              }>
                Wallet
              </LargeTitle>

              <div style={{ padding: '4px 16px 0' }}>
                {stack.map((item, i) => (
                  <StackItem key={item.id} index={i} peek={i < stack.length - 1} onClick={() => setSelected(item)}>
                    {item.kind === 'card' ? <CardFace card={item.data} /> : <StudentIdFace />}
                  </StackItem>
                ))}
              </div>

              <div style={{ padding: '26px 20px 10px', fontSize: '15px', fontWeight: 600, color: SECONDARY }}>Passes</div>
              <div style={{ padding: '0 16px' }}>
                {passes.map((p, i) => (
                  <StackItem key={p.id} index={stack.length + i} peek={i < passes.length - 1} onClick={() => setSelected({ kind: 'pass', id: p.id, data: p })}>
                    <PassFace pass={p} />
                  </StackItem>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppWindow>
  )
}
