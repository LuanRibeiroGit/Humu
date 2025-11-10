import { PrismaClient } from "@prisma/client"
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'

export class TransferService {
    async create (sourceAccount: number, destinationAccount: number, amount: number) {
        if (!sourceAccount || !destinationAccount || !amount) {
            throw new HttpExceptionFilter('Dados inválidos', 400)
        }
        const source = await prisma.account.findUnique({
            where: { number: sourceAccount },
        })

        console.log(source)
        if (!source || source.balance < amount) {
            throw new HttpExceptionFilter('Saldo insuficiente')
        }

        const destination = await prisma.account.findUnique({
            where: { number: destinationAccount },
        })

        console.log(destination)

        if (!destination) {
            throw new HttpExceptionFilter('Conta destino não encontrada', 404)
        }
        await prisma.transfer.create({
            data: {
                id: uuid(),
                source_account: sourceAccount,
                destination_account: destinationAccount,
                amount,
                created_by: 'tokenData.userId',
            },
        })
        await prisma.account.update({
            where: { number: sourceAccount },
            data: { balance: source.balance - amount },
        })
        await prisma.account.update({
            where: { number: destinationAccount },
            data: { balance: destination.balance + amount },

        })
        return { success: true }
    }
}

