import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'

// Add new posts here — full write-ups live on the site; share short hooks + links on X.
const posts = []

export default function Blog({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Blog" headerColor="#F2F7FF">
      <div style={{ background: '#F2F7FF', minHeight: '100%', paddingBottom: '28px' }}>
        <div style={{ padding: '8px 16px 12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a' }}>Blog</h2>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
            Longer posts live here — short versions go on X.
          </p>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px 20px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>✍️</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                No posts yet
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                New write-ups will show up here. Each one can be linked from X with a short description.
              </p>
            </motion.div>
          ) : (
            posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#8E8E93', marginBottom: '6px' }}>
                  {post.date}
                </p>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </p>
                {post.xUrl && (
                  <a
                    href={post.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#007AFF',
                      textDecoration: 'none',
                    }}
                  >
                    View on X →
                  </a>
                )}
              </motion.article>
            ))
          )}
        </div>
      </div>
    </AppWindow>
  )
}
