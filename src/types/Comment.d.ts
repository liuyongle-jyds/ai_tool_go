import { ItemType } from './ItemType'

export default interface Comment {
  id: string
  content: string
  time: string
  liked: boolean
  like: string
  itemType: ItemType
  itemId: string
  replies?: Comment[]
}
