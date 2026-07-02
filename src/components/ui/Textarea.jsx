import { useId, useState, forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'

/**
 * Textarea — Phase 1 component
 *
 * Props:
 *   label      — visible label text
 *   helperText — small text under the field (hidden when `error` is set)
 *   error      — error message string; switches field to error styling
 *   rows       — default visible rows (default 4)
 *   autoResize — boolean: grow height to fit content, no scrollbar (default false)
 *   maxLength  — passed to <textarea>; shows a live character counter when set
 *   fullWidth  — boolean, default true
 *   required   — boolean, shows an asterisk next to the label
 *   style      — extra inline styles on the outer wrapper
 *   ref        — forwarded to the native <textarea> element (e.g. for focus-management)
 *   ...props   — passed straight to the <textarea> (value, onChange, placeholder, disabled, etc.)
 */
const Textarea = forwardRef(function Textarea({
  label,
  helperText,
  error,
  rows = 4,
  autoResize = false,
  maxLength,
  fullWidth = true,
  required = false,
  id,
  disabled = false,
  value,
  style = {},
  ...props
}, forwardedRef) {
  const [focused, setFocused] = useState(false)
  const generatedId = useId()
  const inputId  = id || generatedId
  const helperId = `${inputId}-helper`

  const hasError = !!error
  const currentLength = typeof value === 'string' ? value.length : 0

  const handleInput = e => {
    if (autoResize) {
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    }
    props.onInput?.(e)
  }

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
        }}
      >
        <textarea
          ref={forwardedRef}
          id={inputId}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          value={value}
          aria-invalid={hasError || undefined}
          aria-describedby={(helperText || error || maxLength) ? helperId : undefined}
          onFocus={e => { setFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setFocused(false); props.onBlur?.(e) }}
          onInput={handleInput}
          style={{
            display: 'block',
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)',
            lineHeight: 'var(--lh-normal)',
            padding: 'var(--sp-3)',
            resize: autoResize ? 'none' : 'vertical',
            overflow: autoResize ? 'hidden' : 'auto',
            cursor: disabled ? 'not-allowed' : 'text',
            minHeight: 'calc(1.6em * 2)',
          }}
          {...props}
        />
      </div>

      {(helperText || error || maxLength) && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--sp-3)',
          fontSize: 'var(--fs-xs)',
          lineHeight: 'var(--lh-snug)',
        }}>
          <div
            id={helperId}
            role={hasError ? 'alert' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-1)',
              color: hasError ? 'var(--red-light)' : 'var(--text-muted)',
            }}
          >
            {hasError && <AlertCircle size={12} strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0 }} />}
            {hasError ? error : helperText}
          </div>

          {maxLength && (
            <span style={{
              color: currentLength >= maxLength ? 'var(--red-light)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
