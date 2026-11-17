import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState(new Date())
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const finishUnlock = () => {
    if (unlocking) return
    setUnlocking(true)
    setTimeout(() => onUnlock(), 580)
  }

  return (
    <motion.div
      className="absolute inset-0 wallpaper flex flex-col items-center justify-between cursor-pointer z-40"
      style={{ touchAction: 'none' }}
      onClick={finishUnlock}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.65, bottom: 0.05 }}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (info.offset.y < -70 || info.velocity.y < -450) {
          finishUnlock()
        }
      }}
      animate={unlocking ? { y: '-110%' } : { y: 0 }}
      transition={
        unlocking
          ? { duration: 0.55, ease: [0.32, 0.72, 0, 1] }
          : { type: 'spring', stiffness: 420, damping: 38 }
      }
    >
      {/* Date and clock sit below the black Dynamic Island */}
      <div className="flex flex-col items-center" style={{ paddingTop: '92px' }}>
        <p
          className="text-white/80 text-sm font-medium tracking-wide"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
        >
          {dateStr}
        </p>

        <motion.h1
          className="text-white text-8xl font-thin tracking-tight leading-none mt-1"
          style={{ fontWeight: 200, textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {hours}
        </motion.h1>
      </div>

      <div className="flex-1" />

      {/* Bottom — swipe-up cue */}
      <div className="pb-10 flex flex-col items-center gap-4">
        <motion.p
          className="text-white/40 text-sm font-light"
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Swipe up to unlock
        </motion.p>
        <motion.div
          animate={{ y: [0, -8, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <div className="w-[140px] h-[5px] bg-white/35 rounded-full" />
      </div>
    </motion.div>
  )
}
