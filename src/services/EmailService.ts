import sgMail from "@sendgrid/mail"
import Email from "../models/emailModel"
import moment from "moment"
import { getEmailStatus, STATUS_QUEUED, STATUS_SENT, SENDER_EMAIL } from "../utils"
import { EmailDtoInterface } from "../intrerfaces/EmailInterface"

class EmailService {

  sendEmail = async (dtoObject: EmailDtoInterface) => {
    try {
      const shouldQued = this.shouldQued()
      let emailStatus: number
      if (!shouldQued) {
        const response: any = await this.emailService({
          to: dtoObject.to,
          from: SENDER_EMAIL,
          subject: dtoObject.subject,
          text: dtoObject.content
        })
        emailStatus = response[0].statusCode
      } else {
        emailStatus = STATUS_QUEUED
      }

      const databaseResponse = await this.saveEmailDetails({
        to: dtoObject.to,
        from: SENDER_EMAIL,
        subject: dtoObject.subject,
        text: dtoObject.content,
        status: emailStatus
      })

      return {
        id: databaseResponse._id,
        status : getEmailStatus(emailStatus)
      }
    } catch (err) {
      throw new Error(`error in email service`)
    }
  }

  checkEmailStatus = async (id: any) => {
    try {
      const email = await Email.findById(id)
      const status = getEmailStatus(email.status)
      return status
    } catch (err) {
      throw new Error(`error in finding the record ${err}`)
    }
  }

  sendAllQueuedEmails = async () => {
    const queuedEmails = await Email.find().where("status").equals(STATUS_QUEUED)
    this.emailService(queuedEmails)
  }

  private updateEmailStatus = async (id: any, payload: any) => {
    try {
      const response = await Email.findByIdAndUpdate(id, payload)
      console.log(response)
      return response
    } catch (err) {
      throw new Error(`error in updating the status of the email ${err}`)
    }
  }

  private shouldQued = () => {
    const format = "HH:mm:ss"
    const timenow =  moment().format(format)
    const time = moment(timenow, format)
    const beforeTime =  moment("08:00:00", format)
    const afterTime = moment("24:00:00", format)
    const value = time.isBetween(beforeTime, afterTime)
    return !value
  }

  private emailService = async (msg: any) => {
    try {
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

      return await sgMail.send(msg)
    } catch (err) {
      throw new Error(`error in sending email ${err}`)
    }
  }

  private saveEmailDetails = async ( emailObj: any) => {
    const email = new Email(emailObj)
    try {
      const response = await email.save()
      return response
    } catch (err) {
      throw new Error(`error in saving to database ${err}`)
    }
  }
}

export const emailService = new EmailService()
