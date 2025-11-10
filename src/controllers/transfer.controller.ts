import { Request, Response } from 'express'
import { TransferService } from '../services/transfer.service'
import { HttpExceptionFilter } from '../common/filters/http-exception.filter'



export class TransferController {
    private transferService: TransferService

    constructor(transferService: TransferService) {
        this.transferService = transferService
    }
    async transfer (req: Request, res: Response) {
        const { sourceAccount, destinationAccount, amount } = req.body
        console.log(sourceAccount, destinationAccount, amount)
        try {
            await this.transferService.create(sourceAccount, destinationAccount, amount)
            return res.status(200).json({ success: true })
        } catch (error: any) {
            if (error instanceof HttpExceptionFilter) {
                return res.status(error.statusCode).json({ message: error.message })
            }
            console.error("Erro ao processar transferência:", error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }
}

