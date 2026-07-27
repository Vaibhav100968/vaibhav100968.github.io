import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const notes = [
  {
    id: 1,
    title: 'About Me',
    content: "I am a student researcher at the Texas Academy of Mathematics and Science collaborating with research labs at the University of North Texas. My work focuses on machine learning systems, edge AI, and computational modeling of physiological signals, with applications in healthcare and real-world sensing systems.\n\nI am particularly interested in building intelligent systems that operate at the intersection of artificial intelligence, hardware, and applied mathematics. My projects range from deploying TinyML models on embedded devices to developing machine learning pipelines for biomedical data and computer vision.\n\nBeyond research, I enjoy exploring software engineering, quantitative systems, and product development. I am driven by curiosity and enjoy working on interdisciplinary problems that combine technology, science, and real-world impact.",
    pinned: true
  },
  {
    id: 2,
    title: 'Career Goals',
    content: "My long term goal is to explore the intersection of technology, mathematics, and real world systems. I want to work across multiple domains including software engineering, quantitative research, product development, finance, and startups to understand how complex systems are built and scaled.\n\nI am particularly interested in exploring careers in software engineering, quantitative finance, investment banking, and the business side of technology. I enjoy both the technical process of building systems and the strategic side of turning ideas into impactful products or companies.\n\nAs I continue developing my skills in artificial intelligence, machine learning, and computational systems, I also want to explore areas such as electrical engineering and hardware systems. Understanding how software, hardware, and business strategy interact will allow me to build technologies that have meaningful real world impact.",
    pinned: true
  },
  {
    id: 3,
    title: 'Interests',
    content: "I enjoy exploring different cultures, sports, and music. I especially enjoy Indian and Thai cuisine, and I love trying new dishes and flavors from both cultures. Food is one of my favorite ways to experience different traditions and communities.\n\nI am also a big fan of basketball, whether it is playing with friends or watching games. The strategy, teamwork, and fast pace of the sport make it something I always enjoy.\n\nMusic is another major interest of mine. I listen to a wide range of hip hop and international music, and some of my favorite artists include J. Cole, Lil Baby, Drake, Sai Abhyankar, and Gunna. Music is something I enjoy while working, coding, traveling, or relaxing, and it plays a big role in my daily routine.",
    pinned: false
  },
  {
    id: 4,
    title: 'Personal Philosophy',
    content: "My personal philosophy comes from Love Yourz by J. Cole. The idea is simple: stop comparing your life to others and appreciate your own journey. I try to focus on loving what I do and giving one hundred percent effort into everything I pursue.",
    pinned: false
  },
]

function PostItNote({ note, onClick, idx }) {
  const rotations = [-2, 1.5, -1, 2.5]
  const colors = ['#FFF9C4', '#FFECB3', '#FFE0B2', '#FFF8E1']

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
      whileHover={{ scale: 1.03, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: colors[idx % colors.length],
        borderRadius: '4px',
        padding: '18px 14px 14px',
        boxShadow: '2px 3px 12px rgba(0,0,0,0.12)',
        transform: `rotate(${rotations[idx % rotations.length]}deg)`,
        width: '100%',
        textAlign: 'left',
        position: 'relative',
        minHeight: '110px',
      }}
    >
      {/* Tape effect */}
      <div style={{
        position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
        width: '36px', height: '12px', background: 'rgba(255,255,255,0.55)', borderRadius: '2px',
      }} />
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>{note.title}</h3>
      <p style={{
        fontSize: '11px', color: '#666', lineHeight: 1.5,
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
      }}>
        {note.content}
      </p>
      {/* Lined paper effect */}
      {[0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', left: '14px', right: '14px',
          bottom: `${14 + i * 16}px`, height: '1px', background: 'rgba(0,0,0,0.06)',
        }} />
      ))}
    </motion.button>
  )
}

export default function Notes({ isOpen, onClose }) {
  const [selectedNote, setSelectedNote] = useState(null)

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Notes" headerColor="#FFF3E8">
      <div style={{ background: '#FFF3E8', minHeight: '100%', paddingBottom: '80px' }}>
        <AnimatePresence mode="wait">
          {!selectedNote ? (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ padding: '8px 16px' }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                Pinned
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {notes.filter(n => n.pinned).map((note, i) => (
                  <PostItNote key={note.id} note={note} idx={i} onClick={() => setSelectedNote(note)} />
                ))}
              </div>

              <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                All Notes
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {notes.filter(n => !n.pinned).map((note, i) => (
                  <PostItNote key={note.id} note={note} idx={i + 2} onClick={() => setSelectedNote(note)} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ padding: '8px 20px', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                background: '#FFF9C4', borderRadius: '6px', padding: '24px 20px',
                boxShadow: '3px 4px 16px rgba(0,0,0,0.15)', transform: 'rotate(-1deg)',
                width: '100%', maxWidth: '320px', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
                  width: '60px', height: '16px', background: 'rgba(255,255,255,0.55)', borderRadius: '2px',
                }} />

                <button
                  onClick={() => setSelectedNote(null)}
                  style={{ fontSize: '13px', color: '#D4770B', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <svg width="8" height="14" viewBox="0 0 10 16" fill="none">
                    <path d="M9 1L2 8L9 15" stroke="#D4770B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  All Notes
                </button>

                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#333', marginBottom: '16px' }}>{selectedNote.title}</h1>

                <div style={{ position: 'relative' }}>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 2, whiteSpace: 'pre-wrap' }}>{selectedNote.content}</p>
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                      position: 'absolute', left: 0, right: 0, top: `${28 * (i + 1)}px`,
                      height: '1px', background: 'rgba(0,0,0,0.06)',
                    }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppWindow>
  )
}
