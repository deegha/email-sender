import dotenv from "dotenv"
import express from "express"

import http from "http"
import { applyMiddleware, applyRoutes, connectDatabase, setEmailScheduler } from "./utils"

import middleware from "./middleware"
import routes from "./middleware/routes"

dotenv.config()

const port = process.env.SERVER_PORT
const router = express()
applyMiddleware(middleware, router)
applyRoutes(routes, router)
connectDatabase()

const server = http.createServer(router)

setEmailScheduler("32 * * * *")

server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` )
})
