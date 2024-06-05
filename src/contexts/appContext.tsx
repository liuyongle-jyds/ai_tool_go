'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import Category from '@/types/Category'
import LinkA from '@/types/LinkA'
import User from '@/types/User'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { deleteCookie, filterResp, getCookie, setCookie } from '@/utils/actions'
import { postGetTags, postGetUser, postLogin } from '@/services'

interface ContextProviderValue {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  toolsList: LinkA[]
  setToolsList: Dispatch<SetStateAction<LinkA[]>>
  experienceList: LinkA[]
  setExperienceList: Dispatch<SetStateAction<LinkA[]>>
  categories1: Category[]
  categories2: Category[]
  active1: string
  active2: string
  slugName1: string
  slugName2: string
  onTabChange: (id: string, slugName?: string) => void
  onSubTabChange: (id: string, slugName?: string) => void
}

const AppContext = createContext({} as ContextProviderValue)

export const useApp = () => useContext(AppContext)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isLoaded, user: clerkUser } = useUser()
  const { openGoogleOneTap } = useClerk()
  const [user, setUser] = useState<User>({} as User)
  const [toolsList, setToolsList] = useState([] as LinkA[])
  const [experienceList, setExperienceList] = useState([] as LinkA[])
  const [categories1, setCategories1] = useState([] as Category[])
  const [categories2, setCategories2] = useState([] as Category[])
  const [active1, setActive1] = useState('')
  const [active2, setActive2] = useState('')
  const [slugName1, setSlugName1] = useState('')
  const [slugName2, setSlugName2] = useState('')

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

  const onTabChange = (id: string, slugName?: string) => {
    setActive1(id)
    setSlugName1(slugName || id)
  }
  const onSubTabChange = (id: string, slugName?: string) => {
    setActive2(id)
    setSlugName2(slugName || id)
  }

  const getCategories1 = useCallback(async () => {
    try {
      const res = await postGetTags('DOMAIN')
      if (res.code === 200) {
        const list: Category[] = res.result || []
        setCategories1(list)
        onTabChange(list[0]?.id || '', list[0]?.slugName || '')
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getCategories2 = useCallback(async () => {
    try {
      const res = await postGetTags('TASK')
      if (res.code === 200) {
        const list: Category[] = res.result || []
        setCategories2(list)
        onSubTabChange(list[0]?.id || '', list[0]?.slugName || '')
      } else {
        await filterResp(res)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const init = () => {
      getToolsList()
      getExperienceList()
      getCategories1()
      getCategories2()
    }
    init()
  }, [getCategories1, getCategories2])

  const doLogin = async (data: any) => {
    try {
      const res = await postLogin(data)
      await setCookie('token', res.result.token)
      setUser(res.result.user)
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = useCallback(async () => {
    try {
      const res = await postGetUser()
      if (res.code === 401) {
        await deleteLocalUser()
        return
      }
      setUser(res.result)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteLocalUser = async () => {
    setUser({} as User)
    await deleteCookie('token')
  }

  useEffect(() => {
    const checkLogin = async (data: any) => {
      const token = await getCookie('token')
      if (!token) {
        await doLogin(data)
      } else {
        await getUser()
      }
    }

    if (isLoaded) {
      if (clerkUser?.id && !user.id) {
        const { id, fullName, imageUrl, primaryEmailAddress } = clerkUser
        const body = {
          openid: id,
          nickname: fullName,
          avatarUrl: imageUrl,
          email: primaryEmailAddress?.emailAddress,
        }
        checkLogin(body)
      } else if (!clerkUser) {
        if (!user.id) {
          openGoogleOneTap()
        }
        deleteLocalUser()
      }
    }
  }, [clerkUser, isLoaded, user.id, openGoogleOneTap, getUser])

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
        active2,
        slugName1,
        onTabChange,
        slugName2,
        onSubTabChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
