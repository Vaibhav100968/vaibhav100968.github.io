import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'
import profilePic from '../assets/profile.jpg'

const sections = [
  {
    title: 'Personal Info',
    items: [
      { emoji: '\uD83D\uDCE7', label: 'Email', value: 'vaibhavgollapalli5@gmail.com', url: 'mailto:vaibhavgollapalli5@gmail.com' },
      { emoji: '\uD83C\uDFE0', label: 'Home', value: 'Coppell, TX' },
      { emoji: '\uD83C\uDF82', label: 'Birthday', value: 'August 1, 200X' },
    ],
  },
  {
    title: 'Education',
    items: [
      { emoji: '\uD83C\uDF93', label: 'Major', value: 'Computer Science' },
      { emoji: '\uD83C\uDFEB', label: 'School', value: 'Texas Academy of Mathematics and Science' },
    ],
  },
  {
    title: 'Socials',
    items: [
      { emoji: '\uD83D\uDCBC', label: 'LinkedIn', value: '@vaibhavgollapalli', url: 'https://www.linkedin.com/in/vaibhavgollapalli' },
      { emoji: '\uD83D\uDCF8', label: 'Instagram', value: '@vaibhav.g__', url: 'https://www.instagram.com/vaibhav.g__' },
      { emoji: '\uD83D\uDCBB', label: 'GitHub', value: '@Vaibhav100968', url: 'https://github.com/Vaibhav100968' },
    ],
  },
]

export default function Contacts({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Contacts" headerColor="#FDF6F0">
      <div style={{ background: '#FDF6F0', minHeight: '100%', paddingBottom: '28px' }}>
        {/* Profile header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 16px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px',
            border: '2px solid white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <img
              src={profilePic}
              alt="Vaibhav Gollapalli"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 95%' }}
            />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>Vaibhav Gollapalli</h2>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>Student & Developer</p>
        </div>

        {/* Sections */}
        <div style={{ padding: '0 16px' }}>
          {sections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
              style={{ marginBottom: '24px' }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>
                {section.title}
              </h3>

              <div style={{
                background: 'white', borderRadius: '16px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden',
              }}>
                {section.items.map((item, i) => {
                  const Tag = item.url ? 'a' : 'div'
                  const linkProps = item.url ? {
                    href: item.url,
                    target: item.url.startsWith('http') ? '_blank' : undefined,
                    rel: 'noopener noreferrer',
                    style: { textDecoration: 'none' },
                  } : {}

                  return (
                    <Tag key={item.label} {...linkProps}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px',
                        borderBottom: i < section.items.length - 1 ? '1px solid #f0ebe6' : 'none',
                      }}>
                        <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.emoji}</span>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>{item.label}</p>
                          <p style={{ fontSize: '14px', color: item.url ? '#007AFF' : '#1a1a1a', marginTop: '1px' }}>{item.value}</p>
                        </div>
                      </div>
                    </Tag>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
