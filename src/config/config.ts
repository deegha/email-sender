import moment from "moment"

export const errors = {
  BAD_REQUEST: "Check your payload",
  INTERNAL_SERVER_ERROR: "Somthing went wrong in the server"
}

export const SENDER_EMAIL = "test@gmail.com"
export const STATUS_QUEUED = 250
export const STATUS_SENT = 200
export const STATUS_ACCEPTED = 202
export const STATUS_DROPED = 400

/**
 *  from left to right :
 *  second (0 - 59),
 *  minute (0 - 59)
 *  hour (0 - 23)
 *  day of month (1 - 31)
 *  month (1 - 12)
 *  day of week (0 - 7)
 */

export const SHEDULE_TIMER = "32 * * * *"

export const TIME_FORMAT = "HH:mm:ss"

/**
 * Time the emails should start to queue
 */
export const QUEUE_END = moment("08:00:00", TIME_FORMAT)
export const QUEUE_START = moment("20:00:00", TIME_FORMAT)
