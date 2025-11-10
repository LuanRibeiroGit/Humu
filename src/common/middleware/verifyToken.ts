import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'


async function verifyJWT(req: Request, res: Response, next: any) {
    const authHeader = req.headers["authorization"]
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Token não fornecido", status: 0 })
    }

    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({ message: "Token inválido", status: 0 })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || 'humu teste :)') as { token: string; }
        (req as any).user = decoded

        next()
    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado", status: 0 })
    }
}

export default verifyJWT