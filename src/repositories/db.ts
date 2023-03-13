import {MongoClient} from "mongodb";

export type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,

}

export type UserType = {
    id: string,
    login: string,
    email: string,
    password: string,
    createdAt: string
}


const mongoUri = process.env.MONGO_URL

if (!mongoUri) {
    throw new Error("❗️ Url doesn't found")
}

//

const client = new MongoClient(mongoUri)
const db = client.db();
export const blogsCollection = db.collection<BlogType>("Blogs");
export const postsCollection = db.collection<PostType>("Posts");
export const usersCollection = db.collection<UserType>("Users");

export async function runDb () {
    try {
        // connect the client to the server
        await client.connect()
        // esteblish and verufy connection
        await db.command({ ping: 1});
        console.log(" ✅ Connected successfully to mongo server");

    } catch {
        console.log(" ❗️ Can't connect to db");
        // Ensure that the client will close when you finish/error
        await client.close();
    }
}