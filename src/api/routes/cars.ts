import { Router } from "express";
import { createCar, getAllCars, getOneCar, updateCar, deleteCar } from "../controllers/cars";


const router = Router();

router.post('/',  (createCar) );
router.get('/',  (getAllCars) );
router.get('/:id',  (getOneCar) );
router.put('/:id',  (updateCar) );
router.delete('/:id',  (deleteCar) );

export default router;