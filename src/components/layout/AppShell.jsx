import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

/**
 * AppShell — Root layout wrapper.
 *
 * Current (Phase 0):
 *   [Sidebar] [Main content area]
 *
 * Phase 2 will add:
 *   [Sidebar] [Main content area] [Right panel]
 *   + sticky header bar inside main
 *   + mobile bottom nav bar
 */
export default function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
