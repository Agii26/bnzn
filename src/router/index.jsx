import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import Explore from '@/pages/Explore'
import Notifications from '@/pages/Notifications'
import Contact from '@/pages/Contact'

/**
 * BNZN.dev — Route Map
 *
 * /                → Home (Feed)
 * /profile         → Profile page
 * /explore         → Skills / Explore
 * /notifications   → Achievements feed
 * /contact         → DM-style contact
 *
 * All routes share AppShell as their layout wrapper.
 * Add new routes as children of the root '/' path.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,                 element: <Home />          },
      { path: 'profile',             element: <Profile />       },
      { path: 'explore',             element: <Explore />       },
      { path: 'notifications',       element: <Notifications /> },
      { path: 'contact',             element: <Contact />       },
    ],
  },
])
