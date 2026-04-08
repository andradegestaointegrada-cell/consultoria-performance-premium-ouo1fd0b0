import { useSyncExternalStore } from 'react'

export interface NewsletterStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  open: () => void
  close: () => void
  email: string
  setEmail: (email: string) => void
}

let state: NewsletterStore = {
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    state = { ...state, isOpen }
    emit()
  },
  open: () => {
    state = { ...state, isOpen: true }
    emit()
  },
  close: () => {
    state = { ...state, isOpen: false }
    emit()
  },
  email: '',
  setEmail: (email: string) => {
    state = { ...state, email }
    emit()
  },
}

const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((l) => l())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => state

const useNewsletterStore = <T = NewsletterStore>(
  selector?: (state: NewsletterStore) => T,
): T | NewsletterStore => {
  const current = useSyncExternalStore(subscribe, getSnapshot)
  return selector ? selector(current) : current
}

export default useNewsletterStore
