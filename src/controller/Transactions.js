import dayjs from 'dayjs';
import db from '../config/database.js';

export async function transactions(req, res) {
	const { value, description, type } = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) return res.sendStatus(401);

	const session = await db.collection('sessions').findOne({ token });

	if (!session) return res.sendStatus(401);

	await db.collection('transactions').insertOne({
		date: dayjs(Date.now()).format('DD/MM'),
		value,
		description,
		type,
		userId: session.userId,
	});

	res.sendStatus(201);
}

export async function listTransactions(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) return res.sendStatus(401);

	const session = await db.collection('sessions').findOne({ token });

	if (!session) return res.sendStatus(401);

	const transactions = await db
		.collection('transactions')
		.find({ userId: session.userId })
		.toArray();

	res.send(transactions.reverse());
}
