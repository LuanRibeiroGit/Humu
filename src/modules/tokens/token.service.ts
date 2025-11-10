import { PrismaClient } from "@prisma/client"
import { AccountService } from "../accounts/account.service"
const jwt = require('jsonwebtoken')

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'

export class TokenService {
    constructor(
        private accountService: AccountService
    ) {}
    async generate(accounts: number) {
        if (!accounts) throw new HttpExceptionFilter('Dados inválidos', 400)
        const account = await this.accountService.findOne(accounts, "generate")

        const token = jwt.sign(
            { 
                account: account.number
            },
            process.env.JWT_TOKEN,
            { expiresIn: '7d' }
        )
        return token
    }
}