
import {Request, Response, Router} from "express";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {titleValidation, shortDescriptionValidation, contentValidation, idValidation} from "../middlewares/posts-validations";

import {postsService} from "../domain/posts-service";
import {getPagination} from "../functions/pagination";
import {postsQueryRepositories} from "../repositories/posts-query-repositories";



export const postsRouter = Router({})


postsRouter.get('/',
    async (req: Request, res: Response ) => {

       const {page, limit, sortDirection, sortBy, skip} = getPagination(req.query)


        let foundPosts = await postsQueryRepositories.findPosts(page, limit, sortDirection, sortBy, skip)
        res.status(200).send(foundPosts)
    })


postsRouter.get('/:id', async (req: Request, res: Response ) => {

    let findPostID = await postsQueryRepositories.findPostById(req.params.id)

    if (findPostID) {
        return res.status(200).send(findPostID)
    } else {
        return res.send(404)
    }
})


postsRouter.post('/',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response ) => {


        const newPostWithoughtID = await postsService.createPost(req.body.title,
            req.body.shortDescription, req.body.content, req.body.blogId )

        if (newPostWithoughtID) {
            res.status(201).send(newPostWithoughtID)
        } else {
            return res.send(404)
        }
    })


postsRouter.put('/:id',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res:Response) => {

    const updatedPosWithoughtID = await postsService.updatePost(req.params.id, req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId )

        if (updatedPosWithoughtID) {
            res.send(204)

        } else {
            return res.send(404)
        }
    })



postsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response ) => {

        const isDeleted = await postsService.deletePost(req.params.id)

        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })


