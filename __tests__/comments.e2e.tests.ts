import {app} from "../src/settings";
import request from "supertest"
import {BlogType} from "../src/repositories/types";



const auth = {login: 'admin', password: 'qwerty'}

describe('/', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('Post, blog, with authorization', async () => {

        const createdResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${Buffer.from(`${auth.login}:${auth.password}`).toString('base64')}`)
            .send({
                "name": "anna",
                "description": "1 description",
                "websiteUrl": "1google.com"
            })
            .expect(201)

        const createdBlog = createdResponse.body

        const expectedBlog = {
            id: expect.any(String),
            name: "anna",
            description: "1 description",
            websiteUrl: "1google.com",
            "createdAt": createdBlog.createdAt,
            isMembership: false
        }

        expect(createdBlog).toEqual(expectedBlog)


        const getResponse = await request(app)
            .get('/blogs/' + createdBlog.id)
            .expect(200).send(createdBlog)


    })
})


describe('/', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('Get, 10 blogs, with pagination', async () => {

        await request(app).delete('/testing/all-data')

        let blogs: BlogType[] = []

        for (let i = 0; i < 10; i++) {
            const createdResponse1 = await request(app)
                .post('/blogs')
                .set('Authorization', `Basic ${Buffer.from(`${auth.login}:${auth.password}`).toString('base64')}`)
                .send({
                    "name": "Anna",
                    "description": "1 description",
                    "websiteUrl": "1google.com"
                })
            blogs.push(createdResponse1.body)
        }

        await request(app)
            .get('/blogs?' + 'sortDirection=asc' + '&pageSize=20' + '&page=2')
            .expect(200, {
                "pagesCount": 1,
                "page": 1,
                "pageSize": 20,
                "totalCount": blogs.length,
                "items": blogs
            })
    })
})


describe('/', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('Get, 12 comments, with pagination', async () => {

        await request(app).delete('/testing/all-data')

        const createdResponseBlog = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${Buffer.from(`${auth.login}:${auth.password}`).toString('base64')}`)
            .send({
                "name": "Anna",
                "description": "1 description",
                "websiteUrl": "1google.com"
            })
            .expect(201)

        const createdBlog = createdResponseBlog.body

        const expectedBlog = {
            id: expect.any(String),
            name: "anna",
            description: "1 description",
            websiteUrl: "1google.com",
            "createdAt": createdBlog.createdAt,
            isMembership: false
        }

        expect(createdBlog).toEqual(expectedBlog)


        const createdResponsePost = await request(app)
            .post('/posts')
            .set('Authorization', `Basic ${Buffer.from(`${auth.login}:${auth.password}`).toString('base64')}`)
            .send({
                "title": "post title",
                "shortDescription": "post string",
                "content": "post string",
                "blogId": createdBlog.id
            })
            .expect(201)
        const createdPost = createdResponsePost.body




        // await request(app)
        //     .get('/blogs?' + 'sortDirection=asc' + '&pageSize=20' + '&page=2')
        //     .expect(200, {
        //         "pagesCount": 1,
        //         "page": 1,
        //         "pageSize": 20,
        //         "totalCount": blogs.length,
        //         "items": blogs
        //     })
    })
})
