import jwt from 'jsonwebtoken'
import {UserType} from "../repositories/types";
import {settings} from "../settings";
import {ObjectId} from "mongodb";


export const jwtService = {
    async createJwtToken(foundUserInDb: UserType) {

/*        const payload = {
            id: foundUserInDb.id,
            login: foundUserInDb.login
        }*/


        const token = jwt.sign({userId: foundUserInDb.id}, settings.JWT_SECRET, {expiresIn: '1h'})

        return token


    },

    async getUserIdByToken(tokenFromHead: string) {

        try {
            const result: any = jwt.verify(tokenFromHead, settings.JWT_SECRET) // если verify не сработает, упадет ошибка

            //console.log(result)
            return result.userId

        } catch (error) {
            return null
        }
    }
}