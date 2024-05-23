export default interface Tool {
  id: string
  head: string
  ranking: number
  name: string
  creator: string
  voted: boolean
  vote: string
  collected: boolean
  collection: string
  comment: string
  desc: string
  tag: string[]
  tip: string
  experiences: string
}
