// import express, { Request, Response, NextFunction} from 'express';
import chalk from 'chalk';
import app from './app';
import seed from './script/seed';
import { db } from './db/index';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as dotenv from 'dotenv';
dotenv.config();



const init = async () => {
    try {
        if (  process.env.SEED === 'true' ) {
            await seed();
        } else {
            await db.sync();
            console.log(chalk.blueBright('Database synced'));
        };

        const httpServer = createServer(app);

        const io = new Server(httpServer) 
        // pass the http server into the socket server

        io.on('connection', (socket: Socket) => {
            console.log(chalk.greenBright(`USER (${socket.id}) has made a persistent connection to the server!`))
            // the next two lines will log if a user disconnect.
            socket.on('disconnect', function () {
              console.log(chalk.redBright(`USER (${socket.id}) disconnected`));
            });
        })

        httpServer.listen(process.env.PORT, () => {
            console.log(chalk.cyan`Listening on http://localhost:${process.env.PORT}`);
        })

} catch (err) {
    console.log(chalk.red(err));
}
}

init()

