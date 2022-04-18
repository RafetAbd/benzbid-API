import { RequestHandler } from "express";
import { User, Message, Car } from "../../db";
import axios from "axios";

type googleGeoResponse = {
    results: {geometry: { location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

// @route   GET api/cars/, create a new car post
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

// @route   GET api/cars, get all cars list
export const getAllCars: RequestHandler = async(req, res, next) => {
    try {
        const cars = await Car.findAll();
        res.send(cars);
    } catch (err) {
        next(err);
    }
};

// @route   GET api/cars/:id, get a car post
export const getOneCar: RequestHandler<{id: string}> = async(req, res, next) => {
    try {
        const car = await Car.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'email', 'name', 'imageUrl']
            },
            {
                model: Message,
                as: 'messages',
            }]
        });
        res.send(car);
    } catch (err) {
        next(err);
    }
};

// @route   PUT api/cars/:id, update a car post
export const updateCar: RequestHandler<{id: string}> = async(req, res, next) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        const updatedCar = await car.update(req.body);   
        res.send(updatedCar);
    } catch (err) {
        next(err);
    }
};

// @route   DELETE api/cars/:id, delete a car post
export const deleteCar: RequestHandler<{id: string}> = async(req, res, next) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        await car.destroy();
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
