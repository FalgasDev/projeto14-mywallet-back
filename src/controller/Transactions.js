import dayjs from 'dayjs';
import db from '../config/database.js';

export async function transactions(req, res) {
	const { value, description, type } = req.body;
	const session = res.locals.session

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
	const session = res.locals.session

	const transactions = await db
		.collection('transactions')
		.find({ userId: session.userId })
		.toArray();

	res.send(transactions.reverse());
}
