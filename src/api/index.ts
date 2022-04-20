import { Request, Response, NextFunction, Router} from 'express';
import carsRoute from './routes/cars';
import bidsRoute from './routes/bids';
import s3Route from './routes/s3';
import usersRoute from './routes/users';
const router = Router();
export default router;

// all s3 routes will be prefixed with /api/s3Url and will be handled by s3Route router
router.use('/s3Url', s3Route)

// all cars routes will be prefixed with /api/cars and will be handled by the carsRoute router
router.use('/cars', carsRoute);

// all bids routes will be prefixed with /api/bids and will be handled by the bidsRoute router
router.use('/bids', bidsRoute);

// all users routes will be prefixed with /api/users and will be handled by the usersRoute router
router.use('/users', usersRoute);
