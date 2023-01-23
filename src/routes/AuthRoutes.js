import { signIn, signUp } from '../controller/Auth.js';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import {signInSchema, signUpSchema} from '../schemas/AuthSchema.js'

const authRouter = Router()

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);

export default authRouter