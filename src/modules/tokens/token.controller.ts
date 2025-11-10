import { Request, Response } from 'express'
import { TokenService } from './token.service'
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'



export class TokenController {

    constructor(
        private tokenService: TokenService
    ) {}
    
    async generate (req: Request, res: Response) {
        const { account } = req.body
        try {
            const token = await this.tokenService.generate(account)

            return res.status(200).json({ token: token })
        } catch (error: any) {
            if (error instanceof HttpExceptionFilter) {
                return res.status(error.statusCode).json({ message: error.message })
            }
            console.error("Erro ao gerar o token:", error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }
}

