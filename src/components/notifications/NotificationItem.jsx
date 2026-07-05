import { Rocket, TrendingUp, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui'

/**
 * NotificationItem — Phase 4
 *
 * Single row in the notifications feed. Tapping/clicking or pressing
 * Enter/Space marks it read (Card handles the keyboard + focus wiring).
 *
 * Props:
 *   notification — { id, type, title, message, date, read }
 *   onRead       — called with the notification id when activated
 */

const TYPE_META = {
  milestone: { Icon: Rocket,      color: 'var(--amber)', label: 'Milestone' },
  skill:     { Icon: TrendingUp,  color: 'var(--green)', label: 'Skill'     },
  system:    { Icon: Sparkles,    color: 'var(--gray-light)', label: 'System' },
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function NotificationItem({ notification, onRead }) {
  const { id, type, title, message, date, read } = notification
  const meta = TYPE_META[type] ?? TYPE_META.system

  return (
    <Card
      variant={read ? 'base' : 'interactive'}
      padding="md"
      onClick={read ? undefined : () => onRead(id)}
      aria-label={read ? undefined : `Mark as read: ${meta.label} — ${title}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--sp-4)',
        opacity: read ? 0.72 : 1,
      }}
    >
      {/* Type icon */}
      <div
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surf)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <meta.Icon size={17} strokeWidth={1.8} aria-hidden="true" style={{ color: meta.color }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
          <div
            style={{
              fontSize: 'var(--fs-sm)',
              fontWeight: 'var(--fw-semibold)',
              color: 'var(--text)',
              lineHeight: 'var(--lh-normal)',
            }}
          >
            {title}
          </div>

          {/* Unread indicator */}
          {!read && (
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--amber)',
                flexShrink: 0,
                marginTop: 5,
              }}
            />
          )}
        </div>

        <p
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-sub)',
            lineHeight: 'var(--lh-normal)',
            margin: 'var(--sp-1) 0 var(--sp-2)',
          }}
        >
          {message}
        </p>

        <span
          style={{
            fontSize: 'var(--fs-2xs)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {formatDate(date)}
        </span>
      </div>
    </Card>
  )
}
