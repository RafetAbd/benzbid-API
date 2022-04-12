import express, { Request, Response, NextFunction} from 'express';
import chalk from 'chalk';
import appRoutes from './app';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use('/app', appRoutes);

app.listen(process.env.PORT, () => {
    console.log(chalk.cyan`Listening on http://localhost:${process.env.PORT}`);
})