import { Request, Response } from "express"
import { MainController } from "./MainController"
import { emailService } from "../services/EmailService"

class EmailController extends MainController {

  sendEmail = async (req: Request, res: Response): Promise<void> => {
    const { body } = req

    if (!body.to || !body.content || !body.subject) {
      this.sendBadRequest(res)
    } else {
      try {
        const response = await emailService.sendEmail(body)
        res.send(response)
      } catch (err) {
        this.sendServerError(res)
      }
    }
  }

  checkEmailStatus =  async (req: Request, res: Response): Promise<void> => {
    const { id }  = req.params
    if (!id || id === null) {
      this.sendBadRequest(res)
    } else {
      try {
        const response = await emailService.checkEmailStatus(id)
        res.send(response)
      } catch (err) {
        this.sendServerError(res)
      }
    }
  }

  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try {
      emailService.updateEmailStatus(req.body)
      res.send({message: "success"})
    } catch (err) {
      this.sendServerError(res)
    }
  }

  deleteEmail = async (req: Request, res: Response): Promise<void> => {
    const { id }  = req.params
    if (!id || id === null) {
      this.sendBadRequest(res)
    } else {
      try {
        const response = await emailService.deleteEmailFromQueue(id)
        res.send(response)
      } catch (err) {
        console.log(err)
        this.sendServerError(res)
      }
    }
  }
}

export const email = new EmailController()
