import { Router } from "express";
import { createCar, getAllCars, getOneCar, updateCar, deleteCar } from "../controllers/cars";
// import { addImageToCar } from "../controllers/cars";



const router = Router();

router.post('/', (createCar) );
router.get('/', (getAllCars) );
router.get('/:id', (getOneCar) );
router.put('/:id', (updateCar) );
// router.put('/image/:id', (addImageToCar) );
router.delete('/:id', (deleteCar) );

export default router;