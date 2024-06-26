import Tool from '@/types/Tool'

export default function filterTool(e: any): Tool {
  e.votesCount *= 1
  e.viewsCount *= 1
  e.learnsCount *= 1
  e.collectsCount *= 1
  e.commentsCount *= 1
  e.rank *= 1

  e.viewsCount += 1
  if (e.rank > 99) e.rank = 0

  e.domains = e.domains.map((e: any) => e.slugName)
  e.tasks = e.tasks.map((e: any) => e.slugName)
  return e as Tool
}
