import * as dotenv from 'dotenv'
dotenv.config()

import connectDatabase from "./libs/db_connect"
import express from 'express'
import { errorHandler } from "@mylibs/express_errors"

import routes from './routes'

const port = process.env.PORT;

const app = express();

async function init() {
    await connectDatabase()

    app.use(express.json({ limit: 1024 * 1024 * 50, }))
    app.use(express.urlencoded({ limit: 1024 * 1024 * 50, extended: true }))

    app.use(routes)

    app.use(errorHandler)

    app.listen(port, () => {
        console.log(`[server]: 👀 Server is watching at http://localhost:${port}`);
    })
}

init()
