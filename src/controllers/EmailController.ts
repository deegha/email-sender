import { Request, Response } from "express"
import { MainController } from './MainController'
import { emailService } from "../services/EmailService"

class EmailController extends MainController {
  
  sendEmail = async (req: Request, res: Response) => {
    const { body } = req

    if(!body.to || !body.content || !body.subject) {
      this.sendBadRequest(res)
    }else {
      try {
        const response = await emailService.sendEmail(body)
        res.send(response)
      } catch (err) {
        this.sendServerError(res)
      }
    }
  }

  checkEmailStatus =  async (req: Request, res: Response) => {
    const { id }  = req.params
    if(!id || id === null) {
      this.sendBadRequest(res)
    }else {
      try {
        const status = await emailService.checkEmailStatus(id)
        res.send({id,status})
      } catch (err) {
        this.sendServerError(res)
      }
    }
  }

  handleWebHook = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      await emailService.updateEmailStatus(req.body)
      res.send({message: "success"})
    }catch(err) {
      this.sendServerError(res)
    }
  }
}

export const email = new EmailController()
