import {loginOrEmailValidation, passwordValidation} from "../middlewares/authentication";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {Request, Response, Router} from "express";
import {usersRepository} from "../repositories/users-db-repositories";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authBearerMiddleware} from "../middlewares/authToken";


export const authRouter = Router({})

authRouter.post("/login",
    loginOrEmailValidation,
    passwordValidation,
    inputValidationMiddleware,
    async (req:Request, res: Response) => {

        let foundUserInDb = await usersRepository.checkUserLoginOrEmail(req.body.loginOrEmail)

        if (foundUserInDb) {

            let login = await usersService.loginUser(foundUserInDb, req.body.loginOrEmail, req.body.password)

            if (login) {

                const token = await jwtService.createJwtToken(foundUserInDb)

                res.status(200).json({
                    "accessToken": token
                })

            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401)
        }

    })

authRouter.get("/me",
    authBearerMiddleware,
    async (req:Request, res: Response) => {

    const meUser = await usersRepository.findUserById(req.user!.id)

        //console.log(meUser)

        res.status(200).send({
            userId: meUser?.id,
            login: meUser?.login,
            email: meUser?.email
        })

})