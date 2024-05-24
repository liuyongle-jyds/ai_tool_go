const list = ['vote', 'collection', 'like', 'comment', 'history'] as const
export type Operation = (typeof list)[number]
