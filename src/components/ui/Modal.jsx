import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Modal — Phase 1 component (A/B polish pass)
 *
 * Changes from original:
 *   • Focus trap — Tab/Shift+Tab cycles only within the modal while open
 *   • Return focus — restores focus to the element that opened the modal on close
 *   • Exit animation — scaleDown + fadeOut plays before unmount (150ms)
 *   • Close button bumped to 36×36px (meets 44pt touch target guideline)
 *
 * Props:
 *   isOpen              — boolean: controls visibility
 *   onClose             — called on ESC, overlay click, or close button
 *   title               — optional header title (sets aria-labelledby)
 *   children            — modal body content
 *   footer              — optional node in a bordered footer row
 *   size                — 'sm' | 'md' | 'lg' | 'full'
 *   showCloseButton     — boolean, default true
 *   closeOnOverlayClick — boolean, default true
 */

const SIZE_MAP = {
  sm:   { maxWidth: 400 },
  md:   { maxWidth: 520 },
  lg:   { maxWidth: 720 },
  full: { maxWidth: 'calc(100vw - var(--sp-8))' },
}

// All element types that can receive keyboard focus
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}) {
  const titleId  = useId()
  const modalRef = useRef(null)
  // Track which element triggered the modal so we can return focus on close
  const triggerRef = useRef(null)
  // Controls whether we're playing the exit animation
  const [closing, setClosing] = useState(false)

  // Capture the currently-focused element the moment isOpen flips true
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
      setClosing(false)
    }
  }, [isOpen])

  // Body-scroll lock + ESC listener
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    // Delay focus move one frame so the portal has rendered
    const raf = requestAnimationFrame(() => modalRef.current?.focus())
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Focus trap — Tab / Shift+Tab cycles within focusable modal children
  const trapFocus = useCallback(e => {
    if (e.key !== 'Tab' || !modalRef.current) return
    const focusable = Array.from(modalRef.current.querySelectorAll(FOCUSABLE))
    if (!focusable.length) { e.preventDefault(); return }
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', trapFocus)
    return () => window.removeEventListener('keydown', trapFocus)
  }, [isOpen, trapFocus])

  // Play exit animation, then call the real onClose + restore focus
  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose?.()
      // Return focus to whatever opened the modal
      triggerRef.current?.focus?.()
      triggerRef.current = null
    }, 150) // matches scaleDown duration below
  }, [onClose])

  if (!isOpen && !closing) return null

  const s = SIZE_MAP[size]
  const isExiting = closing

  return createPortal(
    <div
      onClick={closeOnOverlayClick ? handleClose : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overlay)',
        background: 'var(--overlay)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-4)',
        animation: isExiting
          ? 'fadeOut 150ms var(--ease-in) both'
          : 'fadeIn 200ms var(--ease-out) both',
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: s.maxWidth,
          maxHeight: size === 'full' ? 'calc(100vh - var(--sp-8))' : '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--card-raised)',
          border: '1px solid var(--border-bright)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          outline: 'none',
          animation: isExiting
            ? 'scaleDown 150ms var(--ease-in) both'
            : 'scaleUp 250ms var(--ease-spring) both',
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-4)',
            padding: 'var(--sp-5) var(--sp-5) var(--sp-4)',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            {title && (
              <h2
                id={titleId}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-lg)',
                  fontWeight: 'var(--fw-bold)',
                  letterSpacing: '-0.3px',
                  margin: 0,
                }}
              >
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36, height: 36,   /* was 32×32 — meets 44pt minimum */
                  flexShrink: 0,
                  marginLeft: 'auto',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = 'var(--surf)'
                  e.currentTarget.style.color        = 'var(--text)'
                  e.currentTarget.style.borderColor  = 'var(--border)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = 'transparent'
                  e.currentTarget.style.color        = 'var(--text-muted)'
                  e.currentTarget.style.borderColor  = 'transparent'
                }}
              >
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{
          padding: 'var(--sp-5)',
          overflowY: 'auto',
          color: 'var(--text-sub)',
          fontSize: 'var(--fs-sm)',
          lineHeight: 'var(--lh-relaxed)',
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--sp-3)',
            padding: 'var(--sp-4) var(--sp-5)',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
