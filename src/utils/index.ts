
import { NextFunction, Request, Response, Router } from "express"
import mongoose from "mongoose"
import { getEmailStatusString, getEmailStatus, setEmailScheduler} from "./emailUtils"

type Wrapper = ((router: Router) => void)

const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
  for (const f of middleware) {
    f(router)
  }
}

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void

interface Route {
  path: string
  method: string
  handler: Handler | Handler[]
}

const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](path, handler)
  }
}

const connectDatabase = async () => {

  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_Password}@different-email-7rxdy.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true
    })
    console.log("connected to database")

  } catch (err) {
    console.log("error in database ", err)
  }
}

export {
  connectDatabase,
  applyMiddleware,
  getEmailStatus,
  setEmailScheduler,
  applyRoutes,
  getEmailStatusString
}
