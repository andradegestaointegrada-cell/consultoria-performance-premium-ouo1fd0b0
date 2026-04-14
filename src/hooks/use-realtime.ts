import { useEffect, useRef } from 'react'

/**
 * Hook for real-time subscriptions to a Supabase table.
 * Uses short polling since native realtime requires supabase-js websocket.
 */
export function useRealtime(
  collectionName: string,
  callback: (data: any) => void,
  enabled: boolean = true,
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      callbackRef.current({ action: 'poll', record: {} })
    }, 5000)

    return () => clearInterval(interval)
  }, [collectionName, enabled])
}
