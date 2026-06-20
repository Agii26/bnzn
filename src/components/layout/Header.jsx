import { useMatches, useNavigate } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'
import { Input, Avatar } from '@/components/ui'

/**
 * Header — Phase 2 component
 *
 * Sticky top bar rendered inside .app-main above the page <Outlet />.
 * Reads active page title from route handle via useMatches().
 *
 * Layout:
 *   [Page title]  ─────────────────────  [Search] [Bell] [Avatar]
 */
export default function Header() {
  const matches = useMatches()
  const navigate = useNavigate()
  const activeTitle = matches
    .filter(m => m.handle?.title)
    .map(m => m.handle.title)
    .at(-1) ?? 'BNZN'

  // Fake unread count for Phase 3 — real data wired in Phase 4
  const UNREAD = 3

  return (
    <header
      style={{
        position:          'sticky',
        top:               0,
        zIndex:            'var(--z-sticky)',
        height:            'var(--header-height)',
        display:           'flex',
        alignItems:        'center',
        justifyContent:    'space-between',
        gap:               'var(--sp-4)',
        padding:           '0 var(--sp-6)',
        background:        'rgba(8, 8, 14, 0.82)',
        backdropFilter:    'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom:      '1px solid var(--border)',
        flexShrink:        0,
      }}
    >

      {/* ── Page title ── */}
      <h1
        style={{
          fontFamily:    'var(--font-heading)',
          fontSize:      'var(--fs-xl)',
          fontWeight:    'var(--fw-black)',
          letterSpacing: '-0.5px',
          lineHeight:    1,
          whiteSpace:    'nowrap',
          flexShrink:    0,
        }}
      >
        {activeTitle}
      </h1>

      {/* ── Right cluster: search + bell + avatar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>

        {/* Search — hidden on narrow mobile, shown ≥520px */}
        <div className="header-search">
          <Input
            placeholder="Search…"
            leftIcon={Search}
            size="sm"
            style={{ width: 200 }}
            aria-label="Search"
          />
        </div>

        {/* Notification bell with unread dot */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            type="button"
            aria-label={`Notifications — ${UNREAD} unread`}
            style={{
              width:          40,
              height:         40,
              borderRadius:   'var(--radius-md)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          'var(--text-muted)',
              background:     'transparent',
              border:         '1px solid transparent',
              transition:     'background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)',
              flexShrink:     0,
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
            <Bell size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>

          {/* Unread dot */}
          {UNREAD > 0 && (
            <div
              aria-hidden="true"
              style={{
                position:     'absolute',
                top:          6,
                right:        6,
                width:        8,
                height:       8,
                borderRadius: '50%',
                background:   'var(--red)',
                border:       '2px solid var(--bg)',
              }}
            />
          )}
        </div>

        {/* Avatar — links to Profile (Phase 3) */}
        <button
          type="button"
          aria-label="View your profile"
          onClick={() => navigate('/profile')}
          style={{
            padding:      0,
            borderRadius: '50%',
            background:   'transparent',
            border:       'none',
            cursor:       'pointer',
            flexShrink:   0,
          }}
        >
          <Avatar name="Benzon" size="sm" status="online" />
        </button>
      </div>
    </header>
  )
}
