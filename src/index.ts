import * as dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from 'express'

import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {deleteAllRouter} from "./routers/delete-all-routers";
import {usersRouter} from "./routers/users-router";
import {runDb} from "./repositories/db";
import {authRouter} from "./routers/auth-router";
import {postsCommentsRouter} from "./routers/posts-comments-router";




// create express app
export const app = express()
const port = process.env.PORT || 3004

app.use(express.json())

app.get('/', (req: Request, res: Response ) => {
    let helloMessage = 'Hello Samurai!'
    res.send(helloMessage)
})

app.use('/blogs', blogsRouter)

app.use('/', deleteAllRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)

//app.use('/', postsCommentsRouter)



//start app
const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})
}

startApp()