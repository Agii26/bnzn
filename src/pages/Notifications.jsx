import { useMemo, useState } from 'react'
import { Sparkles, Rocket, TrendingUp, Sparkle, CheckCheck } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import NotificationItem from '@/components/notifications/NotificationItem'
import { useNotificationsStore } from '@/store/notificationsStore'

/**
 * Notifications — Phase 4 (was a Phase-1 placeholder through Phase 3)
 *
 * This is a build/activity log, not a live engagement feed — there's no
 * backend tracking real project views or endorsements, so this page
 * doesn't pretend to have any. It surfaces the same milestones already
 * recorded in the git history / data files, made interactive (read state,
 * filtering) via useNotificationsStore.
 */

const TYPES = [
  { id: 'all',       label: 'All',       Icon: Sparkles  },
  { id: 'milestone', label: 'Milestone', Icon: Rocket    },
  { id: 'skill',     label: 'Skill',     Icon: TrendingUp },
  { id: 'system',    label: 'System',    Icon: Sparkle   },
]

function TypeChip({ label, Icon, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        minHeight: 36,
        padding: '0 var(--sp-4)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        background: active ? 'var(--amber)' : 'var(--surf)',
        color: active ? 'var(--text-inverse)' : 'var(--text-sub)',
        border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <Icon size={13} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  )
}

function EmptyState({ label }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px dashed var(--border-bright)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--sp-8)',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-sm)',
    }}>
      {label}
    </div>
  )
}

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationsStore()
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    const list = type === 'all' ? notifications : notifications.filter(n => n.type === type)
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [notifications, type])

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>
      <div className="page-content-wide">

        {/* ── Header row: unread summary + mark all read ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', margin: 0 }}>
              Build log &amp; activity — session-only, resets on reload.
            </p>
            {unreadCount > 0 && (
              <Badge variant="solid" color="amber" size="sm" dot mono={false}>
                {unreadCount} unread
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            leftIcon={CheckCheck}
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>

        {/* ── Type filter ── */}
        <div
          role="group"
          aria-label="Filter by type"
          style={{
            display: 'flex',
            gap: 'var(--sp-2)',
            overflowX: 'auto',
            paddingBottom: 'var(--sp-1)',
            marginBottom: 'var(--sp-5)',
            scrollbarWidth: 'none',
          }}
        >
          {TYPES.map(t => (
            <TypeChip key={t.id} {...t} active={type === t.id} onClick={() => setType(t.id)} />
          ))}
        </div>

        {/* ── List ── */}
        {filtered.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {filtered.map((n, i) => (
              <div key={n.id} className={`anim-fade-up delay-${Math.min(i + 1, 8)}`}>
                <NotificationItem notification={n} onRead={markRead} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState label="Nothing here yet for this filter." />
        )}
      </div>
    </div>
  )
}
