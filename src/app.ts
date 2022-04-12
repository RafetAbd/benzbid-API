import express, { Request, Response, NextFunction, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
      message: ' byr byr',
    });
  });

  console.log('hi')

  export default router;