import express from 'express'

import { routerControllerAdpter } from './adapters/RouterControllerAdapter'
import { MySQLDataBase } from './infra/MySQLDataBase'
import { JsonMovieController } from './controllers/JsonMovieController'
import { SqlMovieDao } from './dao/SqlMovieDao'

const app = express()

app.use(express.json())

const database = MySQLDataBase.getConnection()
const sqlMovieDao = new SqlMovieDao(database)
const jsonMovieController = new JsonMovieController(sqlMovieDao)

const jsonMovieRouter = routerControllerAdpter('/api/movie', jsonMovieController)

app.use(jsonMovieRouter)

export default app
