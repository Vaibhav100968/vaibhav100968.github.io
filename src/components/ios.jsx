// Shared iOS building blocks used by the apps that mimic stock Apple apps.
import { motion } from 'framer-motion'

export const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif'
export const BLUE = '#007AFF'
export const GROUPED_BG = '#F2F2F7'
export const LABEL = '#000000'
export const SECONDARY = '#8E8E93'
export const SEPARATOR = 'rgba(60,60,67,0.18)'

const paths = {
  chevronLeft: <path d="M15 4l-8 8 8 8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  chevronRight: <path d="M9 5l7 7-7 7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" strokeWidth="2.2" fill="none" /><path d="M15.5 15.5L21 21" strokeWidth="2.2" strokeLinecap="round" /></>,
  plus: <path d="M12 5v14M5 12h14" strokeWidth="2.2" strokeLinecap="round" />,
  ellipsis: <><circle cx="5" cy="12" r="1.8" stroke="none" /><circle cx="12" cy="12" r="1.8" stroke="none" /><circle cx="19" cy="12" r="1.8" stroke="none" /></>,
  share: <><path d="M12 15V3M7.5 7.5L12 3l4.5 4.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M8 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2" strokeWidth="2" fill="none" strokeLinejoin="round" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" strokeWidth="2" fill="none" /><path d="M3.5 7l8.5 6.5L20.5 7" strokeWidth="2" fill="none" strokeLinejoin="round" /></>,
  link: <><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" strokeWidth="2" fill="none" strokeLinecap="round" /></>,
  clock: <><circle cx="12" cy="12" r="9" strokeWidth="2" fill="none" /><path d="M12 7v5l3.5 2" strokeWidth="2" fill="none" strokeLinecap="round" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" strokeWidth="2" fill="none" strokeLinejoin="round" />,
  folderFill: <path d="M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="none" />,
  doc: <><path d="M6 3h8l4 4v14H6z" strokeWidth="2" fill="none" strokeLinejoin="round" /><path d="M14 3v4h4" strokeWidth="2" fill="none" strokeLinejoin="round" /></>,
  today: <><rect x="4" y="3" width="16" height="18" rx="3" strokeWidth="2" fill="none" /><path d="M8 8h8M8 12h8M8 16h5" strokeWidth="2" strokeLinecap="round" /></>,
  apps: <><rect x="4" y="4" width="7" height="7" rx="2" stroke="none" /><rect x="13" y="4" width="7" height="7" rx="2" stroke="none" /><rect x="4" y="13" width="7" height="7" rx="2" stroke="none" /><rect x="13" y="13" width="7" height="7" rx="2" stroke="none" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" strokeWidth="1.8" fill="none" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" strokeWidth="1.8" fill="none" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" strokeWidth="1.8" fill="none" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" strokeWidth="1.8" fill="none" /></>,
  cloud: <path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.1 4.5 4.5 0 0 0 7 18Z" strokeWidth="2" fill="none" strokeLinejoin="round" />,
  iphone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" strokeWidth="2" fill="none" /><path d="M10.5 5h3" strokeWidth="2" strokeLinecap="round" /></>,
  trash: <><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" /></>,
  rings: <><circle cx="12" cy="12" r="9" strokeWidth="2.2" fill="none" /><circle cx="12" cy="12" r="5.5" strokeWidth="2.2" fill="none" /><circle cx="12" cy="12" r="2" strokeWidth="2.2" fill="none" /></>,
  medal: <><circle cx="12" cy="14" r="6" strokeWidth="2" fill="none" /><path d="M8.5 9L6 3h4l2 4.5L14 3h4l-2.5 6" strokeWidth="2" fill="none" strokeLinejoin="round" /></>,
  person: <><circle cx="12" cy="8" r="4" strokeWidth="2" fill="none" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" strokeWidth="2" fill="none" strokeLinecap="round" /></>,
  message: <path d="M12 4c4.97 0 9 3.36 9 7.5S16.97 19 12 19c-.9 0-1.77-.1-2.6-.3L5 20.5l1.2-3.4C4.2 15.8 3 13.8 3 11.5 3 7.36 7.03 4 12 4Z" stroke="none" />,
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  briefcase: <><rect x="3" y="7" width="18" height="12.5" rx="2.5" strokeWidth="2" fill="none" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" strokeWidth="2" fill="none" /></>,
  xmark: <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.2" strokeLinecap="round" />,
}

export function Icon({ name, size = 22, color = 'currentColor', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} fill={color} style={{ flexShrink: 0, ...style }}>
      {paths[name]}
    </svg>
  )
}

/** Round glass button used in iOS 26 navigation bars. */
export function GlassButton({ icon, label, onClick, color = LABEL, dark = false, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        minWidth: '38px', height: '38px', borderRadius: '19px', padding: children ? '0 14px' : 0,
        background: dark ? 'rgba(120,120,128,0.32)' : 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
        boxShadow: dark ? 'inset 0 0.5px 0 rgba(255,255,255,0.2)' : '0 2px 10px rgba(0,0,0,0.08), inset 0 0.5px 0 rgba(255,255,255,0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
        color, fontSize: '16px', fontWeight: 500, fontFamily: FONT,
        cursor: onClick ? 'pointer' : 'default', flexShrink: 0,
      }}
    >
      {icon && <Icon name={icon} size={18} color={color} />}
      {children}
    </button>
  )
}

/** Top row of glass buttons (left / right) sitting under the status bar. */
export function NavRow({ left, right, title, dark }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
      padding: '18px 16px 6px', position: 'relative', minHeight: '62px',
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>{left}</div>
      {title && (
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '17px', fontWeight: 600,
          color: dark ? 'white' : LABEL, whiteSpace: 'nowrap', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {title}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px' }}>{right}</div>
    </div>
  )
}

export function LargeTitle({ children, subtitle, dark, right }) {
  return (
    <div style={{ padding: '2px 16px 12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ minWidth: 0 }}>
        {subtitle && (
          <div style={{ fontSize: '13px', fontWeight: 600, color: SECONDARY, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '2px' }}>
            {subtitle}
          </div>
        )}
        <h1 style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '0.01em', lineHeight: 1.1, color: dark ? 'white' : LABEL }}>
          {children}
        </h1>
      </div>
      {right}
    </div>
  )
}

export function SectionHeader({ children, dark, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px 8px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: dark ? 'white' : LABEL }}>{children}</h2>
      {action && (
        <button type="button" onClick={onAction} style={{ fontSize: '17px', color: dark ? '#A4FF00' : BLUE, cursor: 'pointer' }}>{action}</button>
      )}
    </div>
  )
}

/** Inset grouped list section (white rounded card on grey). */
export function Group({ header, footer, children, dark, style }) {
  return (
    <div style={{ margin: '0 16px 22px', ...style }}>
      {header && (
        <div style={{ fontSize: '13px', color: SECONDARY, textTransform: 'uppercase', padding: '0 16px 6px', letterSpacing: '0.01em' }}>
          {header}
        </div>
      )}
      <div style={{ background: dark ? '#1C1C1E' : 'white', borderRadius: '26px', overflow: 'hidden' }}>
        {children}
      </div>
      {footer && <div style={{ fontSize: '13px', color: SECONDARY, padding: '6px 16px 0', lineHeight: 1.35 }}>{footer}</div>}
    </div>
  )
}

/** A row inside a Group. Renders as a link or button when href/onClick is given. */
export function Row({ icon, iconBg, title, subtitle, value, chevron, href, onClick, last, dark, titleColor, children }) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div'
  const props = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
    : onClick ? { type: 'button', onClick } : {}
  return (
    <Tag
      {...props}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left',
        padding: '0 0 0 16px', textDecoration: 'none', color: 'inherit', cursor: href || onClick ? 'pointer' : 'default',
        fontFamily: FONT,
      }}
    >
      {icon && (
        <div style={{
          width: '30px', height: '30px', borderRadius: '8px', background: iconBg || 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {typeof icon === 'string' ? <Icon name={icon} size={iconBg ? 18 : 24} color={iconBg ? 'white' : BLUE} /> : icon}
        </div>
      )}
      <div style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 16px 12px 0', minHeight: '50px',
        borderBottom: last ? 'none' : `0.5px solid ${dark ? 'rgba(84,84,88,0.6)' : SEPARATOR}`,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && <div style={{ fontSize: '17px', color: titleColor || (dark ? 'white' : LABEL), lineHeight: 1.25 }}>{title}</div>}
          {subtitle && <div style={{ fontSize: '14px', color: SECONDARY, marginTop: '2px', lineHeight: 1.3 }}>{subtitle}</div>}
          {children}
        </div>
        {value && <div style={{ fontSize: '17px', color: SECONDARY, flexShrink: 0 }}>{value}</div>}
        {chevron && <Icon name="chevronRight" size={14} color="#C4C4C7" />}
      </div>
    </Tag>
  )
}

/** Floating iOS 26 "Liquid Glass" tab bar, optionally with a separate search circle. */
export function GlassTabBar({ tabs, active, onChange, accent = BLUE, dark = false, searchActive, onSearch }) {
  const glass = {
    background: dark ? 'rgba(40,40,42,0.72)' : 'rgba(250,250,252,0.78)',
    backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: dark
      ? '0 6px 24px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.18)'
      : '0 6px 24px rgba(0,0,0,0.12), inset 0 0.5px 0 rgba(255,255,255,0.95)',
    border: dark ? '0.5px solid rgba(255,255,255,0.08)' : '0.5px solid rgba(0,0,0,0.06)',
  }
  const inactive = dark ? 'rgba(255,255,255,0.85)' : '#1C1C1E'
  return (
    <div style={{ position: 'sticky', bottom: '6px', zIndex: 20, display: 'flex', gap: '10px', padding: '10px 14px 0', alignItems: 'center' }}>
      <div style={{ ...glass, flex: 1, height: '58px', borderRadius: '29px', display: 'flex', alignItems: 'center', padding: '4px' }}>
        {tabs.map(t => {
          const on = t.id === active && !searchActive
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              style={{
                flex: 1, height: '100%', borderRadius: '25px', position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1px',
                color: on ? accent : inactive, cursor: 'pointer', fontFamily: FONT,
              }}
            >
              {on && (
                <motion.div
                  layoutId={`tab-pill-${tabs.map(x => x.id).join('-')}`}
                  style={{ position: 'absolute', inset: 0, borderRadius: '25px', background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <Icon name={t.icon} size={22} color={on ? accent : inactive} style={{ position: 'relative' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, position: 'relative' }}>{t.label}</span>
            </button>
          )
        })}
      </div>
      {onSearch && (
        <button
          type="button"
          aria-label="Search"
          onClick={onSearch}
          style={{ ...glass, width: '58px', height: '58px', borderRadius: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <Icon name="search" size={22} color={searchActive ? accent : inactive} />
        </button>
      )}
    </div>
  )
}

/** Rounded iOS search field. */
export function SearchField({ value, onChange, placeholder = 'Search', dark, autoFocus }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: '6px', height: '38px', borderRadius: '19px', padding: '0 12px',
      background: dark ? 'rgba(118,118,128,0.24)' : 'rgba(118,118,128,0.12)', margin: '0 16px 14px',
    }}>
      <Icon name="search" size={17} color={SECONDARY} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: '17px', color: dark ? 'white' : LABEL, fontFamily: FONT }}
      />
      {value && (
        <button type="button" aria-label="Clear" onClick={() => onChange('')} style={{ cursor: 'pointer', display: 'flex' }}>
          <svg width="17" height="17" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill={SECONDARY} /><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
    </label>
  )
}

/** Slide-in push transition used for drill-down screens. */
export const push = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
  transition: { type: 'spring', stiffness: 380, damping: 36 },
}
