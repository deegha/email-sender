import {email} from "../controllers/EmailController"

export default [
  {
    method: "get",
    path: "/",
    handler: email.sendEmail
  },
  {
    method: "post",
    path: "/v1/emails",
    handler: email.sendEmail
  },
  {
    method: "get",
    path: "/v1/emails/:id",
    handler: email.checkEmailStatus
  },
  {
    method: "post",
    path: "/v1/webhook",
    handler: email.handleWebHook
  }
]
