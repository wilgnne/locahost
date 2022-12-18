import mysql, { Connection } from 'mysql2'
import { SqlDatabase } from './sqlDatabase'

export class MySQLDataBase implements SqlDatabase {
  private readonly connection: Connection
  private static singleton: MySQLDataBase | null = null

  private constructor () {
    this.connection = mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'locahost'
    })
  }

  static getConnection (): MySQLDataBase {
    if (this.singleton === null) {
      this.singleton = new MySQLDataBase()
    }

    return this.singleton
  }

  public async query <T = never>(sql: string): Promise<T> {
    return await new Promise((resolve, reject) => {
      this.connection.execute(sql, (err, response) => {
        if (err != null) return reject(err)

        return resolve(response as T)
      })
    })
  }
}
