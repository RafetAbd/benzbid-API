import { Request, Response, NextFunction, Router} from 'express';
import { User } from '../db';
const router = Router();
export default router;

// recieve a email, passowrd then verify and response with a token.
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({ token: await User.authenticate(req.body.email, req.body.password) });
    } catch(err) {
        next(err);
    }
});

// recieve user info, create a new user and response with a token.
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        res.send({ token: user.generateToken() });
    } catch(err) {
        if ((err as Error).name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
          } else {
            next(err)
          }
    }
})

// recieve a token, verify and response with a user.
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await User.findByToken(req.headers.authorization as string));
    } catch(err) {
        next(err);
    }
})