import mongoose from "mongoose"

export interface EmailDtoInterface {
  to: string
  content: string
  subject: string
}

export  interface EmailDatabseInterface extends mongoose.Document {
  to: string,
  from: string,
  text: string
  subject: string,
  status: string
}

export interface Response {
  id: string,
  status: string
}
