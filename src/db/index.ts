import db from './db';
import { User } from './models/User';
import Bid from './models/Bid';
import Message from './models/Message';
import Car from './models/Car';

// associate the models
User.hasMany(Bid);
Bid.belongsTo(User);

User.hasMany(Car);
Car.belongsTo(User);

Car.hasMany(Bid);
Bid.belongsTo(Car);

Car.hasMany(Message);
Message.belongsTo(Car);

export { db, User, Bid, Message, Car };