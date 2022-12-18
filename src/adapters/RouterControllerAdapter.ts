/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { Controller } from '../controllers/controller'

export function routerControllerAdpter (baseUrl: string, controller: Controller): Router {
  const router = Router()

  if (controller.getAll !== undefined) {
    router.get(baseUrl, (req, res) => controller.getAll?.(req, res))
    console.log(`[GET]  ${baseUrl}`)
  }

  if (controller.getById !== undefined) {
    router.get(`${baseUrl}/:id`, (req, res) => controller.getById?.(req, res))
    console.log(`[GET]  ${baseUrl}/:id`)
  }

  if (controller.create !== undefined) {
    router.post(`${baseUrl}`, (req, res) => controller.create?.(req, res))
    console.log(`[POST] ${baseUrl}`)
  }

  return router
}
