import * as sequelize from "sequelize";
import * as pkg from '../../package.json';

const databaseName:string = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config: {
    logging?: boolean,
    dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: boolean,
    //         require: boolean
    //     }
    }
} = {
    logging: false,
    dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: true,
    //         require: true
    //     }
    },
  };

if (process.env.LOGGING === 'true') {
    delete config.logging;
}

if ( process.env.DATABASE_URL ) {
    config.dialectOptions = {
        // ssl: {
        //     rejectUnauthorized: false,
        //     require: true
        // }
    };
}

const db: any = new sequelize.Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config);

export default db;