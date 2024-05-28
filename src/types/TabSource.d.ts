import { routerName } from '@/router'

const list = [routerName.home, routerName.tools, routerName.experience] as const
export type TabSource = (typeof list)[number]
