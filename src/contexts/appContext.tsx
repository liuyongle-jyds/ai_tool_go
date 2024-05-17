'use client'

import User from '@/types/User'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface ContextProviderValue {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const AppContext = createContext({} as ContextProviderValue)

export const useApp = () => useContext(AppContext)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User>({} as User)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
