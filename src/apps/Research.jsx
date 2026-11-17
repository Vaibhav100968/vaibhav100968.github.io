import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppWindow from '../components/AppWindow'
import { FONT, BLUE, SECONDARY, GROUPED_BG, SEPARATOR, Icon, GlassButton, GlassTabBar, LargeTitle, SearchField, push } from '../components/ios'

const base = import.meta.env.BASE_URL

const TAGS = {
  eeg: { name: 'EEG', color: '#FF3B30' },
  edge: { name: 'Edge AI', color: '#FF9500' },
  health: { name: 'Healthcare AI', color: '#34C759' },
  ml: { name: 'Machine Learning', color: '#007AFF' },
  published: { name: 'Published', color: '#AF52DE' },
}

const pdf = (name, file, size, pages, date, tags) => ({ type: 'pdf', name, url: `${base}pdfs/${file}`, size, pages, date, tags })
const text = (name, date, body, tags = []) => ({ type: 'text', name, date, body, tags })
const link = (name, url, date) => ({ type: 'link', name, url, date, tags: [] })

const papers = {
  eeg: pdf('EEG Cognitive Energy.pdf', 'eeg-cognitive-energy.pdf', '906 KB', 7, '2026', ['eeg', 'ml', 'published']),
  tinyml: pdf('Federated TinyML IoMT.pdf', 'tinyml-iomt.pdf', '912 KB', 6, '2025', ['edge', 'health', 'published']),
  stroke: pdf('StrokeSentry.pdf', 'strokesentry.pdf', '4.6 MB', 7, '2025', ['edge', 'health', 'published']),
  windAbs: pdf('Windkessel ODE Abstract.pdf', 'windkessel-abstract.pdf', '123 KB', 1, '2025', ['health', 'ml', 'published']),
  windBp: pdf('Windkessel-Neural BP Monitor.pdf', 'windkessel-bp.pdf', '254 KB', 5, '2025', ['health', 'ml']),
}

// The folder tree that the Files UI browses.
const tree = {
  icloud: {
    name: 'iCloud Drive',
    items: ['mxr', 'sesl', 'independent', 'papers'],
  },
  mxr: {
    name: 'Mixed Realities Lab',
    date: '2026',
    items: [
      text('Overview.txt', '2026', {
        title: 'Mixed Realities Lab',
        meta: ['Texas Academy of Mathematics and Science', 'Researching under Dr. Fred McMahan, UNT Department of Learning Technologies'],
        bullets: [
          'Designed Python algorithm computing Schrödinger Bridge Problems on EEG signals',
          'Led 2025 Fall study collecting EEG STROOP task data',
          'Developing EEG analysis pipeline integrating preprocessing, SBP modeling, and energy visualization',
          'Writing manuscript targeting neuroscience journals',
          'Awarded $4,500 research funding',
        ],
        tags: ['EEG', 'Machine Learning', 'Computational Neuroscience', 'Python'],
      }, ['eeg', 'ml']),
      papers.eeg,
      link('Lab Website.webloc', 'https://ci.unt.edu/mxr/index.html', '2026'),
    ],
  },
  sesl: {
    name: 'Smart Electronic Systems Lab',
    date: '2025',
    items: [
      text('Overview.txt', '2025', {
        title: 'Smart Electronic Systems Lab',
        meta: ['Texas Academy of Mathematics and Science', 'Researching under Dr. Arella Seema and Dr. Saraju Mohanty'],
        bullets: [
          'Developed TinyML anomaly detection framework for IoMT',
          'Implemented MQTT communication and federated learning',
          'Deployed system on Arduino Nano 33 IoT and Raspberry Pi',
          'Achieved 100% inference accuracy',
        ],
        tags: ['TinyML', 'Edge AI', 'IoMT', 'Federated Learning', 'MQTT'],
      }, ['edge', 'health']),
      papers.tinyml,
      link('Lab Website.webloc', 'https://sarajumohanty.github.io/SESL/index.html', '2025'),
    ],
  },
  independent: {
    name: 'Independent Research',
    date: '2025',
    items: [
      text('Overview.txt', '2025', {
        title: 'Independent Research',
        meta: [],
        bullets: [
          'Built FAST-method stroke detection system on mobile devices',
          'SwiftUI app integrating CoreML, Vision, and Speech frameworks',
          'Millisecond latency on iPhone 15 Pro',
          'Accepted for publication at IEEE ICBAIE',
        ],
        tags: ['Healthcare AI', 'Computer Vision', 'Edge AI', 'SwiftUI', 'CoreML'],
      }, ['health', 'edge']),
      papers.stroke,
      papers.windAbs,
      papers.windBp,
    ],
  },
  papers: {
    name: 'Papers',
    date: '2026',
    items: Object.values(papers),
  },
  iphone: {
    name: 'On My iPhone',
    items: [pdf('Vaibhav_Gollapalli_Resume.pdf', 'resume.pdf', '129 KB', 1, '2026', [])],
  },
  deleted: { name: 'Recently Deleted', items: [] },
}

const allFiles = Object.values(tree).flatMap(f => f.items.filter(i => typeof i === 'object'))
const uniqueFiles = [...new Map(allFiles.map(f => [f.name + f.date, f])).values()]

function itemCount(id) {
  const n = tree[id].items.length
  return `${n} item${n === 1 ? '' : 's'}`
}

function FolderArt({ size = 84 }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 100 78">
      <defs>
        <linearGradient id="fback" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6BB7F5" /><stop offset="1" stopColor="#4EA8F0" /></linearGradient>
        <linearGradient id="ffront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9DD2FB" /><stop offset="1" stopColor="#74BDF7" /></linearGradient>
      </defs>
      <path d="M4 10a6 6 0 0 1 6-6h24l8 8h48a6 6 0 0 1 6 6v52a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6Z" fill="url(#fback)" />
      <path d="M2 24a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6Z" fill="url(#ffront)" />
      <path d="M2 26a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FileThumb({ item, size = 84 }) {
  if (item.type === 'link') {
    return (
      <div style={{ width: size * 0.78, height: size, borderRadius: '6px', background: 'white', border: '0.5px solid rgba(0,0,0,0.15)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6">
          <circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c2.8 3 2.8 16 0 19M12 2.5c-2.8 3-2.8 16 0 19" />
        </svg>
      </div>
    )
  }
  const isPdf = item.type === 'pdf'
  return (
    <div style={{
      width: size * 0.78, height: size, borderRadius: '4px', background: 'white', border: '0.5px solid rgba(0,0,0,0.15)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '8px 7px', position: 'relative', overflow: 'hidden',
    }}>
      {isPdf && <div style={{ height: '5px', width: '70%', background: '#3A3A3C', borderRadius: '1px', margin: '0 auto 5px' }} />}
      {Array.from({ length: isPdf ? 9 : 7 }).map((_, i) => (
        <div key={i} style={{ height: '2px', background: '#C7C7CC', borderRadius: '1px', marginBottom: '3.5px', width: i % 3 === 2 ? '60%' : '100%' }} />
      ))}
      {isPdf && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#E5383B', color: 'white', fontSize: '8px', fontWeight: 800, textAlign: 'center', padding: '1px 0' }}>PDF</div>
      )}
    </div>
  )
}

function TagDots({ tags }) {
  if (!tags?.length) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '3px' }}>
      {tags.map(t => <span key={t} style={{ width: 7, height: 7, borderRadius: '50%', background: TAGS[t].color }} />)}
    </div>
  )
}

function GridItem({ item, onOpen }) {
  const isFolder = typeof item === 'string'
  const name = isFolder ? tree[item].name : item.name
  const meta = isFolder ? [tree[item].date, itemCount(item)] : [item.date, item.size || (item.type === 'link' ? 'Web Link' : 'Text')]
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => onOpen(item)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', fontFamily: FONT, minWidth: 0 }}
    >
      <div style={{ height: '92px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        {isFolder ? <FolderArt /> : <FileThumb item={item} />}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 500, color: '#000', marginTop: '6px', lineHeight: 1.25, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {name}
      </div>
      {meta.filter(Boolean).map(m => <div key={m} style={{ fontSize: '12px', color: SECONDARY }}>{m}</div>)}
      {!isFolder && <TagDots tags={item.tags} />}
    </motion.button>
  )
}

function ListItem({ item, onOpen, last }) {
  const isFolder = typeof item === 'string'
  const name = isFolder ? tree[item].name : item.name
  const meta = isFolder ? `${tree[item].date} – ${itemCount(item)}` : `${item.date} – ${item.size || (item.type === 'link' ? 'Web Link' : 'Text')}`
  return (
    <button type="button" onClick={() => onOpen(item)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left', padding: '0 0 0 16px', cursor: 'pointer', fontFamily: FONT }}>
      <div style={{ width: '44px', display: 'flex', justifyContent: 'center' }}>
        {isFolder ? <FolderArt size={40} /> : <FileThumb item={item} size={44} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '10px 16px 10px 0', borderBottom: last ? 'none' : `0.5px solid ${SEPARATOR}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '17px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
          <div style={{ fontSize: '13px', color: SECONDARY }}>{meta}</div>
        </div>
        {!isFolder && item.tags?.length > 0 && <div style={{ display: 'flex', gap: '2px' }}>{item.tags.map(t => <span key={t} style={{ width: 8, height: 8, borderRadius: '50%', background: TAGS[t].color }} />)}</div>}
        <Icon name="chevronRight" size={13} color="#C4C4C7" />
      </div>
    </button>
  )
}

function ItemsView({ items, view, onOpen }) {
  if (!items.length) {
    return <p style={{ textAlign: 'center', color: SECONDARY, fontSize: '17px', padding: '60px 0' }}>No Items</p>
  }
  if (view === 'list') {
    return (
      <div style={{ margin: '0 16px', background: 'white', borderRadius: '22px', overflow: 'hidden' }}>
        {items.map((it, i) => <ListItem key={typeof it === 'string' ? it : it.name + i} item={it} onOpen={onOpen} last={i === items.length - 1} />)}
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px 10px', padding: '0 14px' }}>
      {items.map((it, i) => <GridItem key={typeof it === 'string' ? it : it.name + i} item={it} onOpen={onOpen} />)}
    </div>
  )
}

function BrowseRow({ icon, color = BLUE, label, onClick, last, dot }) {
  return (
    <button type="button" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textAlign: 'left', padding: '0 0 0 16px', cursor: 'pointer', fontFamily: FONT }}>
      <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
        {dot ? <span style={{ width: 13, height: 13, borderRadius: '50%', background: dot }} /> : <Icon name={icon} size={22} color={color} />}
      </div>
      <div style={{ flex: 1, padding: '13px 16px 13px 0', fontSize: '17px', color: '#000', borderBottom: last ? 'none' : `0.5px solid ${SEPARATOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {label}
        <Icon name="chevronRight" size={13} color="#C4C4C7" />
      </div>
    </button>
  )
}

function BrowseGroup({ title, children }) {
  return (
    <div style={{ margin: '0 16px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '20px', fontWeight: 700, color: '#000', padding: '0 4px 8px' }}>
        {title} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
      <div style={{ background: 'white', borderRadius: '22px', overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

function QuickLook({ item, onClose }) {
  return (
    <motion.div {...push} style={{ background: GROUPED_BG, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '54px 16px 10px' }}>
        <GlassButton icon="xmark" label="Close" onClick={onClose} color="#000" />
        <div style={{ fontSize: '17px', fontWeight: 600, color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, textAlign: 'center' }}>{item.name}</div>
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" style={{ textDecoration: 'none' }}>
            <GlassButton icon="share" label="Share" color={BLUE} />
          </a>
        ) : <GlassButton icon="share" label="Share" color={BLUE} />}
      </div>

      {item.type === 'pdf' && (
        <div style={{ flex: 1, padding: '6px 12px 16px', display: 'flex', flexDirection: 'column' }}>
          <iframe
            title={item.name}
            src={`${item.url}#toolbar=0&navpanes=0&view=FitH`}
            style={{ flex: 1, minHeight: '520px', width: '100%', border: 'none', borderRadius: '6px', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
          />
          <div style={{ alignSelf: 'center', marginTop: '10px', fontSize: '13px', color: '#000', background: 'rgba(255,255,255,0.8)', padding: '5px 12px', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            {item.pages} page{item.pages === 1 ? '' : 's'} · {item.size}
          </div>
        </div>
      )}

      {item.type === 'text' && (
        <div style={{ margin: '6px 12px 16px', background: 'white', borderRadius: '6px', padding: '22px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', minHeight: '480px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>{item.body.title}</h1>
          {item.body.meta.map(m => <p key={m} style={{ fontSize: '14px', color: SECONDARY, marginBottom: '2px' }}>{m}</p>)}
          <div style={{ height: '12px' }} />
          {item.body.bullets.map(b => (
            <p key={b} style={{ fontSize: '15px', color: '#000', lineHeight: 1.5, marginBottom: '6px', paddingLeft: '14px', textIndent: '-14px' }}>•&nbsp; {b}</p>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
            {item.body.tags.map(t => (
              <span key={t} style={{ fontSize: '12px', fontWeight: 600, color: BLUE, background: 'rgba(0,122,255,0.1)', padding: '4px 10px', borderRadius: '10px' }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {item.type === 'link' && (
        <div style={{ margin: '40px 24px', background: 'white', borderRadius: '22px', padding: '28px 20px', textAlign: 'center' }}>
          <FileThumb item={item} size={90} />
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#000', marginTop: '14px' }}>{item.name.replace('.webloc', '')}</div>
          <div style={{ fontSize: '14px', color: SECONDARY, margin: '4px 0 18px', wordBreak: 'break-all' }}>{item.url}</div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', background: BLUE, color: 'white', fontSize: '17px', fontWeight: 600, padding: '10px 26px', borderRadius: '22px', textDecoration: 'none',
          }}>
            Open in Safari
          </a>
        </div>
      )}
    </motion.div>
  )
}

function FolderScreen({ title, items, onBack, onOpen, view, setView }) {
  return (
    <motion.div {...push} style={{ minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '54px 16px 6px' }}>
        <GlassButton icon="chevronLeft" label="Back" onClick={onBack} color="#000" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <GlassButton icon={view === 'grid' ? 'today' : 'grid'} label="Change view" onClick={() => setView(view === 'grid' ? 'list' : 'grid')} color="#000" />
          <GlassButton icon="ellipsis" label="More" color="#000" />
        </div>
      </div>
      <LargeTitle>{title}</LargeTitle>
      <ItemsView items={items} view={view} onOpen={onOpen} />
      <div style={{ textAlign: 'center', fontSize: '13px', color: SECONDARY, padding: '24px 0 12px' }}>
        {items.length} item{items.length === 1 ? '' : 's'}
      </div>
    </motion.div>
  )
}

const TABS = [
  { id: 'recents', label: 'Recents', icon: 'clock' },
  { id: 'shared', label: 'Shared', icon: 'person' },
  { id: 'browse', label: 'Browse', icon: 'folderFill' },
]

export default function Research({ isOpen, onClose }) {
  const [tab, setTab] = useState('browse')
  const [stack, setStack] = useState([]) // drill-down: { kind: 'folder', id } | { kind: 'tag', id } | { kind: 'file', item }
  const [view, setView] = useState('grid')
  const [query, setQuery] = useState('')

  const top = stack[stack.length - 1]
  const pushScreen = s => setStack(st => [...st, s])
  const pop = () => setStack(st => st.slice(0, -1))
  const openItem = item => (typeof item === 'string' ? pushScreen({ kind: 'folder', id: item }) : pushScreen({ kind: 'file', item }))

  const handleClose = () => { setStack([]); setTab('browse'); setQuery(''); onClose() }

  const q = query.trim().toLowerCase()
  const searchResults = q ? uniqueFiles.filter(f => f.name.toLowerCase().includes(q) || (f.body && JSON.stringify(f.body).toLowerCase().includes(q))) : null

  let screen
  if (top?.kind === 'file') {
    screen = <QuickLook key={`file-${stack.length}`} item={top.item} onClose={pop} />
  } else if (top?.kind === 'folder') {
    screen = <FolderScreen key={`folder-${top.id}`} title={tree[top.id].name} items={tree[top.id].items} onBack={pop} onOpen={openItem} view={view} setView={setView} />
  } else if (top?.kind === 'tag') {
    screen = <FolderScreen key={`tag-${top.id}`} title={TAGS[top.id].name} items={uniqueFiles.filter(f => f.tags.includes(top.id))} onBack={pop} onOpen={openItem} view={view} setView={setView} />
  } else {
    screen = (
      <motion.div key={`tab-${tab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '54px 16px 0' }}>
          <GlassButton icon="ellipsis" label="More" color="#000" />
        </div>
        <LargeTitle>{TABS.find(t => t.id === tab).label}</LargeTitle>
        <SearchField value={query} onChange={setQuery} />

        {searchResults ? (
          <ItemsView items={searchResults} view="list" onOpen={openItem} />
        ) : tab === 'browse' ? (
          <>
            <BrowseGroup title="Locations">
              <BrowseRow icon="cloud" label="iCloud Drive" onClick={() => pushScreen({ kind: 'folder', id: 'icloud' })} />
              <BrowseRow icon="iphone" label="On My iPhone" onClick={() => pushScreen({ kind: 'folder', id: 'iphone' })} />
              <BrowseRow icon="trash" label="Recently Deleted" onClick={() => pushScreen({ kind: 'folder', id: 'deleted' })} last />
            </BrowseGroup>
            <BrowseGroup title="Favorites">
              <BrowseRow icon="folder" label="Papers" onClick={() => pushScreen({ kind: 'folder', id: 'papers' })} />
              <BrowseRow icon="folder" label="Mixed Realities Lab" onClick={() => pushScreen({ kind: 'folder', id: 'mxr' })} last />
            </BrowseGroup>
            <BrowseGroup title="Tags">
              {Object.entries(TAGS).map(([id, t], i, arr) => (
                <BrowseRow key={id} dot={t.color} label={t.name} onClick={() => pushScreen({ kind: 'tag', id })} last={i === arr.length - 1} />
              ))}
            </BrowseGroup>
          </>
        ) : tab === 'recents' ? (
          <>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px 16px' }} className="app-scroll">
              {Object.entries(TAGS).map(([id, t]) => (
                <button key={id} type="button" onClick={() => pushScreen({ kind: 'tag', id })} style={{
                  display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, padding: '6px 12px', borderRadius: '16px',
                  background: 'rgba(118,118,128,0.12)', fontSize: '15px', color: '#000', cursor: 'pointer', fontFamily: FONT,
                }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: t.color }} />{t.name}
                </button>
              ))}
            </div>
            <ItemsView items={[...Object.values(papers), ...tree.iphone.items]} view="grid" onOpen={openItem} />
          </>
        ) : (
          <div style={{ margin: '0 16px', background: 'white', borderRadius: '22px', overflow: 'hidden' }}>
            {Object.values(papers).filter(p => p.tags.includes('published')).map((p, i, arr) => (
              <button key={p.name} type="button" onClick={() => openItem(p)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left', padding: '0 0 0 16px', cursor: 'pointer', fontFamily: FONT }}>
                <FileThumb item={p} size={44} />
                <div style={{ flex: 1, minWidth: 0, padding: '10px 16px 10px 0', borderBottom: i === arr.length - 1 ? 'none' : `0.5px solid ${SEPARATOR}` }}>
                  <div style={{ fontSize: '17px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: '13px', color: SECONDARY }}>Shared by Vaibhav Gollapalli · {p.date}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        <div style={{ height: '12px' }} />
      </motion.div>
    )
  }

  return (
    <AppWindow isOpen={isOpen} onClose={handleClose} title="" headerColor="#F2F2F7">
      <div style={{ fontFamily: FONT, background: GROUPED_BG, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait" initial={false}>{screen}</AnimatePresence>
        </div>
        {top?.kind !== 'file' && (
          <GlassTabBar tabs={TABS} active={tab} onChange={id => { setTab(id); setStack([]); setQuery('') }} />
        )}
      </div>
    </AppWindow>
  )
}
