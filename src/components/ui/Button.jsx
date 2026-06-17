import { Loader2 } from 'lucide-react'

/**
 * Button — Phase 1 component
 *
 * Props:
 *   variant   — 'primary' | 'secondary' | 'ghost' | 'danger' | 'glow'
 *   size      — 'sm' | 'md' | 'lg'
 *   leftIcon  — Lucide icon component rendered left of label
 *   rightIcon — Lucide icon component rendered right of label
 *   loading   — boolean: shows spinner, disables interaction
 *   disabled  — boolean
 *   onClick   — click handler
 *   style     — extra inline styles
 */

const VARIANT_BASE = {
  primary:   { background: 'var(--purple)',      color: 'white',              border: '1px solid var(--purple)' },
  secondary: { background: 'var(--purple-faint)', color: 'var(--purple-light)', border: '1px solid var(--purple-glow)' },
  ghost:     { background: 'transparent',        color: 'var(--text-sub)',    border: '1px solid var(--border)' },
  danger:    { background: 'var(--red-faint)',   color: 'var(--red-light)',   border: '1px solid var(--red-glow)' },
  glow:      { background: 'var(--gradient-brand)', color: 'white',           border: 'none', boxShadow: 'var(--glow-purple)' },
}

const VARIANT_HOVER = {
  primary:   { background: 'var(--purple-dark)' },
  secondary: { background: 'rgba(168,85,247,0.15)' },
  ghost:     { background: 'var(--surf)', borderColor: 'var(--border-bright)' },
  danger:    { background: 'rgba(244,63,94,0.15)' },
  glow:      { filter: 'brightness(1.1)' },
}

const SIZE_MAP = {
  sm: { fontSize: 'var(--fs-xs)',  padding: '6px 14px',  borderRadius: 'var(--radius-sm)', gap: 'var(--sp-2)', minHeight: 36, iconSize: 14 },
  md: { fontSize: 'var(--fs-sm)',  padding: '9px 18px',  borderRadius: 'var(--radius-md)', gap: 'var(--sp-2)', minHeight: 40, iconSize: 16 },
  lg: { fontSize: 'var(--fs-base)',padding: '12px 24px', borderRadius: 'var(--radius-md)', gap: 'var(--sp-3)', minHeight: 44, iconSize: 18 },
}

export default function Button({
  variant   = 'primary',
  size      = 'md',
  leftIcon:  LeftIcon,
  rightIcon: RightIcon,
  loading   = false,
  disabled  = false,
  onClick,
  children,
  style = {},
  ...props
}) {
  const s = SIZE_MAP[size]
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            s.gap,
        fontFamily:     'var(--font-body)',
        fontWeight:     'var(--fw-semibold)',
        cursor:         isDisabled ? 'not-allowed' : 'pointer',
        transition:     'all var(--transition-fast)',
        opacity:        isDisabled && !loading ? 0.45 : 1,
        fontSize:       s.fontSize,
        padding:        s.padding,
        borderRadius:   s.borderRadius,
        minHeight:      s.minHeight,
        ...VARIANT_BASE[variant],
        ...style,
      }}
      onMouseEnter={e => {
        if (isDisabled) return
        const hover = VARIANT_HOVER[variant]
        Object.assign(e.currentTarget.style, hover)
      }}
      onMouseLeave={e => {
        if (isDisabled) return
        Object.assign(e.currentTarget.style, VARIANT_BASE[variant])
        if (style.filter) e.currentTarget.style.filter = style.filter
      }}
      {...props}
    >
      {loading
        ? <Loader2 size={s.iconSize} strokeWidth={2} aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }} />
        : LeftIcon && <LeftIcon size={s.iconSize} strokeWidth={2} aria-hidden="true" />
      }
      {children}
      {!loading && RightIcon && <RightIcon size={s.iconSize} strokeWidth={2} aria-hidden="true" />}
    </button>
  )
}
