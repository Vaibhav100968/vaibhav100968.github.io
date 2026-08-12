import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const research = [
  {
    id: 1,
    title: 'Mixed Realities Lab',
    institution: 'Texas Academy of Mathematics and Science',
    advisor: 'Dr. Fred McMahan, UNT Department of Learning Technologies',
    details: [
      'Designed Python algorithm computing Schr\u00F6dinger Bridge Problems on EEG signals',
      'Led 2025 Fall study collecting EEG STROOP task data',
      'Developing EEG analysis pipeline integrating preprocessing, SBP modeling, and energy visualization',
      'Writing manuscript targeting neuroscience journals',
      'Awarded $4,500 research funding',
    ],
    tags: ['EEG', 'Machine Learning', 'Computational Neuroscience', 'Python'],
    website: 'https://ci.unt.edu/mxr/index.html',
  },
  {
    id: 2,
    title: 'Smart Electronic Systems Lab',
    institution: 'Texas Academy of Mathematics and Science',
    advisor: 'Dr. Arella Seema and Dr. Saraju Mohanty',
    details: [
      'Developed TinyML anomaly detection framework for IoMT',
      'Implemented MQTT communication and federated learning',
      'Deployed system on Arduino Nano 33 IoT and Raspberry Pi',
      'Achieved 100% inference accuracy',
    ],
    tags: ['TinyML', 'Edge AI', 'IoMT', 'Federated Learning', 'MQTT'],
    website: 'https://sarajumohanty.github.io/SESL/index.html',
  },
  {
    id: 3,
    title: 'Independent Research',
    institution: '',
    advisor: '',
    details: [
      'Built FAST-method stroke detection system on mobile devices',
      'SwiftUI app integrating CoreML, Vision, and Speech frameworks',
      'Millisecond latency on iPhone 15 Pro',
      'Accepted for publication at IEEE ICBAIE',
    ],
    tags: ['Healthcare AI', 'Computer Vision', 'Edge AI', 'SwiftUI', 'CoreML'],
    website: 'https://ieeexplore.ieee.org/document/11326575',
  },
]

export default function Research({ isOpen, onClose }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Research" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '8px 16px 12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Research</h2>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {research.map((r, i) => {
            const isExpanded = expandedId === r.id
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white', borderRadius: '20px', overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : r.id)}
                  style={{
                    width: '100%', padding: '16px', textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{r.title}</h3>
                    {r.institution && (
                      <p style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{r.institution}</p>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: '#f0ebe6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginLeft: '12px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#888">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                  </motion.div>
                </button>

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
                          {r.advisor && (
                            <p style={{ fontSize: '12px', color: '#007AFF', fontWeight: 500, marginBottom: '10px' }}>
                              Researching under {r.advisor}
                            </p>
                          )}

                          {r.details.map((d, j) => (
                            <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                              <span style={{ color: '#007AFF', fontSize: '11px', marginTop: '3px', flexShrink: 0 }}>{'\u2022'}</span>
                              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{d}</p>
                            </div>
                          ))}

                          {/* Tags */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {r.tags.map(tag => (
                                <span key={tag} style={{
                                  fontSize: '11px', fontWeight: 600, color: '#007AFF',
                                  background: '#007AFF12', padding: '4px 10px', borderRadius: '10px',
                                }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {r.website && (
                              <a
                                href={r.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: '11px', fontWeight: 700, color: 'white',
                                  background: '#007AFF', padding: '6px 14px', borderRadius: '14px',
                                  textDecoration: 'none', marginLeft: 'auto'
                                }}
                              >
                                Website
                              </a>
                            )}
                          </div>
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
