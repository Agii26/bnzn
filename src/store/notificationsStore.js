import { create } from 'zustand'
import seedNotifications from '@/data/notifications.json'

/**
 * useNotificationsStore — Phase 4
 *
 * Owns read/unread state for the notifications feed. Session-only —
 * there's no backend, so state resets on reload. Real persistence
 * (and any live, server-driven notifications) would need a backend;
 * this store just makes the existing mock feed interactive.
 *
 * Replaces the hardcoded `UNREAD = 3` that Header.jsx carried since
 * Phase 3 ("Fake unread count for Phase 3 — real data wired in Phase 4").
 *
 * Used by: Header (bell badge), Sidebar + BottomNav (nav badge),
 * Notifications page (list + mark-as-read controls).
 */
export const useNotificationsStore = create(set => ({
  notifications: seedNotifications,

  unreadCount: seedNotifications.filter(n => !n.read).length,

  markRead: id =>
    set(state => {
      const notifications = state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
      return { notifications, unreadCount: notifications.filter(n => !n.read).length }
    }),

  markAllRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}))
