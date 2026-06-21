/**
 * PagePlaceholder — Phase 1 component (Slate & Amber palette)
 *
 * A single, consistent neutral+amber treatment for all "coming soon" pages.
 * No per-page color variation, no gradients, no decorative glow orbs.
 *
 * Props:
 *   icon        — Lucide icon component  e.g. import { User } from 'lucide-react'
 *   title       — Page name
 *   phase       — Phase number when real content arrives
 *   description — What this page will do
 *   features    — Array of upcoming feature strings
 */

export default function PagePlaceholder({
  icon: Icon,
  title,
  phase,
  description,
  features = [],
}) {
  return (
    <div
      className="anim-page-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-8)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480 }}>

        {/* Floating icon — flat neutral square, amber icon */}
        {Icon && (
          <div
            className="anim-float"
            style={{
              width: 72, height: 72,
              background: 'var(--surf)',
              border: '1px solid var(--border-bright)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--sp-6)',
            }}
          >
            <Icon size={32} style={{ color: 'var(--amber)' }} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        {/* Phase badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--sp-2)',
          background: 'var(--amber-faint)',
          border: '1px solid var(--amber-glow)',
          color: 'var(--amber)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-bold)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          marginBottom: 'var(--sp-4)',
        }}>
          <span style={{
            width: 5, height: 5,
            borderRadius: '50%',
            background: 'var(--amber)',
            display: 'inline-block',
          }} />
          Arriving in Phase {phase}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--fs-3xl)',
          fontWeight: 'var(--fw-black)',
          letterSpacing: '-1.5px',
          lineHeight: 'var(--lh-tight)',
          marginBottom: 'var(--sp-4)',
          color: 'var(--text)',
        }}>
          {title}
        </h1>

        {/* Description */}
        <p style={{
          color: 'var(--text-sub)',
          fontSize: 'var(--fs-base)',
          lineHeight: 'var(--lh-relaxed)',
          marginBottom: features.length > 0 ? 'var(--sp-6)' : 0,
        }}>
          {description}
        </p>

        {/* Feature list */}
        {features.length > 0 && (
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--sp-5)',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--amber)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: 'var(--sp-4)',
            }}>
              Upcoming Features
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-3)',
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--text-sub)',
                    padding: 'var(--sp-2) 0',
                    borderBottom: i < features.length - 1
                      ? '1px solid var(--border-muted)'
                      : 'none',
                  }}
                >
                  <svg
                    width="8" height="8"
                    viewBox="0 0 8 8"
                    fill="var(--amber)"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <path d="M4 0 L8 4 L4 8 L0 4 Z" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
