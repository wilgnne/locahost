import path from 'path'
import express from 'express'

import { routerControllerAdpter } from './adapters/RouterControllerAdapter'
import { MySQLDataBase } from './infra/MySQLDataBase'
import { EjsMovieController } from './controllers/EjsMovieController'
import { JsonMovieController } from './controllers/JsonMovieController'
import { SqlMovieDao } from './dao/SqlMovieDao'
import { SqlClientDao } from './dao/SqlClientDao'
import { JsonClientController } from './controllers/JsonClientController'
import { SqlBookingDao } from './dao/SqlBookingDao'
import { JsonBookingController } from './controllers/JsonBookingController'
import { JsonClientBookingController } from './controllers/JsonClientBookingController'

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/', express.static('public'))

app.use(express.json())

const database = MySQLDataBase.getConnection()
const sqlMovieDao = new SqlMovieDao(database)
const sqlClientDao = new SqlClientDao(database)
const sqlBookingDao = new SqlBookingDao(database)

const jsonMovieController = new JsonMovieController(sqlMovieDao)
const ejsMovieController = new EjsMovieController(sqlMovieDao)

const jsonClientController = new JsonClientController(sqlClientDao)

const jsonBookingController = new JsonBookingController(sqlBookingDao)
const jsonClientBookingController = new JsonClientBookingController(sqlBookingDao)

const jsonMovieRouter = routerControllerAdpter('/api/movie', jsonMovieController)
const ejsMovieRouter = routerControllerAdpter('/movie', ejsMovieController)

const jsonClientRouter = routerControllerAdpter('/api/client', jsonClientController)

const jsonBookingRouter = routerControllerAdpter('/api/booking', jsonBookingController)
const jsonClientBookingRouter = routerControllerAdpter('/api/booking/client', jsonClientBookingController)

app.use(jsonMovieRouter)
app.use(ejsMovieRouter)

app.use(jsonClientRouter)

app.use(jsonBookingRouter)
app.use(jsonClientBookingRouter)

export default app
