import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const jwtToken = jwt.sign({ userId: 1 }, 'secret')


async function verifyJWT(req: Request, res: Response, next: any) {
    next()
}

export default verifyJWT