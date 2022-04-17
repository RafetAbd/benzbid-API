import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';

interface CarModel extends Model {
    id?: number;
    model: string;
    year: number;
    description: string;
    price: number;
    status: string;
    coordinateLat: number;
    coordinateLng: number;
    endTimeAndDate: string;
    awsUrl: string;
}

type CarModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CarModel;
}

const Car = <CarModelStatic>db.define('car', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1920,
            max: 2023,
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    coordinateLat: {
        type: DataTypes.DECIMAL,
    },
    coordinateLng: {
        type: DataTypes.DECIMAL,
    },
    endTimeAndDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    awsUrl: {
        type: DataTypes.STRING,
        defaultValue: '/mercedes default.jpg'
    }
});

export default Car;
