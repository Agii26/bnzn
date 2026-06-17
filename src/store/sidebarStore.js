import { create } from 'zustand'

/**
 * useSidebarStore — Phase 2
 *
 * Persists sidebar collapsed state across route changes.
 * Used by: Sidebar (toggle + width), AppShell (layout calc), Header (offset).
 */
export const useSidebarStore = create(set => ({
  collapsed: false,
  toggle: () => set(state => ({ collapsed: !state.collapsed })),
}))
