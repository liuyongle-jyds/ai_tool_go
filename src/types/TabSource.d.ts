import { routerName } from '@/router'

const list = [routerName.home, routerName.tools, routerName.learning] as const

type TabSource = (typeof list)[number]

export default TabSource
