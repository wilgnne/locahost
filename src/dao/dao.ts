export interface Dao<T> {
  getById: (id: number) => Promise<T | undefined>
  getAll: () => Promise<T[]>
  create: (data: T) => Promise<void>
}
