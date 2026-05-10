import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AppSidebar from './AppSidebar'
import AppTopBar from './AppTopBar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setSidebarOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppTopBar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}



