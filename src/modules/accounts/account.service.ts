import { PrismaClient } from "@prisma/client"
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'

const prisma = new PrismaClient()

export class AccountService {
    async findOne (accounts: number, type: string){
        const account = await prisma.account.findUnique({
            where: { number: accounts },
        })
        if (!account)throw new HttpExceptionFilter(`Conta ${type} não encontrada`, 404)
        return account
    }
}