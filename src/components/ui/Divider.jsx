/**
 * Divider — Phase 1 component
 *
 * Props:
 *   orientation — 'horizontal' | 'vertical'  (default 'horizontal')
 *   label       — optional text/node centered in the line (horizontal only)
 *   color       — 'purple' | 'blue' | 'red' | 'green' | undefined (default border color)
 *   style       — extra inline styles
 */

const COLOR_MAP = {
  purple: 'var(--purple-glow)',
  blue:   'var(--blue-glow)',
  red:    'var(--red-glow)',
  green:  'var(--green-glow)',
}

export default function Divider({
  orientation = 'horizontal',
  label,
  color,
  style = {},
  ...props
}) {
  const lineColor = color ? COLOR_MAP[color] : 'var(--border)'

  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        style={{
          display: 'inline-block',
          alignSelf: 'stretch',
          width: 1,
          background: lineColor,
          ...style,
        }}
        {...props}
      />
    )
  }

  if (!label) {
    return (
      <hr
        aria-orientation="horizontal"
        style={{
          border: 'none',
          height: 1,
          width: '100%',
          background: lineColor,
          margin: 0,
          ...style,
        }}
        {...props}
      />
    )
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        width: '100%',
        ...style,
      }}
      {...props}
    >
      <span style={{ flex: 1, height: 1, background: lineColor }} />
      <span style={{
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-medium)',
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: lineColor }} />
    </div>
  )
}
