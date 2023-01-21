import Joi from 'joi';

export const createTransactionSchema = Joi.object({
	value: Joi.number().min(1).required(),
	description: Joi.string().min(1).required(),
	type: Joi.string().valid('entry', 'exit').required(),
});