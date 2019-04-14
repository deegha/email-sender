import { Request, Response } from "express"
import { errors } from '../config/config'

export class MainController {

  sendBadRequest = (res: Response) => {
    res.status(400).send({error: errors.BAD_REQUEST})
  }

  sendServerError = (res: Response) => {
    res.status(500).send({error: errors.INTERNAL_SERVER_ERROR})
  }
}
