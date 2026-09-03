'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import CustomCursor from '@/components/cursor/CustomCursor'

const hideNavFooter = ['/dashboard', '/dashboard/login']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = hideNavFooter.some((p) => pathname.startsWith(p))

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
