import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const base = import.meta.env.BASE_URL

const publications = [
  {
    title: 'StrokeSentry: A Novel Edge AI Mobile Application for Rapid Stroke Detection',
    venue: 'IEEE ICBAIE',
    note: 'Accepted for publication in IEEE Xplore.',
    buttons: [{ label: 'View Paper PDF', url: `${base}pdfs/strokesentry.pdf` }],
  },
  {
    title: 'Federated TinyML for Lightweight Anomaly Detection in IoMT Using MQTT',
    venue: 'IEEE iSES',
    note: 'Accepted for IEEE Xplore.',
    buttons: [{ label: 'View Paper PDF', url: `${base}pdfs/tinyml-iomt.pdf` }],
  },
  {
    title: 'Embedding the Windkessel Model as Trainable ODEs in Neural Networks',
    venue: 'ICBES',
    note: 'Hybrid neural ODE blood pressure prediction research.',
    buttons: [{ label: 'View Paper PDF', url: `${base}pdfs/windkessel-abstract.pdf` }],
  },
  {
    title: 'Modeling Cognitive Energy from EEG Transitions using Schr\u00F6dinger Bridge Problem',
    venue: 'IEEE SMC',
    note: 'SBP modeling applied to Stroop task EEG data.',
    buttons: [{ label: 'View Paper PDF', url: `${base}pdfs/eeg-cognitive-energy.pdf` }],
  },
  {
    title: 'Grey Wolf Optimizer',
    venue: '',
    note: 'Open-source nature-inspired optimization algorithm.',
    buttons: [{ label: 'GitHub', url: 'https://github.com/Vaibhav100968/opengreywolfoptimizer' }],
  },
]

const pendingPubs = [
  {
    title: 'Hybrid Windkessel-Neural BP Monitor',
    note: 'Achieved Grade A BHS accuracy.',
    buttons: [{ label: 'View Paper PDF', url: `${base}pdfs/windkessel-bp.pdf` }],
  },
]

const achievements = [
  {
    category: 'Research',
    items: [
      'TAMS Summer Research Scholarship \u2014 $4,000',
      'UNT Undergraduate Research Fellowship \u2014 $500',
      'IEEE iSES Paper Acceptance',
      'ICBES Paper Acceptance',
      'IEEE ICBAIE Paper Acceptance',
      'IEEE SMC Paper Acceptance',
    ],
  },
  {
    category: 'Olympiads & Competitions',
    items: [
      'International Logic Olympiad Gold Scholar',
      '1st Place \u2014 HOSA Regionals (Forensic Science)',
      '1st Place \u2014 BPA Regionals (Broadcast News Production)',
      'AP Scholar',
    ],
  },
  {
    category: 'Hackathons',
    items: [
      '2nd Place \u2014 CS Base Hack4Health',
      '3rd Place \u2014 DFW IT Association AI Talent Competition ($500)',
    ],
  },
  {
    category: 'Entrepreneurship',
    items: [
      'Ultra Venture Fellowship \u2014 Top 1 Percentile',
    ],
  },
]

function PubCard({ pub, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06 }}
      style={{
        background: 'white', borderRadius: '16px', padding: '14px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: '10px',
      }}
    >
      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4 }}>{pub.title}</h4>
      {pub.venue && <p style={{ fontSize: '11px', fontWeight: 600, color: '#007AFF', marginTop: '3px' }}>{pub.venue}</p>}
      <p style={{ fontSize: '11px', color: '#888', marginTop: '3px', lineHeight: 1.4 }}>{pub.note}</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
        {pub.buttons.map(btn => (
          <a
            key={btn.label}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px', fontWeight: 600, color: 'white',
              background: '#007AFF', padding: '5px 14px', borderRadius: '14px',
              textDecoration: 'none',
            }}
          >
            {btn.label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default function Awards({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Awards" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '8px 16px 4px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Awards</h2>
        </div>

        {/* Publications */}
        <div style={{ padding: '12px 16px 0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>Publications</h3>
          {publications.map((pub, i) => <PubCard key={i} pub={pub} idx={i} />)}
        </div>

        {/* Pending */}
        <div style={{ padding: '12px 16px 0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>Pending Publications</h3>
          {pendingPubs.map((pub, i) => <PubCard key={i} pub={pub} idx={i + publications.length} />)}
        </div>

        {/* Achievements */}
        <div style={{ padding: '12px 16px 0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>Achievements</h3>

          {achievements.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (si + publications.length + pendingPubs.length) * 0.06 }}
              style={{
                background: 'white', borderRadius: '16px', padding: '14px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: '10px',
              }}
            >
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#007AFF', marginBottom: '8px' }}>{section.category}</h4>
              {section.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#ccc', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>{'\u2022'}</span>
                  <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
