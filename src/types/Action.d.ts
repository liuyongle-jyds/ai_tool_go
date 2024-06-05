const types = ['VIEW', 'COLLECT', 'LIKE', 'VOTE', 'LINK'] as const
const models = ['ACTION', 'CANCEL_ACTION'] as const

export type ActionType = (typeof types)[number]

export type ActionModel = (typeof models)[number]
