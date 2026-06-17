import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

// Design system — import order matters
import './styles/tokens.css'    // 1. CSS custom properties (must be first)
import './styles/global.css'    // 2. Reset + base styles (uses tokens)
import './styles/animations.css' // 3. Keyframe library (uses tokens)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
