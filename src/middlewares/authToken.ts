
import {NextFunction, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";

export const authBearerMiddleware = async (req: Request, res:Response, next:NextFunction) => {

    if (!req.headers.authorization) {
        return res.send(401)
    }

    const tokenFromHead = req.headers.authorization?.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(tokenFromHead)

    if (userId) {
        req.user = await usersService.findUserById(userId.toString())
        next()
    }

    res.sendStatus(401)

}



/*

    try {
        if (!tokenFromHead) {
    return res.sendStatus(401)
    }
        const decodedToken = jwt.verify(tokenFromHead, settings.JWT_SECRET)
        req.user = decodedToken
            next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
        }
    })

*/
