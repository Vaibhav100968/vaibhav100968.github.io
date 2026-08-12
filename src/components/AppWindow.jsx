import { motion, AnimatePresence } from 'framer-motion'

function isLightColor(color) {
  if (!color) return false
  if (color.startsWith('#FFF') || color.startsWith('#FDF') || color.startsWith('#fff') || color.startsWith('#fdf')) return true
  return false
}

export default function AppWindow({ isOpen, onClose, title, children, headerColor = 'rgba(0,0,0,0.85)' }) {
  const light = isLightColor(headerColor)
  const textColor = light ? '#1a1a1a' : 'white'
  const footerBg = light ? headerColor : headerColor
  const buttonRing = light ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.45)'
  const buttonFill = light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'
  const buttonInner = light ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.2)'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col"
          initial={{ scale: 0.5, opacity: 0, borderRadius: '40px' }}
          animate={{ scale: 1, opacity: 1, borderRadius: '0px' }}
          exit={{ scale: 0.5, opacity: 0, borderRadius: '40px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ overflow: 'hidden' }}
        >
          {/* App header */}
          <div
            className="flex items-center justify-center px-5 pt-14 pb-3 shrink-0 relative"
            style={{ background: headerColor }}
          >
            <span style={{ color: textColor, fontWeight: 600, fontSize: '16px' }}>
              {title}
            </span>
          </div>

          {/* App content */}
          <div
            className="flex-1 overflow-y-auto app-scroll"
            style={{ background: headerColor }}
          >
            {children}
          </div>

          {/* Classic home button — closes app */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              height: '64px',
              background: footerBg,
              paddingBottom: '8px',
            }}
          >
            <motion.button
              type="button"
              aria-label="Home"
              onClick={onClose}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: buttonFill,
                border: `2.5px solid ${buttonRing}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: light
                  ? 'inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.12)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 4px rgba(0,0,0,0.35)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  border: `2px solid ${buttonInner}`,
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
