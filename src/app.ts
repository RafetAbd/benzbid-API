import express, { Request, Response, NextFunction, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
      message: ' bye world',
    });
  });

  console.log('hello world')

  export default router;