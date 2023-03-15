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


    async findFeedbacks(title: string | null | undefined): Promise<PostType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find((filter), {projection: {_id: 0}}).toArray()
    },

    // TO DO вынести блог в блоги или отдельно

    async findBlogName(blogId: string): Promise <BlogType | null> {

        let foundBlogName = await blogsCollection.findOne({id: blogId}, {projection: {_id: 0}})

        return foundBlogName || null
    },










    async deleteAllPosts(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.acknowledged
        // если всё удалит, вернет true
    }
}