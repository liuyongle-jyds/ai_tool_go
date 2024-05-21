'use client'

import LinkA from '@/types/LinkA'
import User from '@/types/User'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ContextProviderValue {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  toolsList: LinkA[]
  setToolsList: Dispatch<SetStateAction<LinkA[]>>
  experienceList: LinkA[]
  setExperienceList: Dispatch<SetStateAction<LinkA[]>>
}

const AppContext = createContext({} as ContextProviderValue)

export const useApp = () => useContext(AppContext)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User>({} as User)
  const [toolsList, setToolsList] = useState([] as LinkA[])
  const [experienceList, setExperienceList] = useState([] as LinkA[])

  const getToolsList = () => {
    setToolsList([
      {
        text: 'Popular Tools',
        link: '',
      },
      {
        text: 'Development',
        link: '',
      },
      {
        text: 'Design',
        link: '',
      },
      {
        text: 'E-commerce',
        link: '',
      },
      {
        text: 'Management',
        link: '',
      },
      {
        text: 'Operations',
        link: '',
      },
    ])
  }

  const getExperienceList = () => {
    setExperienceList([
      {
        text: 'Popular Experience',
        link: '',
      },
      {
        text: 'Latest Experience',
        link: '',
      },
      {
        text: 'UI Design',
        link: '',
      },
      {
        text: 'Java Development',
        link: '',
      },
      {
        text: 'VS Code',
        link: '',
      },
      {
        text: 'Cooking',
        link: '',
      },
    ])
  }

  useEffect(() => {
    const init = () => {
      getToolsList()
      getExperienceList()
    }
    init()
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        toolsList,
        setToolsList,
        experienceList,
        setExperienceList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
