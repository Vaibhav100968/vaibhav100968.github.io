import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const experiences = [
  {
    id: 1,
    role: 'Software Engineering Intern',
    company: 'Soularis',
    type: 'Austin, TX',
    logoGradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    details: [
      'Built a pgvector search service (HNSW-indexed) with sub-second semantic queries, lifting retrieval relevance 70%+.',
      'Engineered a RAG service with schema validation, holding 100% response-schema compliance at 2.3s p95 latency.',
      'Consolidated 25 backend endpoints under one Railway schema, cutting parsing logic 20% and error rate 15%.',
    ],
  },
  {
    id: 2,
    role: 'Research Fellow',
    company: 'UNT Mixed Realities Lab',
    type: 'Denton, TX',
    logoGradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    details: [
      'Built a real-time streaming service over MQTT + WebSockets, delivering sensor data to clients at 512ms latency.',
      'Engineered a Python pipeline processing 16,904 records/run with automated ingestion, transformation, and reporting.',
      'Developed a REST API with 8+ endpoints serving datasets to visualization and model clients through one layer.',
    ],
  },
  {
    id: 3,
    role: 'AI Systems Engineering Intern',
    company: 'CORE (YC S23)',
    type: 'Remote',
    logoGradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    details: [
      'Optimized backend APIs and orchestration, raising workflow reliability 30% across distributed multi-service systems.',
      'Built a distributed Model Context Protocol (MCP) automating workflows across 4+ integrated backend services.',
      'Scaled backend infrastructure and internal debugging tools, cutting repetitive manual engineering work by 30%.',
    ],
  },
  {
    id: 4,
    role: 'Research Assistant',
    company: 'UNT Smart Electronic Systems Lab (SESL)',
    type: 'Research · 7 hrs/week',
    logoGradient: 'linear-gradient(135deg, #222, #444)',
    details: [
      'Built a TinyFL anomaly detection framework for IoMT edge devices, reaching 100% inference accuracy on test data.',
      'Deployed federated models over MQTT on Arduino Nano 33 IoT and Raspberry Pi, cutting inference latency by 40%.',
      'Cut on-device energy use 25% by compressing neural networks for 32 KB-RAM boards, published at IEEE iSES.',
    ],
  },
  {
    id: 5,
    role: 'Game Development Intern',
    company: 'Solaria Interactive',
    type: 'Internship',
    logoGradient: 'linear-gradient(135deg, #333, #555)',
    details: [
      'Mastered Lua and Roblox Studio in a 5-week 1-on-1 mentorship, shipping 10+ gameplay scripts for Kaiju Revolution.',
      'Built UI systems and integrated 30+ game assets for Kaiju Revolution, raising in-game UI responsiveness by 20%.',
      'Ran playtests and bug triage with a 6-person dev team, resolving 40+ physics and UI bugs ahead of release.',
    ],
  },
  {
    id: 6,
    role: 'Lead Tutor/Manager',
    company: 'Kumon of Coppell East',
    type: 'Part-time · 6 hrs/week',
    logoGradient: 'linear-gradient(135deg, #444, #666)',
    details: [
      'Led 3+ daily group sessions for 20+ students aged 8–16, teaching math, reading, and grammar across skill levels.',
      'Designed custom lesson plans from arithmetic to Calculus I, raising average student worksheet accuracy by 25%.',
      'Trained 5 new instructors on curriculum and teaching strategy while grading 100+ worksheets a day for accuracy.',
    ],
  },
]

export default function Experience({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Experience" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '8px 16px 16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Work Experience</h2>
        </div>

        {/* Timeline */}
        <div style={{ padding: '0 16px', position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '35px', top: '0', bottom: '0', width: '2px',
            background: '#1a1a1a',
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative' }}
            >
              {/* Timeline dot */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: exp.logoGradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }} />

              {/* Card */}
              <div style={{
                background: 'white', borderRadius: '16px', padding: '16px',
                flex: 1, boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{exp.role}</h3>
                </div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>{exp.company}</p>
                <span style={{
                  display: 'inline-block', fontSize: '11px', fontWeight: 600, color: '#007AFF',
                  background: '#007AFF15', padding: '3px 10px', borderRadius: '10px', marginTop: '6px',
                }}>
                  {exp.type}
                </span>

                <div style={{ marginTop: '12px' }}>
                  {exp.details.map((detail, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#007AFF', fontSize: '11px', marginTop: '3px', flexShrink: 0 }}>{'\u2022'}</span>
                      <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
