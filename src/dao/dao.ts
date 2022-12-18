export interface Filter {
  search?: string
}

export interface Dao<T> {
  getById: (id: number) => Promise<T | undefined>
  getAll: (filter?: Filter) => Promise<T[]>
  create: (data: T) => Promise<void>
}
