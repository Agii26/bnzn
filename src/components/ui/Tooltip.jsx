import { cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react'

/**
 * Tooltip — Phase 1 component
 *
 * Wraps a single child element (button, icon, etc.) and shows a floating
 * label on hover or keyboard focus.
 *
 * Props:
 *   content  — tooltip text / node
 *   children — a single element to attach the tooltip to
 *   position — 'top' | 'bottom' | 'left' | 'right'  (default 'top')
 *   delay    — ms before showing on hover (default 300; focus shows instantly)
 *   style    — extra inline styles on the positioning wrapper
 */

const compose = (a, b) => (...args) => { a?.(...args); b?.(...args) }

const POSITION_STYLES = {
  top: {
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    hiddenTransform: 'translateX(-50%) translateY(4px)',
  },
  bottom: {
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    hiddenTransform: 'translateX(-50%) translateY(-4px)',
  },
  left: {
    right: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    hiddenTransform: 'translateY(-50%) translateX(4px)',
  },
  right: {
    left: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    hiddenTransform: 'translateY(-50%) translateX(-4px)',
  },
}

const ARROW_STYLES = {
  top:    { bottom: -4, left: '50%', marginLeft: -4 },
  bottom: { top:    -4, left: '50%', marginLeft: -4 },
  left:   { right:  -4, top:  '50%', marginTop:  -4 },
  right:  { left:   -4, top:  '50%', marginTop:  -4 },
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  style = {},
}) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)
  const tooltipId = useId()

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay)
  }
  const showImmediate = () => {
    clearTimeout(timeoutRef.current)
    setVisible(true)
  }
  const hide = () => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }

  const triggerProps = {
    onMouseEnter: compose(children?.props?.onMouseEnter, show),
    onMouseLeave: compose(children?.props?.onMouseLeave, hide),
    onFocus:      compose(children?.props?.onFocus, showImmediate),
    onBlur:       compose(children?.props?.onBlur, hide),
    'aria-describedby': tooltipId,
  }

  const trigger = isValidElement(children)
    ? cloneElement(children, triggerProps)
    : <span tabIndex={0} {...triggerProps}>{children}</span>

  const pos = POSITION_STYLES[position]
  const arrow = ARROW_STYLES[position]

  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {trigger}

      <span
        id={tooltipId}
        role="tooltip"
        style={{
          position: 'absolute',
          ...pos,
          transform: visible ? pos.transform : pos.hiddenTransform,
          opacity: visible ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 120ms ease-out, transform 120ms ease-out',
          zIndex: 'var(--z-dropdown)',
          background: 'var(--card-raised)',
          border: '1px solid var(--border-bright)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-md)',
          color: 'var(--text)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-medium)',
          lineHeight: 'var(--lh-snug)',
          padding: '5px 10px',
          maxWidth: 220,
          textAlign: 'center',
          whiteSpace: 'normal',
        }}
      >
        {content}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 8, height: 8,
            background: 'var(--card-raised)',
            transform: 'rotate(45deg)',
            ...arrow,
          }}
        />
      </span>
    </span>
  )
}
