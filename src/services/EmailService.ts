import sgMail from "@sendgrid/mail"
import Email from "../models/emailModel"
import moment from "moment"
import { getEmailStatusString, getEmailStatus} from "../utils"
import { SENDER_EMAIL, STATUS_QUEUED, STATUS_ACCEPTED, TIME_FORMAT, QUEUE_END, QUEUE_START } from "../config/config"
import { EmailDtoInterface, Response } from "../intrerfaces/EmailInterface"

class EmailService {

  /**
   * Sending emails and Queueing emails
   */

  sendEmail = async (dtoObject: EmailDtoInterface): Promise<Response> => {
    try {
      const shouldQued = this.shouldQued()
      let emailStatus = STATUS_ACCEPTED

      const savedId = await this.saveEmailDetails({
        to: dtoObject.to,
        from: SENDER_EMAIL,
        subject: dtoObject.subject,
        text: dtoObject.content,
        status: STATUS_ACCEPTED,
      })
      if (!shouldQued) {
      const emailObject = {
        to: dtoObject.to,
        from: SENDER_EMAIL,
        subject: dtoObject.subject,
        text: dtoObject.content,
        custom_args: {
          diffId: savedId
        }
      }
      this.emailService(emailObject)

      } else {
        emailStatus = STATUS_QUEUED
        this.updateEmail(savedId, {status: STATUS_QUEUED})
      }

      return {
        id: savedId,
        status : getEmailStatus(emailStatus)
      }
    } catch (err) {
      throw new Error(`error in email service`)
    }
  }

  /**
   * Check the current status for a given email batch
   */

  checkEmailStatus = async (id: any): Promise<Response>  => {
    try {
      const email = await Email.findById(id)
      const status = getEmailStatus(parseInt(email.status, 10))
      return {
        id,
        status
      }
    } catch (err) {
      throw new Error(`error in finding the record ${err}`)
    }
  }

  /**
   * Send emails to all the Queued emails
   */

  sendAllQueuedEmails = async (): Promise<void>  => {
    const queuedEmails = await Email.find().where("status").equals(STATUS_QUEUED)
    const mailList = queuedEmails.map((mail) => ({
      to: mail.to,
      from: mail.from,
      subject: mail.subject,
      text: mail.text,
      custom_args: {
        diffId: mail._id ,

      }
    }))
    console.log(mailList, "mailList")
    this.emailService(mailList)
  }

  /**
   * Update the status of a given email batch
   */

  updateEmailStatus = (list: any): void => {
    list.map((event: any) => {
      this.updateEmail(event.diffId, {
        status: getEmailStatusString(event.event)
      })
    })
  }

  /**
   * Delete email for a given id
   */

  deleteEmailFromQueue = async (id: any) => {
    try {
      await Email.findByIdAndRemove(id)
      return {deleted: true, id}
    } catch (err) {
      throw new Error(`error in deleting the email ${err}`)
    }
  }

  /**
   * Updates any value of email object for a given id
   */

  private updateEmail = async (id: any, payload: any) => {
    try {
      const response = await Email.findByIdAndUpdate(id, payload)
      return response
    } catch (err) {
      throw new Error(`error in updating the status of the email ${err}`)
    }
  }

  /**
   * Checks if the email should be queued or send directly
   */

  private shouldQued = (): boolean => {
    const timenow =  moment().format(TIME_FORMAT)
    const time = moment(timenow, TIME_FORMAT)
    const beforeTime =  moment(QUEUE_END, TIME_FORMAT)
    const afterTime = moment(QUEUE_START, TIME_FORMAT)
    const value = time.isBetween(beforeTime, afterTime)
    return !value
  }

  /**
   * Calling sendgrid SDK to send emails
   */

  private emailService = (msg: any): void => {
    try {
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
      sgMail.send(msg)
    } catch (err) {
      console.log(err)
      throw new Error(`error in sending email ${err}`)
    }
  }

  /**
   * Save emails in the database
   */

  private saveEmailDetails = async ( emailObj: any) => {
    const email = new Email(emailObj)
    try {
      const response = await email.save()
      return response._id
    } catch (err) {
      throw new Error(`error in saving to database ${err}`)
    }
  }
}

export const emailService = new EmailService()
