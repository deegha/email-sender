import schedule from "node-schedule"
import { emailService } from "../services/EmailService"
import { STATUS_QUEUED, STATUS_SENT, STATUS_ACCEPTED, STATUS_DROPED } from "../config/config"

export const getEmailStatus = (code: any) => {
  switch (code) {
    case STATUS_ACCEPTED:
      return "ACCEPTED"
    case STATUS_SENT:
      return "SENT"
    case STATUS_QUEUED:
      return "QUEUED"
    case STATUS_DROPED:
      return "FAILED"
  }
}

export const getEmailStatusString = (code: any) => {
  switch (code) {
    case "processed":
      return STATUS_ACCEPTED
    case "delivered":
      return STATUS_SENT
    case "dropped":
      return STATUS_DROPED
  }
}

// "26 * * * *"
export const setEmailScheduler = (timer: string) => {
  schedule.scheduleJob(timer, emailService.sendAllQueuedEmails)
}
