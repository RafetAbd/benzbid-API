import express, { Request, Response, NextFunction} from 'express';
import chalk from 'chalk';
import appRoutes from './app';

const app = express();

app.use('/app', appRoutes);


const port = process.env.PORT || 1337

app.listen(port, () => {
    console.log(chalk.cyan`Listening on http://localhost:${port}`);
})