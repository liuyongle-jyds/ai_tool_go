import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

const getPagesToDisplay = (current: number, maxPage: number) => {
  const pages = []
  const maxVisiblePages = 4
  const halfVisiblePages = Math.floor(maxVisiblePages / 2)

  let startPage = Math.max(1, current - halfVisiblePages)
  let endPage = Math.min(maxPage, current + halfVisiblePages)

  if (current <= halfVisiblePages) {
    endPage = Math.min(maxPage, maxVisiblePages)
  } else if (current + halfVisiblePages >= maxPage) {
    startPage = Math.max(1, maxPage - maxVisiblePages + 1)
  }

  if (startPage > 1) {
    pages.push(1)
    if (startPage > 2) {
      pages.push(-1)
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (endPage < maxPage) {
    if (endPage < maxPage - 1) {
      pages.push(-1)
    }
    pages.push(maxPage)
  }

  return pages
}

interface Props {
  current: number
  total: number
  pageSize: number
  path: string
}

export default function CusPagination({
  current,
  total,
  pageSize,
  path,
}: Props) {
  const getPreviousPath = () => path + '/page/' + (current - 1)

  const getNextPath = () => path + '/page/' + (current + 1)

  const getPathByPage = (e: number) => path + '/page/' + e

  const maxPage = Math.ceil(total / pageSize)

  const pages = getPagesToDisplay(current, maxPage)

  if (!total) return <div></div>
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={current <= 1}
            href={getPreviousPath()}
          />
        </PaginationItem>
        {pages.map((e, index) => {
          if (e === -1) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink href={getPathByPage(e)} isActive={current === e}>
                {e}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext disabled={current >= maxPage} href={getNextPath()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
