import express from 'express';
import cors from 'cors';
import authRouter from './routes/AuthRoutes.js';
import transactionsRouter from './routes/TransactionsRoutes.js';

const server = express();
server.use(cors());
server.use(express.json());
server.use([ authRouter, transactionsRouter ])

const PORT = 5000;

server.listen(PORT, () => console.log(`O server ta rodando na porta ${PORT}`));
