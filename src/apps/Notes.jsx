import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const notes = [
  {
    id: 1,
    title: 'About Me',
    content: "I am a student researcher at the Texas Academy of Mathematics and Science collaborating with research labs at the University of North Texas. My work focuses on machine learning systems, edge AI, and computational modeling of physiological signals, with applications in healthcare and real-world sensing systems.\n\nI am particularly interested in building intelligent systems that operate at the intersection of artificial intelligence, hardware, and applied mathematics. My projects range from deploying TinyML models on embedded devices to developing machine learning pipelines for biomedical data and computer vision.\n\nBeyond research, I enjoy exploring software engineering, quantitative systems, and product development. I am driven by curiosity and enjoy working on interdisciplinary problems that combine technology, science, and real-world impact.",
    pinned: true,
    date: 'March 9, 2026',
  },
  {
    id: 2,
    title: 'Career Goals',
    content: "My long term goal is to explore the intersection of technology, mathematics, and real world systems. I want to work across multiple domains including software engineering, quantitative research, product development, finance, and startups to understand how complex systems are built and scaled.\n\nI am particularly interested in exploring careers in software engineering, quantitative finance, investment banking, and the business side of technology. I enjoy both the technical process of building systems and the strategic side of turning ideas into impactful products or companies.\n\nAs I continue developing my skills in artificial intelligence, machine learning, and computational systems, I also want to explore areas such as electrical engineering and hardware systems. Understanding how software, hardware, and business strategy interact will allow me to build technologies that have meaningful real world impact.",
    pinned: true,
    date: 'March 9, 2026',
  },
  {
    id: 3,
    title: 'Interests',
    content: "I enjoy exploring different cultures, sports, and music. I especially enjoy Indian and Thai cuisine, and I love trying new dishes and flavors from both cultures. Food is one of my favorite ways to experience different traditions and communities.\n\nI am also a big fan of basketball, whether it is playing with friends or watching games. The strategy, teamwork, and fast pace of the sport make it something I always enjoy.\n\nMusic is another major interest of mine. I listen to a wide range of hip hop and international music, and some of my favorite artists include J. Cole, Lil Baby, Drake, Sai Abhyankar, and Gunna. Music is something I enjoy while working, coding, traveling, or relaxing, and it plays a big role in my daily routine.",
    pinned: false,
    date: 'March 9, 2026',
  },
  {
    id: 4,
    title: 'Personal Philosophy',
    content: "My personal philosophy comes from Love Yourz by J. Cole. The idea is simple: stop comparing your life to others and appreciate your own journey. I try to focus on loving what I do and giving one hundred percent effort into everything I pursue.",
    pinned: false,
    date: 'March 9, 2026',
  },
]

const ACCENT = '#E0A800'
const BG = '#F2F2F7'
const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

function FolderIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 24 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 4a2 2 0 0 1 2-2h5l2 2.5h9a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" stroke="#8E8E93" strokeWidth="1.8" />
    </svg>
  )
}

function CircleButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </button>
  )
}

function NoteCard({ note, idx, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      whileTap={{ scale: 0.96 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', minWidth: 0 }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%', aspectRatio: '1.3', background: 'white', borderRadius: '10px',
        border: '0.5px solid rgba(0,0,0,0.1)', boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        padding: '8px 8px 0', overflow: 'hidden', textAlign: 'left',
      }}>
        <div style={{ fontSize: '8px', fontWeight: 700, color: '#1c1c1e', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {note.title}
        </div>
        <div style={{
          fontSize: '6px', lineHeight: 1.45, color: '#3a3a3c',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical',
        }}>
          {note.content}
        </div>
      </div>

      {/* Caption */}
      <div style={{ marginTop: '6px', fontSize: '13px', fontWeight: 500, color: '#1c1c1e', lineHeight: 1.2, width: '100%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {note.title}
      </div>
      <div style={{ fontSize: '11px', color: '#8E8E93', marginTop: '2px' }}>{note.date}</div>
      <div style={{ fontSize: '11px', color: '#8E8E93', marginTop: '1px', display: 'flex', alignItems: 'center', gap: '3px' }}>
        <FolderIcon /> Notes
      </div>
    </motion.button>
  )
}

function Section({ title, items, offset, onSelect }) {
  if (!items.length) return null
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#1c1c1e', marginBottom: '10px' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '12px', rowGap: '16px' }}>
        {items.map((note, i) => (
          <NoteCard key={note.id} note={note} idx={i + offset} onClick={() => onSelect(note)} />
        ))}
      </div>
    </div>
  )
}

function ToolbarIcon({ children }) {
  return <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
}

export default function Notes({ isOpen, onClose }) {
  const [selectedNote, setSelectedNote] = useState(null)
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const visible = q
    ? notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    : notes
  const pinned = visible.filter(n => n.pinned)
  const others = visible.filter(n => !n.pinned)

  const handleClose = () => {
    setSelectedNote(null)
    setQuery('')
    onClose()
  }

  return (
    <AppWindow isOpen={isOpen} onClose={handleClose} title="" headerColor={selectedNote ? '#FFFFFF' : BG}>
      <div style={{ fontFamily: FONT, background: selectedNote ? '#FFFFFF' : BG, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {!selectedNote ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ padding: '22px 16px 0', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Top buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <CircleButton label="Back" onClick={handleClose}>
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M8.5 1.5L2 8l6.5 6.5" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </CircleButton>
                <CircleButton label="More">
                  <svg width="18" height="4" viewBox="0 0 18 4" fill="#1c1c1e">
                    <circle cx="2" cy="2" r="2" /><circle cx="9" cy="2" r="2" /><circle cx="16" cy="2" r="2" />
                  </svg>
                </CircleButton>
              </div>

              {/* Large title */}
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1c1c1e', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Notes</h1>
              <p style={{ fontSize: '14px', color: '#8E8E93', marginBottom: '18px' }}>{notes.length} Notes</p>

              <Section title="Pinned" items={pinned} offset={0} onSelect={setSelectedNote} />
              <Section title="All Notes" items={others} offset={pinned.length} onSelect={setSelectedNote} />
              {!visible.length && (
                <p style={{ textAlign: 'center', color: '#8E8E93', fontSize: '14px', padding: '32px 0' }}>No Results</p>
              )}

              <div style={{ flex: 1 }} />

              {/* Floating search + compose */}
              <div style={{ position: 'sticky', bottom: '8px', display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '12px' }}>
                <label style={{
                  flex: 1, height: '44px', borderRadius: '22px', background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="10.5" cy="10.5" r="7" stroke="#8E8E93" strokeWidth="2.4" />
                    <path d="M16 16l5 5" stroke="#8E8E93" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search"
                    style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: '16px', color: '#1c1c1e', fontFamily: FONT }}
                  />
                  <svg width="12" height="17" viewBox="0 0 12 18" fill="none">
                    <rect x="3" y="1" width="6" height="10" rx="3" stroke="#8E8E93" strokeWidth="1.8" />
                    <path d="M1 8.5a5 5 0 0 0 10 0M6 13.5V17" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </label>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="#1c1c1e" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Nav bar */}
              <div style={{
                position: 'sticky', top: 0, zIndex: 2, background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 22px 12px 16px',
              }}>
                <button
                  type="button"
                  onClick={() => setSelectedNote(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ACCENT, fontSize: '17px', cursor: 'pointer' }}
                >
                  <svg width="11" height="18" viewBox="0 0 10 16" fill="none">
                    <path d="M8.5 1.5L2 8l6.5 6.5" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Notes
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <svg width="20" height="22" viewBox="0 0 24 26" fill="none">
                    <path d="M12 16V2M7 7l5-5 5 5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 11H5v13h14V11h-3" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke={ACCENT} strokeWidth="1.8" />
                    <circle cx="7.5" cy="12" r="1.4" fill={ACCENT} /><circle cx="12" cy="12" r="1.4" fill={ACCENT} /><circle cx="16.5" cy="12" r="1.4" fill={ACCENT} />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setSelectedNote(null)}
                    style={{ color: ACCENT, fontSize: '17px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Note body */}
              <div style={{ padding: '4px 20px 24px', flex: 1 }}>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#8E8E93', marginBottom: '14px' }}>{selectedNote.date}</p>
                <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1c1c1e', lineHeight: 1.2, marginBottom: '12px' }}>{selectedNote.title}</h1>
                <p style={{ fontSize: '16px', color: '#1c1c1e', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{selectedNote.content}</p>
              </div>

              {/* Formatting toolbar */}
              <div style={{
                position: 'sticky', bottom: 0, background: '#F6F6F8', borderTop: '0.5px solid rgba(0,0,0,0.1)',
                display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 12px',
              }}>
                <ToolbarIcon><span style={{ fontSize: '18px', color: '#1c1c1e' }}>Aa</span></ToolbarIcon>
                <ToolbarIcon>
                  <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
                    <circle cx="4" cy="5" r="3" fill="#1c1c1e" /><path d="M2.7 5l1 1 1.8-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="4" cy="16" r="3" stroke="#1c1c1e" strokeWidth="1.4" />
                    <path d="M10 5h12M10 16h12" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </ToolbarIcon>
                <ToolbarIcon>
                  <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
                    <rect x="1" y="1" width="22" height="18" rx="2.5" stroke="#1c1c1e" strokeWidth="1.8" />
                    <path d="M1 7.5h22M1 13h22M9 1v18M16 1v18" stroke="#1c1c1e" strokeWidth="1.5" />
                  </svg>
                </ToolbarIcon>
                <ToolbarIcon>
                  <svg width="24" height="20" viewBox="0 0 26 22" fill="none">
                    <path d="M2 7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" stroke="#1c1c1e" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="13" cy="12" r="4" stroke="#1c1c1e" strokeWidth="1.8" />
                  </svg>
                </ToolbarIcon>
                <ToolbarIcon>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1c1c1e" strokeWidth="1.8" />
                    <path d="M9 17l3-10 3 10M10 14h4" stroke="#1c1c1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ToolbarIcon>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppWindow>
  )
}
