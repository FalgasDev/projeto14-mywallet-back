import db from "../config/database.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) return res.status(422).send('Informe o token');

	const session = await db.collection('sessions').findOne({ token });

	if (!session) return res.sendStatus(401);

  res.locals.session = session

  next()
}