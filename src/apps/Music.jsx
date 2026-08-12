import { useState } from 'react'
import { motion } from 'framer-motion'
import AppWindow from '../components/AppWindow'

// Album Covers
import fatdCover from '../assets/music/fatd.png'
import clbCover from '../assets/music/clb.png'
import herLossCover from '../assets/music/her-loss.png'
import aloneAtPromCover from '../assets/music/alone-at-prom.png'
import fargoCover from '../assets/music/fargo.png'
import chixtape5Cover from '../assets/music/chixtape-5.png'

// Song Covers
import hotlineBlingCover from '../assets/music/hotline-bling.png'
import laughNowCryLaterCover from '../assets/music/laugh-now-cry-later.png'
import sayItCover from '../assets/music/say-it.png'

const tabs = ['All', 'Music', 'Podcasts']

const albums = [
  { id: 1, title: 'For All The Dogs', artist: 'Drake', image: fatdCover, year: '2023' },
  { id: 2, title: 'Certified Lover Boy', artist: 'Drake', image: clbCover, year: '2021' },
  { id: 3, title: 'Her Loss', artist: 'Drake & 21 Savage', image: herLossCover, year: '2022' },
  { id: 4, title: 'Alone at Prom', artist: 'Tory Lanez', image: aloneAtPromCover, year: '2021' },
  { id: 5, title: 'FARGO', artist: 'Tory Lanez', image: fargoCover, year: '2023' },
  { id: 6, title: 'Chixtape 5', artist: 'Tory Lanez', image: chixtape5Cover, year: '2019' },
]

const recentlyPlayed = [
  { title: 'Hotline Bling', artist: 'Drake', image: hotlineBlingCover },
  { title: 'The Color Violet', artist: 'Tory Lanez', image: aloneAtPromCover },
  { title: 'Laugh Now Cry Later', artist: 'Drake ft. Lil Durk', image: laughNowCryLaterCover },
  { title: 'Say It', artist: 'Tory Lanez', image: sayItCover },
]

export default function Music({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('All')
  const [playing, setPlaying] = useState(null)

  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Music" headerColor="#121212">
      <div style={{ background: '#121212', minHeight: '100%', paddingBottom: '28px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px 16px 12px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                background: activeTab === tab ? '#1DB954' : '#282828',
                color: activeTab === tab ? 'black' : 'white',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Albums grid */}
        <div style={{ padding: '0 16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Albums</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {albums.map((album, i) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{
                  borderRadius: '10px', aspectRatio: '1',
                  overflow: 'hidden',
                  background: '#282828',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}>
                  <img
                    src={album.image}
                    alt={album.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'white', marginTop: '6px' }}>{album.title}</p>
                <p style={{ fontSize: '11px', color: '#B3B3B3' }}>{album.artist}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div style={{ padding: '20px 16px 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Recently Played</h3>
          {recentlyPlayed.map((track, i) => (
            <motion.button
              key={i}
              onClick={() => setPlaying(playing === i ? null : i)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 0', textAlign: 'left',
                borderBottom: i < recentlyPlayed.length - 1 ? '1px solid #282828' : 'none',
              }}
            >
              {/* Mini album art */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '6px',
                overflow: 'hidden',
                background: '#282828',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <img
                  src={track.image}
                  alt={track.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '14px', fontWeight: 600,
                  color: playing === i ? '#1DB954' : 'white',
                }}>{track.title}</p>
                <p style={{ fontSize: '12px', color: '#B3B3B3' }}>{track.artist}</p>
              </div>
              {/* Play/pause icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#B3B3B3">
                {playing === i ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </motion.button>
          ))}
        </div>

        {/* Mini player bar */}
        {playing !== null && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              position: 'absolute', bottom: '36px', left: '8px', right: '8px',
              background: '#282828', borderRadius: '10px', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '6px',
              overflow: 'hidden',
              background: '#333',
              flexShrink: 0,
            }}>
              <img
                src={recentlyPlayed[playing].image}
                alt={recentlyPlayed[playing].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{recentlyPlayed[playing].title}</p>
              <p style={{ fontSize: '11px', color: '#B3B3B3' }}>{recentlyPlayed[playing].artist}</p>
            </div>
            <button onClick={() => setPlaying(null)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </AppWindow>
  )
}
