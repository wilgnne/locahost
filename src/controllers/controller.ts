import { Request, Response } from 'express'

export interface QueryFilter {
  search?: string
  [key: string]: any
}

export type GetAllReq = Request<any, any, any, QueryFilter>

export interface Controller {
  getById?: (req: Request, res: Response) => Promise<void>
  getAll?: (req: GetAllReq, res: Response) => Promise<void>
  create?: (req: Request, res: Response) => Promise<void>
}
