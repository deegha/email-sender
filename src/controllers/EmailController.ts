import { Request, Response } from "express"
import { emailService } from "../services/EmailService"

class EmailController {

  sendEmail = async (req: Request, res: Response) => {
    try {
      const body = req.body
      const response = await emailService.sendEmail(body)
      const responseObj = response

      res.send(responseObj)
    } catch (err) {
      res.status(500).send({
        message: "somthing went wrong"
      })
    }
  }

  checkEmailStatus =  async (req: Request, res: Response) => {
    const { id }  = req.params

    try {
      const status = await emailService.checkEmailStatus(id)
      res.send({
        id,
        status
      })
    } catch (err) {
      res.status(500).send({
        message: "somthing went wrong"
      })
    }
  }

  handleWebHook = async (req: Request, res: Response) => {
    console.log(req.body)
    res.send({message: "success"})
  }

}

export const email = new EmailController()
