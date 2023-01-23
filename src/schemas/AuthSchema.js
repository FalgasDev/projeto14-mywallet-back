import Joi from 'joi';

export const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().invalid('').required(),
});

export const signUpSchema = Joi.object({
	name: Joi.string().invalid('').required(),
	email: Joi.string().email().required(),
	password: Joi.string().invalid('').required(),
	confirm: Joi.string().invalid('').valid(Joi.ref('password')).required(),
});