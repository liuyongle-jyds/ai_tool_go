const list = ['vote', 'collection', 'like', 'comment', 'history'] as const

type Operation = (typeof list)[number]

export default Operation
