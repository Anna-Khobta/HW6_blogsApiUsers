import {SortDirection} from "mongodb";
import {commentsCollection} from "./db";
import {CommentType} from "./types";


export const commentsQueryRepositories = {
    async findComments (page: number, limit:number,
                        sortDirection: SortDirection,
                        sortBy: string, skip: number) {
        const findComments = await commentsCollection.find(
            {},
            {projection: {_id: 0}})
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortDirection })
            .toArray()

        const total = await commentsCollection.countDocuments()
        const pagesCount = Math.ceil(total/limit)

        return {
            pagesCount: pagesCount,
            page: page,
            pageSize: limit,
            totalCount: total,
            items: findComments
        }

    },

    async findCommentById(id: string): Promise<CommentType | null> {

        const foundComment: CommentType | null = await commentsCollection.findOne({id: id}, {projection: {_id: 0}})

        if (foundComment) {
            return foundComment
        } else {
            return null
        }
    }
}