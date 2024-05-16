import { getDictionary } from '@/app/[lang]/dictionaries'

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>