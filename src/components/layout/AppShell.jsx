import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import RightPanel from './RightPanel'
import BottomNav from './BottomNav'

/**
 * AppShell — Phase 2
 *
 * Desktop (≥1024px):
 *   [Sidebar 240/72px] [Header + Outlet] [RightPanel 280px]
 *
 * Tablet (769–1023px):
 *   [Sidebar 240/72px] [Header + Outlet]  ← RightPanel hidden
 *
 * Mobile (≤768px):
 *   [Header + Outlet]  ← Sidebar hidden, BottomNav fixed at bottom
 *
 * Sidebar width is driven by --sidebar-width / --sidebar-collapsed tokens.
 * RightPanel visibility and BottomNav visibility are CSS-only (no JS).
 */
export default function AppShell() {
  return (
    <div className="app-shell">

      {/* ── Left sidebar (desktop + tablet) ── */}
      <Sidebar />

      {/* ── Center: header + page content ── */}
      <div className="app-center">
        <Header />
        <main className="app-main">
          <Outlet />
          {/* Spacer so content doesn't hide behind BottomNav on mobile */}
          <div className="bottom-nav-spacer" aria-hidden="true" />
        </main>
      </div>

      {/* ── Right panel (desktop ≥1024px only) ── */}
      <div className="app-right-panel">
        <RightPanel />
      </div>

      {/* ── Bottom nav (mobile ≤768px only) ── */}
      <BottomNav />

    </div>
  )
}
