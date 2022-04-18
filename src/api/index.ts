import { Request, Response, NextFunction, Router} from 'express';
import carsRoute from './routes/cars';
const router = Router();
export default router;

router.use('/cars', carsRoute);