import { ItemType } from './ItemType'
import User from './User'

export interface Comment {
  id: string
  author: User
  content: string
  time: string
  liked: string
  itemType: ItemType
  itemId: string
  replies: SubComment[]
}

export interface SubComment {
  id: string
  author: User
  receiver: User
  content: string
  time: string
  liked: string
  itemType: ItemType
  itemId: string
}
