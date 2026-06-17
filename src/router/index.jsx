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
 * Each child route carries a `handle.title` so the Header can read the
 * active page name without prop drilling via useMatches().
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,           element: <Home />,          handle: { title: 'Feed' }          },
      { path: 'profile',       element: <Profile />,       handle: { title: 'Profile' }       },
      { path: 'explore',       element: <Explore />,       handle: { title: 'Explore' }       },
      { path: 'notifications', element: <Notifications />, handle: { title: 'Notifications' } },
      { path: 'contact',       element: <Contact />,       handle: { title: 'Contact' }       },
    ],
  },
])
