export default interface Tool {
  id: string
  name: string
  slugName: string
  companyName: string
  profile: string
  logoUrl: string
  previewUrl: string[]
  websiteUrl: string
  votesCount: number
  viewsCount: number
  seoTitle: string
  seoDesc: string
  createTime: string
  learnsCount: number
  collectsCount: number
  commentsCount: number
  isCollected: boolean
  isVoted: boolean
  domains: string[]
  tasks: string[]
  rank: number
}
