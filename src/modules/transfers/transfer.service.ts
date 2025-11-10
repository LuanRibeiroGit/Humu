import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'
import { AccountService } from "../accounts/account.service"

export class TransferService {
    constructor(
        private accountService: AccountService
    ) {}
    async create (sourceAccount: number, destinationAccount: number, amount: number, accountReq: number) {
        console.log(accountReq, sourceAccount)
        if(accountReq != sourceAccount) throw new HttpExceptionFilter('Não autorizado.', 401)
        if (!sourceAccount || !destinationAccount || !amount) throw new HttpExceptionFilter('Dados inválidos', 400)
        if(sourceAccount == destinationAccount) throw new HttpExceptionFilter('A conta de destino não pode ser a mesma do envio', 400)

        await prisma.$transaction(async (tx) => {
            const source = await this.accountService.findOne(sourceAccount, 'source')
            await this.balance(source, amount)
            const destination = await this.accountService.findOne(destinationAccount, 'destination')
            await tx.transfer.create({
                data: {
                    source_account: sourceAccount,
                    destination_account: destinationAccount,
                    amount,
                    created_by: 'tokenData.userId',
                },
            })
            await tx.account.update({
                where: { number: sourceAccount },
                data: { balance: source.balance - amount },
            })
            await tx.account.update({
                where: { number: destinationAccount },
                data: { balance: destination.balance + amount },
            })
        })
        return { success: true }
    }

    async balance (source: any, amount: number){
        if (!source || source.balance < amount) throw new HttpExceptionFilter('Saldo insuficiente')
    }
}

