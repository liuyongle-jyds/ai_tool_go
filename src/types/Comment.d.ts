import { ItemType } from './ItemType'
import User from './User'

export default interface Comment {
  id: string
  pId: string
  itemId: string
  itemSlugName: string
  itemType: ItemType
  content: string
  createTime: string
  replies?: Comment[]
  user: User
  isLiked: boolean
  likesCount: number
  toUser?: User
}
