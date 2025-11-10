import { Router } from 'express'
const router = Router()

import { AccountService } from '../modules/accounts/account.service'
import { TokenController } from '../modules/tokens/token.controller'
import { TokenService } from '../modules/tokens/token.service'

const accountService = new AccountService()
const tokenService = new TokenService(accountService)
const tokenController = new TokenController(tokenService)

router.post('/generate', (req, res) => tokenController.generate(req, res))
export default router
