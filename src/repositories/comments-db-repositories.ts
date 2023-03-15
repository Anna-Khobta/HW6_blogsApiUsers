import {blogsCollection, postsCollection, commentsCollection} from "../repositories/db";

import {BlogType, PostType, CommentType} from "./types";


export const commentsRepositories = {

    async createComment(newComment: CommentType): Promise<CommentType | null | undefined> {

        const newCommentInDb = await commentsCollection.insertOne(newComment)

        const newCommentWithoughtID= commentsCollection.findOne({id: newComment.id},{projection:{_id:0}})

        return newCommentWithoughtID

    },


    async findCommentById (id: string): Promise <CommentType | null> {
        let foundCommentById = await commentsCollection.findOne({id: id}, {projection: {_id: 0}})
        return foundCommentById || null
    },

    async updateComment(id: string, content: string): Promise<boolean | undefined> {

        const updatedComment = await commentsCollection.updateOne({id: id},
            {$set: {content: content }})

        return updatedComment.matchedCount === 1
    },

    async deleteComment(id: string): Promise<boolean> {

        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
        // если 1 сработало. если 0, то нет
    },


    async deleteAllComments(): Promise<boolean> {
        const result = await commentsCollection.deleteMany({})
        return result.acknowledged
        // если всё удалит, вернет true

    },
}