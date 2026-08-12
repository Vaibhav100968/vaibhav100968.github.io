import { motion } from 'framer-motion'

const dockApps = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vaibhavgollapalli',
    icon: <img src={`${import.meta.env.BASE_URL}icons/linkedin.png`} alt="LinkedIn" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/vaibhav.g__',
    icon: <img src={`${import.meta.env.BASE_URL}icons/instagram.png`} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/vaibhav100968',
    icon: <img src={`${import.meta.env.BASE_URL}icons/github.png`} alt="GitHub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'music-2',
    label: 'Music',
    icon: <img src={`${import.meta.env.BASE_URL}icons/music.png`} alt="Music" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
]

export default function Dock({ onAppOpen }) {
  return (
    <motion.div
      className="absolute bottom-6 left-5 right-5 dock-blur rounded-[28px] px-5 py-3.5 flex justify-around items-center z-30"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
    >
      {dockApps.map((app, index) => {
        const isInternalApp = app.id === 'music' || app.id === 'music-2'
        const Tag = isInternalApp ? motion.button : motion.a
        const props = isInternalApp
          ? { onClick: () => onAppOpen('music') }
          : { href: app.url, target: "_blank", rel: "noopener noreferrer" }

        return (
          <Tag
            key={`${app.id}-${index}`}
            {...props}
            className="flex flex-col items-center gap-1 focus:outline-none"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
          >
            <div
              className="w-[60px] h-[60px] rounded-[15px] overflow-hidden flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              {app.icon}
            </div>
            <span className="text-white text-[10px] font-medium drop-shadow-sm">{app.label}</span>
          </Tag>
        )
      })}
    </motion.div>
  )
}
