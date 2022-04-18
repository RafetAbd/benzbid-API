/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const deleteCar = (req, res, next) => {
};
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
const router = (0, express_1.Router)();
exports["default"] = router;
router.use('/cars', cars_1.default);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztLQUVUO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvQjtBQUNELENBQUM7QUFFRCxJQUFJLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ04sU0FBZSxJQUFJOztJQUVuQixDQUFDO0NBQUE7QUFFRCxxQkFBZSxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FDTnBCOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvY29udHJvbGxlcnMvY2Fycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL3JvdXRlcy9jYXJzLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hdXRoL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2RiLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9CaWQudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0Nhci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvVXNlci50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9zY3JpcHQvc2VlZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGFsa1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFVzZXIsIE1lc3NhZ2UsIENhciB9IGZyb20gXCIuLi8uLi9kYlwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG50eXBlIGdvb2dsZUdlb1Jlc3BvbnNlID0ge1xuICAgIHJlc3VsdHM6IHtnZW9tZXRyeTogeyBsb2NhdGlvbjoge2xhdDogbnVtYmVyLCBsbmc6IG51bWJlcn19fVtdO1xuICAgIHN0YXR1czogJ09LJyB8ICdaRVJPX1JFU1VMVFMnO1xufVxuXG4vLyBAcm91dGUgICBHRVQgYXBpL2NhcnMvLCBjcmVhdGUgYSBuZXcgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBjcmVhdGVDYXI6IFJlcXVlc3RIYW5kbGVyID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhZGRyZXNzID0gcmVxLmJvZHkuYWRkcmVzcztcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGF4aW9zLmdldDxnb29nbGVHZW9SZXNwb25zZT4oYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz0ke2VuY29kZVVSSShhZGRyZXNzKX0ma2V5PSR7cHJvY2Vzcy5lbnYuR09PR0xFX0FQSV9LRVl9YCk7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5jcmVhdGUoe1xuICAgICAgICAgICAgLi4ucmVxLmJvZHksXG4gICAgICAgICAgICBjb29yZGluYXRlTGF0OiBjb29yZGluYXRlcy5kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0LFxuICAgICAgICAgICAgY29vcmRpbmF0ZUxuZzogY29vcmRpbmF0ZXMuZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyxcbiAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoY2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIEdFVCBhcGkvY2FycywgZ2V0IGFsbCBjYXJzIGxpc3RcbmV4cG9ydCBjb25zdCBnZXRBbGxDYXJzOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FycyA9IGF3YWl0IENhci5maW5kQWxsKCk7XG4gICAgICAgIHJlcy5zZW5kKGNhcnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgR0VUIGFwaS9jYXJzLzppZCwgZ2V0IGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBnZXRPbmVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhciA9IGF3YWl0IENhci5maW5kQnlQayhyZXEucGFyYW1zLmlkLCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgIG1vZGVsOiBVc2VyLFxuICAgICAgICAgICAgICAgIGFzOiAndXNlcicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCcsICduYW1lJywgJ2ltYWdlVXJsJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IE1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYXM6ICdtZXNzYWdlcycsXG4gICAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNlbmQoY2FyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbi8vIEByb3V0ZSAgIFBVVCBhcGkvY2Fycy86aWQsIHVwZGF0ZSBhIGNhciBwb3N0XG5leHBvcnQgY29uc3QgdXBkYXRlQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gYXN5bmMocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXIgPSBhd2FpdCBDYXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmICghY2FyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ0NhciBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGRhdGVkQ2FyID0gYXdhaXQgY2FyLnVwZGF0ZShyZXEuYm9keSk7ICAgXG4gICAgICAgIHJlcy5zZW5kKHVwZGF0ZWRDYXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLy8gQHJvdXRlICAgREVMRVRFIGFwaS9jYXJzLzppZCwgZGVsZXRlIGEgY2FyIHBvc3RcbmV4cG9ydCBjb25zdCBkZWxldGVDYXI6IFJlcXVlc3RIYW5kbGVyPHtpZDogc3RyaW5nfT4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbn07XG4iLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNhcnNSb3V0ZSBmcm9tICcuL3JvdXRlcy9jYXJzJztcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG5cbi8vIGFsbCBjYXJzIHJvdXRlcyB3aWxsIGJlIHByZWZpeGVkIHdpdGggL2FwaS9jYXJzIGFuZCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIGNhcnNSb3V0ZSByb3V0ZXJcbnJvdXRlci51c2UoJy9jYXJzJywgY2Fyc1JvdXRlKTsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ2FyLCBnZXRBbGxDYXJzLCBnZXRPbmVDYXIsIHVwZGF0ZUNhciwgZGVsZXRlQ2FyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2NhcnNcIjtcblxuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy8nLCAoY3JlYXRlQ2FyKSApO1xucm91dGVyLmdldCgnLycsIChnZXRBbGxDYXJzKSApO1xucm91dGVyLmdldCgnLzppZCcsIChnZXRPbmVDYXIpICk7XG5yb3V0ZXIucHV0KCcvOmlkJywgKHVwZGF0ZUNhcikgKTtcbnJvdXRlci5kZWxldGUoJy86aWQnLCAoZGVsZXRlQ2FyKSApO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBhdXRoUm91dGVyIGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgYXBpUm91dGVyIGZyb20gJy4vYXBpJztcbmltcG9ydCB7IGpzb24gfSBmcm9tICdib2R5LXBhcnNlcic7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4vLyBib2R5IHBhcnNpbmcgbWlkZGxld2FyZVxuYXBwLnVzZShqc29uKCkpXG5cbi8vIGF1dGggYW5kIGFwaSByb3V0ZXNcbmFwcC51c2UoJy9hdXRoJywgYXV0aFJvdXRlcik7XG5hcHAudXNlKCcvYXBpJywgYXBpUm91dGVyKTtcblxuLy8gYXBwLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuLy8gICAgIHJlcy5zZW5kKHtcbi8vICAgICAgIG1lc3NhZ2U6ICcgYnllIHdvcmxkJyxcbi8vICAgICB9KTtcbi8vICAgfSk7XG5cbi8vICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkJylcblxuICAvLyBlcnJvciBoYW5kbGluZyBtaWRkbGV3YXJlLlxuICBhcHAudXNlKChlcnI6IEVycm9yLCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHttZXNzYWdlOiBlcnIubWVzc2FnZX0pO1xuICB9KTtcblxuICBleHBvcnQgZGVmYXVsdCBhcHA7IiwiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9kYic7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuLy8gcmVjaWV2ZSBhIGVtYWlsLCBwYXNzb3dyZCB0aGVuIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHRva2VuLlxucm91dGVyLnBvc3QoJy9sb2dpbicsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJlcy5zZW5kKHsgdG9rZW46IGF3YWl0IFVzZXIuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCkgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pO1xuXG4vLyByZWNpZXZlIHVzZXIgaW5mbywgY3JlYXRlIGEgbmV3IHVzZXIgYW5kIHJlc3BvbnNlIHdpdGggYSB0b2tlbi5cbnJvdXRlci5wb3N0KCcvc2lnbnVwJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHJlcS5ib2R5KTtcbiAgICAgICAgcmVzLnNlbmQoeyB0b2tlbjogdXNlci5nZW5lcmF0ZVRva2VuKCkgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgaWYgKChlcnIgYXMgRXJyb3IpLm5hbWUgPT09ICdTZXF1ZWxpemVVbmlxdWVDb25zdHJhaW50RXJyb3InKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCgnVXNlciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgIH1cbiAgICB9XG59KVxuXG4vLyByZWNpZXZlIGEgdG9rZW4sIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHVzZXIuXG5yb3V0ZXIuZ2V0KCcvbWUnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXMuc2VuZChhd2FpdCBVc2VyLmZpbmRCeVRva2VuKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gYXMgc3RyaW5nKSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pIiwiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGRhdGFiYXNlTmFtZTpzdHJpbmcgPSBwa2cubmFtZSArIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnID8gJy10ZXN0JyA6ICcnKVxuXG5jb25zdCBjb25maWc6IHtcbiAgICBsb2dnaW5nPzogYm9vbGVhbixcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogYm9vbGVhbixcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IGJvb2xlYW5cbiAgICAvLyAgICAgfVxuICAgIH1cbn0gPSB7XG4gICAgbG9nZ2luZzogZmFsc2UsXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAvLyAgICAgc3NsOiB7XG4gICAgLy8gICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgLy8gICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgLy8gICAgIH1cbiAgICB9LFxuICB9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTE9HR0lORyA9PT0gJ3RydWUnKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5sb2dnaW5nO1xufVxuXG5pZiAoIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCApIHtcbiAgICBjb25maWcuZGlhbGVjdE9wdGlvbnMgPSB7XG4gICAgICAgIC8vIHNzbDoge1xuICAgICAgICAvLyAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgLy8gfVxuICAgIH07XG59XG5cbmNvbnN0IGRiID0gbmV3IFNlcXVlbGl6ZShcbiAgICBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgYHBvc3RncmVzOi8vbG9jYWxob3N0OjU0MzIvJHtkYXRhYmFzZU5hbWV9YCwgY29uZmlnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7IiwiaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IEJpZCBmcm9tICcuL21vZGVscy9CaWQnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tb2RlbHMvTWVzc2FnZSc7XG5pbXBvcnQgQ2FyIGZyb20gJy4vbW9kZWxzL0Nhcic7XG5cbi8vIGFzc29jaWF0ZSB0aGUgbW9kZWxzXG5Vc2VyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oVXNlcik7XG5cblVzZXIuaGFzTWFueShDYXIpO1xuQ2FyLmJlbG9uZ3NUbyhVc2VyKTtcblxuQ2FyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oQ2FyKTtcblxuQ2FyLmhhc01hbnkoTWVzc2FnZSk7XG5NZXNzYWdlLmJlbG9uZ3NUbyhDYXIpO1xuXG5Vc2VyLmhhc01hbnkoTWVzc2FnZSk7XG5NZXNzYWdlLmJlbG9uZ3NUbyhVc2VyKTtcblxuZXhwb3J0IHsgZGIsIFVzZXIsIEJpZCwgTWVzc2FnZSwgQ2FyIH07IiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiXG5cbmludGVyZmFjZSBCaWRNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBhbW91bnQ6IG51bWJlcjtcbn1cblxudHlwZSBCaWRNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IEJpZE1vZGVsO1xufVxuXG5jb25zdCBCaWQgID0gPEJpZE1vZGVsU3RhdGljPmRiLmRlZmluZShcImJpZFwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCaWQ7IiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBkYiBmcm9tICcuLi9kYic7XG5cbmludGVyZmFjZSBDYXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBtb2RlbDogc3RyaW5nO1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHByaWNlOiBudW1iZXI7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgY29vcmRpbmF0ZUxhdDogbnVtYmVyO1xuICAgIGNvb3JkaW5hdGVMbmc6IG51bWJlcjtcbiAgICBlbmRUaW1lQW5kRGF0ZTogc3RyaW5nO1xuICAgIGF3c1VybDogc3RyaW5nO1xufVxuXG50eXBlIENhck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogQ2FyTW9kZWw7XG59XG5cbmNvbnN0IENhciA9IDxDYXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoJ2NhcicsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgeWVhcjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIGlzSW50OiB0cnVlLFxuICAgICAgICAgICAgbWluOiAxOTIwLFxuICAgICAgICAgICAgbWF4OiAyMDIzLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBwcmljZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2FjdGl2ZSdcbiAgICB9LFxuICAgIGNvb3JkaW5hdGVMYXQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRFQ0lNQUwsXG4gICAgfSxcbiAgICBjb29yZGluYXRlTG5nOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuICAgIH0sXG4gICAgZW5kVGltZUFuZERhdGU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgYXdzVXJsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJy9tZXJjZWRlcyBkZWZhdWx0LmpwZydcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyO1xuIiwiaW1wb3J0IHsgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IHsgVXNlck1vZGVsLCBVc2VyIH0gZnJvbSBcIi4vVXNlclwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuXG5pbnRlcmZhY2UgTWVzc2FnZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICAvLyBkZWZhdWx0U2NvcGVzOiB7IGluY2x1ZGU6IHsgbW9kZWw6IFVzZXJNb2RlbCB9W10gfTtcbn1cblxudHlwZSBNZXNzYWdlTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBNZXNzYWdlTW9kZWw7XG59XG5cbmNvbnN0IE1lc3NhZ2UgPSA8TWVzc2FnZU1vZGVsU3RhdGljPmRiLmRlZmluZShcIm1lc3NhZ2VcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59XG4sIHtcbiAgICBkZWZhdWx0U2NvcGU6IHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgeyBtb2RlbDogVXNlciB9XG4gICAgICAgIF1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTsiLCJcbmltcG9ydCB7IEJ1aWxkT3B0aW9ucywgTW9kZWwsIERhdGFUeXBlcyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XG5cbmNvbnN0IFNBTFRfUk9VTkRTID0gNTtcblxuLy8gV2UgbmVlZCB0byBkZWNsYXJlIGFuIGludGVyZmFjZSBmb3Igb3VyIG1vZGVsIHRoYXQgaXMgYmFzaWNhbGx5IHdoYXQgb3VyIGNsYXNzIHdvdWxkIGJlXG5pbnRlcmZhY2UgVXNlck1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW1hZ2VVcmw/OiBzdHJpbmc7XG4gICAgc3RyaXBJZD86IHN0cmluZztcbiAgICBjb3JyZWN0UGFzc3dvcmQocGFzc3dvcmQ6c3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICBnZW5lcmF0ZVRva2VuKCk6IHN0cmluZztcbn1cblxuLy8gTmVlZCB0byBkZWNsYXJlIHRoZSBzdGF0aWMgbW9kZWwgc28gYGZpbmRPbmVgIGV0Yy4gdXNlIGNvcnJlY3QgdHlwZXMuXG50eXBlIFVzZXJNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IFVzZXJNb2RlbDtcbiAgICBhdXRoZW50aWNhdGUoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbiAgICBmaW5kQnlUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxVc2VyTW9kZWwgfCBudWxsPjtcbiAgfVxuXG4vLyBUUyBjYW4ndCBkZXJpdmUgYSBwcm9wZXIgY2xhc3MgZGVmaW5pdGlvbiBmcm9tIGEgYC5kZWZpbmVgIGNhbGwsIHRoZXJlZm9yIHdlIG5lZWQgdG8gY2FzdCBoZXJlLlxuY29uc3QgVXNlciA9IDxVc2VyTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKFwidXNlclwiLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIGlzRW1haWw6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBpbWFnZVVybDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcvTWFuIEVtb2ppLnBuZydcbiAgICB9LFxuICAgIHN0cmlwSWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlXG4gICAgfVxufSk7XG5cbmV4cG9ydCB7IFVzZXIsIFVzZXJNb2RlbCB9O1xuXG4vLyAqKiBpbnN0YW5jZU1ldGhvZHMgKipcblxuLy8gZ2VuZXJhdGUgdG9rZW4sIHNhdmUgdGhlIGlkIGluIHRoZSBoZWFkZXIuXG5Vc2VyLnByb3RvdHlwZS5nZW5lcmF0ZVRva2VuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBqd3Quc2lnbih7IGlkOiB0aGlzLmlkIH0scHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmcsIHtleHBpcmVzSW46ICcxZCd9XG4gICAgICAgIClcbn1cblxuLy8gY29tcGFyZSB0aGUgcGxhaW4gdmVyc2lvbiB0byB0aGUgZW5jcnB5dGVkIHZlcnNpb24uXG5Vc2VyLnByb3RvdHlwZS5jb3JyZWN0UGFzc3dvcmQgPSBmdW5jdGlvbiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZClcbn1cblxuXG4vLyAqKiBjbGFzc01ldGhvZHMgKipcblxuVXNlci5hdXRoZW50aWNhdGUgPSBhc3luYyBmdW5jdGlvbiAoIGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcgKSB7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5maW5kT25lKHsgd2hlcmU6IHsgZW1haWwgfSB9KVxuICAgIGlmICghdXNlciB8fCAhKGF3YWl0IHVzZXIuY29ycmVjdFBhc3N3b3JkKHBhc3N3b3JkKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgdXNlcm5hbWUvcGFzc3dvcmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXIuZ2VuZXJhdGVUb2tlbigpO1xuICB9O1xuXG4gIFVzZXIuZmluZEJ5VG9rZW4gPSBhc3luYyBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmcpIGFzIHsgaWQ6IG51bWJlciB9O1xuICAgICAgY29uc3QgdXNlciA9IFVzZXIuZmluZEJ5UGsoaWQpXG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgdGhyb3cgJ25vb28nXG4gICAgICB9XG4gICAgICByZXR1cm4gdXNlclxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIHRva2VuJylcbiAgICB9XG4gIH1cblxuICAvLyAqKiBob29rcyAqKlxuXG4gIGNvbnN0IGhhc2hQYXNzd29yZCA9IGFzeW5jICh1c2VyOiBVc2VyTW9kZWwpID0+IHtcbiAgICAvL2luIGNhc2UgdGhlIHBhc3N3b3JkIGhhcyBiZWVuIGNyZWF0ZWQgb3IgY2hhbmdlZCwgd2Ugd2FudCB0byBlbmNyeXB0IGl0IHdpdGggYmNyeXB0XG4gICAgaWYgKHVzZXIuY2hhbmdlZCgncGFzc3dvcmQnKSkge1xuICAgICAgdXNlci5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIFNBTFRfUk9VTkRTKTtcbiAgICB9XG4gIH1cbiAgXG4gIFVzZXIuYmVmb3JlQ3JlYXRlKGhhc2hQYXNzd29yZClcbiAgVXNlci5iZWZvcmVVcGRhdGUoaGFzaFBhc3N3b3JkKVxuICBVc2VyLmJlZm9yZUJ1bGtDcmVhdGUoKHVzZXJzKSA9PiB7XG4gICAgICBQcm9taXNlLmFsbCh1c2Vycy5tYXAoaGFzaFBhc3N3b3JkKSl9KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgc2VlZCBmcm9tICcuL3NjcmlwdC9zZWVkJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYi9pbmRleCc7XG5pbXBvcnQge1NlcnZlciwgIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW9cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICggIHByb2Nlc3MuZW52LlNFRUQgPT09ICd0cnVlJyApIHtcbiAgICAgICAgICAgIGF3YWl0IHNlZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnN5bmMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJsdWVCcmlnaHQoJ0RhdGFiYXNlIHN5bmNlZCcpKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlvID0gbmV3IFNlcnZlcihhcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmN5YW5CcmlnaHRgTGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUfWApXG4gICAgICAgIH0pKVxuXG4gICAgICAgIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW5CcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgaGFzIG1hZGUgYSBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciFgKSlcbiAgICAgICAgICAgIC8vIHRoZSBuZXh0IHR3byBsaW5lcyB3aWxsIGxvZyBpZiBhIHVzZXIgZGlzY29ubmVjdC5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdSZWRCcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgZGlzY29ubmVjdGVkYCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbn0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlcnIpKTtcbn1cbn1cblxuaW5pdCgpXG5cblxuIiwiXG5cbmFzeW5jIGZ1bmN0aW9uIHNlZWQoKSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VlZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9