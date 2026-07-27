import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const base = import.meta.env.BASE_URL

const projects = [
  {
    id: 1,
    name: 'StrokeSentry',
    tagline: 'A lightweight, private, real-time mobile app for early stroke detection using the FAST method.',
    details: [
      'Facial landmark analysis, arm pose estimation, and speech clarity assessment using Apple CoreML, Vision, and Speech frameworks',
      'Millisecond-level on-device inference on iPhone 15 Pro \u2014 no internet required',
      'Published at IEEE ICBAIE 2025',
    ],
    button: { label: 'View Paper PDF', url: `${base}pdfs/strokesentry.pdf` },
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    emoji: '\uD83D\uDE80',
  },
  {
    id: 2,
    name: 'EEG Cognitive Energy Modeling',
    tagline: 'Quantifying neural metabolic cost from EEG transitions using the Schr\u00F6dinger Bridge Problem and generative adversarial networks.',
    details: [
      'Applied SBP to Stroop task EEG data to establish cognitive load energy baselines',
      'Validated WCGAN-generated synthetic EEG for neuroscience and clinical applications',
      'Near real-time SBP estimation on consumer-grade EEG hardware',
    ],
    button: { label: 'View Paper PDF', url: `${base}pdfs/eeg-cognitive-energy.pdf` },
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    emoji: '\uD83E\uDDE0',
  },
  {
    id: 3,
    name: 'Hybrid Windkessel-Neural BP Monitor',
    tagline: 'Improved hybrid neural ODE model for noninvasive blood pressure estimation.',
    details: [
      'MAE of 2.45 mmHg (SBP) and 2.1 mmHg (DBP) \u2014 Grade A under British Hypertension Society protocol',
      'Continuation of the Windkessel-ODE framework; submitted to IEEE CAIT 2025',
    ],
    button: { label: 'View Paper PDF', url: `${base}pdfs/windkessel-bp.pdf` },
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    emoji: '\uD83D\uDCF1',
  },
  {
    id: 4,
    name: 'TinyML IoMT Detection System',
    tagline: 'Federated anomaly detection system for Internet of Medical Things devices.',
    details: [
      'TensorFlow Lite model achieving 100% accuracy and F1-score of 0.98',
      'Deployed on Arduino Nano 33 IoT and Raspberry Pi using Flower federated learning framework',
      'MQTT-based communication enabling real-time physiological signal monitoring',
    ],
    button: { label: 'View Paper PDF', url: `${base}pdfs/tinyml-iomt.pdf` },
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    emoji: '\uD83C\uDF10',
  },
  {
    id: 5,
    name: 'Finance and Investments Club Platform',
    tagline: 'Digital infrastructure for a 6,000-member, 122-chapter nonprofit spreading financial literacy.',
    details: [
      'Managed development and maintenance of the official website, blog site, and event registration system',
      'Helped manage partnerships and a $47K library fundraiser in rural India',
      'Oversaw 100+ participants, managed venue, meals, registration, and logistics for events',
    ],
    button: { label: 'Website', url: 'https://www.clubfai.org/' },
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    emoji: '\uD83D\uDCB0',
  },
]

export default function Projects({ isOpen, onClose }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Projects" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '80px' }}>
        <div style={{ padding: '8px 16px 12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Vaibhav's Projects</h2>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {projects.map((project, i) => {
            const isExpanded = expandedId === project.id

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'white', borderRadius: '20px', overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                {/* Banner */}
                <div style={{
                  background: project.gradient, padding: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: '70px',
                }}>
                  <span style={{ fontSize: '32px' }}>{project.emoji}</span>
                </div>

                {/* Title row */}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{project.name}</h3>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '2px', lineHeight: 1.4 }}>{project.tagline}</p>
                  </div>
                  <motion.button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginLeft: '12px',
                    }}
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                  </motion.button>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 16px 16px' }}>
                        <div style={{ borderTop: '1px solid #f0ebe6', paddingTop: '12px' }}>
                          {project.details.map((detail, j) => (
                            <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                              <span style={{ color: '#007AFF', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>•</span>
                              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{detail}</p>
                            </div>
                          ))}
                          <a
                            href={project.button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block', marginTop: '8px',
                              background: '#007AFF', color: 'white', fontSize: '13px', fontWeight: 600,
                              padding: '8px 20px', borderRadius: '20px', textDecoration: 'none',
                            }}
                          >
                            {project.button.label}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </AppWindow>
  )
}
