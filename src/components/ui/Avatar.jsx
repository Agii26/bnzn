import { User } from 'lucide-react'

/**
 * Avatar — Phase 1 component
 *
 * Props:
 *   src        — image URL (optional; falls back to initials or icon)
 *   alt        — alt text for the image
 *   name       — display name used for initials fallback
 *   size       — 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *   status     — 'online' | 'away' | 'busy' | undefined
 *   ring       — boolean: show rotating gradient story ring
 *   style      — extra inline styles on the wrapper
 */
export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  ring = false,
  style = {},
  ...props
}) {
  const sizeMap = {
    xs: { px: 24, font: 10, dot: 7,  border: 2, ring: 3 },
    sm: { px: 32, font: 13, dot: 8,  border: 2, ring: 3 },
    md: { px: 40, font: 16, dot: 9,  border: 2, ring: 3 },
    lg: { px: 52, font: 20, dot: 11, border: 2, ring: 4 },
    xl: { px: 72, font: 28, dot: 13, border: 3, ring: 4 },
  }

  const statusColor = {
    online: 'var(--green)',
    away:   'var(--amber)',
    busy:   'var(--red)',
  }

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : null

  const s = sizeMap[size]

  return (
    <div
      style={{ position: 'relative', width: s.px, height: s.px, flexShrink: 0, ...style }}
      {...props}
    >
      {/* Gradient story ring */}
      {ring && (
        <div style={{
          position: 'absolute',
          inset: -s.ring,
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          zIndex: 0,
        }} />
      )}

      {/* Avatar circle */}
      <div
        role="img"
        aria-label={alt || name || 'Avatar'}
        style={{
          position: 'relative',
          zIndex: 1,
          width: s.px,
          height: s.px,
          borderRadius: '50%',
          overflow: 'hidden',
          background: src ? 'transparent' : 'var(--gradient-brand)',
          border: ring ? `${s.border}px solid var(--bg)` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-heading)',
          fontSize: s.font,
          fontWeight: 'var(--fw-bold)',
          color: 'white',
          flexShrink: 0,
        }}
      >
        {src ? (
          <img src={src} alt={alt || name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User size={s.font * 1.1} color="white" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>

      {/* Status dot — aria-label makes it readable without relying on color alone */}
      {status && (
        <div
          role="img"
          aria-label={`Status: ${status}`}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
          className={status === 'online' ? 'anim-breathe' : undefined}
          style={{
            position: 'absolute',
            bottom: ring ? s.ring / 2 : 0,
            right:  ring ? s.ring / 2 : 0,
            width:  s.dot,
            height: s.dot,
            borderRadius: '50%',
            background: statusColor[status],
            border: `${s.border}px solid var(--bg)`,
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}
