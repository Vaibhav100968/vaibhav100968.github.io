import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const experiences = [
  {
    id: 1,
    role: 'Research Fellow',
    company: 'UNT Mixed Realities (MXR) Lab',
    type: 'Research · 12 hrs/week',
    logoGradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    details: [
      'Researching under the supervision of Dr. Fred McMahan in the UNT Department of Learning Technologies.',
      'Designed and implemented a Python-based algorithm to compute authentic Schr\u00F6dinger Bridge Problems (SBP) on electroencephalography (EEG) signals to quantify energy cost across different tasks.',
      'Helped lead the 2025 Fall study collecting EEG data from live participants performing a series of STROOP tasks.',
      'Leading a project currently developing a full EEG analysis pipeline integrating preprocessing, SBP modeling, and visualization of energy profiles across different tasks, with the future goal of implementing real-time energy cost calculations in an Adaptive Virtual Environment.',
      'Authoring a manuscript with plans of submitting to neuroscience journals.',
      'Awarded a total of $4500 through the UNT Undergraduate Research Fellowship (URF) and the TAMS Summer Research Scholarship to support continued research efforts.',
    ],
  },
  {
    id: 2,
    role: 'Software Engineering Intern',
    company: 'CORE (YC S23)',
    type: 'Internship',
    logoGradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    details: [
      'Assisted in developing the Model Context Protocol (MCP) to reinforce AI-driven task automation across platforms including Slack, Gmail, GitHub, and Google Calendar.',
      "Contributed to designing and building SOL\u2019s Claude Code\u2013powered AI assistant.",
      'Automated debugging support and documentation generation.',
      'Assisted building internal APIs and backend integrations for smart task generation.',
      'Interned during period when company secured $500,000 grant.',
    ],
  },
  {
    id: 3,
    role: 'Research Assistant',
    company: 'UNT Smart Electronic Systems Lab (SESL)',
    type: 'Research · 7 hrs/week',
    logoGradient: 'linear-gradient(135deg, #222, #444)',
    details: [
      'Researching under the supervision of Dr. Arella Seema and Dr. Saraju Mohanty in the UNT Department of Computer Science and Engineering.',
      'Developed and implemented a lightweight anomaly detection framework for Internet of Medical Things (IoMT) systems using TinyFL models on resource-constrained edge devices.',
      'Enabled MQTT-based communication and federated learning (TinyFL) with the integration of neural networks to support real-time, private analysis of physiological data in hospital environments.',
      'Designed and deployed the system on Arduino Nano 33 IoT and Raspberry Pi, achieving up to 100% inference accuracy with reduced energy consumption and latency.',
      'Authored a paper illustrating the framework\u2019s design, implementation, and evaluation. Accepted for publication and conference presentation at the IEEE \u2013 International Symposium on Smart Electronic Systems (IEEE \u2013 iSES) conference.',
    ],
  },
  {
    id: 4,
    role: 'Game Development Intern',
    company: 'Solaria Interactive',
    type: 'Internship',
    logoGradient: 'linear-gradient(135deg, #333, #555)',
    details: [
      'Completed 1-on-1 Lua programming mentorship for first 5 weeks.',
      'Learned game mechanics, UI, and physics in Roblox Studio.',
      'Contributed to development of Kaiju Revolution.',
      'Worked on asset integration, UI systems, and testing.',
      'Collaborated with development team.',
    ],
  },
  {
    id: 5,
    role: 'Lead Tutor/Manager',
    company: 'Kumon of Coppell East',
    type: 'Part-time · 6 hrs/week',
    logoGradient: 'linear-gradient(135deg, #444, #666)',
    details: [
      'Managed multiple group sessions daily for students aged 8\u201316, presenting clear and concise instruction in mathematics, English reading comprehension, and grammar across multiple skill levels.',
      'Tutored math topics varying from elementary level concepts to Precalculus and Calculus I, assisting students in building subject mastery.',
      'Designed individualized lesson plans based solely on student progress and trained new instructors in curriculum and efficient teaching strategies.',
      'Supervised inventory management, examined and evaluated student work for accuracy, and maintained an organized learning environment.',
    ],
  },
]

export default function Experience({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Experience" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '80px' }}>
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
