import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'
import { FONT, BLUE, SECONDARY, SEPARATOR, Icon, GlassButton, GlassTabBar, LargeTitle, SearchField, push } from '../components/ios'
import profilePic from '../assets/profile.jpg'

const base = import.meta.env.BASE_URL

// Each project is presented as an App Store listing.
const projects = [
  {
    id: 'landing',
    name: 'Landing',
    subtitle: 'Move to a new city, find your people',
    category: 'Social Networking',
    icon: { bg: 'linear-gradient(160deg, #4C8DFF, #0866FF 55%, #0B3FB5)', glyph: '🛬' },
    year: '2026',
    stack: 'React, TypeScript, Convex, Meta Muse',
    badge: { label: 'AWARD', value: '2nd', caption: 'Meta Hackathon' },
    button: { label: 'GET', url: 'https://github.com/IBS27/landing' },
    description: 'Built at Meta’s invite-only Closer Together AI Hackathon at Meta HQ in Menlo Park, where we took 2nd place. The prompt: build the AI feature you wish Facebook had, one that makes it genuinely valuable for young adults. Landing helps young adults move to a new city, from finding an apartment to finding their people. Built with Srinivas I B, Sanjeev Varma, and Jixin Wang.',
    whatsNew: [
      'Muse reads local Group threads to show what a real Saturday looks like in each neighborhood.',
      'Ranks apartments for your budget and commute, and rebuilds units in 3D to furnish with Marketplace pieces.',
      'Negotiates with sellers and movers within your budget.',
      'Matches you with a crew arriving at the same time and turns “we should hang out sometime” into real plans.',
    ],
    shots: [
      { big: '2nd', small: 'Place at Meta’s Closer Together AI Hackathon' },
      { big: '~75', small: 'Invite-only builders at Meta HQ' },
      { big: '4', small: 'Teammates, one weekend, one pitch to Meta' },
    ],
  },
  {
    id: 'mean-eats',
    name: 'Mean Eats',
    subtitle: 'Dining hall menus & meal plans',
    category: 'Food & Drink',
    icon: { bg: 'linear-gradient(160deg, #3BB36B, #00853E 60%, #005A2A)', glyph: '🍽️' },
    year: '2025',
    stack: 'Swift, SwiftUI, Supabase, AWS Lambda, BeautifulSoup4',
    badge: { label: 'USERS', value: '300+', caption: 'On the App Store' },
    button: { label: 'GET', url: 'https://apps.apple.com/us/app/mean-eats/id6778164060' },
    description: 'A dining app on the App Store with live menus and meal-plan tracking across 5 dining halls. Menus sync automatically from serverless scrapers, and an offline cache keeps the app fast on every launch.',
    whatsNew: [
      'Shipped an App Store dining app to 300+ users across 5 halls with live menus and meal-plan tracking.',
      'Automated 5 dining scrapers on serverless AWS Lambda + EventBridge, syncing menus with 180+ days uptime.',
      'Built an offline cache and on-device recommendations, cutting redundant API calls 60%+ on every launch.',
    ],
    shots: [
      { big: '300+', small: 'Students using it across 5 dining halls' },
      { big: '180+', small: 'Days of scraper uptime on AWS Lambda' },
      { big: '60%', small: 'Fewer redundant API calls with offline cache' },
    ],
  },
  {
    id: 'glyph',
    name: 'Glyph',
    subtitle: 'The notebook that learns you',
    category: 'Education',
    icon: { bg: 'linear-gradient(160deg, #2B2B2E, #111113)', glyph: '✍️' },
    year: '2026',
    stack: 'Swift, SwiftUI, Core ML, Fireworks AI, PyTorch',
    badge: { label: 'DEVICE', value: 'iPad', caption: 'Apple Pencil' },
    button: null,
    description: 'Think GoodNotes, but everything you write is used to learn who you are, and it teaches you back in your own handwriting. Glyph reads what you write, writes back in your hand, and lets you replay any solve stroke by stroke.',
    whatsNew: [
      'Built an iPad tutor app with a real-time Apple Pencil canvas, on-device Apple Vision OCR, and 6 study widgets.',
      'Engineered an on-device Core ML inference pipeline generating handwriting in real time with no server round-trips.',
      'Cut LLM inference cost 40% with an on-device/cloud routing cascade, running arithmetic locally at $0.',
    ],
    shots: [
      { big: '6', small: 'Study widgets around a live Apple Pencil canvas' },
      { big: '0ms', small: 'Server round-trips for handwriting generation' },
      { big: '40%', small: 'Lower LLM cost with on-device routing' },
    ],
  },
  {
    id: 'sim2grasp',
    name: 'Sim2Grasp',
    subtitle: 'Autonomous pick-and-place arm',
    category: 'Robotics',
    icon: { bg: 'linear-gradient(160deg, #A6E22E, #76B900 55%, #3C6000)', glyph: '🦾' },
    year: '2026',
    stack: 'Isaac Lab, PyTorch, CUDA, YOLO, ROS2',
    badge: { label: 'LATENCY', value: '<80', caption: 'ms loop' },
    button: null,
    description: 'An autonomous robot arm that sees, plans, and grasps. Policies are trained across thousands of parallel GPU simulations in Isaac Lab and transferred to a real perception-to-control loop.',
    whatsNew: [
      'Built an autonomous pick-and-place arm, closing a real-time perception-to-control loop in under 80ms.',
      'Wrote custom CUDA preprocessing kernels, cutting per-frame latency 12x over a NumPy CPU baseline.',
      'Scaled GPU-accelerated training to 4K parallel Isaac Lab simulations, with an eval harness logging 90% success.',
    ],
    shots: [
      { big: '<80ms', small: 'Perception-to-control loop' },
      { big: '12x', small: 'Faster preprocessing with custom CUDA kernels' },
      { big: '4K', small: 'Parallel simulations, 90% grasp success' },
    ],
  },
  {
    id: 'roborumble',
    name: 'RoboRumble',
    subtitle: 'Invent a move. Watch a robot fight with it.',
    category: 'Games',
    icon: { bg: 'linear-gradient(160deg, #FF7A59, #E8336E 55%, #7B2CBF)', glyph: '🤖' },
    year: '2026',
    stack: 'FastAPI, MuJoCo, NVIDIA Kimodo, Claude, Meta Muse',
    badge: { label: 'HACKTX', value: 'Meta', caption: 'Track win' },
    button: null,
    description: 'A fairy-tale robot fighting game built at HackTX 2026. Two Unitree G1 humanoids duel while players use their phones as controllers: shout a move or act one out on camera, and it becomes real G1 joint motion in about a second. This project earned the invite to Meta’s Closer Together AI Hackathon.',
    whatsNew: [
      'Phones become controllers: scan a QR code, hold to talk, and Meta’s Muse Voice Transcribe turns shouts into moves.',
      'Matches shouts against a 573-move library in milliseconds; new moves are written by Claude and animated by Kimodo.',
      'Forge mode tracks your pose with MediaPipe and turns a 5-second performance into a polished robot move.',
    ],
    shots: [
      { big: '573', small: 'Moves in the shared library' },
      { big: '~1s', small: 'From shout to robot motion' },
      { big: '5s', small: 'Act it out to forge your own move' },
    ],
  },
  {
    id: 'gwo',
    name: 'OpenGreyWolfOptimizer',
    subtitle: 'Nature-inspired optimization in Python',
    category: 'Developer Tools',
    icon: { bg: 'linear-gradient(160deg, #8E9AAF, #5C677D 55%, #33415C)', glyph: '🐺' },
    year: '2025',
    stack: 'Python, NumPy, mpi4py, pytest',
    badge: { label: 'LICENSE', value: 'OSS', caption: 'Open source' },
    button: { label: 'GET', url: 'https://github.com/Vaibhav100968/opengreywolfoptimizer' },
    description: 'An open-source Grey Wolf Optimizer package with a familiar sklearn-style API, benchmarks, optional MPI parallelism, and a JOSS paper draft.',
    whatsNew: [
      'Shipped an open-source GWO package with an sklearn-style .fit() API, full type hints, and a JOSS paper draft.',
      'Built a benchmark harness across 4 standard test functions, validating convergence in under 0.03s per run.',
      'Added optional MPI parallel fitness evaluation plus 13 pytest cases and CI across 3 Python versions.',
    ],
    shots: [
      { big: '0.03s', small: 'Convergence per benchmark run' },
      { big: '13', small: 'pytest cases with CI' },
      { big: '3', small: 'Python versions supported' },
    ],
  },
  {
    id: 'strokesentry',
    name: 'StrokeSentry',
    subtitle: 'Edge AI for rapid stroke detection',
    category: 'Medical',
    icon: { bg: 'linear-gradient(160deg, #8C9EFF, #667EEA 50%, #764BA2)', glyph: '🧠' },
    year: '2025',
    stack: 'SwiftUI, Core ML, Vision, Speech',
    badge: { label: 'PUBLISHED', value: 'IEEE', caption: 'ICBAIE 2025' },
    button: { label: 'VIEW', url: `${base}pdfs/strokesentry.pdf` },
    paper: true,
    description: 'A lightweight, private, real-time mobile app for early stroke detection using the FAST method.',
    whatsNew: [
      'Facial landmark analysis, arm pose estimation, and speech clarity assessment using Apple Core ML, Vision, and Speech.',
      'Millisecond-level on-device inference on iPhone 15 Pro — no internet required.',
      'Published at IEEE ICBAIE 2025.',
    ],
    shots: [
      { big: 'FAST', small: 'Face, arm, and speech checks on device' },
      { big: 'ms', small: 'On-device inference on iPhone 15 Pro' },
      { big: 'IEEE', small: 'Published at ICBAIE 2025' },
    ],
  },
  {
    id: 'eeg',
    name: 'EEG Cognitive Energy',
    subtitle: 'Measuring the cost of thinking',
    category: 'Research',
    icon: { bg: 'linear-gradient(160deg, #F5A3FF, #F093FB 40%, #F5576C)', glyph: '⚡' },
    year: '2026',
    stack: 'Python, Schrödinger Bridge, WGAN-GP',
    badge: { label: 'ACCEPTED', value: 'SMC', caption: 'IEEE 2026' },
    button: { label: 'VIEW', url: `${base}pdfs/eeg-cognitive-energy.pdf` },
    paper: true,
    description: 'Quantifying neural metabolic cost from EEG transitions using the Schrödinger Bridge Problem and generative adversarial networks. Accepted at IEEE SMC 2026.',
    whatsNew: [
      'Applied SBP to Stroop task EEG data to establish cognitive load energy baselines.',
      'Validated WGAN-generated synthetic EEG for neuroscience and clinical applications.',
      'Near real-time SBP estimation on consumer-grade EEG hardware.',
    ],
    shots: [
      { big: 'SBP', small: 'Schrödinger Bridge on EEG transitions' },
      { big: 'GAN', small: 'Validated synthetic EEG' },
      { big: 'SMC', small: 'Accepted at IEEE SMC 2026' },
    ],
  },
  {
    id: 'windkessel',
    name: 'Windkessel-Neural BP',
    subtitle: 'Cuffless blood pressure estimation',
    category: 'Health & Fitness',
    icon: { bg: 'linear-gradient(160deg, #7FD3FF, #4FACFE 50%, #00C6FB)', glyph: '❤️' },
    year: '2025',
    stack: 'PyTorch, Neural ODEs',
    badge: { label: 'BHS', value: 'A', caption: 'Grade' },
    button: { label: 'VIEW', url: `${base}pdfs/windkessel-bp.pdf` },
    paper: true,
    description: 'An improved hybrid neural ODE model for noninvasive blood pressure estimation, continuing the Windkessel-ODE framework.',
    whatsNew: [
      'MAE of 2.45 mmHg (SBP) and 2.1 mmHg (DBP) — Grade A under the British Hypertension Society protocol.',
      'Continuation of the Windkessel-ODE framework; submitted to IEEE CAIT 2025.',
    ],
    shots: [
      { big: '2.45', small: 'mmHg MAE systolic' },
      { big: '2.1', small: 'mmHg MAE diastolic' },
      { big: 'A', small: 'British Hypertension Society grade' },
    ],
  },
  {
    id: 'tinyml',
    name: 'TinyML IoMT',
    subtitle: 'Federated anomaly detection at the edge',
    category: 'Medical',
    icon: { bg: 'linear-gradient(160deg, #6EF2A2, #43E97B 50%, #20C5B5)', glyph: '📡' },
    year: '2025',
    stack: 'TensorFlow Lite, Flower, MQTT, Arduino',
    badge: { label: 'PUBLISHED', value: 'IEEE', caption: 'iSES 2025' },
    button: { label: 'VIEW', url: `${base}pdfs/tinyml-iomt.pdf` },
    paper: true,
    description: 'Federated anomaly detection for Internet of Medical Things devices, running on resource-constrained hardware. Published at IEEE iSES 2025.',
    whatsNew: [
      'TensorFlow Lite model achieving 100% accuracy and an F1-score of 0.98.',
      'Deployed on Arduino Nano 33 IoT and Raspberry Pi using the Flower federated learning framework.',
      'MQTT-based communication enabling real-time physiological signal monitoring.',
    ],
    shots: [
      { big: '100%', small: 'Inference accuracy' },
      { big: '0.98', small: 'F1-score' },
      { big: 'MQTT', small: 'Real-time edge communication' },
    ],
  },
  {
    id: 'fai',
    name: 'Finance & Investments Club',
    subtitle: 'Financial literacy for 6,000 members',
    category: 'Finance',
    icon: { bg: 'linear-gradient(160deg, #FFB86B, #FA709A 55%, #E85D04)', glyph: '💰' },
    year: '2024',
    stack: 'Web, Events, Partnerships',
    badge: { label: 'CHAPTERS', value: '122', caption: 'Nonprofit' },
    button: { label: 'VIEW', url: 'https://www.clubfai.org/' },
    description: 'Digital infrastructure for a 6,000-member, 122-chapter nonprofit spreading financial literacy.',
    whatsNew: [
      'Managed development and maintenance of the official website, blog site, and event registration system.',
      'Helped manage partnerships and a $47K library fundraiser in rural India.',
      'Oversaw 100+ participants, managing venue, meals, registration, and logistics for events.',
    ],
    shots: [
      { big: '6K', small: 'Members across 122 chapters' },
      { big: '$47K', small: 'Library fundraiser in rural India' },
      { big: '100+', small: 'Event participants managed' },
    ],
  },
]

const byId = Object.fromEntries(projects.map(p => [p.id, p]))
const apps = projects.filter(p => !p.paper)
const papers = projects.filter(p => p.paper)

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()

function AppIconTile({ p, size = 62 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.225, background: p.icon.bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)',
    }}>
      {p.icon.glyph}
    </div>
  )
}

function GetButton({ p, onOpen, light }) {
  const style = {
    minWidth: '72px', height: '30px', borderRadius: '15px', padding: '0 14px',
    background: light ? 'rgba(255,255,255,0.3)' : '#EEF0F5', color: light ? 'white' : BLUE,
    fontSize: '15px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', cursor: 'pointer', flexShrink: 0, fontFamily: FONT,
  }
  if (p.button) {
    return <a href={p.button.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={style}>{p.button.label}</a>
  }
  return <button type="button" onClick={e => { e.stopPropagation(); onOpen(p.id) }} style={style}>VIEW</button>
}

function AppRow({ p, onOpen, rank, last }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p.id)}
      onKeyDown={e => e.key === 'Enter' && onOpen(p.id)}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '0 20px' }}
    >
      <AppIconTile p={p} />
      {rank && <div style={{ fontSize: '17px', fontWeight: 600, color: '#000', width: '18px', textAlign: 'center' }}>{rank}</div>}
      <div style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '10px',
        padding: '14px 0', borderBottom: last ? 'none' : `0.5px solid ${SEPARATOR}`,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
          <div style={{ fontSize: '13px', color: SECONDARY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.subtitle}</div>
        </div>
        <GetButton p={p} onOpen={onOpen} />
      </div>
    </div>
  )
}

function StoryCard({ label, title, p, bg, onOpen, dark = true }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(p.id)}
      style={{
        margin: '0 20px 26px', height: '420px', borderRadius: '24px', overflow: 'hidden', position: 'relative',
        background: bg, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '150px', opacity: 0.9 }}>
        <span style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))', transform: 'translateY(10px)' }}>{p.icon.glyph}</span>
      </div>
      <div style={{ position: 'absolute', top: 20, left: 20, right: 20, color: dark ? 'white' : '#000' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, opacity: 0.75, letterSpacing: '0.02em' }}>{label}</div>
        <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.12, marginTop: '4px', whiteSpace: 'pre-line' }}>{title}</div>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
        background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      }}>
        <AppIconTile p={p} size={48} />
        <div style={{ flex: 1, minWidth: 0, color: 'white' }}>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: '13px', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.subtitle}</div>
        </div>
        <GetButton p={p} onOpen={onOpen} light />
      </div>
    </motion.div>
  )
}

function ListCard({ label, title, items, onOpen }) {
  return (
    <div style={{ margin: '0 20px 26px', borderRadius: '24px', background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '20px 0 8px' }}>
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: SECONDARY, letterSpacing: '0.02em' }}>{label}</div>
        <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.12, marginTop: '4px', color: '#000' }}>{title}</div>
      </div>
      {items.map((p, i) => <AppRow key={p.id} p={p} onOpen={onOpen} last={i === items.length - 1} />)}
    </div>
  )
}

function TodayTab({ onOpen }) {
  return (
    <div>
      <LargeTitle
        subtitle={today}
        right={<img src={profilePic} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', marginBottom: '4px' }} />}
      >
        Today
      </LargeTitle>
      <StoryCard label="2ND PLACE · META HQ" title={'Land the place.\nThen land the life.'} p={byId.landing} onOpen={onOpen}
        bg="linear-gradient(165deg, #5B9BFF 0%, #0866FF 45%, #052E8F 100%)" />
      <StoryCard label="NOW ON THE APP STORE" title="Dining halls, sorted." p={byId['mean-eats']} onOpen={onOpen}
        bg="linear-gradient(165deg, #5CD18B 0%, #00853E 50%, #003D1C 100%)" />
      <ListCard label="RESEARCH COLLECTION" title="Health AI, published." items={papers} onOpen={onOpen} />
      <StoryCard label="BEHIND THE BUILD" title="Notes that learn you back." p={byId.glyph} onOpen={onOpen}
        bg="linear-gradient(165deg, #3A3A3F 0%, #1C1C1E 55%, #000 100%)" />
      <StoryCard label="GPU-ACCELERATED" title="Teaching a robot arm to grab." p={byId.sim2grasp} onOpen={onOpen}
        bg="linear-gradient(165deg, #C6F16B 0%, #76B900 50%, #2E4A00 100%)" />
      <StoryCard label="HACKTX 2026" title="Shout a move. Watch it fight." p={byId.roborumble} onOpen={onOpen}
        bg="linear-gradient(165deg, #FF9A76 0%, #E8336E 50%, #4A1173 100%)" />
    </div>
  )
}

function AppsTab({ onOpen }) {
  const featured = [byId.landing, byId.glyph, byId.sim2grasp]
  return (
    <div>
      <LargeTitle right={<img src={profilePic} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', marginBottom: '4px' }} />}>
        Apps
      </LargeTitle>

      <div className="app-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 20px 8px', scrollSnapType: 'x mandatory' }}>
        {featured.map(p => (
          <div key={p.id} onClick={() => onOpen(p.id)} style={{ flex: '0 0 88%', scrollSnapAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: BLUE, letterSpacing: '0.02em' }}>FEATURED</div>
            <div style={{ fontSize: '21px', fontWeight: 500, color: '#000' }}>{p.name}</div>
            <div style={{ fontSize: '15px', color: SECONDARY, marginBottom: '8px' }}>{p.subtitle}</div>
            <div style={{
              height: '190px', borderRadius: '16px', background: p.icon.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '90px',
            }}>
              {p.icon.glyph}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '0.5px', background: SEPARATOR, margin: '18px 20px 18px' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px 4px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000' }}>Top Projects</h2>
        <span style={{ fontSize: '17px', color: BLUE }}>See All</span>
      </div>
      {apps.map((p, i) => <AppRow key={p.id} p={p} rank={i + 1} onOpen={onOpen} last={i === apps.length - 1} />)}

      <div style={{ height: '0.5px', background: SEPARATOR, margin: '18px 20px 18px' }} />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000' }}>Research & Papers</h2>
      </div>
      {papers.map((p, i) => <AppRow key={p.id} p={p} onOpen={onOpen} last={i === papers.length - 1} />)}
    </div>
  )
}

function SearchTab({ onOpen }) {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const results = term
    ? projects.filter(p => [p.name, p.subtitle, p.category, p.stack, p.description].join(' ').toLowerCase().includes(term))
    : []
  const suggestions = ['Swift', 'PyTorch', 'Hackathon', 'IEEE', 'Robotics', 'Edge AI']
  return (
    <div>
      <LargeTitle>Search</LargeTitle>
      <SearchField value={q} onChange={setQ} placeholder="Projects, Stacks, and More" autoFocus />
      {!term && (
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>Discover</h2>
          {suggestions.map(s => (
            <button key={s} type="button" onClick={() => setQ(s)} style={{
              display: 'block', width: '100%', textAlign: 'left', fontSize: '20px', color: BLUE, padding: '10px 0',
              borderBottom: `0.5px solid ${SEPARATOR}`, cursor: 'pointer', fontFamily: FONT,
            }}>
              {s}
            </button>
          ))}
        </div>
      )}
      {term && results.map((p, i) => <AppRow key={p.id} p={p} onOpen={onOpen} last={i === results.length - 1} />)}
      {term && !results.length && (
        <p style={{ textAlign: 'center', color: SECONDARY, fontSize: '17px', padding: '40px 0' }}>No Results for “{q}”</p>
      )}
    </div>
  )
}

function ProductPage({ p, onBack, backLabel }) {
  const stats = [
    p.badge,
    { label: 'CATEGORY', value: <Icon name="apps" size={24} color={SECONDARY} />, caption: p.category },
    { label: 'DEVELOPER', value: <Icon name="person" size={24} color={SECONDARY} />, caption: 'Vaibhav G.' },
    { label: 'YEAR', value: p.year, caption: 'Released' },
    { label: 'LANGUAGE', value: 'EN', caption: 'English' },
  ]
  return (
    <motion.div key={p.id} {...push} style={{ background: 'white', minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '54px 16px 10px' }}>
        <GlassButton icon="chevronLeft" label={`Back to ${backLabel}`} onClick={onBack} color={BLUE} />
        <GlassButton icon="share" label="Share" color={BLUE} />
      </div>

      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', padding: '4px 20px 16px' }}>
        <AppIconTile p={p} size={118} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000', lineHeight: 1.15 }}>{p.name}</div>
          <div style={{ fontSize: '15px', color: SECONDARY, marginTop: '2px', lineHeight: 1.3 }}>{p.subtitle}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            {p.button ? (
              <a href={p.button.url} target="_blank" rel="noopener noreferrer" style={{
                minWidth: '74px', height: '30px', borderRadius: '15px', background: BLUE, color: 'white', fontSize: '15px', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', textDecoration: 'none',
              }}>
                {p.button.label}
              </a>
            ) : (
              <span style={{ fontSize: '13px', color: SECONDARY, fontWeight: 600 }}>Coming Soon</span>
            )}
            <Icon name="share" size={20} color={BLUE} />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="app-scroll" style={{ display: 'flex', overflowX: 'auto', borderTop: `0.5px solid ${SEPARATOR}`, borderBottom: `0.5px solid ${SEPARATOR}`, margin: '0 20px', padding: '12px 0' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            flex: '0 0 auto', minWidth: '96px', textAlign: 'center', padding: '0 10px',
            borderLeft: i ? `0.5px solid ${SEPARATOR}` : 'none',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: SECONDARY, letterSpacing: '0.02em' }}>{s.label}</div>
            <div style={{ fontSize: '21px', fontWeight: 700, color: SECONDARY, height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: SECONDARY, whiteSpace: 'nowrap' }}>{s.caption}</div>
          </div>
        ))}
      </div>

      {/* Screenshots */}
      <div className="app-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '18px 20px 8px' }}>
        {p.shots.map((s, i) => (
          <div key={i} style={{
            flex: '0 0 170px', height: '330px', borderRadius: '22px', background: p.icon.bg, color: 'white', position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 16px',
            border: '0.5px solid rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.25, textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>{s.small}</div>
            <div style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>{s.big}</div>
            <div style={{ position: 'absolute', right: '-20px', bottom: '60px', fontSize: '110px', opacity: 0.18 }}>{p.icon.glyph}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 20px 16px', color: SECONDARY, fontSize: '13px' }}>
        <Icon name="iphone" size={14} color={SECONDARY} /> {p.id === 'glyph' ? 'iPad' : 'iPhone'}
      </div>

      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: '15px', color: '#000', lineHeight: 1.45, paddingBottom: '16px', borderBottom: `0.5px solid ${SEPARATOR}` }}>{p.description}</p>

        {/* What's New */}
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000', margin: '16px 0 2px' }}>What’s New</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: SECONDARY, marginBottom: '8px' }}>
          <span>Highlights</span><span>{p.year}</span>
        </div>
        {p.whatsNew.map((w, i) => (
          <p key={i} style={{ fontSize: '15px', color: '#000', lineHeight: 1.45, marginBottom: '8px' }}>• {w}</p>
        ))}

        {/* Information */}
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000', margin: '20px 0 4px' }}>Information</h2>
        {[
          ['Provider', 'Vaibhav Gollapalli'],
          ['Category', p.category],
          ['Built With', p.stack],
          ['Released', p.year],
          ['Age Rating', '4+'],
          ['Copyright', `© ${p.year} Vaibhav Gollapalli`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '11px 0', borderBottom: `0.5px solid ${SEPARATOR}`, fontSize: '15px' }}>
            <span style={{ color: SECONDARY, flexShrink: 0 }}>{k}</span>
            <span style={{ color: '#000', textAlign: 'right' }}>{v}</span>
          </div>
        ))}
        {p.button && (
          <a href={p.button.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', fontSize: '15px', color: BLUE, textDecoration: 'none' }}>
            {p.paper ? 'View Paper PDF' : 'Developer Website'} <Icon name="link" size={18} color={BLUE} />
          </a>
        )}
      </div>
      <div style={{ height: '24px' }} />
    </motion.div>
  )
}

const TABS = [
  { id: 'today', label: 'Today', icon: 'today' },
  { id: 'apps', label: 'Apps', icon: 'apps' },
]

export default function Projects({ isOpen, onClose }) {
  const [tab, setTab] = useState('today')
  const [searching, setSearching] = useState(false)
  const [openId, setOpenId] = useState(null)

  const handleClose = () => { setOpenId(null); setSearching(false); setTab('today'); onClose() }
  const backLabel = searching ? 'Search' : tab === 'today' ? 'Today' : 'Apps'

  return (
    <AppWindow isOpen={isOpen} onClose={handleClose} title="" headerColor="#FFFFFF">
      <div style={{ fontFamily: FONT, background: 'white', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait" initial={false}>
          {openId ? (
            <ProductPage key={openId} p={byId[openId]} backLabel={backLabel} onBack={() => setOpenId(null)} />
          ) : (
            <motion.div key={searching ? 'search' : tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, paddingTop: '52px' }}>
              {searching ? <SearchTab onOpen={setOpenId} /> : tab === 'today' ? <TodayTab onOpen={setOpenId} /> : <AppsTab onOpen={setOpenId} />}
            </motion.div>
          )}
        </AnimatePresence>
        {!openId && (
          <GlassTabBar
            tabs={TABS}
            active={tab}
            onChange={id => { setTab(id); setSearching(false) }}
            searchActive={searching}
            onSearch={() => setSearching(true)}
          />
        )}
      </div>
    </AppWindow>
  )
}
