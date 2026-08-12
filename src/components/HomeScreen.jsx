import { motion } from 'framer-motion'
import StatusBar from './StatusBar'
import AppIcon from './AppIcon'
import Dock from './Dock'

const appConfigs = [
  {
    id: 'photos',
    label: 'Photos',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/photos.png`} alt="Photos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'notes',
    label: 'Notes',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/notes.png`} alt="Notes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'contacts',
    label: 'Contacts',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/contacts.png`} alt="Contacts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'projects',
    label: 'Projects',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/projects.png`} alt="Projects" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'experience',
    label: 'Experience',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/experience.png`} alt="Experience" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'research',
    label: 'Research',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/research.png`} alt="Research" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'awards',
    label: 'Awards',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/awards.png`} alt="Awards" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
  {
    id: 'resume',
    label: 'Resume',
    color: 'transparent',
    icon: <img src={`${import.meta.env.BASE_URL}icons/resume.png`} alt="Resume" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
]

export default function HomeScreen({ onAppOpen }) {
  return (
    <motion.div
      className="absolute inset-0 wallpaper flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StatusBar />

      {/* App Grid */}
      <div className="flex-1" style={{ paddingTop: '82px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '130px' }}>
        <div className="grid grid-cols-4 place-items-center" style={{ rowGap: '28px' }}>
          {appConfigs.map((app, index) => (
            <AppIcon
              key={app.id}
              icon={app.icon}
              label={app.label}
              color={app.color}
              delay={index}
              onClick={() => onAppOpen(app.id)}
            />
          ))}
        </div>
      </div>

      <Dock onAppOpen={onAppOpen} />
    </motion.div>
  )
}
