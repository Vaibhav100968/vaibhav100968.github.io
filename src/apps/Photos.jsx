import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'

const base = import.meta.env.BASE_URL

const photos = [
  { id: 1, src: `${base}photos/DSC08982.JPG` },
  { id: 2, src: `${base}photos/IMG_3181.jpg` },
  { id: 3, src: `${base}photos/IMG_3563.jpg` },
  { id: 4, src: `${base}photos/IMG_4302.JPG` },
  { id: 5, src: `${base}photos/IMG_4428.JPG` },
  { id: 6, src: `${base}photos/IMG_5491.jpg` },
  { id: 7, src: `${base}photos/IMG_6697.jpg` },
  { id: 8, src: `${base}photos/IMG_8179.JPEG` },
  { id: 9, src: `${base}photos/Image_1-26-26.JPG` },
  { id: 10, src: `${base}photos/b4daa425-ad74-455c-b623-4fcd10805bc3.JPG` },
]

export default function Photos({ isOpen, onClose }) {
  const [selectedIdx, setSelectedIdx] = useState(null)

  const goNext = (e) => {
    e.stopPropagation()
    setSelectedIdx((prev) => (prev + 1) % photos.length)
  }
  const goPrev = (e) => {
    e.stopPropagation()
    setSelectedIdx((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Photos" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '8px 16px 12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Library</h2>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>{photos.length} Photos</p>
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', padding: '0 2px' }}>
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              style={{
                aspectRatio: '1',
                borderRadius: '4px',
                cursor: 'pointer',
                overflow: 'hidden',
                background: '#e8e0d8',
              }}
              onClick={() => setSelectedIdx(idx)}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={photo.src}
                alt={`Photo ${photo.id}`}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full screen image viewer */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.95)',
              zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close button */}
            <button
              style={{
                position: 'absolute', top: '50px', right: '16px', color: 'white',
                fontSize: '16px', fontWeight: 600, zIndex: 70,
              }}
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(null) }}
            >
              Done
            </button>

            {/* Left arrow */}
            <button
              onClick={goPrev}
              style={{
                position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 70,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '90%', maxHeight: '75%', borderRadius: '12px',
                overflow: 'hidden', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <img
                src={photos[selectedIdx].src}
                alt={`Photo ${selectedIdx + 1}`}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain', display: 'block',
                }}
              />
            </motion.div>

            {/* Right arrow */}
            <button
              onClick={goNext}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 70,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>

            {/* Photo counter */}
            <div style={{
              position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.6)', fontSize: '13px',
            }}>
              {selectedIdx + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppWindow>
  )
}
