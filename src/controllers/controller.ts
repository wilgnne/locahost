import { Request, Response } from 'express'

export interface Controller {
  getById?: (req: Request, res: Response) => Promise<void>
  getAll?: (req: Request, res: Response) => Promise<void>
  create?: (req: Request, res: Response) => Promise<void>
}
