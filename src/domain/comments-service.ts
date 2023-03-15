import {CommentType, PostType, UserType} from "../repositories/types";
import {postsRepositories} from "../repositories/posts-db-repositories";
import {commentsRepositories} from "../repositories/comments-db-repositories";
import {commentsCollection} from "../repositories/db";
import {usersRepository} from "../repositories/users-db-repositories";

export const commentsService = {

    async createComment (content: string, userInfo : UserType) : Promise<CommentType | null | undefined> {

        const commentatorInfo = {
            userId: userInfo.id,
            userLogin: userInfo.login
        }

        const newComment = {
            id: (+(new Date())).toString(),
            content: content,
            commentatorInfo: commentatorInfo,
            createdAt: (new Date()).toISOString()
        }

            const newCommentToDb = await commentsRepositories.createComment(newComment)

            return newCommentToDb


        },


    async checkUser(userInfo: UserType, id: string) : Promise <boolean | undefined> {

        const commentatorInfo = {
            userId: userInfo.id,
            userLogin: userInfo.login
        }

        const foundCommentOwner = await commentsCollection.findOne({id: id}, {projection: {_id: 0}})

        if (foundCommentOwner) {
            if (foundCommentOwner.commentatorInfo === commentatorInfo) {
                return true
            }
        }

    },

    async updateComment (id: string, content: string): Promise<boolean | undefined> {

        let foundCommentById = await commentsRepositories.findCommentById(id)

        if (foundCommentById) {

            return await commentsRepositories.updateComment(id, content)
        }
    },

    async deleteComment (id: string): Promise<boolean> {

        return commentsRepositories.deleteComment(id)
    },

    async deleteAllComments(): Promise<boolean> {
        return commentsRepositories.deleteAllComments()

    }
}