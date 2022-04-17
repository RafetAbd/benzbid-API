import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';

interface CarModel extends Model {
    id?: number;
    model: string;
    year: number;
    imageUrl: string;
    description: string;
    price: number;
    status: string;
    location: string;
    endTimeAndDate: string;
    s3id: string;
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
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: '/mercedes default.jpg'
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
        defaultValue: 'Active'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endTimeAndDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    s3id: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Car;
