import { NavLink } from 'react-router-dom'
import {
  Home,
  User,
  Compass,
  Bell,
  MessageSquare,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { Tooltip } from '@/components/ui'
import { useSidebarStore } from '@/store/sidebarStore'

const NAV_ITEMS = [
  { to: '/',              icon: Home,          label: 'Home',          end: true },
  { to: '/profile',       icon: User,          label: 'Profile'                  },
  { to: '/explore',       icon: Compass,       label: 'Explore'                  },
  { to: '/notifications', icon: Bell,          label: 'Notifications'            },
  { to: '/contact',       icon: MessageSquare, label: 'Contact'                  },
]

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()

  return (
    <aside
      className="app-sidebar"
      style={{
        width:      collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        transition: 'width var(--transition-base)',
        overflow:   'hidden',
      }}
    >

      {/* ── Brand / Logo ── */}
      <div style={{
        padding:      collapsed ? 'var(--sp-6) var(--sp-3) var(--sp-5)' : 'var(--sp-6) var(--sp-5) var(--sp-5)',
        borderBottom: '1px solid var(--border)',
        flexShrink:   0,
        transition:   'padding var(--transition-base)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>

          {/* Logo mark */}
          <div style={{
            width:          42,
            height:         42,
            background:     'var(--amber)',
            borderRadius:   14,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontFamily:     'var(--font-heading)',
            fontSize:       22,
            fontWeight:     'var(--fw-black)',
            color:          'var(--text-inverse)',
            flexShrink:     0,
            boxShadow:      'var(--shadow-sm)',
          }}>
            B
          </div>

          {/* Wordmark — hidden when collapsed */}
          {!collapsed && (
            <div>
              <div style={{
                fontFamily:    'var(--font-heading)',
                fontSize:      'var(--fs-lg)',
                fontWeight:    'var(--fw-black)',
                letterSpacing: '-0.6px',
                lineHeight:    'var(--lh-none)',
              }}>
                BNZN
                <span style={{ color: 'var(--amber)', fontWeight: 'var(--fw-bold)' }}>.dev</span>
              </div>
              <div style={{
                fontSize:    'var(--fs-xs)',
                color:       'var(--text-muted)',
                marginTop:   3,
                letterSpacing: '0.2px',
              }}>
                portfolio
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{ padding: 'var(--sp-3) 0', flex: 1 }}
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          collapsed
            // Collapsed: icon-only with Tooltip label
            ? (
              <Tooltip key={to} content={label} position="right">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  style={{ justifyContent: 'center', padding: 'var(--sp-3)' }}
                  aria-label={label}
                >
                  {({ isActive }) => (
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      aria-hidden="true"
                    />
                  )}
                </NavLink>
              </Tooltip>
            )
            // Expanded: icon + label
            : (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            )
        ))}
      </nav>

      {/* ── Collapse toggle ── */}
      <div style={{
        padding:    'var(--sp-2) var(--sp-3)',
        flexShrink: 0,
      }}>
        <Tooltip content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} position="right">
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: collapsed ? 'center' : 'flex-end',
              width:          '100%',
              padding:        'var(--sp-2)',
              borderRadius:   'var(--radius-md)',
              color:          'var(--text-muted)',
              transition:     'background var(--transition-fast), color var(--transition-fast)',
              minHeight:      36,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--surf)'
              e.currentTarget.style.color      = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = 'var(--text-muted)'
            }}
          >
            {collapsed
              ? <ChevronRight size={16} aria-hidden="true" />
              : <ChevronLeft  size={16} aria-hidden="true" />
            }
          </button>
        </Tooltip>
      </div>

      {/* ── Bottom: phase status + profile row ── */}
      <div style={{
        padding:       'var(--sp-3) var(--sp-3) var(--sp-4)',
        borderTop:     '1px solid var(--border)',
        flexShrink:    0,
        display:       'flex',
        flexDirection: 'column',
        gap:           'var(--sp-2)',
      }}>

        {/* Phase status pill — hidden when collapsed */}
        {!collapsed && (
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          'var(--sp-2)',
            background:   'var(--surf)',
            border:       '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding:      'var(--sp-2) var(--sp-3)',
          }}>
            <div
              style={{
                width:        7,
                height:       7,
                borderRadius: '50%',
                background:   'var(--amber)',
                flexShrink:   0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize:   'var(--fs-xs)',
                fontWeight: 'var(--fw-semibold)',
                color:      'var(--amber)',
                lineHeight: 1,
              }}>
                Phase 4 — Explore + Contact
              </div>
              <div style={{
                fontSize:  'var(--fs-2xs)',
                color:     'var(--text-muted)',
                marginTop: 2,
              }}>
                In progress
              </div>
            </div>
          </div>
        )}

        {/* Profile row */}
        <Tooltip content={collapsed ? 'Benzon · @benzon' : ''} position="right">
          <button
            type="button"
            aria-label="Profile options"
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          'var(--sp-3)',
              padding:      'var(--sp-2)',
              borderRadius: 'var(--radius-md)',
              minHeight:    44,
              width:        '100%',
              cursor:       'pointer',
              transition:   'background var(--transition-fast)',
              background:   'transparent',
              border:       'none',
              textAlign:    'left',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surf)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            onFocus={e =>      e.currentTarget.style.background = 'var(--surf)'}
            onBlur={e =>       e.currentTarget.style.background = 'transparent'}
          >
            <Avatar name="Benzon" size="sm" status="online" />

            {!collapsed && (
              <>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize:     'var(--fs-sm)',
                    fontWeight:   'var(--fw-semibold)',
                    color:        'var(--text)',
                    lineHeight:   1,
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                  }}>
                    Benzon
                  </div>
                  <div style={{
                    fontSize:  'var(--fs-xs)',
                    color:     'var(--text-muted)',
                    marginTop: 2,
                  }}>
                    @benzon
                  </div>
                </div>

                <MoreHorizontal
                  size={16}
                  aria-hidden="true"
                  style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                />
              </>
            )}
          </button>
        </Tooltip>
      </div>

    </aside>
  )
}
