'use client'

import Category from '@/types/Categories'
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
  categories1: Category[]
  categories2: Category[]
  active1: number
  active2: number
  setActive1: Dispatch<SetStateAction<number>>
  setActive2: Dispatch<SetStateAction<number>>
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
  const [categories1, setCategories1] = useState([] as Category[])
  const [categories2, setCategories2] = useState([] as Category[])
  const [active1, setActive1] = useState(0)
  const [active2, setActive2] = useState(0)

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

  const getCategories1 = () => {
    setCategories1([
      {
        text: 'All Industries',
        id: '1',
      },
      {
        text: 'Electronic Commerce',
        id: '2',
      },
      {
        text: 'Program Development',
        id: '3',
      },
      {
        text: 'UI / UX',
        id: '4',
      },
      {
        text: 'Art',
        id: '5',
      },
      {
        text: 'Medical Treatment',
        id: '6',
      },
      {
        text: 'System',
        id: '7',
      },
      {
        text: 'Speech Recognition',
        id: '8',
      },
    ])
  }

  const getCategories2 = () => {
    setCategories2([
      {
        text: 'All Functions',
        id: '1',
      },
      {
        text: 'Chat',
        id: '2',
      },
      {
        text: 'Photo Restoration',
        id: '3',
      },
      {
        text: 'Face Detection',
        id: '4',
      },
      {
        text: 'Speech Recognition',
        id: '5',
      },
      {
        text: 'E-commerce',
        id: '6',
      },
      {
        text: 'Article Writing',
        id: '7',
      },
      {
        text: 'Tourism',
        id: '8',
      },
      {
        text: 'System Safety',
        id: '9',
      },
      {
        text: 'Market Economy',
        id: '10',
      },
    ])
  }

  useEffect(() => {
    const init = () => {
      getToolsList()
      getExperienceList()
      getCategories1()
      getCategories2()
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
        categories1,
        categories2,
        active1,
        setActive1,
        active2,
        setActive2,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
