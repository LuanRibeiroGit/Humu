import { Router } from 'express'
import { TransferController } from '../modules/transfers/transfer.controller'
import { TransferService } from '../modules/transfers/transfer.service'

const router = Router()
const transferService = new TransferService()
const transferController = new TransferController(transferService)

router.post('/transfer', (req, res) => transferController.transfer(req, res))

export default router
