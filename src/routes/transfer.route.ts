import { Router } from 'express'
import { TransferController } from '../modules/transfers/transfer.controller'
import { TransferService } from '../modules/transfers/transfer.service'
import { AccountService } from '../modules/accounts/account.service'

const router = Router()
const accountService = new AccountService()
const transferService = new TransferService(accountService)
const transferController = new TransferController(transferService)

router.post('/transfer', (req, res) => transferController.transfer(req, res))

export default router
