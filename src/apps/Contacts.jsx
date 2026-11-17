import AppWindow from '../components/AppWindow'
import { FONT, BLUE, GROUPED_BG, SECONDARY, Group, Icon } from '../components/ios'
import posterPic from '../assets/wallpaper.jpg'

const contact = {
  first: 'Vaibhav',
  last: 'Gollapalli',
  title: 'Student & Developer',
  org: 'Texas A&M University',
  email: 'vaibhavgollapalli5@gmail.com',
  website: 'https://vaibhav100968.github.io',
}

const actions = [
  { label: 'mail', icon: 'mail', href: `mailto:${contact.email}` },
  { label: 'LinkedIn', icon: 'briefcase', href: 'https://www.linkedin.com/in/vaibhavgollapalli' },
  { label: 'GitHub', icon: 'code', href: 'https://github.com/Vaibhav100968' },
  { label: 'X', icon: 'message', href: 'https://x.com/Vaibhav_g08' },
]

const fields = [
  [{ label: 'email', value: contact.email, href: `mailto:${contact.email}` }],
  [{ label: 'home', value: 'Coppell, TX' }],
  [{ label: 'birthday', value: 'August 1, 2008' }],
  [
    { label: 'school', value: 'Texas A&M University' },
    { label: 'major', value: 'Computer Science' },
  ],
  [
    { label: 'homepage', value: 'vaibhav100968.github.io', href: contact.website },
    { label: 'LinkedIn', value: 'linkedin.com/in/vaibhavgollapalli', href: 'https://www.linkedin.com/in/vaibhavgollapalli' },
    { label: 'GitHub', value: 'github.com/Vaibhav100968', href: 'https://github.com/Vaibhav100968' },
    { label: 'X', value: '@Vaibhav_g08', href: 'https://x.com/Vaibhav_g08' },
  ],
]

function shareContact() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${contact.last};${contact.first};;;`,
    `FN:${contact.first} ${contact.last}`,
    `ORG:${contact.org}`,
    `TITLE:${contact.title}`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    `URL:${contact.website}`,
    'BDAY:2008-08-01',
    'END:VCARD',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'Vaibhav Gollapalli.vcf'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function Field({ label, value, href, last }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
      style={{ display: 'block', padding: '0 0 0 16px', textDecoration: 'none' }}
    >
      <div style={{ padding: '10px 16px 10px 0', borderBottom: last ? 'none' : '0.5px solid rgba(60,60,67,0.18)' }}>
        <div style={{ fontSize: '14px', color: '#000', marginBottom: '1px' }}>{label}</div>
        <div style={{ fontSize: '17px', color: href ? BLUE : '#000', wordBreak: 'break-word' }}>{value}</div>
      </div>
    </Tag>
  )
}

export default function Contacts({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="" headerColor="#FFFFFF" hideHeader>
      <div style={{ fontFamily: FONT, background: GROUPED_BG, minHeight: '100%', paddingBottom: '20px' }}>
        {/* Contact Poster */}
        <div style={{ position: 'relative', height: '460px', overflow: 'hidden' }}>
          <img
            src={posterPic}
            alt="Vaibhav Gollapalli"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', transform: 'scale(1.35)', transformOrigin: '50% 30%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 32%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
          }} />

          {/* Nav buttons */}
          <div style={{ position: 'absolute', top: '58px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose} aria-label="Back" style={{
              width: '38px', height: '38px', borderRadius: '19px', background: 'rgba(255,255,255,0.28)',
              backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="chevronLeft" size={18} color="white" />
            </button>
            <div style={{
              height: '38px', borderRadius: '19px', padding: '0 16px', background: 'rgba(255,255,255,0.28)',
              backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center',
              color: 'white', fontSize: '17px', fontWeight: 500,
            }}>
              Edit
            </div>
          </div>

          {/* Name */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '96px', textAlign: 'center', color: 'white', textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
            <div style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.05 }}>
              {contact.first}<br />{contact.last}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '6px', textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 0 14px rgba(0,0,0,0.35)' }}>
              {contact.title} · {contact.org}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '14px', display: 'flex', gap: '8px' }}>
            {actions.map(a => (
              <a
                key={a.label}
                href={a.href}
                target={a.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  flex: 1, height: '62px', borderRadius: '16px', background: 'rgba(255,255,255,0.24)',
                  backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                  border: '0.5px solid rgba(255,255,255,0.3)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                  color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 500,
                }}
              >
                <Icon name={a.icon} size={20} color="white" />
                {a.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: '16px' }} />

        {fields.map((group, gi) => (
          <Group key={gi} style={{ marginBottom: '14px' }}>
            {group.map((f, i) => <Field key={f.label} {...f} last={i === group.length - 1} />)}
          </Group>
        ))}

        <Group style={{ marginBottom: '14px' }}>
          <div style={{ padding: '10px 16px', minHeight: '76px' }}>
            <div style={{ fontSize: '14px', color: '#000', marginBottom: '2px' }}>Notes</div>
            <div style={{ fontSize: '17px', color: SECONDARY, lineHeight: 1.35 }}>
              CS @ Texas A&M. Building AI systems, edge ML, and iOS apps.
            </div>
          </div>
        </Group>

        <Group>
          <button type="button" onClick={shareContact} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0 0 0 16px', cursor: 'pointer', fontFamily: FONT }}>
            <div style={{ padding: '14px 16px 14px 0', fontSize: '17px', color: BLUE, borderBottom: '0.5px solid rgba(60,60,67,0.18)' }}>Share Contact</div>
          </button>
          <a href={`mailto:${contact.email}`} style={{ display: 'block', padding: '0 0 0 16px', textDecoration: 'none' }}>
            <div style={{ padding: '14px 16px 14px 0', fontSize: '17px', color: BLUE }}>Send Email</div>
          </a>
        </Group>
      </div>
    </AppWindow>
  )
}
