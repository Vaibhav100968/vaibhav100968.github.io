import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PHONE_W = 414
const PHONE_H = 896

export default function PhoneFrame({ children }) {
  const [scale, setScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (vw <= 430) {
        setIsMobile(true)
        setScale(1)
      } else {
        setIsMobile(false)
        const padY = 20
        const padX = 64
        const scaleH = (vh - padY) / PHONE_H
        const scaleW = (vw - padX) / PHONE_W
        setScale(Math.min(0.9, scaleH, scaleW))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (isMobile) {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        {children}
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
      {/* Left faded text - "Vaibhav's" */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none select-none hidden md:flex items-center justify-center"
        style={{ width: 'calc((100% - var(--phone-width)) / 2)' }}
      >
        <div
          className="text-center"
          style={{
            fontSize: 'clamp(40px, 6vw, 90px)',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 0 24px rgba(255, 255, 255, 0.35), 0 0 60px rgba(255, 255, 255, 0.15)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Vaibhav's
        </div>
      </div>

      {/* Right faded text - "iPhone" */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none select-none hidden md:flex items-center justify-center"
        style={{ width: 'calc((100% - var(--phone-width)) / 2)' }}
      >
        <div
          className="text-center"
          style={{
            fontSize: 'clamp(40px, 6vw, 90px)',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 0 24px rgba(255, 255, 255, 0.35), 0 0 60px rgba(255, 255, 255, 0.15)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          iPhone
        </div>
      </div>

      {/* Phone - wrapped in a container that accounts for scale */}
      <div style={{
        width: `${PHONE_W * scale}px`,
        height: `${PHONE_H * scale}px`,
        position: 'relative',
        zIndex: 10,
      }}>
        <motion.div
          className="absolute top-0 left-0 overflow-hidden bg-black"
          style={{
            width: `${PHONE_W}px`,
            height: `${PHONE_H}px`,
            borderRadius: '54px',
            boxShadow: '0 0 0 3px #1a1a1a, 0 0 0 6px #0a0a0a, 0 30px 80px rgba(0,0,0,0.5)',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          initial={{ scale: 0.9 * scale, opacity: 0 }}
          animate={{ scale: scale, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
