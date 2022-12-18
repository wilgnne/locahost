import { SqlDatabase } from '../infra/sqlDatabase'
import { Client } from '../models'

import { Dao, Filter } from './dao'

export class SqlClientDao implements Dao<Client> {
  constructor (private readonly database: SqlDatabase) {}

  async getAll (filter: Filter = {}): Promise<Client[]> {
    const sql = 'SELECT * FROM client;'

    const response = await this.database.query<Client[]>(sql)
    return response
  }

  async getById (id: number): Promise<Client | undefined> {
    const sql = `SELECT * FROM client WHERE id=${id};`

    const response = await this.database.query<Client[]>(sql)
    return response[0]
  }

  async create (data: Client): Promise<void> {
    const { cpf, fullName, phone } = data
    const query = `INSERT INTO client (
      fullName,
      cpf,
      phone
    ) VALUES (
      "${fullName}",
      "${cpf}",
      "${phone}"
    )`

    await this.database.query(query)
  }
}
