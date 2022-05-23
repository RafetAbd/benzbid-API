import chalk from 'chalk';
import {
    db,
    User,
    Bid,
    Message,
    Car,
} from '../db';

async function seed() {
    await db.sync({ force: true });
    console.log(chalk.bgWhiteBright('Database synced'));

    const users = await Promise.all([
        User.create({
            name: 'John Doe',
            email: 'john@mail.com',
            password: '12345',
            imageUrl: '/Beard Man Emoji.png'
        }),
        User.create({
            name: 'Samantha Brown',
            email: 'sami@mail.com',
            password: '12345',
            imageUrl: '/Doctor Emoji - Woman.png'
        }),
        User.create({
            name: 'Olivia Cash',
            email: 'olivia@mail.com',
            password: '12345',
            imageUrl: '/Farmer Emoji - Woman.png'
        }),
        User.create({
            name: 'George Dimpsy',
            email: 'georg@mail.com',
            password: '12345',
            imageUrl: '/Grey Hair Man Emoji.png'
        }),
        User.create({
            name: 'Mike Li',
            email: 'mike@mail.com',
            password: '12345',
            imageUrl: '/Man Emoji [Free Download iPhone Emojis].png'
        }),
        User.create({
            name: 'Dani West',
            email: 'dani@mail.com',
            password: '12345',
            imageUrl: '/Man With Gua Pi Mao Emoji [Free Download iPhone Emojis].png'
        }),
        User.create({
            name: 'Sandra Musk',
            email: 'sandra@mail.com',
            password: '12345',
            imageUrl: '/Girl Worker Emoji [Free Download IOS Emojis].png'
        }),
        User.create({
            name: 'Brad Patel',
            email: 'brad@mail.com',
            password: '12345',
            imageUrl: '/Man With Turban Emoji [Free Download iPhone Emojis].png'
        }),
        User.create({
            name: 'Oliver Do',
            email: 'oliver@mail.com',
            password: '12345',
            imageUrl: '/Old Man Emoji.png'
        }),
        User.create({
            name: 'Lisa Temple',
            email: 'lisa@mail.com',
            password: '12345',
            imageUrl: '/Red Hair Woman Emoji.png'
        }),
    ])
    const cars = await Promise.all([
        Car.create({
            model: 'EQS Sedan',
            year: 2020,
            price: 70000,
            description: 'This is a great car, you can drive it, and it is very comfortable',
            coordinateLat: '33.678615',
            coordinateLng: '-111.974607',
            endTimeAndDate: '2023-06-01T00:00:00.000Z',
            // awsUrl: ''
        }),
        Car.create({
            model: 'C 300 Sedan',
            year: 2020,
            price: 40000,
            description: 'This is a great car, you can drive it, and it is very comfortable',
            coordinateLat: '33.678615',
            coordinateLng: '-111.974607',
            endTimeAndDate: '2023-06-01T00:00:00.000Z',
            // awsUrl: ''
        }),
        Car.create({
            model: 'GLC 43 AMG 4MATIC',
            year: 2021,
            price: 60000,
            description: 'This is a great car, you can drive it, and it is very comfortable',
            coordinateLat: '33.678615',
            coordinateLng: '-111.974607',
            endTimeAndDate: '2023-06-01T00:00:00.000Z',
            // awsUrl: ''
        }),
        Car.create({
            model: 'E 350 Sedan',
            year: 2019,
            price: 50000,
            description: 'This is a great car, you can drive it, and it is very comfortable',
            coordinateLat: '33.678615',
            coordinateLng: '-111.974607',
            endTimeAndDate: '2023-06-01T00:00:00.000Z',
            // awsUrl: ''
        }),
        Car.create({
            model: 'G 63 AMG 4MATIC',
            year: 2020,
            price: 200000,
            description: 'This is a great car, you can drive it, and it is very comfortable',
            coordinateLat: '33.678615',
            coordinateLng: '-111.974607',
            endTimeAndDate: '2023-06-01T00:00:00.000Z',
            // awsUrl: ''
        })
    ])
    const bids = await Promise.all([
        Bid.create({
            amount: 750000,
            carId: 1,
            userId: 1
        }),
        Bid.create({
            amount: 80000,
            carId: 1,
            userId: 2
        }),
        Bid.create({
            amount: 830000,
            carId: 1,
            userId: 3
        }),
        Bid.create({
            amount: 63000,
            carId: 3,
            userId: 4
        }),
        Bid.create({
            amount: 64000,
            carId: 3,
            userId: 5
        }),
        Bid.create({
            amount: 550000,
            carId: 4,
            userId: 6
        }),
        Bid.create({
            amount: 240000,
            carId: 5,
            userId: 7
        }),
    ])
    console.log(chalk.bgBlueBright('Seeding complete'));
}

// I separated the `seed` function from the `runSeed` function.
// This way I can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log(chalk.bgCyanBright('closing db connection'));
        await db.close();
        console.log(chalk.bgBlueBright('db connection closed'));
    }
}

if (module === require.main) {
    runSeed();
}

export default seed;