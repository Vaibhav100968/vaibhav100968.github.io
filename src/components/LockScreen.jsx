import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState(new Date())
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleUnlock = () => {
    setUnlocking(true)
    setTimeout(() => onUnlock(), 600)
  }

  return (
    <AnimatePresence>
      {!unlocking && (
        <motion.div
          className="absolute inset-0 wallpaper flex flex-col items-center justify-between cursor-pointer z-40"
          onClick={handleUnlock}
          exit={{ opacity: 0, y: -50, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Top notch area */}
          <div className="pt-16 flex flex-col items-center">
            {/* Lock icon */}
            <motion.svg
              width="16" height="20" viewBox="0 0 16 20" fill="none" className="mb-3 opacity-60"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <rect x="1" y="8" width="14" height="11" rx="3" stroke="white" strokeWidth="1.5" />
              <path d="M4.5 8V5.5a3.5 3.5 0 017 0V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>

            {/* Date */}
            <p className="text-white/70 text-sm font-medium tracking-wide">{dateStr}</p>

            {/* Clock */}
            <motion.h1
              className="text-white text-8xl font-thin tracking-tight leading-none mt-1"
              style={{ fontWeight: 200 }}
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {hours}
            </motion.h1>
          </div>

          {/* Center name */}
          <div className="flex-1 flex items-center">
            <motion.p
              className="text-white/50 text-lg font-light tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Vaibhav Gollapalli
            </motion.p>
          </div>

          {/* Bottom */}
          <div className="pb-10 flex flex-col items-center gap-6">
            <motion.p
              className="text-white/40 text-sm font-light"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click the screen to unlock
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
