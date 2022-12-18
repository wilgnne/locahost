import path from 'path'
import express from 'express'

import { routerControllerAdpter } from './adapters/RouterControllerAdapter'
import { MySQLDataBase } from './infra/MySQLDataBase'
import { EjsMovieController } from './controllers/EjsMovieController'
import { JsonMovieController } from './controllers/JsonMovieController'
import { SqlMovieDao } from './dao/SqlMovieDao'

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())

const database = MySQLDataBase.getConnection()
const sqlMovieDao = new SqlMovieDao(database)
const jsonMovieController = new JsonMovieController(sqlMovieDao)
const ejsMovieController = new EjsMovieController(sqlMovieDao)

const jsonMovieRouter = routerControllerAdpter('/api/movie', jsonMovieController)
const ejsMovieRouter = routerControllerAdpter('/movie', ejsMovieController)

app.use(jsonMovieRouter)
app.use(ejsMovieRouter)

export default app
