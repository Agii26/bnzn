/**
 * Card — Phase 1 component
 *
 * Props:
 *   variant  — 'base' | 'raised' | 'interactive'
 *   padding  — 'none' | 'sm' | 'md' | 'lg'
 *   onClick  — click handler (auto-enables interactive cursor)
 *   style    — extra inline styles
 */

const VARIANT_BASE = {
  base:        { background: 'var(--card)',        border: '1px solid var(--border)',  boxShadow: 'none' },
  raised:      { background: 'var(--card-raised)', border: '1px solid var(--border)',  boxShadow: 'var(--shadow-sm)' },
  interactive: { background: 'var(--card)',        border: '1px solid var(--border)',  boxShadow: 'none', cursor: 'pointer' },
}

const PADDING_MAP = {
  none: '0',
  sm:   'var(--sp-3)',
  md:   'var(--sp-5)',
  lg:   'var(--sp-6)',
}

export default function Card({
  variant = 'base',
  padding = 'none',
  children,
  onClick,
  style = {},
  ...props
}) {
  const isInteractive = variant === 'interactive' || !!onClick

  const applyHover = e => {
    e.currentTarget.style.transform   = 'translateY(-3px)'
    e.currentTarget.style.boxShadow   = 'var(--shadow-md), var(--glow-purple)'
    e.currentTarget.style.borderColor = 'var(--border-bright)'
  }
  const clearHover = e => {
    e.currentTarget.style.transform   = 'translateY(0)'
    e.currentTarget.style.boxShadow   = 'none'
    e.currentTarget.style.borderColor = 'var(--border)'
  }

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(e)
        }
      } : undefined}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        padding: PADDING_MAP[padding],
        transition: isInteractive
          ? 'transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)'
          : undefined,
        ...VARIANT_BASE[variant],
        ...style,
      }}
      onMouseEnter={isInteractive ? applyHover : undefined}
      onMouseLeave={isInteractive ? clearHover : undefined}
      onFocus={isInteractive ? applyHover : undefined}
      onBlur={isInteractive ? clearHover : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
