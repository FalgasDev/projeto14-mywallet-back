import { listTransactions, transactions } from '../controller/Transactions.js';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createTransactionSchema } from '../schemas/TransactionsSchema.js';
import { tokenValidation } from '../middlewares/TokenMiddleware.js';

const transactionsRouter = Router()

transactionsRouter.post('/transactions', tokenValidation, validateSchema(createTransactionSchema),transactions)
transactionsRouter.get('/wallet', tokenValidation, listTransactions)

export default transactionsRouter