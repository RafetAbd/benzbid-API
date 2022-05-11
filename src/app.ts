import express, { Request, Response, NextFunction, Router} from 'express';
import authRouter from './auth';
import apiRouter from './api';
import { json } from 'body-parser';
import  cors  from 'cors';

const app = express()

// body parsing middleware
app.use(json())

app.use(cors({
  origin: '*'
}));



// auth and api routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send({
//       message: ' bye world',
//     });
//   });

//   console.log('hello world')

  // error handling middleware.
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
  });

  export default app;