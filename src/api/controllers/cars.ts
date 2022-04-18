import { RequestHandler } from "express";
import  Car  from "../../db/models/Car";
import { User } from "../../db/models/User";
import axios from "axios";

type googleGeoResponse = {
    results: {geometry: { location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

export const createCar: RequestHandler = async(req, res, next) => {
    try {
        const address = req.body.address;
        const userId = req.body.userId;
        const coordinates = await axios.get<googleGeoResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.GOOGLE_API_KEY}`);
        const car = await Car.create({
            ...req.body,
            coordinateLat: coordinates.data.results[0].geometry.location.lat,
            coordinateLng: coordinates.data.results[0].geometry.location.lng,
            userId
        });
        res.send(car);
    } catch (err) {
        next(err);
    }
};

export const getAllCars: RequestHandler = (req, res, next) => {
};

export const getOneCar: RequestHandler<{id: string}> = (req, res, next) => {
};

export const updateCar: RequestHandler<{id: string}> = (req, res, next) => {
};

export const deleteCar: RequestHandler<{id: string}> = (req, res, next) => {
};
