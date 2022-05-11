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

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.16","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/bcrypt":"^5.0.0","@types/jsonwebtoken":"^8.5.8","@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","aws-sdk":"^2.1118.0","axios":"^0.26.1","bcrypt":"^5.0.1","body-parser":"^1.20.0","chalk":"^4.1.2","cors":"^2.8.5","dotenv":"^16.0.0","express":"^4.18.1","jsonwebtoken":"^8.5.1","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxNQUFNLENBQUMsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO1lBRXZHLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxNQUFNLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7S0FFVDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0I7QUFDRCxDQUFDO0FBRUQsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENOLFNBQWUsSUFBSTs7SUFFbkIsQ0FBQztDQUFBO0FBRUQscUJBQWUsSUFBSSxDQUFDOzs7Ozs7Ozs7OztBQ05wQjs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy9iaWRzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy9jYXJzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9jb250cm9sbGVycy9zMy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvY29udHJvbGxlcnMvdXNlcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvYmlkcy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvcm91dGVzL2NhcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL3JvdXRlcy9zMy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvcm91dGVzL3VzZXJzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hdXRoL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2RiLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9CaWQudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0Nhci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvVXNlci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9zY3JpcHQvc2VlZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImF3cy1zZGtcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGFsa1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiY29yc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFVzZXIsIE1lc3NhZ2UsIENhciwgQmlkIH0gZnJvbSBcIi4uLy4uL2RiXCI7XG5cblxuLy8gQHJvdXRlICBQT1NUIGFwaS9iaWRzLCBDcmVhdGUgYSBuZXcgYmlkIG9uIGEgY2FyXG5leHBvcnQgY29uc3QgY3JlYXRlQmlkOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FySWQgPSByZXEuYm9keS5jYXJJZDtcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkO1xuICAgICAgICBjb25zdCBiaWQgPSBhd2FpdCBCaWQuY3JlYXRlKHtcbiAgICAgICAgICAgIC4uLnJlcS5ib2R5LFxuICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICBjYXJJZDogY2FySWRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZW5kKGJpZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59OyIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFVzZXIsIE1lc3NhZ2UsIENhciwgQmlkIH0gZnJvbSBcIi4uLy4uL2RiXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbnR5cGUgZ29vZ2xlR2VvUmVzcG9uc2UgPSB7XG4gICAgcmVzdWx0czoge2dlb21ldHJ5OiB7IGxvY2F0aW9uOiB7bGF0OiBudW1iZXIsIGxuZzogbnVtYmVyfX19W107XG4gICAgc3RhdHVzOiAnT0snIHwgJ1pFUk9fUkVTVUxUUyc7XG59XG5cbi8vIEByb3V0ZSAgIFBPU1QgYXBpL2NhcnMvLCBjcmVhdGUgYSBuZXcgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBjcmVhdGVDYXI6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhZGRyZXNzID0gcmVxLmJvZHkuYWRkcmVzcztcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGF4aW9zLmdldDxnb29nbGVHZW9SZXNwb25zZT4oYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz0ke2VuY29kZVVSSShhZGRyZXNzKX0ma2V5PSR7cHJvY2Vzcy5lbnYuR09PR0xFX0FQSV9LRVl9YCk7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5jcmVhdGUoe1xuICAgICAgICAgICAgLi4ucmVxLmJvZHksXG4gICAgICAgICAgICBjb29yZGluYXRlTGF0OiBjb29yZGluYXRlcy5kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0LFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxuZzogY29vcmRpbmF0ZXMuZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyxcbiAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoY2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIEdFVCBhcGkvY2FycywgZ2V0IGFsbCBjYXJzIGxpc3RcbmV4cG9ydCBjb25zdCBnZXRBbGxDYXJzOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FycyA9IGF3YWl0IENhci5maW5kQWxsKCk7XG4gICAgICAgIHJlcy5zZW5kKGNhcnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgR0VUIGFwaS9jYXJzLzppZCwgZ2V0IGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBnZXRPbmVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkLCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgIG1vZGVsOiBVc2VyLFxuICAgICAgICAgICAgICAgIGFzOiAndXNlcicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCcsICduYW1lJywgJ2ltYWdlVXJsJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IE1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYXM6ICdtZXNzYWdlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBCaWQsXG4gICAgICAgICAgICAgICAgYXM6ICdiaWRzJyxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbDogVXNlcixcbiAgICAgICAgICAgICAgICAgICAgYXM6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCcsICduYW1lJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZW5kKGNhcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59O1xuXG4vLyBAcm91dGUgICBQVVQgYXBpL2NhcnMvOmlkLCB1cGRhdGUgYSBjYXIgcG9zdFxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICBpZiAoIWNhcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdDYXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlZENhciA9IGF3YWl0IGNhci51cGRhdGUocmVxLmJvZHkpOyAgIFxuICAgICAgICByZXMuc2VuZCh1cGRhdGVkQ2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cblxuLy8gbWF5YmUgd2Ugd29uJ3QgbmVlZCB0aGlzIHJvdXRlLCB0aGUgbm9yYW1sIHVwZGF0ZSBzaG91bGQgaGFubGRlIHNpbmdsZSBmaWVsZCB1cGRhdGVcblxuLy8gQHJvdXRlICAgUFVUIGFwaS9jYXJzL2ltYWdlLzppZCwgYWRkIGltYWdlIHRvIGNhciBwb3N0XG4vLyBleHBvcnQgY29uc3QgYWRkSW1hZ2VUb0NhcjogUmVxdWVzdEhhbmRsZXI8e2lkOiBzdHJpbmd9PiA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4vLyAgICAgdHJ5IHtcbi8vICAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xuLy8gICAgICAgICBpZiAoIWNhcikge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdDYXIgbm90IGZvdW5kJyk7XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGNvbnN0IHVwZGF0ZWRDYXIgPSBhd2FpdCBjYXIudXBkYXRlKHtcbi8vICAgICAgICAgICAgIC4uLnJlcS5ib2R5LFxuLy8gICAgICAgICAgICAgaW1hZ2VVcmw6IHJlcS5ib2R5LmltYWdlVXJsXG4vLyAgICAgICAgIH0pOyAgIFxuLy8gICAgICAgICByZXMuc2VuZCh1cGRhdGVkQ2FyKTtcbi8vICAgICB9IGNhdGNoIChlcnIpIHtcbi8vICAgICAgICAgbmV4dChlcnIpO1xuLy8gICAgIH1cbi8vIH07XG5cbi8vIEByb3V0ZSAgIERFTEVURSBhcGkvY2Fycy86aWQsIGRlbGV0ZSBhIGNhciBwb3N0XG5leHBvcnQgY29uc3QgZGVsZXRlQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmICghY2FyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ0NhciBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjYXIuZGVzdHJveSgpO1xuICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcbiIsImltcG9ydCBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgcmVnaW9uID0gXCJ1cy13ZXN0LTJcIlxuY29uc3QgYnVja2V0TmFtZSA9IFwiYmVuemJpZC1jYXJzLWltYWdlc1wiXG5jb25zdCBhY2Nlc3NLZXlJZCA9IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEO1xuY29uc3Qgc2VjcmV0QWNjZXNzS2V5ID0gcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZO1xuXG5jb25zdCBzMyA9IG5ldyBBV1MuUzMoe1xuICAgIHJlZ2lvbjogcmVnaW9uLFxuICAgIGFjY2Vzc0tleUlkOiBhY2Nlc3NLZXlJZCxcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHNlY3JldEFjY2Vzc0tleSxcbiAgICBzaWduYXR1cmVWZXJzaW9uOiAndjQnXG59KTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlVXBsb2FkVVJMID0gYXN5bmMoKSA9PiB7XG4gICAgY29uc3QgaW1hZ2VOYW1lID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gKHtcbiAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBLZXk6IGltYWdlTmFtZSxcbiAgICAgICAgRXhwaXJlczogNjAsXG4gICAgfSk7XG4gICAgY29uc3QgdXBsb2FkVXJsID0gYXdhaXQgczMuZ2V0U2lnbmVkVXJsUHJvbWlzZSgncHV0T2JqZWN0JywgcGFyYW1zKTtcbiAgICByZXR1cm4gdXBsb2FkVXJsO1xufSIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIlxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9kYlwiXG5cbi8vIEByb3V0ZSBQVVQgYXBpL3VzZXJzLzppZCwgdXBkYXRlIGEgdXNlciBpbmZvXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlcjogUmVxdWVzdEhhbmRsZXIgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoXCJVc2VyIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHVzZXIudXBkYXRlKHJlcS5ib2R5KTtcbiAgICAgICAgcmVzLnNlbmQodXBkYXRlZFVzZXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufSIsImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY2Fyc1JvdXRlIGZyb20gJy4vcm91dGVzL2NhcnMnO1xuaW1wb3J0IGJpZHNSb3V0ZSBmcm9tICcuL3JvdXRlcy9iaWRzJztcbmltcG9ydCBzM1JvdXRlIGZyb20gJy4vcm91dGVzL3MzJztcbmltcG9ydCB1c2Vyc1JvdXRlIGZyb20gJy4vcm91dGVzL3VzZXJzJztcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG4vLyBhbGwgczMgcm91dGVzIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAvYXBpL3MzVXJsIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgczNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy9zM1VybCcsIHMzUm91dGUpXG5cbi8vIGFsbCBjYXJzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS9jYXJzIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIGNhcnNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy9jYXJzJywgY2Fyc1JvdXRlKTtcblxuLy8gYWxsIGJpZHMgcm91dGVzIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAvYXBpL2JpZHMgYW5kIHdpbGwgYmUgaGFuZGxlZCBieSB0aGUgYmlkc1JvdXRlIHJvdXRlclxucm91dGVyLnVzZSgnL2JpZHMnLCBiaWRzUm91dGUpO1xuXG4vLyBhbGwgdXNlcnMgcm91dGVzIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAvYXBpL3VzZXJzIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIHVzZXJzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvdXNlcnMnLCB1c2Vyc1JvdXRlKTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBjcmVhdGVCaWQgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvYmlkc1wiO1xuXG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdCgnLycsIChjcmVhdGVCaWQpKVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUNhciwgZ2V0QWxsQ2FycywgZ2V0T25lQ2FyLCB1cGRhdGVDYXIsIGRlbGV0ZUNhciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9jYXJzXCI7XG4vLyBpbXBvcnQgeyBhZGRJbWFnZVRvQ2FyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2NhcnNcIjtcblxuXG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdCgnLycsIChjcmVhdGVDYXIpICk7XG5yb3V0ZXIuZ2V0KCcvJywgKGdldEFsbENhcnMpICk7XG5yb3V0ZXIuZ2V0KCcvOmlkJywgKGdldE9uZUNhcikgKTtcbnJvdXRlci5wdXQoJy86aWQnLCAodXBkYXRlQ2FyKSApO1xuLy8gcm91dGVyLnB1dCgnL2ltYWdlLzppZCcsIChhZGRJbWFnZVRvQ2FyKSApO1xucm91dGVyLmRlbGV0ZSgnLzppZCcsIChkZWxldGVDYXIpICk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVVcGxvYWRVUkwgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvczNcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5nZXQoJy8nLCBnZW5lcmF0ZVVwbG9hZFVSTCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgdXBkYXRlVXNlciB9IGZyb20gXCIuLi9jb250cm9sbGVycy91c2Vyc1wiO1xuXG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucHV0KCcvOmlkJywgKHVwZGF0ZVVzZXIpICk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJpbXBvcnQgZXhwcmVzcywgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGF1dGhSb3V0ZXIgZnJvbSAnLi9hdXRoJztcbmltcG9ydCBhcGlSb3V0ZXIgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsganNvbiB9IGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAgY29ycyAgZnJvbSAnY29ycyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4vLyBib2R5IHBhcnNpbmcgbWlkZGxld2FyZVxuYXBwLnVzZShqc29uKCkpXG5cbmFwcC51c2UoY29ycyh7XG4gIG9yaWdpbjogJyonXG59KSk7XG5cblxuXG4vLyBhdXRoIGFuZCBhcGkgcm91dGVzXG5hcHAudXNlKCcvYXV0aCcsIGF1dGhSb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaScsIGFwaVJvdXRlcik7XG5cbi8vIGFwcC5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbi8vICAgICByZXMuc2VuZCh7XG4vLyAgICAgICBtZXNzYWdlOiAnIGJ5ZSB3b3JsZCcsXG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCcpXG5cbiAgLy8gZXJyb3IgaGFuZGxpbmcgbWlkZGxld2FyZS5cbiAgYXBwLnVzZSgoZXJyOiBFcnJvciwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7bWVzc2FnZTogZXJyLm1lc3NhZ2V9KTtcbiAgfSk7XG5cbiAgZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vZGInO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cblxuXG4vLyByZWNpZXZlIGEgZW1haWwsIHBhc3Nvd3JkIHRoZW4gdmVyaWZ5IGFuZCByZXNwb25zZSB3aXRoIGEgdG9rZW4uXG5yb3V0ZXIucG9zdCgnL2xvZ2luJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgICAgcmVzLnNlbmQoeyB0b2tlbjogYXdhaXQgVXNlci5hdXRoZW50aWNhdGUocmVxLmJvZHkuZW1haWwsIHJlcS5ib2R5LnBhc3N3b3JkKSB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufSk7XG5cbi8vIHJlY2lldmUgdXNlciBpbmZvLCBjcmVhdGUgYSBuZXcgdXNlciBhbmQgcmVzcG9uc2Ugd2l0aCBhIHRva2VuLlxucm91dGVyLnBvc3QoJy9zaWdudXAnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICBcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUocmVxLmJvZHkpO1xuICAgICAgICByZXMuc2VuZCh7IHRva2VuOiB1c2VyLmdlbmVyYXRlVG9rZW4oKSB9KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBpZiAoKGVyciBhcyBFcnJvcikubmFtZSA9PT0gJ1NlcXVlbGl6ZVVuaXF1ZUNvbnN0cmFpbnRFcnJvcicpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKCdVc2VyIGFscmVhZHkgZXhpc3RzJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgfVxuICAgIH1cbn0pXG5cbi8vIHJlY2lldmUgYSB0b2tlbiwgdmVyaWZ5IGFuZCByZXNwb25zZSB3aXRoIGEgdXNlci5cbnJvdXRlci5nZXQoJy9tZScsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJlcy5zZW5kKGF3YWl0IFVzZXIuZmluZEJ5VG9rZW4ocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiBhcyBzdHJpbmcpKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufSkiLCJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgKiBhcyBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZGF0YWJhc2VOYW1lOnN0cmluZyA9IHBrZy5uYW1lICsgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAnLXRlc3QnIDogJycpXG5cbmNvbnN0IGNvbmZpZzoge1xuICAgIGxvZ2dpbmc/OiBib29sZWFuLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBib29sZWFuLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogYm9vbGVhblxuICAgIC8vICAgICB9XG4gICAgfVxufSA9IHtcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAvLyAgICAgfVxuICAgIH0sXG4gIH07XG5cbmlmIChwcm9jZXNzLmVudi5MT0dHSU5HID09PSAndHJ1ZScpIHtcbiAgICBkZWxldGUgY29uZmlnLmxvZ2dpbmc7XG59XG5cbmlmICggcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMICkge1xuICAgIGNvbmZpZy5kaWFsZWN0T3B0aW9ucyA9IHtcbiAgICAgICAgLy8gc3NsOiB7XG4gICAgICAgIC8vICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAvLyAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAvLyB9XG4gICAgfTtcbn1cblxuY29uc3QgZGIgPSBuZXcgU2VxdWVsaXplKFxuICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBgcG9zdGdyZXM6Ly9sb2NhbGhvc3Q6NTQzMi8ke2RhdGFiYXNlTmFtZX1gLCBjb25maWcpO1xuXG5leHBvcnQgZGVmYXVsdCBkYjsiLCJpbXBvcnQgZGIgZnJvbSAnLi9kYic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQgQmlkIGZyb20gJy4vbW9kZWxzL0JpZCc7XG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21vZGVscy9NZXNzYWdlJztcbmltcG9ydCBDYXIgZnJvbSAnLi9tb2RlbHMvQ2FyJztcblxuLy8gYXNzb2NpYXRlIHRoZSBtb2RlbHNcblVzZXIuaGFzTWFueShCaWQpO1xuQmlkLmJlbG9uZ3NUbyhVc2VyKTtcblxuVXNlci5oYXNNYW55KENhcik7XG5DYXIuYmVsb25nc1RvKFVzZXIpO1xuXG5DYXIuaGFzTWFueShCaWQpO1xuQmlkLmJlbG9uZ3NUbyhDYXIpO1xuXG5DYXIuaGFzTWFueShNZXNzYWdlKTtcbk1lc3NhZ2UuYmVsb25nc1RvKENhcik7XG5cblVzZXIuaGFzTWFueShNZXNzYWdlKTtcbk1lc3NhZ2UuYmVsb25nc1RvKFVzZXIpO1xuXG5leHBvcnQgeyBkYiwgVXNlciwgQmlkLCBNZXNzYWdlLCBDYXIgfTsiLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCJcblxuaW50ZXJmYWNlIEJpZE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGFtb3VudDogbnVtYmVyO1xufVxuXG50eXBlIEJpZE1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogQmlkTW9kZWw7XG59XG5cbmNvbnN0IEJpZCAgPSA8QmlkTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwiYmlkXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJpZDsiLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IGRiIGZyb20gJy4uL2RiJztcblxuaW50ZXJmYWNlIENhck1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIG1vZGVsOiBzdHJpbmc7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBjb29yZGluYXRlTGF0OiBudW1iZXI7XG4gICAgY29vcmRpbmF0ZUxuZzogbnVtYmVyO1xuICAgIGVuZFRpbWVBbmREYXRlOiBzdHJpbmc7XG4gICAgYXdzVXJsOiBzdHJpbmc7XG59XG5cbnR5cGUgQ2FyTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBDYXJNb2RlbDtcbn1cblxuY29uc3QgQ2FyID0gPENhck1vZGVsU3RhdGljPmRiLmRlZmluZSgnY2FyJywge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICB5ZWFyOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgaXNJbnQ6IHRydWUsXG4gICAgICAgICAgICBtaW46IDE5MjAsXG4gICAgICAgICAgICBtYXg6IDIwMjMsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHByaWNlOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnYWN0aXZlJ1xuICAgIH0sXG4gICAgY29vcmRpbmF0ZUxhdDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcbiAgICB9LFxuICAgIGNvb3JkaW5hdGVMbmc6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRFQ0lNQUwsXG4gICAgfSxcbiAgICBlbmRUaW1lQW5kRGF0ZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBhd3NVcmw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL21lcmNlZGVzIGRlZmF1bHQuanBnJ1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYXI7XG4iLCJpbXBvcnQgeyBNb2RlbCwgRGF0YVR5cGVzLCBCdWlsZE9wdGlvbnMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgeyBVc2VyTW9kZWwsIFVzZXIgfSBmcm9tIFwiLi9Vc2VyXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5cbmludGVyZmFjZSBNZXNzYWdlTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIC8vIGRlZmF1bHRTY29wZXM6IHsgaW5jbHVkZTogeyBtb2RlbDogVXNlck1vZGVsIH1bXSB9O1xufVxuXG50eXBlIE1lc3NhZ2VNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IE1lc3NhZ2VNb2RlbDtcbn1cblxuY29uc3QgTWVzc2FnZSA9IDxNZXNzYWdlTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwibWVzc2FnZVwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH1cbn1cbiwge1xuICAgIGRlZmF1bHRTY29wZToge1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7IG1vZGVsOiBVc2VyIH1cbiAgICAgICAgXVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlOyIsIlxuaW1wb3J0IHsgQnVpbGRPcHRpb25zLCBNb2RlbCwgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcblxuY29uc3QgU0FMVF9ST1VORFMgPSA1O1xuXG4vLyBXZSBuZWVkIHRvIGRlY2xhcmUgYW4gaW50ZXJmYWNlIGZvciBvdXIgbW9kZWwgdGhhdCBpcyBiYXNpY2FsbHkgd2hhdCBvdXIgY2xhc3Mgd291bGQgYmVcbmludGVyZmFjZSBVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbWFnZVVybD86IHN0cmluZztcbiAgICBzdHJpcElkPzogc3RyaW5nO1xuICAgIGNvcnJlY3RQYXNzd29yZChwYXNzd29yZDpzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGdlbmVyYXRlVG9rZW4oKTogc3RyaW5nO1xufVxuXG4vLyBOZWVkIHRvIGRlY2xhcmUgdGhlIHN0YXRpYyBtb2RlbCBzbyBgZmluZE9uZWAgZXRjLiB1c2UgY29ycmVjdCB0eXBlcy5cbnR5cGUgVXNlck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogVXNlck1vZGVsO1xuICAgIGF1dGhlbnRpY2F0ZShlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRCeVRva2VuKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJNb2RlbCB8IG51bGw+O1xuICB9XG5cbi8vIFRTIGNhbid0IGRlcml2ZSBhIHByb3BlciBjbGFzcyBkZWZpbml0aW9uIGZyb20gYSBgLmRlZmluZWAgY2FsbCwgdGhlcmVmb3Igd2UgbmVlZCB0byBjYXN0IGhlcmUuXG5jb25zdCBVc2VyID0gPFVzZXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJ1c2VyXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgaXNFbWFpbDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGltYWdlVXJsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJy9NYW4gRW1vamkucG5nJ1xuICAgIH0sXG4gICAgc3RyaXBJZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9XG59KTtcblxuZXhwb3J0IHsgVXNlciwgVXNlck1vZGVsIH07XG5cbi8vICoqIGluc3RhbmNlTWV0aG9kcyAqKlxuXG4vLyBnZW5lcmF0ZSB0b2tlbiwgc2F2ZSB0aGUgaWQgaW4gdGhlIGhlYWRlci5cblVzZXIucHJvdG90eXBlLmdlbmVyYXRlVG9rZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGp3dC5zaWduKHsgaWQ6IHRoaXMuaWQgfSxwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZywge2V4cGlyZXNJbjogJzFkJ31cbiAgICAgICAgKVxufVxuXG4vLyBjb21wYXJlIHRoZSBwbGFpbiB2ZXJzaW9uIHRvIHRoZSBlbmNycHl0ZWQgdmVyc2lvbi5cblVzZXIucHJvdG90eXBlLmNvcnJlY3RQYXNzd29yZCA9IGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZVBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKVxufVxuXG5cbi8vICoqIGNsYXNzTWV0aG9kcyAqKlxuXG5Vc2VyLmF1dGhlbnRpY2F0ZSA9IGFzeW5jIGZ1bmN0aW9uICggZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyApIHtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbCB9IH0pXG4gICAgaWYgKCF1c2VyIHx8ICEoYXdhaXQgdXNlci5jb3JyZWN0UGFzc3dvcmQocGFzc3dvcmQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCB1c2VybmFtZS9wYXNzd29yZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlci5nZW5lcmF0ZVRva2VuKCk7XG4gIH07XG5cbiAgVXNlci5maW5kQnlUb2tlbiA9IGFzeW5jIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZykgYXMgeyBpZDogbnVtYmVyIH07XG4gICAgICBjb25zdCB1c2VyID0gVXNlci5maW5kQnlQayhpZClcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB0aHJvdyAnbm9vbydcbiAgICAgIH1cbiAgICAgIHJldHVybiB1c2VyXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgdG9rZW4nKVxuICAgIH1cbiAgfVxuXG4gIC8vICoqIGhvb2tzICoqXG5cbiAgY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHVzZXI6IFVzZXJNb2RlbCkgPT4ge1xuICAgIC8vaW4gY2FzZSB0aGUgcGFzc3dvcmQgaGFzIGJlZW4gY3JlYXRlZCBvciBjaGFuZ2VkLCB3ZSB3YW50IHRvIGVuY3J5cHQgaXQgd2l0aCBiY3J5cHRcbiAgICBpZiAodXNlci5jaGFuZ2VkKCdwYXNzd29yZCcpKSB7XG4gICAgICB1c2VyLnBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgU0FMVF9ST1VORFMpO1xuICAgIH1cbiAgfVxuICBcbiAgVXNlci5iZWZvcmVDcmVhdGUoaGFzaFBhc3N3b3JkKVxuICBVc2VyLmJlZm9yZVVwZGF0ZShoYXNoUGFzc3dvcmQpXG4gIFVzZXIuYmVmb3JlQnVsa0NyZWF0ZSgodXNlcnMpID0+IHtcbiAgICAgIFByb21pc2UuYWxsKHVzZXJzLm1hcChoYXNoUGFzc3dvcmQpKX0pO1xuXG4iLCJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgc2VlZCBmcm9tICcuL3NjcmlwdC9zZWVkJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYi9pbmRleCc7XG5pbXBvcnQge1NlcnZlciwgIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW9cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICggIHByb2Nlc3MuZW52LlNFRUQgPT09ICd0cnVlJyApIHtcbiAgICAgICAgICAgIGF3YWl0IHNlZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnN5bmMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJsdWVCcmlnaHQoJ0RhdGFiYXNlIHN5bmNlZCcpKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlvID0gbmV3IFNlcnZlcihhcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmN5YW5CcmlnaHRgTGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUfWApXG4gICAgICAgIH0pKVxuXG4gICAgICAgIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW5CcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgaGFzIG1hZGUgYSBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciFgKSlcbiAgICAgICAgICAgIC8vIHRoZSBuZXh0IHR3byBsaW5lcyB3aWxsIGxvZyBpZiBhIHVzZXIgZGlzY29ubmVjdC5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdSZWRCcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgZGlzY29ubmVjdGVkYCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbn0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlcnIpKTtcbn1cbn1cblxuaW5pdCgpXG5cblxuIiwiXG5cbmFzeW5jIGZ1bmN0aW9uIHNlZWQoKSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VlZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==