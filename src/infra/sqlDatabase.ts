export interface SqlDatabase {
  query: <T = any>(query: string) => Promise<T>
}
