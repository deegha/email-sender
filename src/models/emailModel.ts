  import mongoose, { connect } from "mongoose"
  import { EmailDatabseInterface } from "../intrerfaces/EmailInterface"

  export const EmailSchema = new mongoose.Schema({
    to: { type: String, required: true },
    from: { type: String, required: true },
    text: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true },
  })

  const Email = mongoose.model<EmailDatabseInterface>("Email", EmailSchema)
  export default Email
