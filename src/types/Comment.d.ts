import { ItemType } from './ItemType'
import User from './User'

export default interface Comment {
  id: string
  itemId: string
  content: string
  createTime: string
  replies?: Comment[]
  user: User
  isLiked: boolean
  toUser?: User
}
