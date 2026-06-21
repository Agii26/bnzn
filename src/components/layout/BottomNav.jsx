import { NavLink } from 'react-router-dom'
import { Home, User, Compass, Bell, MessageSquare } from 'lucide-react'

/**
 * BottomNav — Phase 2 component (mobile only)
 *
 * Fixed to the bottom of the viewport on screens ≤768px.
 * Mirrors Sidebar's NAV_ITEMS — icon + label, active state, same routes.
 *
 * Accessibility:
 *   – <nav> with aria-label
 *   – NavLink active state exposed via aria-current="page" (built into NavLink)
 *   – Labels always visible (icon + text, not icon-only)
 *   – Safe-area inset for iOS notch / home indicator
 */

const NAV_ITEMS = [
  { to: '/',              icon: Home,          label: 'Home',    end: true },
  { to: '/profile',       icon: User,          label: 'Profile'            },
  { to: '/explore',       icon: Compass,       label: 'Explore'            },
  { to: '/notifications', icon: Bell,          label: 'Notifs'             },
  { to: '/contact',       icon: MessageSquare, label: 'Contact'            },
]

export default function BottomNav() {
  return (
    <nav
      role="navigation"
      aria-label="Mobile navigation"
      className="bottom-nav"
      style={{
        position:       'fixed',
        bottom:         0,
        left:           0,
        right:          0,
        zIndex:         'var(--z-sticky)',
        height:         56,
        paddingBottom:  'env(safe-area-inset-bottom)',
        alignItems:     'stretch',
        background:     'rgba(8, 8, 14, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop:      '1px solid var(--border)',
      }}
    >
      {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={{ flex: 1 }}
        >
          {({ isActive }) => (
            <div
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            3,
                height:         '100%',
                color:          isActive ? 'var(--amber)' : 'var(--text-muted)',
                transition:     'color var(--transition-fast)',
                position:       'relative',
              }}
            >
              {/* Active top indicator line */}
              {isActive && (
                <div
                  aria-hidden="true"
                  style={{
                    position:     'absolute',
                    top:          0,
                    left:         '20%',
                    right:        '20%',
                    height:       2,
                    borderRadius: '0 0 2px 2px',
                    background:   'var(--amber)',
                  }}
                />
              )}

              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize:   10,
                  fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-normal)',
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
