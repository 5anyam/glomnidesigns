// app/components/PreloaderWrapper.tsx
'use client'

import { useEffect, useState } from 'react'
import Preloader from './Preloader'

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [])

  return loading ? <Preloader /> : <>{children}</>
}
