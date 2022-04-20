/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/controllers/bids.ts":
/*!*************************************!*\
  !*** ./src/api/controllers/bids.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBid = void 0;
const db_1 = __webpack_require__(/*! ../../db */ "./src/db/index.ts");
const createBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.body.carId;
        const userId = req.body.userId;
        const bid = yield db_1.Bid.create(Object.assign(Object.assign({}, req.body), { userId: userId, carId: carId }));
        res.send(bid);
    }
    catch (err) {
        next(err);
    }
});
exports.createBid = createBid;


/***/ }),

/***/ "./src/api/controllers/cars.ts":
/*!*************************************!*\
  !*** ./src/api/controllers/cars.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteCar = exports.addImageToCar = exports.updateCar = exports.getOneCar = exports.getAllCars = exports.createCar = void 0;
const db_1 = __webpack_require__(/*! ../../db */ "./src/db/index.ts");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.body.address;
        const userId = req.body.userId;
        const coordinates = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.GOOGLE_API_KEY}`);
        const car = yield db_1.Car.create(Object.assign(Object.assign({}, req.body), { coordinateLat: coordinates.data.results[0].geometry.location.lat, coordinateLng: coordinates.data.results[0].geometry.location.lng, userId }));
        res.send(car);
    }
    catch (err) {
        next(err);
    }
});
exports.createCar = createCar;
const getAllCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield db_1.Car.findAll();
        res.send(cars);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCars = getAllCars;
const getOneCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield db_1.Car.findByPk(req.params.id, {
            include: [{
                    model: db_1.User,
                    as: 'user',
                    attributes: ['id', 'email', 'name', 'imageUrl']
                },
                {
                    model: db_1.Message,
                    as: 'messages',
                },
                {
                    model: db_1.Bid,
                    as: 'bids',
                    include: [{
                            model: db_1.User,
                            as: 'user',
                            attributes: ['id', 'email', 'name']
                        }]
                }]
        });
        res.send(car);
    }
    catch (err) {
        next(err);
    }
});
exports.getOneCar = getOneCar;
const updateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield db_1.Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        const updatedCar = yield car.update(req.body);
        res.send(updatedCar);
    }
    catch (err) {
        next(err);
    }
});
exports.updateCar = updateCar;
const addImageToCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield db_1.Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        const updatedCar = yield car.update(Object.assign(Object.assign({}, req.body), { imageUrl: req.body.imageUrl }));
        res.send(updatedCar);
    }
    catch (err) {
        next(err);
    }
});
exports.addImageToCar = addImageToCar;
const deleteCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield db_1.Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        yield car.destroy();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCar = deleteCar;


/***/ }),

/***/ "./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const cars_1 = __importDefault(__webpack_require__(/*! ./routes/cars */ "./src/api/routes/cars.ts"));
const bids_1 = __importDefault(__webpack_require__(/*! ./routes/bids */ "./src/api/routes/bids.ts"));
const router = (0, express_1.Router)();
exports["default"] = router;
router.use('/cars', cars_1.default);
router.use('/bids', bids_1.default);


/***/ }),

/***/ "./src/api/routes/bids.ts":
/*!********************************!*\
  !*** ./src/api/routes/bids.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const bids_1 = __webpack_require__(/*! ../controllers/bids */ "./src/api/controllers/bids.ts");
const router = (0, express_1.Router)();
router.post('/', (bids_1.createBid));
exports["default"] = router;


/***/ }),

/***/ "./src/api/routes/cars.ts":
/*!********************************!*\
  !*** ./src/api/routes/cars.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const cars_1 = __webpack_require__(/*! ../controllers/cars */ "./src/api/controllers/cars.ts");
const router = (0, express_1.Router)();
router.post('/', (cars_1.createCar));
router.get('/', (cars_1.getAllCars));
router.get('/:id', (cars_1.getOneCar));
router.put('/:id', (cars_1.updateCar));
router.put('/image/:id', (cars_1.addImageToCar));
router.delete('/:id', (cars_1.deleteCar));
exports["default"] = router;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const auth_1 = __importDefault(__webpack_require__(/*! ./auth */ "./src/auth/index.ts"));
const api_1 = __importDefault(__webpack_require__(/*! ./api */ "./src/api/index.ts"));
const body_parser_1 = __webpack_require__(/*! body-parser */ "body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/auth', auth_1.default);
app.use('/api', api_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
exports["default"] = app;


/***/ }),

/***/ "./src/auth/index.ts":
/*!***************************!*\
  !*** ./src/auth/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const db_1 = __webpack_require__(/*! ../db */ "./src/db/index.ts");
const router = (0, express_1.Router)();
exports["default"] = router;
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ token: yield db_1.User.authenticate(req.body.email, req.body.password) });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.create(req.body);
        res.send({ token: user.generateToken() });
    }
    catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists');
        }
        else {
            next(err);
        }
    }
}));
router.get('/me', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield db_1.User.findByToken(req.headers.authorization));
    }
    catch (err) {
        next(err);
    }
}));


/***/ }),

/***/ "./src/db/db.ts":
/*!**********************!*\
  !*** ./src/db/db.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const pkg = __importStar(__webpack_require__(/*! ../../package.json */ "./package.json"));
const databaseName = pkg.name + ( false ? 0 : '');
const config = {
    logging: false,
    dialectOptions: {},
};
if (process.env.LOGGING === 'true') {
    delete config.logging;
}
if (process.env.DATABASE_URL) {
    config.dialectOptions = {};
}
const db = new sequelize_1.Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config);
exports["default"] = db;


/***/ }),

/***/ "./src/db/index.ts":
/*!*************************!*\
  !*** ./src/db/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Car = exports.Message = exports.Bid = exports.User = exports.db = void 0;
const db_1 = __importDefault(__webpack_require__(/*! ./db */ "./src/db/db.ts"));
exports.db = db_1.default;
const User_1 = __webpack_require__(/*! ./models/User */ "./src/db/models/User.ts");
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return User_1.User; } }));
const Bid_1 = __importDefault(__webpack_require__(/*! ./models/Bid */ "./src/db/models/Bid.ts"));
exports.Bid = Bid_1.default;
const Message_1 = __importDefault(__webpack_require__(/*! ./models/Message */ "./src/db/models/Message.ts"));
exports.Message = Message_1.default;
const Car_1 = __importDefault(__webpack_require__(/*! ./models/Car */ "./src/db/models/Car.ts"));
exports.Car = Car_1.default;
User_1.User.hasMany(Bid_1.default);
Bid_1.default.belongsTo(User_1.User);
User_1.User.hasMany(Car_1.default);
Car_1.default.belongsTo(User_1.User);
Car_1.default.hasMany(Bid_1.default);
Bid_1.default.belongsTo(Car_1.default);
Car_1.default.hasMany(Message_1.default);
Message_1.default.belongsTo(Car_1.default);
User_1.User.hasMany(Message_1.default);
Message_1.default.belongsTo(User_1.User);


/***/ }),

/***/ "./src/db/models/Bid.ts":
/*!******************************!*\
  !*** ./src/db/models/Bid.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_1 = __importDefault(__webpack_require__(/*! ../db */ "./src/db/db.ts"));
const Bid = db_1.default.define("bid", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports["default"] = Bid;


/***/ }),

/***/ "./src/db/models/Car.ts":
/*!******************************!*\
  !*** ./src/db/models/Car.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_1 = __importDefault(__webpack_require__(/*! ../db */ "./src/db/db.ts"));
const Car = db_1.default.define('car', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1920,
            max: 2023,
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'active'
    },
    coordinateLat: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    coordinateLng: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    endTimeAndDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    awsUrl: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '/mercedes default.jpg'
    }
});
exports["default"] = Car;


/***/ }),

/***/ "./src/db/models/Message.ts":
/*!**********************************!*\
  !*** ./src/db/models/Message.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const User_1 = __webpack_require__(/*! ./User */ "./src/db/models/User.ts");
const db_1 = __importDefault(__webpack_require__(/*! ../db */ "./src/db/db.ts"));
const Message = db_1.default.define("message", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    defaultScope: {
        include: [
            { model: User_1.User }
        ]
    }
});
exports["default"] = Message;


/***/ }),

/***/ "./src/db/models/User.ts":
/*!*******************************!*\
  !*** ./src/db/models/User.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_1 = __importDefault(__webpack_require__(/*! ../db */ "./src/db/db.ts"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const SALT_ROUNDS = 5;
const User = db_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '/Man Emoji.png'
    },
    stripId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.User = User;
User.prototype.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
User.prototype.correctPassword = function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
User.authenticate = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ where: { email } });
        if (!user || !(yield user.correctPassword(password))) {
            throw new Error('Incorrect username/password');
        }
        return user.generateToken();
    });
};
User.findByToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = User.findByPk(id);
            if (!user) {
                throw 'nooo';
            }
            return user;
        }
        catch (ex) {
            throw new Error('bad token');
        }
    });
};
const hashPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.changed('password')) {
        user.password = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
    }
});
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
    Promise.all(users.map(hashPassword));
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const app_1 = __importDefault(__webpack_require__(/*! ./app */ "./src/app.ts"));
const seed_1 = __importDefault(__webpack_require__(/*! ./script/seed */ "./src/script/seed.ts"));
const index_1 = __webpack_require__(/*! ./db/index */ "./src/db/index.ts");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv.config();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.SEED === 'true') {
            yield (0, seed_1.default)();
        }
        else {
            yield index_1.db.sync();
            console.log(chalk_1.default.blueBright('Database synced'));
        }
        ;
        const io = new socket_io_1.Server(app_1.default.listen(process.env.PORT, () => {
            console.log(chalk_1.default.cyanBright `Listening on http://localhost:${process.env.PORT}`);
        }));
        io.on("connection", (socket) => {
            console.log(chalk_1.default.bgGreenBright(`USER (${socket.id}) has made a persistent connection to the server!`));
            socket.on('disconnect', function () {
                console.log(chalk_1.default.bgRedBright(`USER (${socket.id}) disconnected`));
            });
        });
    }
    catch (err) {
        console.log(chalk_1.default.red(err));
    }
});
init();


/***/ }),

/***/ "./src/script/seed.ts":
/*!****************************!*\
  !*** ./src/script/seed.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports["default"] = seed;


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.15","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/bcrypt":"^5.0.0","@types/jsonwebtoken":"^8.5.8","@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","axios":"^0.26.1","bcrypt":"^5.0.1","body-parser":"^1.20.0","chalk":"^4.1.2","dotenv":"^16.0.0","express":"^4.17.3","jsonwebtoken":"^8.5.1","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0FBQ0QsQ0FBQztBQUVELElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDTixTQUFlLElBQUk7O0lBRW5CLENBQUM7Q0FBQTtBQUVELHFCQUFlLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7QUNOcEI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy9iaWRzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy9jYXJzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvcm91dGVzL2JpZHMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL3JvdXRlcy9jYXJzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hdXRoL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2RiLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9CaWQudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0Nhci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvVXNlci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9zY3JpcHQvc2VlZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGFsa1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFVzZXIsIE1lc3NhZ2UsIENhciwgQmlkIH0gZnJvbSBcIi4uLy4uL2RiXCI7XG5cblxuLy8gQHJvdXRlICBQT1NUIGFwaS9iaWRzLCBDcmVhdGUgYSBuZXcgYmlkIG9uIGEgY2FyXG5leHBvcnQgY29uc3QgY3JlYXRlQmlkOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FySWQgPSByZXEuYm9keS5jYXJJZDtcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkO1xuICAgICAgICBjb25zdCBiaWQgPSBhd2FpdCBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIC4uLnJlcS5ib2R5LFxuICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICBjYXJJZDogY2FySWRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZW5kKGJpZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59OyIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFVzZXIsIE1lc3NhZ2UsIENhciwgQmlkIH0gZnJvbSBcIi4uLy4uL2RiXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbnR5cGUgZ29vZ2xlR2VvUmVzcG9uc2UgPSB7XG4gICAgcmVzdWx0czoge2dlb21ldHJ5OiB7IGxvY2F0aW9uOiB7bGF0OiBudW1iZXIsIGxuZzogbnVtYmVyfX19W107XG4gICAgc3RhdHVzOiAnT0snIHwgJ1pFUk9fUkVTVUxUUyc7XG59XG5cbi8vIEByb3V0ZSAgIFBPU1QgYXBpL2NhcnMvLCBjcmVhdGUgYSBuZXcgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBjcmVhdGVDYXI6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhZGRyZXNzID0gcmVxLmJvZHkuYWRkcmVzcztcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGF4aW9zLmdldDxnb29nbGVHZW9SZXNwb25zZT4oYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz0ke2VuY29kZVVSSShhZGRyZXNzKX0ma2V5PSR7cHJvY2Vzcy5lbnYuR09PR0xFX0FQSV9LRVl9YCk7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5jcmVhdGUoe1xuICAgICAgICAgICAgLi4ucmVxLmJvZHksXG4gICAgICAgICAgICBjb29yZGluYXRlTGF0OiBjb29yZGluYXRlcy5kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0LFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxuZzogY29vcmRpbmF0ZXMuZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyxcbiAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoY2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIEdFVCBhcGkvY2FycywgZ2V0IGFsbCBjYXJzIGxpc3RcbmV4cG9ydCBjb25zdCBnZXRBbGxDYXJzOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FycyA9IGF3YWl0IENhci5maW5kQWxsKCk7XG4gICAgICAgIHJlcy5zZW5kKGNhcnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgR0VUIGFwaS9jYXJzLzppZCwgZ2V0IGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBnZXRPbmVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkLCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgIG1vZGVsOiBVc2VyLFxuICAgICAgICAgICAgICAgIGFzOiAndXNlcicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCcsICduYW1lJywgJ2ltYWdlVXJsJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IE1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYXM6ICdtZXNzYWdlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBCaWQsXG4gICAgICAgICAgICAgICAgYXM6ICdiaWRzJyxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbDogVXNlcixcbiAgICAgICAgICAgICAgICAgICAgYXM6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCcsICduYW1lJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZW5kKGNhcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG4vLyBAcm91dGUgICBQVVQgYXBpL2NhcnMvOmlkLCB1cGRhdGUgYSBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICBpZiAoIWNhcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdDYXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlZENhciA9IGF3YWl0IGNhci51cGRhdGUocmVxLmJvZHkpOyAgIFxuICAgICAgICByZXMuc2VuZCh1cGRhdGVkQ2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cblxuZXhwb3J0IGNvbnN0IGFkZEltYWdlVG9DYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKCFjYXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCgnQ2FyIG5vdCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB1cGRhdGVkQ2FyID0gYXdhaXQgY2FyLnVwZGF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSxcbiAgICAgICAgICAgIGltYWdlVXJsOiByZXEuYm9keS5pbWFnZVVybFxuICAgICAgICB9KTsgICBcbiAgICAgICAgcmVzLnNlbmQodXBkYXRlZENhcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG4vLyBAcm91dGUgICBERUxFVEUgYXBpL2NhcnMvOmlkLCBkZWxldGUgYSBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICBpZiAoIWNhcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdDYXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY2FyLmRlc3Ryb3koKTtcbiAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjA0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNhcnNSb3V0ZSBmcm9tICcuL3JvdXRlcy9jYXJzJztcbmltcG9ydCBiaWRzUm91dGUgZnJvbSAnLi9yb3V0ZXMvYmlkcyc7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG4vLyBhbGwgY2FycyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvY2FycyBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSBjYXJzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvY2FycycsIGNhcnNSb3V0ZSk7XG5cbi8vIGFsbCBiaWRzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS9iaWRzIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIGJpZHNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy9iaWRzJywgYmlkc1JvdXRlKTsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgY3JlYXRlQmlkIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2JpZHNcIjtcblxuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy8nLCAoY3JlYXRlQmlkKSlcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBjcmVhdGVDYXIsIGdldEFsbENhcnMsIGdldE9uZUNhciwgdXBkYXRlQ2FyLCBhZGRJbWFnZVRvQ2FyLCBkZWxldGVDYXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY2Fyc1wiO1xuXG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdCgnLycsIChjcmVhdGVDYXIpICk7XG5yb3V0ZXIuZ2V0KCcvJywgKGdldEFsbENhcnMpICk7XG5yb3V0ZXIuZ2V0KCcvOmlkJywgKGdldE9uZUNhcikgKTtcbnJvdXRlci5wdXQoJy86aWQnLCAodXBkYXRlQ2FyKSApO1xucm91dGVyLnB1dCgnL2ltYWdlLzppZCcsIChhZGRJbWFnZVRvQ2FyKSApO1xucm91dGVyLmRlbGV0ZSgnLzppZCcsIChkZWxldGVDYXIpICk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJpbXBvcnQgZXhwcmVzcywgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGF1dGhSb3V0ZXIgZnJvbSAnLi9hdXRoJztcbmltcG9ydCBhcGlSb3V0ZXIgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsganNvbiB9IGZyb20gJ2JvZHktcGFyc2VyJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbi8vIGJvZHkgcGFyc2luZyBtaWRkbGV3YXJlXG5hcHAudXNlKGpzb24oKSlcblxuLy8gYXV0aCBhbmQgYXBpIHJvdXRlc1xuYXBwLnVzZSgnL2F1dGgnLCBhdXRoUm91dGVyKTtcbmFwcC51c2UoJy9hcGknLCBhcGlSb3V0ZXIpO1xuXG4vLyBhcHAuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4vLyAgICAgcmVzLnNlbmQoe1xuLy8gICAgICAgbWVzc2FnZTogJyBieWUgd29ybGQnLFxuLy8gICAgIH0pO1xuLy8gICB9KTtcblxuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKVxuXG4gIC8vIGVycm9yIGhhbmRsaW5nIG1pZGRsZXdhcmUuXG4gIGFwcC51c2UoKGVycjogRXJyb3IsIHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe21lc3NhZ2U6IGVyci5tZXNzYWdlfSk7XG4gIH0pO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2RiJztcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG4vLyByZWNpZXZlIGEgZW1haWwsIHBhc3Nvd3JkIHRoZW4gdmVyaWZ5IGFuZCByZXNwb25zZSB3aXRoIGEgdG9rZW4uXG5yb3V0ZXIucG9zdCgnL2xvZ2luJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzLnNlbmQoeyB0b2tlbjogYXdhaXQgVXNlci5hdXRoZW50aWNhdGUocmVxLmJvZHkuZW1haWwsIHJlcS5ib2R5LnBhc3N3b3JkKSB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufSk7XG5cbi8vIHJlY2lldmUgdXNlciBpbmZvLCBjcmVhdGUgYSBuZXcgdXNlciBhbmQgcmVzcG9uc2Ugd2l0aCBhIHRva2VuLlxucm91dGVyLnBvc3QoJy9zaWdudXAnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUocmVxLmJvZHkpO1xuICAgICAgICByZXMuc2VuZCh7IHRva2VuOiB1c2VyLmdlbmVyYXRlVG9rZW4oKSB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBpZiAoKGVyciBhcyBFcnJvcikubmFtZSA9PT0gJ1NlcXVlbGl6ZVVuaXF1ZUNvbnN0cmFpbnRFcnJvcicpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKCdVc2VyIGFscmVhZHkgZXhpc3RzJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgfVxuICAgIH1cbn0pXG5cbi8vIHJlY2lldmUgYSB0b2tlbiwgdmVyaWZ5IGFuZCByZXNwb25zZSB3aXRoIGEgdXNlci5cbnJvdXRlci5nZXQoJy9tZScsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJlcy5zZW5kKGF3YWl0IFVzZXIuZmluZEJ5VG9rZW4ocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiBhcyBzdHJpbmcpKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufSkiLCJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgKiBhcyBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZGF0YWJhc2VOYW1lOnN0cmluZyA9IHBrZy5uYW1lICsgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAnLXRlc3QnIDogJycpXG5cbmNvbnN0IGNvbmZpZzoge1xuICAgIGxvZ2dpbmc/OiBib29sZWFuLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBib29sZWFuLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogYm9vbGVhblxuICAgIC8vICAgICB9XG4gICAgfVxufSA9IHtcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAvLyAgICAgfVxuICAgIH0sXG4gIH07XG5cbmlmIChwcm9jZXNzLmVudi5MT0dHSU5HID09PSAndHJ1ZScpIHtcbiAgICBkZWxldGUgY29uZmlnLmxvZ2dpbmc7XG59XG5cbmlmICggcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMICkge1xuICAgIGNvbmZpZy5kaWFsZWN0T3B0aW9ucyA9IHtcbiAgICAgICAgLy8gc3NsOiB7XG4gICAgICAgIC8vICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAvLyAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAvLyB9XG4gICAgfTtcbn1cblxuY29uc3QgZGIgPSBuZXcgU2VxdWVsaXplKFxuICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBgcG9zdGdyZXM6Ly9sb2NhbGhvc3Q6NTQzMi8ke2RhdGFiYXNlTmFtZX1gLCBjb25maWcpO1xuXG5leHBvcnQgZGVmYXVsdCBkYjsiLCJpbXBvcnQgZGIgZnJvbSAnLi9kYic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQgQmlkIGZyb20gJy4vbW9kZWxzL0JpZCc7XG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21vZGVscy9NZXNzYWdlJztcbmltcG9ydCBDYXIgZnJvbSAnLi9tb2RlbHMvQ2FyJztcblxuLy8gYXNzb2NpYXRlIHRoZSBtb2RlbHNcblVzZXIuaGFzTWFueShCaWQpO1xuQmlkLmJlbG9uZ3NUbyhVc2VyKTtcblxuVXNlci5oYXNNYW55KENhcik7XG5DYXIuYmVsb25nc1RvKFVzZXIpO1xuXG5DYXIuaGFzTWFueShCaWQpO1xuQmlkLmJlbG9uZ3NUbyhDYXIpO1xuXG5DYXIuaGFzTWFueShNZXNzYWdlKTtcbk1lc3NhZ2UuYmVsb25nc1RvKENhcik7XG5cblVzZXIuaGFzTWFueShNZXNzYWdlKTtcbk1lc3NhZ2UuYmVsb25nc1RvKFVzZXIpO1xuXG5leHBvcnQgeyBkYiwgVXNlciwgQmlkLCBNZXNzYWdlLCBDYXIgfTsiLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCJcblxuaW50ZXJmYWNlIEJpZE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGFtb3VudDogbnVtYmVyO1xufVxuXG50eXBlIEJpZE1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogQmlkTW9kZWw7XG59XG5cbmNvbnN0IEJpZCAgPSA8QmlkTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwiYmlkXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJpZDsiLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IGRiIGZyb20gJy4uL2RiJztcblxuaW50ZXJmYWNlIENhck1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIG1vZGVsOiBzdHJpbmc7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBjb29yZGluYXRlTGF0OiBudW1iZXI7XG4gICAgY29vcmRpbmF0ZUxuZzogbnVtYmVyO1xuICAgIGVuZFRpbWVBbmREYXRlOiBzdHJpbmc7XG4gICAgYXdzVXJsOiBzdHJpbmc7XG59XG5cbnR5cGUgQ2FyTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBDYXJNb2RlbDtcbn1cblxuY29uc3QgQ2FyID0gPENhck1vZGVsU3RhdGljPmRiLmRlZmluZSgnY2FyJywge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICB5ZWFyOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgaXNJbnQ6IHRydWUsXG4gICAgICAgICAgICBtaW46IDE5MjAsXG4gICAgICAgICAgICBtYXg6IDIwMjMsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHByaWNlOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnYWN0aXZlJ1xuICAgIH0sXG4gICAgY29vcmRpbmF0ZUxhdDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcbiAgICB9LFxuICAgIGNvb3JkaW5hdGVMbmc6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRFQ0lNQUwsXG4gICAgfSxcbiAgICBlbmRUaW1lQW5kRGF0ZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBhd3NVcmw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL21lcmNlZGVzIGRlZmF1bHQuanBnJ1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYXI7XG4iLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgeyBVc2VyTW9kZWwsIFVzZXIgfSBmcm9tIFwiLi9Vc2VyXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5cbmludGVyZmFjZSBNZXNzYWdlTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIC8vIGRlZmF1bHRTY29wZXM6IHsgaW5jbHVkZTogeyBtb2RlbDogVXNlck1vZGVsIH1bXSB9O1xufVxuXG50eXBlIE1lc3NhZ2VNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IE1lc3NhZ2VNb2RlbDtcbn1cblxuY29uc3QgTWVzc2FnZSA9IDxNZXNzYWdlTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwibWVzc2FnZVwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH1cbn1cbiwge1xuICAgIGRlZmF1bHRTY29wZToge1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7IG1vZGVsOiBVc2VyIH1cbiAgICAgICAgXVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlOyIsIlxuaW1wb3J0IHsgQnVpbGRPcHRpb25zLCBNb2RlbCwgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcblxuY29uc3QgU0FMVF9ST1VORFMgPSA1O1xuXG4vLyBXZSBuZWVkIHRvIGRlY2xhcmUgYW4gaW50ZXJmYWNlIGZvciBvdXIgbW9kZWwgdGhhdCBpcyBiYXNpY2FsbHkgd2hhdCBvdXIgY2xhc3Mgd291bGQgYmVcbmludGVyZmFjZSBVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbWFnZVVybD86IHN0cmluZztcbiAgICBzdHJpcElkPzogc3RyaW5nO1xuICAgIGNvcnJlY3RQYXNzd29yZChwYXNzd29yZDpzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGdlbmVyYXRlVG9rZW4oKTogc3RyaW5nO1xufVxuXG4vLyBOZWVkIHRvIGRlY2xhcmUgdGhlIHN0YXRpYyBtb2RlbCBzbyBgZmluZE9uZWAgZXRjLiB1c2UgY29ycmVjdCB0eXBlcy5cbnR5cGUgVXNlck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogVXNlck1vZGVsO1xuICAgIGF1dGhlbnRpY2F0ZShlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRCeVRva2VuKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJNb2RlbCB8IG51bGw+O1xuICB9XG5cbi8vIFRTIGNhbid0IGRlcml2ZSBhIHByb3BlciBjbGFzcyBkZWZpbml0aW9uIGZyb20gYSBgLmRlZmluZWAgY2FsbCwgdGhlcmVmb3Igd2UgbmVlZCB0byBjYXN0IGhlcmUuXG5jb25zdCBVc2VyID0gPFVzZXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJ1c2VyXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgaXNFbWFpbDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGltYWdlVXJsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJy9NYW4gRW1vamkucG5nJ1xuICAgIH0sXG4gICAgc3RyaXBJZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9XG59KTtcblxuZXhwb3J0IHsgVXNlciwgVXNlck1vZGVsIH07XG5cbi8vICoqIGluc3RhbmNlTWV0aG9kcyAqKlxuXG4vLyBnZW5lcmF0ZSB0b2tlbiwgc2F2ZSB0aGUgaWQgaW4gdGhlIGhlYWRlci5cblVzZXIucHJvdG90eXBlLmdlbmVyYXRlVG9rZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGp3dC5zaWduKHsgaWQ6IHRoaXMuaWQgfSxwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZywge2V4cGlyZXNJbjogJzFkJ31cbiAgICAgICAgKVxufVxuXG4vLyBjb21wYXJlIHRoZSBwbGFpbiB2ZXJzaW9uIHRvIHRoZSBlbmNycHl0ZWQgdmVyc2lvbi5cblVzZXIucHJvdG90eXBlLmNvcnJlY3RQYXNzd29yZCA9IGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZVBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKVxufVxuXG5cbi8vICoqIGNsYXNzTWV0aG9kcyAqKlxuXG5Vc2VyLmF1dGhlbnRpY2F0ZSA9IGFzeW5jIGZ1bmN0aW9uICggZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyApIHtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbCB9IH0pXG4gICAgaWYgKCF1c2VyIHx8ICEoYXdhaXQgdXNlci5jb3JyZWN0UGFzc3dvcmQocGFzc3dvcmQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCB1c2VybmFtZS9wYXNzd29yZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlci5nZW5lcmF0ZVRva2VuKCk7XG4gIH07XG5cbiAgVXNlci5maW5kQnlUb2tlbiA9IGFzeW5jIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZykgYXMgeyBpZDogbnVtYmVyIH07XG4gICAgICBjb25zdCB1c2VyID0gVXNlci5maW5kQnlQayhpZClcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB0aHJvdyAnbm9vbydcbiAgICAgIH1cbiAgICAgIHJldHVybiB1c2VyXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgdG9rZW4nKVxuICAgIH1cbiAgfVxuXG4gIC8vICoqIGhvb2tzICoqXG5cbiAgY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHVzZXI6IFVzZXJNb2RlbCkgPT4ge1xuICAgIC8vaW4gY2FzZSB0aGUgcGFzc3dvcmQgaGFzIGJlZW4gY3JlYXRlZCBvciBjaGFuZ2VkLCB3ZSB3YW50IHRvIGVuY3J5cHQgaXQgd2l0aCBiY3J5cHRcbiAgICBpZiAodXNlci5jaGFuZ2VkKCdwYXNzd29yZCcpKSB7XG4gICAgICB1c2VyLnBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgU0FMVF9ST1VORFMpO1xuICAgIH1cbiAgfVxuICBcbiAgVXNlci5iZWZvcmVDcmVhdGUoaGFzaFBhc3N3b3JkKVxuICBVc2VyLmJlZm9yZVVwZGF0ZShoYXNoUGFzc3dvcmQpXG4gIFVzZXIuYmVmb3JlQnVsa0NyZWF0ZSgodXNlcnMpID0+IHtcbiAgICAgIFByb21pc2UuYWxsKHVzZXJzLm1hcChoYXNoUGFzc3dvcmQpKX0pO1xuXG4iLCJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgc2VlZCBmcm9tICcuL3NjcmlwdC9zZWVkJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYi9pbmRleCc7XG5pbXBvcnQge1NlcnZlciwgIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW9cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICggIHByb2Nlc3MuZW52LlNFRUQgPT09ICd0cnVlJyApIHtcbiAgICAgICAgICAgIGF3YWl0IHNlZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnN5bmMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJsdWVCcmlnaHQoJ0RhdGFiYXNlIHN5bmNlZCcpKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlvID0gbmV3IFNlcnZlcihhcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmN5YW5CcmlnaHRgTGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUfWApXG4gICAgICAgIH0pKVxuXG4gICAgICAgIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW5CcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgaGFzIG1hZGUgYSBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciFgKSlcbiAgICAgICAgICAgIC8vIHRoZSBuZXh0IHR3byBsaW5lcyB3aWxsIGxvZyBpZiBhIHVzZXIgZGlzY29ubmVjdC5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdSZWRCcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgZGlzY29ubmVjdGVkYCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbn0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlcnIpKTtcbn1cbn1cblxuaW5pdCgpXG5cblxuIiwiXG5cbmFzeW5jIGZ1bmN0aW9uIHNlZWQoKSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VlZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9