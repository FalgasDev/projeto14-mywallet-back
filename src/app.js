import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
	await mongoClient.connect();
	db = mongoClient.db();
} catch (error) {
	console.log(error);
}

server.post('/sign-up', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (await db.collection('users').findOne({ email })) {
			return res.status(409).send('Você já tem uma conta');
		}

		const passwordHashed = bcrypt.hashSync(password, 10);

		await db.collection('users').insertOne({
			name,
			email,
			password: passwordHashed,
		});

		res.sendStatus(201);
	} catch (error) {
		res.status(500).send('Houve algum problema com o banco de dados');
	}
});

server.post('/sign-in', async (req, res) => {
	const { email, password } = req.body;

	const user = await db.collection('users').findOne({ email });

	if (!user) return res.status(401).send('Usuário ou senha incorretos');

	if (!bcrypt.compareSync(password, user.password))
		return res.status(401).send('Usuário ou senha incorretos');

	const userToken = await db
		.collection('sessions')
		.findOne({ userId: user._id });

	const token = uuid();

	if (userToken) {
		await db
			.collection('sessions')
			.updateOne({ userId: user._id }, { $set: { token } });
	} else {
		await db.collection('sessions').insertOne({
			token,
			userId: user._id,
		});
	}

	res.send(token);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`O server ta rodando na porta ${PORT}`));
