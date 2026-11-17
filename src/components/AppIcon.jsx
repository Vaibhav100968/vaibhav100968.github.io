import { motion } from 'framer-motion'

export default function AppIcon({ icon, label, color, onClick, delay = 0 }) {
  return (
    <motion.button
      className="flex flex-col items-center gap-[6px]"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
    >
      <div
        className="w-[68px] h-[68px] rounded-[16px] overflow-hidden flex items-center justify-center text-2xl"
        style={{
          background: color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        }}
      >
        {icon}
      </div>
      <span className="text-white text-[11px] font-medium leading-tight text-center" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.35)' }}>
        {label}
      </span>
    </motion.button>
  )
}
