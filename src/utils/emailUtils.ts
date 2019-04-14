import schedule from "node-schedule"
import { emailService } from "../services/EmailService"

export const SENDER_EMAIL = "test@gmail.com"
export const STATUS_QUEUED = 102
export const STATUS_SENT = 202

export const getEmailStatus = (code: any) => {
  switch (code) {
    case STATUS_SENT:
      return "SENT"
    case STATUS_QUEUED:
      return "QUEUED"
  }
}

// "26 * * * *"
export const setEmailScheduler = (timer: string) => {
  schedule.scheduleJob(timer, emailService.sendAllQueuedEmails)
}
