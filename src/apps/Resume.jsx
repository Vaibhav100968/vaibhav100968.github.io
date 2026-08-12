import AppWindow from '../components/AppWindow'

export default function Resume({ isOpen, onClose }) {
  const base = import.meta.env.BASE_URL
  // Cache-bust so browser/iframe picks up resume PDF updates
  const resumePdf = `${base}pdfs/resume.pdf?v=2026`

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Resume" headerColor="#FFF7F0">
      <div style={{ background: '#FFF7F0', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '24px',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)', width: '100%', textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📄</div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>
              Vaibhav Gollapalli
            </h2>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Resume</p>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: '#007AFF', color: 'white',
                padding: '12px 32px', borderRadius: '12px', fontSize: '15px',
                fontWeight: 600, textDecoration: 'none',
              }}
            >
              View Resume PDF
            </a>
          </div>

          <div style={{
            background: 'white', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)', width: '100%',
          }}>
            <iframe
              src={resumePdf}
              title="Resume"
              style={{ width: '100%', height: '500px', border: 'none' }}
            />
          </div>
        </div>
      </div>
    </AppWindow>
  )
}
