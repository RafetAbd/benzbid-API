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
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)({
    origin: '*'
}));
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
        allowNull: true
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
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);

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
const db_1 = __webpack_require__(/*! ../db */ "./src/db/index.ts");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.sync({ force: true });
        console.log(chalk_1.default.bgWhiteBright('Database synced'));
        const users = yield Promise.all([
            db_1.User.create({
                name: 'John Doe',
                email: 'john@mail.com',
                password: '12345',
                imageUrl: '/Beard Man Emoji.png'
            }),
            db_1.User.create({
                name: 'Samantha Brown',
                email: 'sami@mail.com',
                password: '12345',
                imageUrl: '/Doctor Emoji - Woman.png'
            }),
            db_1.User.create({
                name: 'Olivia Cash',
                email: 'olivia@mail.com',
                password: '12345',
                imageUrl: '/Farmer Emoji - Woman.png'
            }),
            db_1.User.create({
                name: 'George Dimpsy',
                email: 'georg@mail.com',
                password: '12345',
                imageUrl: '/Grey Hair Man Emoji.png'
            }),
            db_1.User.create({
                name: 'Mike Li',
                email: 'mike@mail.com',
                password: '12345',
                imageUrl: '/Man Emoji [Free Download iPhone Emojis].png'
            }),
            db_1.User.create({
                name: 'Dani West',
                email: 'dani@mail.com',
                password: '12345',
                imageUrl: '/Man With Gua Pi Mao Emoji [Free Download iPhone Emojis].png'
            }),
            db_1.User.create({
                name: 'Sandra Musk',
                email: 'sandra@mail.com',
                password: '12345',
                imageUrl: '/Girl Worker Emoji [Free Download IOS Emojis].png'
            }),
            db_1.User.create({
                name: 'Brad Patel',
                email: 'brad@mail.com',
                password: '12345',
                imageUrl: '/Man With Turban Emoji [Free Download iPhone Emojis].png'
            }),
            db_1.User.create({
                name: 'Oliver Do',
                email: 'oliver@mail.com',
                password: '12345',
                imageUrl: '/Old Man Emoji.png'
            }),
            db_1.User.create({
                name: 'Lisa Temple',
                email: 'lisa@mail.com',
                password: '12345',
                imageUrl: '/Red Hair Woman Emoji.png'
            }),
        ]);
        const cars = yield Promise.all([
            db_1.Car.create({
                model: 'EQS Sedan',
                year: 2020,
                price: 70000,
                description: 'This is a great car, you can drive it, and it is very comfortable',
                coordinateLat: '33.678615',
                coordinateLng: '-111.974607',
                endTimeAndDate: '2023-06-01T00:00:00.000Z',
                userId: users[7].id,
            }),
            db_1.Car.create({
                model: 'C 300 Sedan',
                year: 2020,
                price: 40000,
                description: 'This is a great car, you can drive it, and it is very comfortable',
                coordinateLat: '33.678615',
                coordinateLng: '-111.974607',
                endTimeAndDate: '2023-06-01T00:00:00.000Z',
                userId: users[7].id,
            }),
            db_1.Car.create({
                model: 'GLC 43 AMG 4MATIC',
                year: 2021,
                price: 60000,
                description: 'This is a great car, you can drive it, and it is very comfortable',
                coordinateLat: '33.678615',
                coordinateLng: '-111.974607',
                endTimeAndDate: '2023-06-01T00:00:00.000Z',
                userId: users[0].id,
            }),
            db_1.Car.create({
                model: 'E 350 Sedan',
                year: 2019,
                price: 50000,
                description: 'This is a great car, you can drive it, and it is very comfortable',
                coordinateLat: '33.678615',
                coordinateLng: '-111.974607',
                endTimeAndDate: '2023-06-01T00:00:00.000Z',
                userId: users[0].id,
            }),
            db_1.Car.create({
                model: 'G 63 AMG 4MATIC',
                year: 2020,
                price: 200000,
                description: 'This is a great car, you can drive it, and it is very comfortable',
                coordinateLat: '33.678615',
                coordinateLng: '-111.974607',
                endTimeAndDate: '2023-06-01T00:00:00.000Z',
                userId: users[2].id,
            })
        ]);
        const bids = yield Promise.all([
            db_1.Bid.create({
                amount: 750000,
                carId: 1,
                userId: 1
            }),
            db_1.Bid.create({
                amount: 80000,
                carId: 1,
                userId: 2
            }),
            db_1.Bid.create({
                amount: 830000,
                carId: 1,
                userId: 3
            }),
            db_1.Bid.create({
                amount: 63000,
                carId: 3,
                userId: 4
            }),
            db_1.Bid.create({
                amount: 64000,
                carId: 3,
                userId: 5
            }),
            db_1.Bid.create({
                amount: 550000,
                carId: 4,
                userId: 6
            }),
            db_1.Bid.create({
                amount: 240000,
                carId: 5,
                userId: 7
            }),
        ]);
        console.log(chalk_1.default.bgBlueBright('Seeding complete'));
    });
}
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('seeding...');
        try {
            yield seed();
        }
        catch (err) {
            console.error(err);
            process.exitCode = 1;
        }
        finally {
            console.log(chalk_1.default.bgCyanBright('closing db connection'));
            yield db_1.db.close();
            console.log(chalk_1.default.bgBlueBright('db connection closed'));
        }
    });
}
if (module === __webpack_require__.c[__webpack_require__.s]) {
    runSeed();
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

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

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

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","run:dev:logger":"LOGGING=true npm run run:dev","run:dev:seed":"SEED=true npm run run:dev","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.16","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/bcrypt":"^5.0.0","@types/jsonwebtoken":"^8.5.8","@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","aws-sdk":"^2.1118.0","axios":"^0.26.1","bcrypt":"^5.0.1","body-parser":"^1.20.0","chalk":"^4.1.2","cors":"^2.8.5","dotenv":"^16.0.0","express":"^4.18.1","jsonwebtoken":"^8.5.1","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2JpZHMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2NhcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL3MzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy91c2Vycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL3JvdXRlcy9iaWRzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvY2Fycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvcm91dGVzL3MzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvdXNlcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2F1dGgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvZGIudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0JpZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvQ2FyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9NZXNzYWdlLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL3NjcmlwdC9zZWVkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYXdzLXNka1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImJjcnlwdFwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImNoYWxrXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzb2NrZXQuaW9cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBVc2VyLCBNZXNzYWdlLCBDYXIsIEJpZCB9IGZyb20gXCIuLi8uLi9kYlwiO1xuXG5cbi8vIEByb3V0ZSAgUE9TVCBhcGkvYmlkcywgQ3JlYXRlIGEgbmV3IGJpZCBvbiBhIGNhclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJpZDogUmVxdWVzdEhhbmRsZXIgPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhcklkID0gcmVxLmJvZHkuY2FySWQ7XG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHJlcS5ib2R5LnVzZXJJZDtcbiAgICAgICAgY29uc3QgYmlkID0gYXdhaXQgQmlkLmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgY2FySWQ6IGNhcklkXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc2VuZChiaWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTsiLCJpbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBVc2VyLCBNZXNzYWdlLCBDYXIsIEJpZCB9IGZyb20gXCIuLi8uLi9kYlwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG50eXBlIGdvb2dsZUdlb1Jlc3BvbnNlID0ge1xuICAgIHJlc3VsdHM6IHtnZW9tZXRyeTogeyBsb2NhdGlvbjoge2xhdDogbnVtYmVyLCBsbmc6IG51bWJlcn19fVtdO1xuICAgIHN0YXR1czogJ09LJyB8ICdaRVJPX1JFU1VMVFMnO1xufVxuXG4vLyBAcm91dGUgICBQT1NUIGFwaS9jYXJzLywgY3JlYXRlIGEgbmV3IGNhciBwb3N0XG5leHBvcnQgY29uc3QgY3JlYXRlQ2FyOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IHJlcS5ib2R5LmFkZHJlc3M7XG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHJlcS5ib2R5LnVzZXJJZDtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBhd2FpdCBheGlvcy5nZXQ8Z29vZ2xlR2VvUmVzcG9uc2U+KGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2FkZHJlc3M9JHtlbmNvZGVVUkkoYWRkcmVzcyl9JmtleT0ke3Byb2Nlc3MuZW52LkdPT0dMRV9BUElfS0VZfWApO1xuICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuY3JlYXRlKHtcbiAgICAgICAgICAgIC4uLnJlcS5ib2R5LFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxhdDogY29vcmRpbmF0ZXMuZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMbmc6IGNvb3JkaW5hdGVzLmRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcsXG4gICAgICAgICAgICB1c2VySWRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZW5kKGNhcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG4vLyBAcm91dGUgICBHRVQgYXBpL2NhcnMsIGdldCBhbGwgY2FycyBsaXN0XG5leHBvcnQgY29uc3QgZ2V0QWxsQ2FyczogUmVxdWVzdEhhbmRsZXIgPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhcnMgPSBhd2FpdCBDYXIuZmluZEFsbCgpO1xuICAgICAgICByZXMuc2VuZChjYXJzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIEdFVCBhcGkvY2Fycy86aWQsIGdldCBhIGNhciBwb3N0XG5leHBvcnQgY29uc3QgZ2V0T25lQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCwge1xuICAgICAgICAgICAgaW5jbHVkZTogW3tcbiAgICAgICAgICAgICAgICBtb2RlbDogVXNlcixcbiAgICAgICAgICAgICAgICBhczogJ3VzZXInLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnZW1haWwnLCAnbmFtZScsICdpbWFnZVVybCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBNZXNzYWdlLFxuICAgICAgICAgICAgICAgIGFzOiAnbWVzc2FnZXMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogQmlkLFxuICAgICAgICAgICAgICAgIGFzOiAnYmlkcycsXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3tcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFVzZXIsXG4gICAgICAgICAgICAgICAgICAgIGFzOiAndXNlcicsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnZW1haWwnLCAnbmFtZSddXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc2VuZChjYXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgUFVUIGFwaS9jYXJzLzppZCwgdXBkYXRlIGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCB1cGRhdGVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKCFjYXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCgnQ2FyIG5vdCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDYXIgPSBhd2FpdCBjYXIudXBkYXRlKHJlcS5ib2R5KTsgICBcbiAgICAgICAgcmVzLnNlbmQodXBkYXRlZENhcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG5cbi8vIG1heWJlIHdlIHdvbid0IG5lZWQgdGhpcyByb3V0ZSwgdGhlIG5vcmFtbCB1cGRhdGUgc2hvdWxkIGhhbmxkZSBzaW5nbGUgZmllbGQgdXBkYXRlXG5cbi8vIEByb3V0ZSAgIFBVVCBhcGkvY2Fycy9pbWFnZS86aWQsIGFkZCBpbWFnZSB0byBjYXIgcG9zdFxuLy8gZXhwb3J0IGNvbnN0IGFkZEltYWdlVG9DYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICAgIHRyeSB7XG4vLyAgICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcbi8vICAgICAgICAgaWYgKCFjYXIpIHtcbi8vICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCgnQ2FyIG5vdCBmb3VuZCcpO1xuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBjb25zdCB1cGRhdGVkQ2FyID0gYXdhaXQgY2FyLnVwZGF0ZSh7XG4vLyAgICAgICAgICAgICAuLi5yZXEuYm9keSxcbi8vICAgICAgICAgICAgIGltYWdlVXJsOiByZXEuYm9keS5pbWFnZVVybFxuLy8gICAgICAgICB9KTsgICBcbi8vICAgICAgICAgcmVzLnNlbmQodXBkYXRlZENhcik7XG4vLyAgICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgIG5leHQoZXJyKTtcbi8vICAgICB9XG4vLyB9O1xuXG4vLyBAcm91dGUgICBERUxFVEUgYXBpL2NhcnMvOmlkLCBkZWxldGUgYSBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICBpZiAoIWNhcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdDYXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY2FyLmRlc3Ryb3koKTtcbiAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjA0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IHJlZ2lvbiA9IFwidXMtd2VzdC0yXCJcbmNvbnN0IGJ1Y2tldE5hbWUgPSBcImJlbnpiaWQtY2Fycy1pbWFnZXNcIlxuY29uc3QgYWNjZXNzS2V5SWQgPSBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRDtcbmNvbnN0IHNlY3JldEFjY2Vzc0tleSA9IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWTtcblxuY29uc3QgczMgPSBuZXcgQVdTLlMzKHtcbiAgICByZWdpb246IHJlZ2lvbixcbiAgICBhY2Nlc3NLZXlJZDogYWNjZXNzS2V5SWQsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBzZWNyZXRBY2Nlc3NLZXksXG4gICAgc2lnbmF0dXJlVmVyc2lvbjogJ3Y0J1xufSk7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVVwbG9hZFVSTCA9IGFzeW5jKCkgPT4ge1xuICAgIGNvbnN0IGltYWdlTmFtZSA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9ICh7XG4gICAgICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgS2V5OiBpbWFnZU5hbWUsXG4gICAgICAgIEV4cGlyZXM6IDYwLFxuICAgIH0pO1xuICAgIGNvbnN0IHVwbG9hZFVybCA9IGF3YWl0IHMzLmdldFNpZ25lZFVybFByb21pc2UoJ3B1dE9iamVjdCcsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHVwbG9hZFVybDtcbn0iLCJpbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vZGJcIlxuXG4vLyBAcm91dGUgUFVUIGFwaS91c2Vycy86aWQsIHVwZGF0ZSBhIHVzZXIgaW5mb1xuZXhwb3J0IGNvbnN0IHVwZGF0ZVVzZXI6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiVXNlciBub3QgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCB1c2VyLnVwZGF0ZShyZXEuYm9keSk7XG4gICAgICAgIHJlcy5zZW5kKHVwZGF0ZWRVc2VyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNhcnNSb3V0ZSBmcm9tICcuL3JvdXRlcy9jYXJzJztcbmltcG9ydCBiaWRzUm91dGUgZnJvbSAnLi9yb3V0ZXMvYmlkcyc7XG5pbXBvcnQgczNSb3V0ZSBmcm9tICcuL3JvdXRlcy9zMyc7XG5pbXBvcnQgdXNlcnNSb3V0ZSBmcm9tICcuL3JvdXRlcy91c2Vycyc7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuLy8gYWxsIHMzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS9zM1VybCBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHMzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvczNVcmwnLCBzM1JvdXRlKVxuXG4vLyBhbGwgY2FycyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvY2FycyBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSBjYXJzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvY2FycycsIGNhcnNSb3V0ZSk7XG5cbi8vIGFsbCBiaWRzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS9iaWRzIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIGJpZHNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy9iaWRzJywgYmlkc1JvdXRlKTtcblxuLy8gYWxsIHVzZXJzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS91c2VycyBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSB1c2Vyc1JvdXRlIHJvdXRlclxucm91dGVyLnVzZSgnL3VzZXJzJywgdXNlcnNSb3V0ZSk7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgY3JlYXRlQmlkIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2JpZHNcIjtcblxuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy8nLCAoY3JlYXRlQmlkKSlcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBjcmVhdGVDYXIsIGdldEFsbENhcnMsIGdldE9uZUNhciwgdXBkYXRlQ2FyLCBkZWxldGVDYXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY2Fyc1wiO1xuLy8gaW1wb3J0IHsgYWRkSW1hZ2VUb0NhciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9jYXJzXCI7XG5cblxuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy8nLCAoY3JlYXRlQ2FyKSApO1xucm91dGVyLmdldCgnLycsIChnZXRBbGxDYXJzKSApO1xucm91dGVyLmdldCgnLzppZCcsIChnZXRPbmVDYXIpICk7XG5yb3V0ZXIucHV0KCcvOmlkJywgKHVwZGF0ZUNhcikgKTtcbi8vIHJvdXRlci5wdXQoJy9pbWFnZS86aWQnLCAoYWRkSW1hZ2VUb0NhcikgKTtcbnJvdXRlci5kZWxldGUoJy86aWQnLCAoZGVsZXRlQ2FyKSApO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGdlbmVyYXRlVXBsb2FkVVJMIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL3MzXCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvJywgZ2VuZXJhdGVVcGxvYWRVUkwpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IHVwZGF0ZVVzZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvdXNlcnNcIjtcblxuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnB1dCgnLzppZCcsICh1cGRhdGVVc2VyKSApO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBhdXRoUm91dGVyIGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgYXBpUm91dGVyIGZyb20gJy4vYXBpJztcbmltcG9ydCB7IGpzb24gfSBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgIGNvcnMgIGZyb20gJ2NvcnMnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gYm9keSBwYXJzaW5nIG1pZGRsZXdhcmVcbmFwcC51c2UoanNvbigpKVxuXG5hcHAudXNlKGNvcnMoe1xuICBvcmlnaW46ICcqJ1xufSkpO1xuXG5cblxuLy8gYXV0aCBhbmQgYXBpIHJvdXRlc1xuYXBwLnVzZSgnL2F1dGgnLCBhdXRoUm91dGVyKTtcbmFwcC51c2UoJy9hcGknLCBhcGlSb3V0ZXIpO1xuXG4vLyBhcHAuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4vLyAgICAgcmVzLnNlbmQoe1xuLy8gICAgICAgbWVzc2FnZTogJyBieWUgd29ybGQnLFxuLy8gICAgIH0pO1xuLy8gICB9KTtcblxuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKVxuXG4gIC8vIGVycm9yIGhhbmRsaW5nIG1pZGRsZXdhcmUuXG4gIGFwcC51c2UoKGVycjogRXJyb3IsIHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe21lc3NhZ2U6IGVyci5tZXNzYWdlfSk7XG4gIH0pO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2RiJztcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG5cblxuLy8gcmVjaWV2ZSBhIGVtYWlsLCBwYXNzb3dyZCB0aGVuIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHRva2VuLlxucm91dGVyLnBvc3QoJy9sb2dpbicsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIFxuICAgIHRyeSB7XG4gICAgICAgIHJlcy5zZW5kKHsgdG9rZW46IGF3YWl0IFVzZXIuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCkgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pO1xuXG4vLyByZWNpZXZlIHVzZXIgaW5mbywgY3JlYXRlIGEgbmV3IHVzZXIgYW5kIHJlc3BvbnNlIHdpdGggYSB0b2tlbi5cbnJvdXRlci5wb3N0KCcvc2lnbnVwJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHJlcS5ib2R5KTtcblxuICAgICAgICByZXMuc2VuZCh7IHRva2VuOiB1c2VyLmdlbmVyYXRlVG9rZW4oKSB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBcbiAgICAgICAgaWYgKChlcnIgYXMgRXJyb3IpLm5hbWUgPT09ICdTZXF1ZWxpemVVbmlxdWVDb25zdHJhaW50RXJyb3InKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCgnVXNlciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgIH1cbiAgICB9XG59KVxuXG4vLyByZWNpZXZlIGEgdG9rZW4sIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHVzZXIuXG5yb3V0ZXIuZ2V0KCcvbWUnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXMuc2VuZChhd2FpdCBVc2VyLmZpbmRCeVRva2VuKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gYXMgc3RyaW5nKSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pIiwiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGRhdGFiYXNlTmFtZTpzdHJpbmcgPSBwa2cubmFtZSArIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnID8gJy10ZXN0JyA6ICcnKVxuXG5jb25zdCBjb25maWc6IHtcbiAgICBsb2dnaW5nPzogYm9vbGVhbixcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogYm9vbGVhbixcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IGJvb2xlYW5cbiAgICAvLyAgICAgfVxuICAgIH1cbn0gPSB7XG4gICAgbG9nZ2luZzogZmFsc2UsXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAvLyAgICAgc3NsOiB7XG4gICAgLy8gICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgLy8gICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgLy8gICAgIH1cbiAgICB9LFxuICB9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTE9HR0lORyA9PT0gJ3RydWUnKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5sb2dnaW5nO1xufVxuXG5pZiAoIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCApIHtcbiAgICBjb25maWcuZGlhbGVjdE9wdGlvbnMgPSB7XG4gICAgICAgIC8vIHNzbDoge1xuICAgICAgICAvLyAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgLy8gfVxuICAgIH07XG59XG5cbmNvbnN0IGRiID0gbmV3IFNlcXVlbGl6ZShcbiAgICBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgYHBvc3RncmVzOi8vbG9jYWxob3N0OjU0MzIvJHtkYXRhYmFzZU5hbWV9YCwgY29uZmlnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7IiwiaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IEJpZCBmcm9tICcuL21vZGVscy9CaWQnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tb2RlbHMvTWVzc2FnZSc7XG5pbXBvcnQgQ2FyIGZyb20gJy4vbW9kZWxzL0Nhcic7XG5cbi8vIGFzc29jaWF0ZSB0aGUgbW9kZWxzXG5Vc2VyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oVXNlcik7XG5cblVzZXIuaGFzTWFueShDYXIpO1xuQ2FyLmJlbG9uZ3NUbyhVc2VyKTtcblxuQ2FyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oQ2FyKTtcblxuQ2FyLmhhc01hbnkoTWVzc2FnZSk7XG5NZXNzYWdlLmJlbG9uZ3NUbyhDYXIpO1xuXG5Vc2VyLmhhc01hbnkoTWVzc2FnZSk7XG5NZXNzYWdlLmJlbG9uZ3NUbyhVc2VyKTtcblxuZXhwb3J0IHsgZGIsIFVzZXIsIEJpZCwgTWVzc2FnZSwgQ2FyIH07IiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiXG5cbmludGVyZmFjZSBCaWRNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBhbW91bnQ6IG51bWJlcjtcbn1cblxudHlwZSBCaWRNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IEJpZE1vZGVsO1xufVxuXG5jb25zdCBCaWQgID0gPEJpZE1vZGVsU3RhdGljPmRiLmRlZmluZShcImJpZFwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCaWQ7IiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBkYiBmcm9tICcuLi9kYic7XG5cbmludGVyZmFjZSBDYXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBtb2RlbDogc3RyaW5nO1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHByaWNlOiBudW1iZXI7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgY29vcmRpbmF0ZUxhdDogbnVtYmVyO1xuICAgIGNvb3JkaW5hdGVMbmc6IG51bWJlcjtcbiAgICBlbmRUaW1lQW5kRGF0ZTogc3RyaW5nO1xuICAgIGF3c1VybDogc3RyaW5nO1xufVxuXG50eXBlIENhck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogQ2FyTW9kZWw7XG59XG5cbmNvbnN0IENhciA9IDxDYXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoJ2NhcicsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgeWVhcjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIGlzSW50OiB0cnVlLFxuICAgICAgICAgICAgbWluOiAxOTIwLFxuICAgICAgICAgICAgbWF4OiAyMDIzLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBwcmljZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2FjdGl2ZSdcbiAgICB9LFxuICAgIGNvb3JkaW5hdGVMYXQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRFQ0lNQUwsXG4gICAgfSxcbiAgICBjb29yZGluYXRlTG5nOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuICAgIH0sXG4gICAgZW5kVGltZUFuZERhdGU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgYXdzVXJsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJy9tZXJjZWRlcyBkZWZhdWx0LmpwZydcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyO1xuIiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IHsgVXNlck1vZGVsLCBVc2VyIH0gZnJvbSBcIi4vVXNlclwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuXG5pbnRlcmZhY2UgTWVzc2FnZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICAvLyBkZWZhdWx0U2NvcGVzOiB7IGluY2x1ZGU6IHsgbW9kZWw6IFVzZXJNb2RlbCB9W10gfTtcbn1cblxudHlwZSBNZXNzYWdlTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBNZXNzYWdlTW9kZWw7XG59XG5cbmNvbnN0IE1lc3NhZ2UgPSA8TWVzc2FnZU1vZGVsU3RhdGljPmRiLmRlZmluZShcIm1lc3NhZ2VcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59XG4sIHtcbiAgICBkZWZhdWx0U2NvcGU6IHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgeyBtb2RlbDogVXNlciB9XG4gICAgICAgIF1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTsiLCJcbmltcG9ydCB7IEJ1aWxkT3B0aW9ucywgTW9kZWwsIERhdGFUeXBlcyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XG5cbmNvbnN0IFNBTFRfUk9VTkRTID0gNTtcblxuLy8gV2UgbmVlZCB0byBkZWNsYXJlIGFuIGludGVyZmFjZSBmb3Igb3VyIG1vZGVsIHRoYXQgaXMgYmFzaWNhbGx5IHdoYXQgb3VyIGNsYXNzIHdvdWxkIGJlXG5pbnRlcmZhY2UgVXNlck1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW1hZ2VVcmw/OiBzdHJpbmc7XG4gICAgc3RyaXBJZD86IHN0cmluZztcbiAgICBjb3JyZWN0UGFzc3dvcmQocGFzc3dvcmQ6c3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICBnZW5lcmF0ZVRva2VuKCk6IHN0cmluZztcbn1cblxuLy8gTmVlZCB0byBkZWNsYXJlIHRoZSBzdGF0aWMgbW9kZWwgc28gYGZpbmRPbmVgIGV0Yy4gdXNlIGNvcnJlY3QgdHlwZXMuXG50eXBlIFVzZXJNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IFVzZXJNb2RlbDtcbiAgICBhdXRoZW50aWNhdGUoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbiAgICBmaW5kQnlUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxVc2VyTW9kZWwgfCBudWxsPjtcbiAgfVxuXG4vLyBUUyBjYW4ndCBkZXJpdmUgYSBwcm9wZXIgY2xhc3MgZGVmaW5pdGlvbiBmcm9tIGEgYC5kZWZpbmVgIGNhbGwsIHRoZXJlZm9yIHdlIG5lZWQgdG8gY2FzdCBoZXJlLlxuY29uc3QgVXNlciA9IDxVc2VyTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwidXNlclwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBpc0VtYWlsOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlXG4gICAgfSxcbiAgICBpbWFnZVVybDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcvTWFuIEVtb2ppLnBuZydcbiAgICB9LFxuICAgIHN0cmlwSWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlXG4gICAgfVxufSk7XG5cbmV4cG9ydCB7IFVzZXIsIFVzZXJNb2RlbCB9O1xuXG4vLyAqKiBpbnN0YW5jZU1ldGhvZHMgKipcblxuLy8gZ2VuZXJhdGUgdG9rZW4sIHNhdmUgdGhlIGlkIGluIHRoZSBoZWFkZXIuXG5Vc2VyLnByb3RvdHlwZS5nZW5lcmF0ZVRva2VuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBqd3Quc2lnbih7IGlkOiB0aGlzLmlkIH0scHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmcsIHtleHBpcmVzSW46ICcxZCd9XG4gICAgICAgIClcbn1cblxuLy8gY29tcGFyZSB0aGUgcGxhaW4gdmVyc2lvbiB0byB0aGUgZW5jcnB5dGVkIHZlcnNpb24uXG5Vc2VyLnByb3RvdHlwZS5jb3JyZWN0UGFzc3dvcmQgPSBmdW5jdGlvbiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZClcbn1cblxuXG4vLyAqKiBjbGFzc01ldGhvZHMgKipcblxuVXNlci5hdXRoZW50aWNhdGUgPSBhc3luYyBmdW5jdGlvbiAoIGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcgKSB7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5maW5kT25lKHsgd2hlcmU6IHsgZW1haWwgfSB9KVxuICAgIGlmICghdXNlciB8fCAhKGF3YWl0IHVzZXIuY29ycmVjdFBhc3N3b3JkKHBhc3N3b3JkKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgdXNlcm5hbWUvcGFzc3dvcmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXIuZ2VuZXJhdGVUb2tlbigpO1xuICB9O1xuXG4gIFVzZXIuZmluZEJ5VG9rZW4gPSBhc3luYyBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmcpIGFzIHsgaWQ6IG51bWJlciB9O1xuICAgICAgY29uc3QgdXNlciA9IFVzZXIuZmluZEJ5UGsoaWQpXG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgdGhyb3cgJ25vb28nXG4gICAgICB9XG4gICAgICByZXR1cm4gdXNlclxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIHRva2VuJylcbiAgICB9XG4gIH1cblxuICAvLyAqKiBob29rcyAqKlxuXG4gIGNvbnN0IGhhc2hQYXNzd29yZCA9IGFzeW5jICh1c2VyOiBVc2VyTW9kZWwpID0+IHtcbiAgICAvL2luIGNhc2UgdGhlIHBhc3N3b3JkIGhhcyBiZWVuIGNyZWF0ZWQgb3IgY2hhbmdlZCwgd2Ugd2FudCB0byBlbmNyeXB0IGl0IHdpdGggYmNyeXB0XG4gICAgaWYgKHVzZXIuY2hhbmdlZCgncGFzc3dvcmQnKSkge1xuICAgICAgdXNlci5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIFNBTFRfUk9VTkRTKTtcbiAgICB9XG4gIH1cbiAgXG4gIFVzZXIuYmVmb3JlQ3JlYXRlKGhhc2hQYXNzd29yZClcbiAgVXNlci5iZWZvcmVVcGRhdGUoaGFzaFBhc3N3b3JkKVxuICBVc2VyLmJlZm9yZUJ1bGtDcmVhdGUoKHVzZXJzKSA9PiB7XG4gICAgICBQcm9taXNlLmFsbCh1c2Vycy5tYXAoaGFzaFBhc3N3b3JkKSl9KTtcblxuIiwiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBhcHAgZnJvbSAnLi9hcHAnO1xuaW1wb3J0IHNlZWQgZnJvbSAnLi9zY3JpcHQvc2VlZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vZGIvaW5kZXgnO1xuaW1wb3J0IHtTZXJ2ZXIsICBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvXCI7XG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoICBwcm9jZXNzLmVudi5TRUVEID09PSAndHJ1ZScgKSB7XG4gICAgICAgICAgICBhd2FpdCBzZWVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5zeW5jKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5ibHVlQnJpZ2h0KCdEYXRhYmFzZSBzeW5jZWQnKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbyA9IG5ldyBTZXJ2ZXIoYXBwLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JULCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5jeWFuQnJpZ2h0YExpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVH1gKVxuICAgICAgICB9KSlcblxuICAgICAgICBpby5vbihcImNvbm5lY3Rpb25cIiwgKHNvY2tldDogU29ja2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ0dyZWVuQnJpZ2h0KGBVU0VSICgke3NvY2tldC5pZH0pIGhhcyBtYWRlIGEgcGVyc2lzdGVudCBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIhYCkpXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCB0d28gbGluZXMgd2lsbCBsb2cgaWYgYSB1c2VyIGRpc2Nvbm5lY3QuXG4gICAgICAgICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnUmVkQnJpZ2h0KGBVU0VSICgke3NvY2tldC5pZH0pIGRpc2Nvbm5lY3RlZGApKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG59IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhjaGFsay5yZWQoZXJyKSk7XG59XG59XG5cbmluaXQoKVxuXG5cbiIsImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQge1xuICAgIGRiLFxuICAgIFVzZXIsXG4gICAgQmlkLFxuICAgIE1lc3NhZ2UsXG4gICAgQ2FyLFxufSBmcm9tICcuLi9kYic7XG5cbmFzeW5jIGZ1bmN0aW9uIHNlZWQoKSB7XG4gICAgYXdhaXQgZGIuc3luYyh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnV2hpdGVCcmlnaHQoJ0RhdGFiYXNlIHN5bmNlZCcpKTtcblxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnSm9obiBEb2UnLFxuICAgICAgICAgICAgZW1haWw6ICdqb2huQG1haWwuY29tJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTIzNDUnLFxuICAgICAgICAgICAgaW1hZ2VVcmw6ICcvQmVhcmQgTWFuIEVtb2ppLnBuZydcbiAgICAgICAgfSksXG4gICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6ICdTYW1hbnRoYSBCcm93bicsXG4gICAgICAgICAgICBlbWFpbDogJ3NhbWlAbWFpbC5jb20nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMjM0NScsXG4gICAgICAgICAgICBpbWFnZVVybDogJy9Eb2N0b3IgRW1vamkgLSBXb21hbi5wbmcnXG4gICAgICAgIH0pLFxuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnT2xpdmlhIENhc2gnLFxuICAgICAgICAgICAgZW1haWw6ICdvbGl2aWFAbWFpbC5jb20nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMjM0NScsXG4gICAgICAgICAgICBpbWFnZVVybDogJy9GYXJtZXIgRW1vamkgLSBXb21hbi5wbmcnXG4gICAgICAgIH0pLFxuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnR2VvcmdlIERpbXBzeScsXG4gICAgICAgICAgICBlbWFpbDogJ2dlb3JnQG1haWwuY29tJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTIzNDUnLFxuICAgICAgICAgICAgaW1hZ2VVcmw6ICcvR3JleSBIYWlyIE1hbiBFbW9qaS5wbmcnXG4gICAgICAgIH0pLFxuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnTWlrZSBMaScsXG4gICAgICAgICAgICBlbWFpbDogJ21pa2VAbWFpbC5jb20nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMjM0NScsXG4gICAgICAgICAgICBpbWFnZVVybDogJy9NYW4gRW1vamkgW0ZyZWUgRG93bmxvYWQgaVBob25lIEVtb2ppc10ucG5nJ1xuICAgICAgICB9KSxcbiAgICAgICAgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ0RhbmkgV2VzdCcsXG4gICAgICAgICAgICBlbWFpbDogJ2RhbmlAbWFpbC5jb20nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMjM0NScsXG4gICAgICAgICAgICBpbWFnZVVybDogJy9NYW4gV2l0aCBHdWEgUGkgTWFvIEVtb2ppIFtGcmVlIERvd25sb2FkIGlQaG9uZSBFbW9qaXNdLnBuZydcbiAgICAgICAgfSksXG4gICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6ICdTYW5kcmEgTXVzaycsXG4gICAgICAgICAgICBlbWFpbDogJ3NhbmRyYUBtYWlsLmNvbScsXG4gICAgICAgICAgICBwYXNzd29yZDogJzEyMzQ1JyxcbiAgICAgICAgICAgIGltYWdlVXJsOiAnL0dpcmwgV29ya2VyIEVtb2ppIFtGcmVlIERvd25sb2FkIElPUyBFbW9qaXNdLnBuZydcbiAgICAgICAgfSksXG4gICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6ICdCcmFkIFBhdGVsJyxcbiAgICAgICAgICAgIGVtYWlsOiAnYnJhZEBtYWlsLmNvbScsXG4gICAgICAgICAgICBwYXNzd29yZDogJzEyMzQ1JyxcbiAgICAgICAgICAgIGltYWdlVXJsOiAnL01hbiBXaXRoIFR1cmJhbiBFbW9qaSBbRnJlZSBEb3dubG9hZCBpUGhvbmUgRW1vamlzXS5wbmcnXG4gICAgICAgIH0pLFxuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnT2xpdmVyIERvJyxcbiAgICAgICAgICAgIGVtYWlsOiAnb2xpdmVyQG1haWwuY29tJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTIzNDUnLFxuICAgICAgICAgICAgaW1hZ2VVcmw6ICcvT2xkIE1hbiBFbW9qaS5wbmcnXG4gICAgICAgIH0pLFxuICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAnTGlzYSBUZW1wbGUnLFxuICAgICAgICAgICAgZW1haWw6ICdsaXNhQG1haWwuY29tJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTIzNDUnLFxuICAgICAgICAgICAgaW1hZ2VVcmw6ICcvUmVkIEhhaXIgV29tYW4gRW1vamkucG5nJ1xuICAgICAgICB9KSxcbiAgICBdKVxuICAgIGNvbnN0IGNhcnMgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIENhci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZWw6ICdFUVMgU2VkYW4nLFxuICAgICAgICAgICAgeWVhcjogMjAyMCxcbiAgICAgICAgICAgIHByaWNlOiA3MDAwMCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBhIGdyZWF0IGNhciwgeW91IGNhbiBkcml2ZSBpdCwgYW5kIGl0IGlzIHZlcnkgY29tZm9ydGFibGUnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxhdDogJzMzLjY3ODYxNScsXG4gICAgICAgICAgICBjb29yZGluYXRlTG5nOiAnLTExMS45NzQ2MDcnLFxuICAgICAgICAgICAgZW5kVGltZUFuZERhdGU6ICcyMDIzLTA2LTAxVDAwOjAwOjAwLjAwMFonLFxuICAgICAgICAgICAgdXNlcklkOiB1c2Vyc1s3XS5pZCxcbiAgICAgICAgICAgIC8vIGF3c1VybDogJydcbiAgICAgICAgfSksXG4gICAgICAgIENhci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZWw6ICdDIDMwMCBTZWRhbicsXG4gICAgICAgICAgICB5ZWFyOiAyMDIwLFxuICAgICAgICAgICAgcHJpY2U6IDQwMDAwLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIGEgZ3JlYXQgY2FyLCB5b3UgY2FuIGRyaXZlIGl0LCBhbmQgaXQgaXMgdmVyeSBjb21mb3J0YWJsZScsXG4gICAgICAgICAgICBjb29yZGluYXRlTGF0OiAnMzMuNjc4NjE1JyxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMbmc6ICctMTExLjk3NDYwNycsXG4gICAgICAgICAgICBlbmRUaW1lQW5kRGF0ZTogJzIwMjMtMDYtMDFUMDA6MDA6MDAuMDAwWicsXG4gICAgICAgICAgICB1c2VySWQ6IHVzZXJzWzddLmlkLFxuICAgICAgICAgICAgLy8gYXdzVXJsOiAnJ1xuICAgICAgICB9KSxcbiAgICAgICAgQ2FyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlbDogJ0dMQyA0MyBBTUcgNE1BVElDJyxcbiAgICAgICAgICAgIHllYXI6IDIwMjEsXG4gICAgICAgICAgICBwcmljZTogNjAwMDAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBncmVhdCBjYXIsIHlvdSBjYW4gZHJpdmUgaXQsIGFuZCBpdCBpcyB2ZXJ5IGNvbWZvcnRhYmxlJyxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMYXQ6ICczMy42Nzg2MTUnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxuZzogJy0xMTEuOTc0NjA3JyxcbiAgICAgICAgICAgIGVuZFRpbWVBbmREYXRlOiAnMjAyMy0wNi0wMVQwMDowMDowMC4wMDBaJyxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcnNbMF0uaWQsXG4gICAgICAgICAgICAvLyBhd3NVcmw6ICcnXG4gICAgICAgIH0pLFxuICAgICAgICBDYXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZGVsOiAnRSAzNTAgU2VkYW4nLFxuICAgICAgICAgICAgeWVhcjogMjAxOSxcbiAgICAgICAgICAgIHByaWNlOiA1MDAwMCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBhIGdyZWF0IGNhciwgeW91IGNhbiBkcml2ZSBpdCwgYW5kIGl0IGlzIHZlcnkgY29tZm9ydGFibGUnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxhdDogJzMzLjY3ODYxNScsXG4gICAgICAgICAgICBjb29yZGluYXRlTG5nOiAnLTExMS45NzQ2MDcnLFxuICAgICAgICAgICAgZW5kVGltZUFuZERhdGU6ICcyMDIzLTA2LTAxVDAwOjAwOjAwLjAwMFonLFxuICAgICAgICAgICAgdXNlcklkOiB1c2Vyc1swXS5pZCxcbiAgICAgICAgICAgIC8vIGF3c1VybDogJydcbiAgICAgICAgfSksXG4gICAgICAgIENhci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZWw6ICdHIDYzIEFNRyA0TUFUSUMnLFxuICAgICAgICAgICAgeWVhcjogMjAyMCxcbiAgICAgICAgICAgIHByaWNlOiAyMDAwMDAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBncmVhdCBjYXIsIHlvdSBjYW4gZHJpdmUgaXQsIGFuZCBpdCBpcyB2ZXJ5IGNvbWZvcnRhYmxlJyxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMYXQ6ICczMy42Nzg2MTUnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxuZzogJy0xMTEuOTc0NjA3JyxcbiAgICAgICAgICAgIGVuZFRpbWVBbmREYXRlOiAnMjAyMy0wNi0wMVQwMDowMDowMC4wMDBaJyxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcnNbMl0uaWQsXG4gICAgICAgICAgICAvLyBhd3NVcmw6ICcnXG4gICAgICAgIH0pXG4gICAgXSlcbiAgICBjb25zdCBiaWRzID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIGFtb3VudDogNzUwMDAwLFxuICAgICAgICAgICAgY2FySWQ6IDEsXG4gICAgICAgICAgICB1c2VySWQ6IDFcbiAgICAgICAgfSksXG4gICAgICAgIEJpZC5jcmVhdGUoe1xuICAgICAgICAgICAgYW1vdW50OiA4MDAwMCxcbiAgICAgICAgICAgIGNhcklkOiAxLFxuICAgICAgICAgICAgdXNlcklkOiAyXG4gICAgICAgIH0pLFxuICAgICAgICBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIGFtb3VudDogODMwMDAwLFxuICAgICAgICAgICAgY2FySWQ6IDEsXG4gICAgICAgICAgICB1c2VySWQ6IDNcbiAgICAgICAgfSksXG4gICAgICAgIEJpZC5jcmVhdGUoe1xuICAgICAgICAgICAgYW1vdW50OiA2MzAwMCxcbiAgICAgICAgICAgIGNhcklkOiAzLFxuICAgICAgICAgICAgdXNlcklkOiA0XG4gICAgICAgIH0pLFxuICAgICAgICBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIGFtb3VudDogNjQwMDAsXG4gICAgICAgICAgICBjYXJJZDogMyxcbiAgICAgICAgICAgIHVzZXJJZDogNVxuICAgICAgICB9KSxcbiAgICAgICAgQmlkLmNyZWF0ZSh7XG4gICAgICAgICAgICBhbW91bnQ6IDU1MDAwMCxcbiAgICAgICAgICAgIGNhcklkOiA0LFxuICAgICAgICAgICAgdXNlcklkOiA2XG4gICAgICAgIH0pLFxuICAgICAgICBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIGFtb3VudDogMjQwMDAwLFxuICAgICAgICAgICAgY2FySWQ6IDUsXG4gICAgICAgICAgICB1c2VySWQ6IDdcbiAgICAgICAgfSksXG4gICAgXSlcbiAgICBjb25zb2xlLmxvZyhjaGFsay5iZ0JsdWVCcmlnaHQoJ1NlZWRpbmcgY29tcGxldGUnKSk7XG59XG5cbi8vIEkgc2VwYXJhdGVkIHRoZSBgc2VlZGAgZnVuY3Rpb24gZnJvbSB0aGUgYHJ1blNlZWRgIGZ1bmN0aW9uLlxuLy8gVGhpcyB3YXkgSSBjYW4gaXNvbGF0ZSB0aGUgZXJyb3IgaGFuZGxpbmcgYW5kIGV4aXQgdHJhcHBpbmcuXG4vLyBUaGUgYHNlZWRgIGZ1bmN0aW9uIGlzIGNvbmNlcm5lZCBvbmx5IHdpdGggbW9kaWZ5aW5nIHRoZSBkYXRhYmFzZS5cblxuYXN5bmMgZnVuY3Rpb24gcnVuU2VlZCgpIHtcbiAgICBjb25zb2xlLmxvZygnc2VlZGluZy4uLicpO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHNlZWQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICBwcm9jZXNzLmV4aXRDb2RlID0gMTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ0N5YW5CcmlnaHQoJ2Nsb3NpbmcgZGIgY29ubmVjdGlvbicpKTtcbiAgICAgICAgYXdhaXQgZGIuY2xvc2UoKTtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdCbHVlQnJpZ2h0KCdkYiBjb25uZWN0aW9uIGNsb3NlZCcpKTtcbiAgICB9XG59XG5cbmlmIChtb2R1bGUgPT09IHJlcXVpcmUubWFpbikge1xuICAgIHJ1blNlZWQoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VlZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=