/**
 * Badge / Pill — Phase 1 component
 *
 * Props:
 *   variant  — 'solid' | 'outline' | 'glow'
 *   color    — 'purple' | 'blue' | 'red' | 'green' | 'gray'
 *   size     — 'sm' | 'md' | 'lg'
 *   dot      — boolean: show a small colored dot prefix
 *   mono     — boolean: use font-mono (default true for tag/tech labels)
 *   style    — extra inline styles
 */

const COLOR_MAP = {
  purple: {
    solid:   { background: 'var(--purple)',       color: 'white',                border: 'none' },
    outline: { background: 'var(--purple-faint)',  color: 'var(--purple-light)',  border: '1px solid var(--purple-glow)' },
    glow:    { background: 'var(--purple-faint)',  color: 'var(--purple-light)',  border: '1px solid var(--purple-glow)', boxShadow: 'var(--glow-purple)' },
  },
  blue: {
    solid:   { background: 'var(--blue)',          color: 'white',                border: 'none' },
    outline: { background: 'var(--blue-faint)',    color: 'var(--blue-light)',    border: '1px solid var(--blue-glow)' },
    glow:    { background: 'var(--blue-faint)',    color: 'var(--blue-light)',    border: '1px solid var(--blue-glow)',   boxShadow: 'var(--glow-blue)' },
  },
  red: {
    solid:   { background: 'var(--red)',           color: 'white',                border: 'none' },
    outline: { background: 'var(--red-faint)',     color: 'var(--red-light)',     border: '1px solid var(--red-glow)' },
    glow:    { background: 'var(--red-faint)',     color: 'var(--red-light)',     border: '1px solid var(--red-glow)',    boxShadow: 'var(--glow-red)' },
  },
  green: {
    solid:   { background: 'var(--green)',         color: 'white',                border: 'none' },
    outline: { background: 'var(--green-faint)',   color: 'var(--green-light)',   border: '1px solid var(--green-glow)' },
    glow:    { background: 'var(--green-faint)',   color: 'var(--green-light)',   border: '1px solid var(--green-glow)',  boxShadow: 'var(--glow-green)' },
  },
  gray: {
    solid:   { background: 'var(--gray)',          color: 'white',                border: 'none' },
    outline: { background: 'transparent',          color: 'var(--gray-light)',    border: '1px solid var(--border-bright)' },
    glow:    { background: 'var(--surf)',          color: 'var(--text-sub)',      border: '1px solid var(--border-bright)' },
  },
}

const SIZE_MAP = {
  sm: { fontSize: 'var(--fs-2xs)', padding: '2px 8px',  borderRadius: 'var(--radius-full)', fontWeight: 'var(--fw-bold)' },
  md: { fontSize: 'var(--fs-xs)',  padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 'var(--fw-semibold)' },
  lg: { fontSize: 'var(--fs-sm)',  padding: '4px 14px', borderRadius: 'var(--radius-full)', fontWeight: 'var(--fw-medium)' },
}

const DOT_COLOR = {
  purple: 'var(--purple)',
  blue:   'var(--blue)',
  red:    'var(--red)',
  green:  'var(--green)',
  gray:   'var(--gray)',
}

export default function Badge({
  variant = 'outline',
  color   = 'purple',
  size    = 'md',
  dot     = false,
  mono    = true,
  children,
  style = {},
  ...props
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sp-2)',
        whiteSpace: 'nowrap',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
        letterSpacing: '0.2px',
        lineHeight: 1,
        ...COLOR_MAP[color][variant],
        ...SIZE_MAP[size],
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span style={{
          width: 5, height: 5,
          borderRadius: '50%',
          background: DOT_COLOR[color],
          flexShrink: 0,
          display: 'inline-block',
        }} />
      )}
      {children}
    </span>
  )
}