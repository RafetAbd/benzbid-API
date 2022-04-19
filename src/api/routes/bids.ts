import { Router } from "express";
import { createBid } from "../controllers/bids";


const router = Router();

router.post('/', (createBid))

export default router;