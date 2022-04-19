import { RequestHandler } from "express";
import { User, Message, Car, Bid } from "../../db";

// @route  POST api/bids, Create a new bid on a car
export const createBid: RequestHandler = async(req, res, next) => {
    try {
        const carId = req.body.carId;
        const userId = req.body.userId;
        const bid = await Bid.create({
            ...req.body,
            userId: userId,
            carId: carId
        });
        res.send(bid);
    } catch (err) {
        next(err);
    }
};