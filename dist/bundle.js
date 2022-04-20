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
exports.deleteCar = exports.updateCar = exports.getOneCar = exports.getAllCars = exports.createCar = void 0;
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

/***/ "./src/api/controllers/s3.ts":
/*!***********************************!*\
  !*** ./src/api/controllers/s3.ts ***!
  \***********************************/
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
exports.generateUploadURL = void 0;
const aws_sdk_1 = __importDefault(__webpack_require__(/*! aws-sdk */ "aws-sdk"));
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv.config();
const region = "us-west-2";
const bucketName = "benzbid-cars-images";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new aws_sdk_1.default.S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    signatureVersion: 'v4'
});
const generateUploadURL = () => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = Date.now().toString();
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    });
    const uploadUrl = yield s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
});
exports.generateUploadURL = generateUploadURL;


/***/ }),

/***/ "./src/api/controllers/users.ts":
/*!**************************************!*\
  !*** ./src/api/controllers/users.ts ***!
  \**************************************/
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
exports.updateUser = void 0;
const db_1 = __webpack_require__(/*! ../../db */ "./src/db/index.ts");
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const updatedUser = yield user.update(req.body);
        res.send(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;


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
const s3_1 = __importDefault(__webpack_require__(/*! ./routes/s3 */ "./src/api/routes/s3.ts"));
const users_1 = __importDefault(__webpack_require__(/*! ./routes/users */ "./src/api/routes/users.ts"));
const router = (0, express_1.Router)();
exports["default"] = router;
router.use('/s3Url', s3_1.default);
router.use('/cars', cars_1.default);
router.use('/bids', bids_1.default);
router.use('/users', users_1.default);


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
router.delete('/:id', (cars_1.deleteCar));
exports["default"] = router;


/***/ }),

/***/ "./src/api/routes/s3.ts":
/*!******************************!*\
  !*** ./src/api/routes/s3.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const s3_1 = __webpack_require__(/*! ../controllers/s3 */ "./src/api/controllers/s3.ts");
const router = (0, express_1.Router)();
router.get('/', s3_1.generateUploadURL);
exports["default"] = router;


/***/ }),

/***/ "./src/api/routes/users.ts":
/*!*********************************!*\
  !*** ./src/api/routes/users.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const users_1 = __webpack_require__(/*! ../controllers/users */ "./src/api/controllers/users.ts");
const router = (0, express_1.Router)();
router.put('/:id', (users_1.updateUser));
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

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

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

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.15","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/bcrypt":"^5.0.0","@types/jsonwebtoken":"^8.5.8","@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","aws-sdk":"^2.1118.0","axios":"^0.26.1","bcrypt":"^5.0.1","body-parser":"^1.20.0","chalk":"^4.1.2","dotenv":"^16.0.0","express":"^4.17.3","jsonwebtoken":"^8.5.1","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO0tBRVQ7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0FBQ0QsQ0FBQztBQUVELElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDTixTQUFlLElBQUk7O0lBRW5CLENBQUM7Q0FBQTtBQUVELHFCQUFlLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7QUNOcEI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2JpZHMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2NhcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL3MzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy91c2Vycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL3JvdXRlcy9iaWRzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvY2Fycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvcm91dGVzL3MzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvdXNlcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2F1dGgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvZGIudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0JpZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvQ2FyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9NZXNzYWdlLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL3NjcmlwdC9zZWVkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYXdzLXNka1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImJjcnlwdFwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImNoYWxrXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzb2NrZXQuaW9cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgVXNlciwgTWVzc2FnZSwgQ2FyLCBCaWQgfSBmcm9tIFwiLi4vLi4vZGJcIjtcblxuXG4vLyBAcm91dGUgIFBPU1QgYXBpL2JpZHMsIENyZWF0ZSBhIG5ldyBiaWQgb24gYSBjYXJcbmV4cG9ydCBjb25zdCBjcmVhdGVCaWQ6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXJJZCA9IHJlcS5ib2R5LmNhcklkO1xuICAgICAgICBjb25zdCB1c2VySWQgPSByZXEuYm9keS51c2VySWQ7XG4gICAgICAgIGNvbnN0IGJpZCA9IGF3YWl0IEJpZC5jcmVhdGUoe1xuICAgICAgICAgICAgLi4ucmVxLmJvZHksXG4gICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGNhcklkOiBjYXJJZFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoYmlkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07IiwiaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgVXNlciwgTWVzc2FnZSwgQ2FyLCBCaWQgfSBmcm9tIFwiLi4vLi4vZGJcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxudHlwZSBnb29nbGVHZW9SZXNwb25zZSA9IHtcbiAgICByZXN1bHRzOiB7Z2VvbWV0cnk6IHsgbG9jYXRpb246IHtsYXQ6IG51bWJlciwgbG5nOiBudW1iZXJ9fX1bXTtcbiAgICBzdGF0dXM6ICdPSycgfCAnWkVST19SRVNVTFRTJztcbn1cblxuLy8gQHJvdXRlICAgUE9TVCBhcGkvY2Fycy8sIGNyZWF0ZSBhIG5ldyBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhcjogUmVxdWVzdEhhbmRsZXIgPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSByZXEuYm9keS5hZGRyZXNzO1xuICAgICAgICBjb25zdCB1c2VySWQgPSByZXEuYm9keS51c2VySWQ7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gYXdhaXQgYXhpb3MuZ2V0PGdvb2dsZUdlb1Jlc3BvbnNlPihgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPSR7ZW5jb2RlVVJJKGFkZHJlc3MpfSZrZXk9JHtwcm9jZXNzLmVudi5HT09HTEVfQVBJX0tFWX1gKTtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMYXQ6IGNvb3JkaW5hdGVzLmRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQsXG4gICAgICAgICAgICBjb29yZGluYXRlTG5nOiBjb29yZGluYXRlcy5kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nLFxuICAgICAgICAgICAgdXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc2VuZChjYXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgR0VUIGFwaS9jYXJzLCBnZXQgYWxsIGNhcnMgbGlzdFxuZXhwb3J0IGNvbnN0IGdldEFsbENhcnM6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXJzID0gYXdhaXQgQ2FyLmZpbmRBbGwoKTtcbiAgICAgICAgcmVzLnNlbmQoY2Fycyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG4vLyBAcm91dGUgICBHRVQgYXBpL2NhcnMvOmlkLCBnZXQgYSBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IGdldE9uZUNhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQsIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7XG4gICAgICAgICAgICAgICAgbW9kZWw6IFVzZXIsXG4gICAgICAgICAgICAgICAgYXM6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnLCAnaW1hZ2VVcmwnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBhczogJ21lc3NhZ2VzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IEJpZCxcbiAgICAgICAgICAgICAgICBhczogJ2JpZHMnLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBVc2VyLFxuICAgICAgICAgICAgICAgICAgICBhczogJ3VzZXInLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoY2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIFBVVCBhcGkvY2Fycy86aWQsIHVwZGF0ZSBhIGNhciBwb3N0XG5leHBvcnQgY29uc3QgdXBkYXRlQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmICghY2FyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ0NhciBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGRhdGVkQ2FyID0gYXdhaXQgY2FyLnVwZGF0ZShyZXEuYm9keSk7ICAgXG4gICAgICAgIHJlcy5zZW5kKHVwZGF0ZWRDYXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuXG4vLyBtYXliZSB3ZSB3b24ndCBuZWVkIHRoaXMgcm91dGUsIHRoZSBub3JhbWwgdXBkYXRlIHNob3VsZCBoYW5sZGUgc2luZ2xlIGZpZWxkIHVwZGF0ZVxuXG4vLyBAcm91dGUgICBQVVQgYXBpL2NhcnMvaW1hZ2UvOmlkLCBhZGQgaW1hZ2UgdG8gY2FyIHBvc3Rcbi8vIGV4cG9ydCBjb25zdCBhZGRJbWFnZVRvQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbi8vICAgICB0cnkge1xuLy8gICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XG4vLyAgICAgICAgIGlmICghY2FyKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ0NhciBub3QgZm91bmQnKTtcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgY29uc3QgdXBkYXRlZENhciA9IGF3YWl0IGNhci51cGRhdGUoe1xuLy8gICAgICAgICAgICAgLi4ucmVxLmJvZHksXG4vLyAgICAgICAgICAgICBpbWFnZVVybDogcmVxLmJvZHkuaW1hZ2VVcmxcbi8vICAgICAgICAgfSk7ICAgXG4vLyAgICAgICAgIHJlcy5zZW5kKHVwZGF0ZWRDYXIpO1xuLy8gICAgIH0gY2F0Y2ggKGVycikge1xuLy8gICAgICAgICBuZXh0KGVycik7XG4vLyAgICAgfVxuLy8gfTtcblxuLy8gQHJvdXRlICAgREVMRVRFIGFwaS9jYXJzLzppZCwgZGVsZXRlIGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBkZWxldGVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKCFjYXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCgnQ2FyIG5vdCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNhci5kZXN0cm95KCk7XG4gICAgICAgIHJlcy5zZW5kU3RhdHVzKDIwNCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IGF3cyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCByZWdpb24gPSBcInVzLXdlc3QtMlwiXG5jb25zdCBidWNrZXROYW1lID0gXCJiZW56YmlkLWNhcnMtaW1hZ2VzXCJcbmNvbnN0IGFjY2Vzc0tleUlkID0gcHJvY2Vzcy5lbnYuQVdTX0FDQ0VTU19LRVlfSUQ7XG5jb25zdCBzZWNyZXRBY2Nlc3NLZXkgPSBwcm9jZXNzLmVudi5BV1NfU0VDUkVUX0FDQ0VTU19LRVk7XG5cbmNvbnN0IHMzID0gbmV3IGF3cy5TMyh7XG4gICAgcmVnaW9uOiByZWdpb24sXG4gICAgYWNjZXNzS2V5SWQ6IGFjY2Vzc0tleUlkLFxuICAgIHNlY3JldEFjY2Vzc0tleTogc2VjcmV0QWNjZXNzS2V5LFxuICAgIHNpZ25hdHVyZVZlcnNpb246ICd2NCdcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVVcGxvYWRVUkwgPSBhc3luYygpID0+IHtcbiAgICBjb25zdCBpbWFnZU5hbWUgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSAoe1xuICAgICAgICBCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIEtleTogaW1hZ2VOYW1lLFxuICAgICAgICBFeHBpcmVzOiA2MCxcbiAgICB9KTtcbiAgICBjb25zdCB1cGxvYWRVcmwgPSBhd2FpdCBzMy5nZXRTaWduZWRVcmxQcm9taXNlKCdwdXRPYmplY3QnLCBwYXJhbXMpO1xuICAgIHJldHVybiB1cGxvYWRVcmw7XG59IiwiaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiZXhwcmVzc1wiXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2RiXCJcblxuLy8gQHJvdXRlIFBVVCBhcGkvdXNlcnMvOmlkLCB1cGRhdGUgYSB1c2VyIGluZm9cbmV4cG9ydCBjb25zdCB1cGRhdGVVc2VyOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIlVzZXIgbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRVc2VyID0gYXdhaXQgdXNlci51cGRhdGUocmVxLmJvZHkpO1xuICAgICAgICByZXMuc2VuZCh1cGRhdGVkVXNlcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBjYXJzUm91dGUgZnJvbSAnLi9yb3V0ZXMvY2Fycyc7XG5pbXBvcnQgYmlkc1JvdXRlIGZyb20gJy4vcm91dGVzL2JpZHMnO1xuaW1wb3J0IHMzUm91dGUgZnJvbSAnLi9yb3V0ZXMvczMnO1xuaW1wb3J0IHVzZXJzUm91dGUgZnJvbSAnLi9yb3V0ZXMvdXNlcnMnO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbi8vIGFsbCBzMyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvczNVcmwgYW5kIHdpbGwgYmUgaGFuZGxlZCBieSBzM1JvdXRlIHJvdXRlclxucm91dGVyLnVzZSgnL3MzVXJsJywgczNSb3V0ZSlcblxuLy8gYWxsIGNhcnMgcm91dGVzIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAvYXBpL2NhcnMgYW5kIHdpbGwgYmUgaGFuZGxlZCBieSB0aGUgY2Fyc1JvdXRlIHJvdXRlclxucm91dGVyLnVzZSgnL2NhcnMnLCBjYXJzUm91dGUpO1xuXG4vLyBhbGwgYmlkcyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvYmlkcyBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSBiaWRzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvYmlkcycsIGJpZHNSb3V0ZSk7XG5cbi8vIGFsbCB1c2VycyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvdXNlcnMgYW5kIHdpbGwgYmUgaGFuZGxlZCBieSB0aGUgdXNlcnNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy91c2VycycsIHVzZXJzUm91dGUpO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUJpZCB9IGZyb20gXCIuLi9jb250cm9sbGVycy9iaWRzXCI7XG5cblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KCcvJywgKGNyZWF0ZUJpZCkpXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ2FyLCBnZXRBbGxDYXJzLCBnZXRPbmVDYXIsIHVwZGF0ZUNhciwgZGVsZXRlQ2FyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2NhcnNcIjtcbi8vIGltcG9ydCB7IGFkZEltYWdlVG9DYXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY2Fyc1wiO1xuXG5cblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KCcvJywgKGNyZWF0ZUNhcikgKTtcbnJvdXRlci5nZXQoJy8nLCAoZ2V0QWxsQ2FycykgKTtcbnJvdXRlci5nZXQoJy86aWQnLCAoZ2V0T25lQ2FyKSApO1xucm91dGVyLnB1dCgnLzppZCcsICh1cGRhdGVDYXIpICk7XG4vLyByb3V0ZXIucHV0KCcvaW1hZ2UvOmlkJywgKGFkZEltYWdlVG9DYXIpICk7XG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgKGRlbGV0ZUNhcikgKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVVwbG9hZFVSTCB9IGZyb20gXCIuLi9jb250cm9sbGVycy9zM1wiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLmdldCgnLycsIGdlbmVyYXRlVXBsb2FkVVJMKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyB1cGRhdGVVc2VyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL3VzZXJzXCI7XG5cblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wdXQoJy86aWQnLCAodXBkYXRlVXNlcikgKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCBleHByZXNzLCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYXV0aFJvdXRlciBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IGFwaVJvdXRlciBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBqc29uIH0gZnJvbSAnYm9keS1wYXJzZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gYm9keSBwYXJzaW5nIG1pZGRsZXdhcmVcbmFwcC51c2UoanNvbigpKVxuXG4vLyBhdXRoIGFuZCBhcGkgcm91dGVzXG5hcHAudXNlKCcvYXV0aCcsIGF1dGhSb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaScsIGFwaVJvdXRlcik7XG5cbi8vIGFwcC5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbi8vICAgICByZXMuc2VuZCh7XG4vLyAgICAgICBtZXNzYWdlOiAnIGJ5ZSB3b3JsZCcsXG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCcpXG5cbiAgLy8gZXJyb3IgaGFuZGxpbmcgbWlkZGxld2FyZS5cbiAgYXBwLnVzZSgoZXJyOiBFcnJvciwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7bWVzc2FnZTogZXJyLm1lc3NhZ2V9KTtcbiAgfSk7XG5cbiAgZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vZGInO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbi8vIHJlY2lldmUgYSBlbWFpbCwgcGFzc293cmQgdGhlbiB2ZXJpZnkgYW5kIHJlc3BvbnNlIHdpdGggYSB0b2tlbi5cbnJvdXRlci5wb3N0KCcvbG9naW4nLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXMuc2VuZCh7IHRva2VuOiBhd2FpdCBVc2VyLmF1dGhlbnRpY2F0ZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQpIH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59KTtcblxuLy8gcmVjaWV2ZSB1c2VyIGluZm8sIGNyZWF0ZSBhIG5ldyB1c2VyIGFuZCByZXNwb25zZSB3aXRoIGEgdG9rZW4uXG5yb3V0ZXIucG9zdCgnL3NpZ251cCcsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZShyZXEuYm9keSk7XG4gICAgICAgIHJlcy5zZW5kKHsgdG9rZW46IHVzZXIuZ2VuZXJhdGVUb2tlbigpIH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGlmICgoZXJyIGFzIEVycm9yKS5uYW1lID09PSAnU2VxdWVsaXplVW5pcXVlQ29uc3RyYWludEVycm9yJykge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoJ1VzZXIgYWxyZWFkeSBleGlzdHMnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICB9XG4gICAgfVxufSlcblxuLy8gcmVjaWV2ZSBhIHRva2VuLCB2ZXJpZnkgYW5kIHJlc3BvbnNlIHdpdGggYSB1c2VyLlxucm91dGVyLmdldCgnL21lJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzLnNlbmQoYXdhaXQgVXNlci5maW5kQnlUb2tlbihyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIGFzIHN0cmluZykpO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59KSIsImltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCAqIGFzIHBrZyBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCBkYXRhYmFzZU5hbWU6c3RyaW5nID0gcGtnLm5hbWUgKyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyA/ICctdGVzdCcgOiAnJylcblxuY29uc3QgY29uZmlnOiB7XG4gICAgbG9nZ2luZz86IGJvb2xlYW4sXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAvLyAgICAgc3NsOiB7XG4gICAgLy8gICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGJvb2xlYW4sXG4gICAgLy8gICAgICAgICByZXF1aXJlOiBib29sZWFuXG4gICAgLy8gICAgIH1cbiAgICB9XG59ID0ge1xuICAgIGxvZ2dpbmc6IGZhbHNlLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiB0cnVlLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgIC8vICAgICB9XG4gICAgfSxcbiAgfTtcblxuaWYgKHByb2Nlc3MuZW52LkxPR0dJTkcgPT09ICd0cnVlJykge1xuICAgIGRlbGV0ZSBjb25maWcubG9nZ2luZztcbn1cblxuaWYgKCBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgKSB7XG4gICAgY29uZmlnLmRpYWxlY3RPcHRpb25zID0ge1xuICAgICAgICAvLyBzc2w6IHtcbiAgICAgICAgLy8gICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgIC8vICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgIC8vIH1cbiAgICB9O1xufVxuXG5jb25zdCBkYiA9IG5ldyBTZXF1ZWxpemUoXG4gICAgcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIHx8IGBwb3N0Z3JlczovL2xvY2FsaG9zdDo1NDMyLyR7ZGF0YWJhc2VOYW1lfWAsIGNvbmZpZyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRiOyIsImltcG9ydCBkYiBmcm9tICcuL2RiJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL21vZGVscy9Vc2VyJztcbmltcG9ydCBCaWQgZnJvbSAnLi9tb2RlbHMvQmlkJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vbW9kZWxzL01lc3NhZ2UnO1xuaW1wb3J0IENhciBmcm9tICcuL21vZGVscy9DYXInO1xuXG4vLyBhc3NvY2lhdGUgdGhlIG1vZGVsc1xuVXNlci5oYXNNYW55KEJpZCk7XG5CaWQuYmVsb25nc1RvKFVzZXIpO1xuXG5Vc2VyLmhhc01hbnkoQ2FyKTtcbkNhci5iZWxvbmdzVG8oVXNlcik7XG5cbkNhci5oYXNNYW55KEJpZCk7XG5CaWQuYmVsb25nc1RvKENhcik7XG5cbkNhci5oYXNNYW55KE1lc3NhZ2UpO1xuTWVzc2FnZS5iZWxvbmdzVG8oQ2FyKTtcblxuVXNlci5oYXNNYW55KE1lc3NhZ2UpO1xuTWVzc2FnZS5iZWxvbmdzVG8oVXNlcik7XG5cbmV4cG9ydCB7IGRiLCBVc2VyLCBCaWQsIE1lc3NhZ2UsIENhciB9OyIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIlxuXG5pbnRlcmZhY2UgQmlkTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgYW1vdW50OiBudW1iZXI7XG59XG5cbnR5cGUgQmlkTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBCaWRNb2RlbDtcbn1cblxuY29uc3QgQmlkICA9IDxCaWRNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJiaWRcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmlkOyIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgZGIgZnJvbSAnLi4vZGInO1xuXG5pbnRlcmZhY2UgQ2FyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgbW9kZWw6IHN0cmluZztcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwcmljZTogbnVtYmVyO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGNvb3JkaW5hdGVMYXQ6IG51bWJlcjtcbiAgICBjb29yZGluYXRlTG5nOiBudW1iZXI7XG4gICAgZW5kVGltZUFuZERhdGU6IHN0cmluZztcbiAgICBhd3NVcmw6IHN0cmluZztcbn1cblxudHlwZSBDYXJNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IENhck1vZGVsO1xufVxuXG5jb25zdCBDYXIgPSA8Q2FyTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKCdjYXInLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIG1vZGVsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHllYXI6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBpc0ludDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbjogMTkyMCxcbiAgICAgICAgICAgIG1heDogMjAyMyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgcHJpY2U6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICdhY3RpdmUnXG4gICAgfSxcbiAgICBjb29yZGluYXRlTGF0OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuICAgIH0sXG4gICAgY29vcmRpbmF0ZUxuZzoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcbiAgICB9LFxuICAgIGVuZFRpbWVBbmREYXRlOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGF3c1VybDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcvbWVyY2VkZXMgZGVmYXVsdC5qcGcnXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcjtcbiIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCB7IFVzZXJNb2RlbCwgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcblxuaW50ZXJmYWNlIE1lc3NhZ2VNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgLy8gZGVmYXVsdFNjb3BlczogeyBpbmNsdWRlOiB7IG1vZGVsOiBVc2VyTW9kZWwgfVtdIH07XG59XG5cbnR5cGUgTWVzc2FnZU1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogTWVzc2FnZU1vZGVsO1xufVxuXG5jb25zdCBNZXNzYWdlID0gPE1lc3NhZ2VNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJtZXNzYWdlXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfVxufVxuLCB7XG4gICAgZGVmYXVsdFNjb3BlOiB7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHsgbW9kZWw6IFVzZXIgfVxuICAgICAgICBdXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7IiwiXG5pbXBvcnQgeyBCdWlsZE9wdGlvbnMsIE1vZGVsLCBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xuXG5jb25zdCBTQUxUX1JPVU5EUyA9IDU7XG5cbi8vIFdlIG5lZWQgdG8gZGVjbGFyZSBhbiBpbnRlcmZhY2UgZm9yIG91ciBtb2RlbCB0aGF0IGlzIGJhc2ljYWxseSB3aGF0IG91ciBjbGFzcyB3b3VsZCBiZVxuaW50ZXJmYWNlIFVzZXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGltYWdlVXJsPzogc3RyaW5nO1xuICAgIHN0cmlwSWQ/OiBzdHJpbmc7XG4gICAgY29ycmVjdFBhc3N3b3JkKHBhc3N3b3JkOnN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgZ2VuZXJhdGVUb2tlbigpOiBzdHJpbmc7XG59XG5cbi8vIE5lZWQgdG8gZGVjbGFyZSB0aGUgc3RhdGljIG1vZGVsIHNvIGBmaW5kT25lYCBldGMuIHVzZSBjb3JyZWN0IHR5cGVzLlxudHlwZSBVc2VyTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBVc2VyTW9kZWw7XG4gICAgYXV0aGVudGljYXRlKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZEJ5VG9rZW4odG9rZW46IHN0cmluZyk6IFByb21pc2U8VXNlck1vZGVsIHwgbnVsbD47XG4gIH1cblxuLy8gVFMgY2FuJ3QgZGVyaXZlIGEgcHJvcGVyIGNsYXNzIGRlZmluaXRpb24gZnJvbSBhIGAuZGVmaW5lYCBjYWxsLCB0aGVyZWZvciB3ZSBuZWVkIHRvIGNhc3QgaGVyZS5cbmNvbnN0IFVzZXIgPSA8VXNlck1vZGVsU3RhdGljPmRiLmRlZmluZShcInVzZXJcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICB1bmlxdWU6IHRydWUsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBpc0VtYWlsOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgaW1hZ2VVcmw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL01hbiBFbW9qaS5wbmcnXG4gICAgfSxcbiAgICBzdHJpcElkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgeyBVc2VyLCBVc2VyTW9kZWwgfTtcblxuLy8gKiogaW5zdGFuY2VNZXRob2RzICoqXG5cbi8vIGdlbmVyYXRlIHRva2VuLCBzYXZlIHRoZSBpZCBpbiB0aGUgaGVhZGVyLlxuVXNlci5wcm90b3R5cGUuZ2VuZXJhdGVUb2tlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gand0LnNpZ24oeyBpZDogdGhpcy5pZCB9LHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nLCB7ZXhwaXJlc0luOiAnMWQnfVxuICAgICAgICApXG59XG5cbi8vIGNvbXBhcmUgdGhlIHBsYWluIHZlcnNpb24gdG8gdGhlIGVuY3JweXRlZCB2ZXJzaW9uLlxuVXNlci5wcm90b3R5cGUuY29ycmVjdFBhc3N3b3JkID0gZnVuY3Rpb24gKGNhbmRpZGF0ZVBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUoY2FuZGlkYXRlUGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpXG59XG5cblxuLy8gKiogY2xhc3NNZXRob2RzICoqXG5cblVzZXIuYXV0aGVudGljYXRlID0gYXN5bmMgZnVuY3Rpb24gKCBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nICkge1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSlcbiAgICBpZiAoIXVzZXIgfHwgIShhd2FpdCB1c2VyLmNvcnJlY3RQYXNzd29yZChwYXNzd29yZCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHVzZXJuYW1lL3Bhc3N3b3JkJyk7XG4gICAgfVxuICAgIHJldHVybiB1c2VyLmdlbmVyYXRlVG9rZW4oKTtcbiAgfTtcblxuICBVc2VyLmZpbmRCeVRva2VuID0gYXN5bmMgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nKSBhcyB7IGlkOiBudW1iZXIgfTtcbiAgICAgIGNvbnN0IHVzZXIgPSBVc2VyLmZpbmRCeVBrKGlkKVxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHRocm93ICdub29vJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVzZXJcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCB0b2tlbicpXG4gICAgfVxuICB9XG5cbiAgLy8gKiogaG9va3MgKipcblxuICBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAodXNlcjogVXNlck1vZGVsKSA9PiB7XG4gICAgLy9pbiBjYXNlIHRoZSBwYXNzd29yZCBoYXMgYmVlbiBjcmVhdGVkIG9yIGNoYW5nZWQsIHdlIHdhbnQgdG8gZW5jcnlwdCBpdCB3aXRoIGJjcnlwdFxuICAgIGlmICh1c2VyLmNoYW5nZWQoJ3Bhc3N3b3JkJykpIHtcbiAgICAgIHVzZXIucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBTQUxUX1JPVU5EUyk7XG4gICAgfVxuICB9XG4gIFxuICBVc2VyLmJlZm9yZUNyZWF0ZShoYXNoUGFzc3dvcmQpXG4gIFVzZXIuYmVmb3JlVXBkYXRlKGhhc2hQYXNzd29yZClcbiAgVXNlci5iZWZvcmVCdWxrQ3JlYXRlKCh1c2VycykgPT4ge1xuICAgICAgUHJvbWlzZS5hbGwodXNlcnMubWFwKGhhc2hQYXNzd29yZCkpfSk7XG5cbiIsImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgYXBwIGZyb20gJy4vYXBwJztcbmltcG9ydCBzZWVkIGZyb20gJy4vc2NyaXB0L3NlZWQnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiL2luZGV4JztcbmltcG9ydCB7U2VydmVyLCAgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pb1wiO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKCAgcHJvY2Vzcy5lbnYuU0VFRCA9PT0gJ3RydWUnICkge1xuICAgICAgICAgICAgYXdhaXQgc2VlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgZGIuc3luYygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmx1ZUJyaWdodCgnRGF0YWJhc2Ugc3luY2VkJykpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW8gPSBuZXcgU2VydmVyKGFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuY3lhbkJyaWdodGBMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlBPUlR9YClcbiAgICAgICAgfSkpXG5cbiAgICAgICAgaW8ub24oXCJjb25uZWN0aW9uXCIsIChzb2NrZXQ6IFNvY2tldCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdHcmVlbkJyaWdodChgVVNFUiAoJHtzb2NrZXQuaWR9KSBoYXMgbWFkZSBhIHBlcnNpc3RlbnQgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIWApKVxuICAgICAgICAgICAgLy8gdGhlIG5leHQgdHdvIGxpbmVzIHdpbGwgbG9nIGlmIGEgdXNlciBkaXNjb25uZWN0LlxuICAgICAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ1JlZEJyaWdodChgVVNFUiAoJHtzb2NrZXQuaWR9KSBkaXNjb25uZWN0ZWRgKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxufSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coY2hhbGsucmVkKGVycikpO1xufVxufVxuXG5pbml0KClcblxuXG4iLCJcblxuYXN5bmMgZnVuY3Rpb24gc2VlZCgpIHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWVkOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3cy1zZGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==