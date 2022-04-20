import { Router } from "express";
import { updateUser } from "../controllers/users";


const router = Router();

router.put('/:id', (updateUser) );

export default router;