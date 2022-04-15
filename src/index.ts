import chalk from 'chalk';
import app from './app';
import seed from './script/seed';
import { db } from './db/index';
import {Server,  Socket } from "socket.io";
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
        
        const io = new Server(app.listen(process.env.PORT, () => {
            console.log(chalk.cyanBright`Listening on http://localhost:${process.env.PORT}`)
        }))

        io.on("connection", (socket: Socket) => {
            console.log(chalk.bgGreenBright(`USER (${socket.id}) has made a persistent connection to the server!`))
            // the next two lines will log if a user disconnect.
            socket.on('disconnect', function () {
              console.log(chalk.bgRedBright(`USER (${socket.id}) disconnected`));
            });
        })

} catch (err) {
    console.log(chalk.red(err));
}
}

init()


