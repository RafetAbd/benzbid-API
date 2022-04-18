import { Request, Response, NextFunction, Router} from 'express';
import carsRoute from './routes/cars';
const router = Router();
export default router;


// all cars routes will be prefixed with /api/cars and will be handled by the carsRoute router
router.use('/cars', carsRoute);