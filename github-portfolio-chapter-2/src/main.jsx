import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App'
// PWA/Service Worker Import
import { registerSW } from 'virtual:pwa-register'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(<App />)

// Register service worker (for PWA)
registerSW({ immediate: true })
