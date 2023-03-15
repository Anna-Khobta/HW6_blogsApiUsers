// import {authBearerMiddleware} from "../middlewares/authToken";
// import {contentCommentValidation} from "../middlewares/comments-validation";
// import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
// import {Request, Response, Router} from "express";
// import {postsQueryRepositories} from "../repositories/posts-query-repositories";
// import {commentsService} from "../domain/comments-service";
// import {getPagination} from "../functions/pagination";
// import {commentsQueryRepositories} from "../repositories/comments-query-repositories";
//
//
// export const postsCommentsRouter = Router({})
//
//     // create new comment
// postsCommentsRouter.post('posts/:postId/comments',
//     authBearerMiddleware,
//     contentCommentValidation,
//     inputValidationMiddleware,
//     async (req: Request, res: Response ) => {
//
//         let findPostID = await postsQueryRepositories.findPostById(req.params.postId)
//
//         const userInfo = req.user
//
//         if (findPostID) {
//             const newComment = await commentsService.createComment(req.body.content, userInfo!)
//             res.status(201).send(newComment)
//         } else {
//             return res.send(404)
//         }
//     })
//
//
//     // return comments for special post with Pagination
// postsCommentsRouter.get('posts/:postId/comments',
//     async (req: Request, res: Response ) => {
//
//         const {page, limit, sortDirection, sortBy, skip} = getPagination(req.query)
//
//         let findPostID = await postsQueryRepositories.findPostById(req.params.postId)
//
//         if (findPostID) {
//             const foundComments = await commentsQueryRepositories.findCommentsForPost(page, limit, sortDirection, sortBy, skip)
//             res.status(200).send(foundComments)
//         } else {
//             return res.send(404)
//         }
//     })
//
