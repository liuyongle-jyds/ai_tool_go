import { getDictionary } from '@/app/[lang]/dictionaries'

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default Dictionary
