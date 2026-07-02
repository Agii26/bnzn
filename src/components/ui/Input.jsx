import { useId, useState, forwardRef } from 'react'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'

/**
 * Input — Phase 1 component
 *
 * Props:
 *   label      — visible label text
 *   helperText — small text under the field (hidden when `error` is set)
 *   error      — error message string; switches field to error styling
 *   leftIcon   — Lucide icon component rendered at the start of the field
 *   rightIcon  — Lucide icon component rendered at the end of the field
 *                 (ignored for type="password" — a show/hide toggle is used instead)
 *   size       — 'sm' | 'md' | 'lg'
 *   fullWidth  — boolean, default true
 *   required   — boolean, shows an asterisk next to the label
 *   style      — extra inline styles on the outer wrapper
 *   ref        — forwarded to the native <input> element (e.g. for focus-management)
 *   ...props   — passed straight to the <input> (value, onChange, type, placeholder, disabled, etc.)
 */

const SIZE_MAP = {
  sm: { height: 36, fontSize: 'var(--fs-xs)',  padding: '0 var(--sp-3)', iconSize: 14, gap: 'var(--sp-2)' },
  md: { height: 44, fontSize: 'var(--fs-sm)',  padding: '0 var(--sp-3)', iconSize: 16, gap: 'var(--sp-2)' },
  lg: { height: 48, fontSize: 'var(--fs-base)',padding: '0 var(--sp-4)', iconSize: 18, gap: 'var(--sp-3)' },
}

const Input = forwardRef(function Input({
  label,
  helperText,
  error,
  leftIcon:  LeftIcon,
  rightIcon: RightIcon,
  size = 'md',
  fullWidth = true,
  required = false,
  id,
  type = 'text',
  disabled = false,
  style = {},
  ...props
}, ref) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const generatedId = useId()
  const inputId  = id || generatedId
  const helperId = `${inputId}-helper`

  const s = SIZE_MAP[size]
  const isPassword = type === 'password'
  const hasError = !!error
  const iconColor = hasError
    ? 'var(--red-light)'
    : focused
      ? 'var(--amber)'
      : 'var(--text-muted)'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-2)',
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 'var(--fs-sm)',
            fontWeight: 'var(--fw-medium)',
            color: 'var(--text-sub)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--red)', marginLeft: 4 }} aria-hidden="true">*</span>
          )}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: s.gap,
          height: s.height,
          padding: s.padding,
          background: 'var(--card)',
          border: `1px solid ${hasError ? 'var(--red)' : focused ? 'var(--amber)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: hasError
            ? '0 0 0 3px var(--red-faint)'
            : focused
              ? '0 0 0 3px var(--amber-faint)'
              : 'none',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      >
        {LeftIcon && (
          <LeftIcon size={s.iconSize} strokeWidth={1.8} color={iconColor} aria-hidden="true" style={{ flexShrink: 0 }} />
        )}

        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={(helperText || error) ? helperId : undefined}
          onFocus={e => { setFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setFocused(false); props.onBlur?.(e) }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: s.fontSize,
          }}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--text-muted)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-sub)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {showPassword
              ? <EyeOff size={s.iconSize} strokeWidth={1.8} aria-hidden="true" />
              : <Eye    size={s.iconSize} strokeWidth={1.8} aria-hidden="true" />}
          </button>
        ) : RightIcon && (
          <RightIcon size={s.iconSize} strokeWidth={1.8} color={iconColor} aria-hidden="true" style={{ flexShrink: 0 }} />
        )}
      </div>

      {(helperText || error) && (
        <div
          id={helperId}
          role={hasError ? 'alert' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-1)',
            fontSize: 'var(--fs-xs)',
            color: hasError ? 'var(--red-light)' : 'var(--text-muted)',
            lineHeight: 'var(--lh-snug)',
          }}
        >
          {hasError && <AlertCircle size={12} strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0 }} />}
          {hasError ? error : helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
