
import {usersRepository} from "../repositories/users-db-repositories";
import {UserType} from "../repositories/types";

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5);


export const usersService= {

    async createUser(login:string, email:string, password: string): Promise <UserType | null> {

        const hashPassword = await bcrypt.hash(password, salt)

        // bcrypt.hashSync(password, salt);

        const newUser = {
            id: (+(new Date())).toString(),
            login: login,
            email: email,
            password: hashPassword,
            createdAt: (new Date()).toISOString()
        }

        const newUserWithoughtId = await usersRepository.createUser(newUser)
        return newUserWithoughtId

    },

    async loginUser(foundUserInDb:UserType, loginOrEmail: string, password: string): Promise <boolean> {

        const validPassword: boolean = await bcrypt.compare(password, foundUserInDb.password)

        return validPassword

    },

    async deleteUser(id: string): Promise<boolean> {

        return await usersRepository.deleteUser(id)
    },

    async deleteAllUsers(): Promise<boolean> {
        return usersRepository.deleteAllUsers()

    },

    async findUserById(userId:string) {
        return await usersRepository.findUserById(userId)
    }



}