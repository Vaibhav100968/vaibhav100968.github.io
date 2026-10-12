import { useState } from 'react'
import './index.css'
import PhoneFrame from './components/PhoneFrame'
import LockScreen from './components/LockScreen'
import HomeScreen from './components/HomeScreen'
import Notes from './apps/Notes'
import Contacts from './apps/Contacts'
import Projects from './apps/Projects'
import Experience from './apps/Experience'
import Research from './apps/Research'
import Awards from './apps/Awards'
import Music from './apps/Music'
import Resume from './apps/Resume'
import Blog from './apps/Blog'

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [openApp, setOpenApp] = useState(null)

  const handleUnlock = () => setIsLocked(false)
  const handleAppOpen = (appId) => setOpenApp(appId)
  const handleAppClose = () => setOpenApp(null)

  return (
    <PhoneFrame>
      {/* Home sits under the lock screen so unlock can slide up like a real iPhone */}
      <HomeScreen onAppOpen={handleAppOpen} />

      {isLocked && <LockScreen onUnlock={handleUnlock} />}

      <Notes isOpen={openApp === 'notes'} onClose={handleAppClose} />
      <Contacts isOpen={openApp === 'contacts'} onClose={handleAppClose} />
      <Projects isOpen={openApp === 'projects'} onClose={handleAppClose} />
      <Experience isOpen={openApp === 'experience'} onClose={handleAppClose} />
      <Research isOpen={openApp === 'research'} onClose={handleAppClose} />
      <Awards isOpen={openApp === 'awards'} onClose={handleAppClose} />
      <Music isOpen={openApp === 'music'} onClose={handleAppClose} />
      <Resume isOpen={openApp === 'resume'} onClose={handleAppClose} />
      <Blog isOpen={openApp === 'blog'} onClose={handleAppClose} />
    </PhoneFrame>
  )
}

export default App
