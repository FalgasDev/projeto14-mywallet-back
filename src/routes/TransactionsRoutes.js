import { listTransactions, transactions } from '../controller/Transactions.js';
import { Router } from 'express';

const transactionsRouter = Router()

transactionsRouter.post('/transactions', transactions)
transactionsRouter.get('/wallet', listTransactions)

export default transactionsRouter