import { Request, Response } from 'express'

export interface QueryFilter {
  search?: string
}

export type GetAllReq = Request<{}, {}, {}, QueryFilter>

export interface Controller {
  getById?: (req: Request, res: Response) => Promise<void>
  getAll?: (req: GetAllReq, res: Response) => Promise<void>
  create?: (req: Request, res: Response) => Promise<void>
}
