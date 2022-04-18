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
const Car_1 = __importDefault(__webpack_require__(/*! ../../db/models/Car */ "./src/db/models/Car.ts"));
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.body.address;
        const userId = req.body.userId;
        const coordinates = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.GOOGLE_API_KEY}`);
        const car = yield Car_1.default.create(Object.assign(Object.assign({}, req.body), { coordinateLat: coordinates.data.results[0].geometry.location.lat, coordinateLng: coordinates.data.results[0].geometry.location.lng, userId }));
        res.send(car);
    }
    catch (err) {
        next(err);
    }
});
exports.createCar = createCar;
const getAllCars = (req, res, next) => {
};
exports.getAllCars = getAllCars;
const getOneCar = (req, res, next) => {
};
exports.getOneCar = getOneCar;
const updateCar = (req, res, next) => {
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0I7QUFDRCxDQUFDO0FBRUQsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENOLFNBQWUsSUFBSTs7SUFFbkIsQ0FBQztDQUFBO0FBRUQscUJBQWUsSUFBSSxDQUFDOzs7Ozs7Ozs7OztBQ05wQjs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2NhcnMudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBpL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2FwaS9yb3V0ZXMvY2Fycy50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXV0aC9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9kYi50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9pbmRleC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvQmlkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9DYXIudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvc2NyaXB0L3NlZWQudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJheGlvc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInNvY2tldC5pb1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgIENhciAgZnJvbSBcIi4uLy4uL2RiL21vZGVscy9DYXJcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vZGIvbW9kZWxzL1VzZXJcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxudHlwZSBnb29nbGVHZW9SZXNwb25zZSA9IHtcbiAgICByZXN1bHRzOiB7Z2VvbWV0cnk6IHsgbG9jYXRpb246IHtsYXQ6IG51bWJlciwgbG5nOiBudW1iZXJ9fX1bXTtcbiAgICBzdGF0dXM6ICdPSycgfCAnWkVST19SRVNVTFRTJztcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhcjogUmVxdWVzdEhhbmRsZXIgPSBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSByZXEuYm9keS5hZGRyZXNzO1xuICAgICAgICBjb25zdCB1c2VySWQgPSByZXEuYm9keS51c2VySWQ7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gYXdhaXQgYXhpb3MuZ2V0PGdvb2dsZUdlb1Jlc3BvbnNlPihgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPSR7ZW5jb2RlVVJJKGFkZHJlc3MpfSZrZXk9JHtwcm9jZXNzLmVudi5HT09HTEVfQVBJX0tFWX1gKTtcbiAgICAgICAgY29uc3QgY2FyID0gYXdhaXQgQ2FyLmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVMYXQ6IGNvb3JkaW5hdGVzLmRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQsXG4gICAgICAgICAgICBjb29yZGluYXRlTG5nOiBjb29yZGluYXRlcy5kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nLFxuICAgICAgICAgICAgdXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc2VuZChjYXIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEFsbENhcnM6IFJlcXVlc3RIYW5kbGVyID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0T25lQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2FyOiBSZXF1ZXN0SGFuZGxlcjx7aWQ6IHN0cmluZ30+ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG59O1xuIiwiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBjYXJzUm91dGUgZnJvbSAnLi9yb3V0ZXMvY2Fycyc7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG4vLyBhbGwgY2FycyByb3V0ZXMgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIC9hcGkvY2FycyBhbmQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSBjYXJzUm91dGUgcm91dGVyXG5yb3V0ZXIudXNlKCcvY2FycycsIGNhcnNSb3V0ZSk7IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUNhciwgZ2V0QWxsQ2FycywgZ2V0T25lQ2FyLCB1cGRhdGVDYXIsIGRlbGV0ZUNhciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9jYXJzXCI7XG5cblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KCcvJywgKGNyZWF0ZUNhcikgKTtcbnJvdXRlci5nZXQoJy8nLCAoZ2V0QWxsQ2FycykgKTtcbnJvdXRlci5nZXQoJy86aWQnLCAoZ2V0T25lQ2FyKSApO1xucm91dGVyLnB1dCgnLzppZCcsICh1cGRhdGVDYXIpICk7XG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgKGRlbGV0ZUNhcikgKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsImltcG9ydCBleHByZXNzLCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYXV0aFJvdXRlciBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IGFwaVJvdXRlciBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBqc29uIH0gZnJvbSAnYm9keS1wYXJzZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gYm9keSBwYXJzaW5nIG1pZGRsZXdhcmVcbmFwcC51c2UoanNvbigpKVxuXG4vLyBhdXRoIGFuZCBhcGkgcm91dGVzXG5hcHAudXNlKCcvYXV0aCcsIGF1dGhSb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaScsIGFwaVJvdXRlcik7XG5cbi8vIGFwcC5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbi8vICAgICByZXMuc2VuZCh7XG4vLyAgICAgICBtZXNzYWdlOiAnIGJ5ZSB3b3JsZCcsXG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCcpXG5cbiAgLy8gZXJyb3IgaGFuZGxpbmcgbWlkZGxld2FyZS5cbiAgYXBwLnVzZSgoZXJyOiBFcnJvciwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7bWVzc2FnZTogZXJyLm1lc3NhZ2V9KTtcbiAgfSk7XG5cbiAgZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24sIFJvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vZGInO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbi8vIHJlY2lldmUgYSBlbWFpbCwgcGFzc293cmQgdGhlbiB2ZXJpZnkgYW5kIHJlc3BvbnNlIHdpdGggYSB0b2tlbi5cbnJvdXRlci5wb3N0KCcvbG9naW4nLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXMuc2VuZCh7IHRva2VuOiBhd2FpdCBVc2VyLmF1dGhlbnRpY2F0ZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQpIH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59KTtcblxuLy8gcmVjaWV2ZSB1c2VyIGluZm8sIGNyZWF0ZSBhIG5ldyB1c2VyIGFuZCByZXNwb25zZSB3aXRoIGEgdG9rZW4uXG5yb3V0ZXIucG9zdCgnL3NpZ251cCcsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZShyZXEuYm9keSk7XG4gICAgICAgIHJlcy5zZW5kKHsgdG9rZW46IHVzZXIuZ2VuZXJhdGVUb2tlbigpIH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGlmICgoZXJyIGFzIEVycm9yKS5uYW1lID09PSAnU2VxdWVsaXplVW5pcXVlQ29uc3RyYWludEVycm9yJykge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoJ1VzZXIgYWxyZWFkeSBleGlzdHMnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICB9XG4gICAgfVxufSlcblxuLy8gcmVjaWV2ZSBhIHRva2VuLCB2ZXJpZnkgYW5kIHJlc3BvbnNlIHdpdGggYSB1c2VyLlxucm91dGVyLmdldCgnL21lJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzLnNlbmQoYXdhaXQgVXNlci5maW5kQnlUb2tlbihyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIGFzIHN0cmluZykpO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9XG59KSIsImltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCAqIGFzIHBrZyBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCBkYXRhYmFzZU5hbWU6c3RyaW5nID0gcGtnLm5hbWUgKyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyA/ICctdGVzdCcgOiAnJylcblxuY29uc3QgY29uZmlnOiB7XG4gICAgbG9nZ2luZz86IGJvb2xlYW4sXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAvLyAgICAgc3NsOiB7XG4gICAgLy8gICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGJvb2xlYW4sXG4gICAgLy8gICAgICAgICByZXF1aXJlOiBib29sZWFuXG4gICAgLy8gICAgIH1cbiAgICB9XG59ID0ge1xuICAgIGxvZ2dpbmc6IGZhbHNlLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiB0cnVlLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgIC8vICAgICB9XG4gICAgfSxcbiAgfTtcblxuaWYgKHByb2Nlc3MuZW52LkxPR0dJTkcgPT09ICd0cnVlJykge1xuICAgIGRlbGV0ZSBjb25maWcubG9nZ2luZztcbn1cblxuaWYgKCBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgKSB7XG4gICAgY29uZmlnLmRpYWxlY3RPcHRpb25zID0ge1xuICAgICAgICAvLyBzc2w6IHtcbiAgICAgICAgLy8gICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgIC8vICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgIC8vIH1cbiAgICB9O1xufVxuXG5jb25zdCBkYiA9IG5ldyBTZXF1ZWxpemUoXG4gICAgcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIHx8IGBwb3N0Z3JlczovL2xvY2FsaG9zdDo1NDMyLyR7ZGF0YWJhc2VOYW1lfWAsIGNvbmZpZyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRiOyIsImltcG9ydCBkYiBmcm9tICcuL2RiJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL21vZGVscy9Vc2VyJztcbmltcG9ydCBCaWQgZnJvbSAnLi9tb2RlbHMvQmlkJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vbW9kZWxzL01lc3NhZ2UnO1xuaW1wb3J0IENhciBmcm9tICcuL21vZGVscy9DYXInO1xuXG4vLyBhc3NvY2lhdGUgdGhlIG1vZGVsc1xuVXNlci5oYXNNYW55KEJpZCk7XG5CaWQuYmVsb25nc1RvKFVzZXIpO1xuXG5Vc2VyLmhhc01hbnkoQ2FyKTtcbkNhci5iZWxvbmdzVG8oVXNlcik7XG5cbkNhci5oYXNNYW55KEJpZCk7XG5CaWQuYmVsb25nc1RvKENhcik7XG5cbkNhci5oYXNNYW55KE1lc3NhZ2UpO1xuTWVzc2FnZS5iZWxvbmdzVG8oQ2FyKTtcblxuVXNlci5oYXNNYW55KE1lc3NhZ2UpO1xuTWVzc2FnZS5iZWxvbmdzVG8oVXNlcik7XG5cbmV4cG9ydCB7IGRiLCBVc2VyLCBCaWQsIE1lc3NhZ2UsIENhciB9OyIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIlxuXG5pbnRlcmZhY2UgQmlkTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgYW1vdW50OiBudW1iZXI7XG59XG5cbnR5cGUgQmlkTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBCaWRNb2RlbDtcbn1cblxuY29uc3QgQmlkICA9IDxCaWRNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJiaWRcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmlkOyIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgZGIgZnJvbSAnLi4vZGInO1xuXG5pbnRlcmZhY2UgQ2FyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgbW9kZWw6IHN0cmluZztcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwcmljZTogbnVtYmVyO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGNvb3JkaW5hdGVMYXQ6IG51bWJlcjtcbiAgICBjb29yZGluYXRlTG5nOiBudW1iZXI7XG4gICAgZW5kVGltZUFuZERhdGU6IHN0cmluZztcbiAgICBhd3NVcmw6IHN0cmluZztcbn1cblxudHlwZSBDYXJNb2RlbFN0YXRpYyA9IHR5cGVvZiBNb2RlbCAmIHtcbiAgICBuZXcgKHZhbHVlcz86IG9iamVjdCwgb3B0aW9ucz86IEJ1aWxkT3B0aW9ucyk6IENhck1vZGVsO1xufVxuXG5jb25zdCBDYXIgPSA8Q2FyTW9kZWxTdGF0aWM+ZGIuZGVmaW5lKCdjYXInLCB7XG4gICAgaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuICAgIG1vZGVsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHllYXI6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBpc0ludDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbjogMTkyMCxcbiAgICAgICAgICAgIG1heDogMjAyMyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgcHJpY2U6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICdhY3RpdmUnXG4gICAgfSxcbiAgICBjb29yZGluYXRlTGF0OiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuICAgIH0sXG4gICAgY29vcmRpbmF0ZUxuZzoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcbiAgICB9LFxuICAgIGVuZFRpbWVBbmREYXRlOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGF3c1VybDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcvbWVyY2VkZXMgZGVmYXVsdC5qcGcnXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcjtcbiIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCB7IFVzZXJNb2RlbCwgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcblxuaW50ZXJmYWNlIE1lc3NhZ2VNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgLy8gZGVmYXVsdFNjb3BlczogeyBpbmNsdWRlOiB7IG1vZGVsOiBVc2VyTW9kZWwgfVtdIH07XG59XG5cbnR5cGUgTWVzc2FnZU1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogTWVzc2FnZU1vZGVsO1xufVxuXG5jb25zdCBNZXNzYWdlID0gPE1lc3NhZ2VNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJtZXNzYWdlXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfVxufVxuLCB7XG4gICAgZGVmYXVsdFNjb3BlOiB7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHsgbW9kZWw6IFVzZXIgfVxuICAgICAgICBdXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7IiwiXG5pbXBvcnQgeyBCdWlsZE9wdGlvbnMsIE1vZGVsLCBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xuXG5jb25zdCBTQUxUX1JPVU5EUyA9IDU7XG5cbi8vIFdlIG5lZWQgdG8gZGVjbGFyZSBhbiBpbnRlcmZhY2UgZm9yIG91ciBtb2RlbCB0aGF0IGlzIGJhc2ljYWxseSB3aGF0IG91ciBjbGFzcyB3b3VsZCBiZVxuaW50ZXJmYWNlIFVzZXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGltYWdlVXJsPzogc3RyaW5nO1xuICAgIHN0cmlwSWQ/OiBzdHJpbmc7XG4gICAgY29ycmVjdFBhc3N3b3JkKHBhc3N3b3JkOnN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgZ2VuZXJhdGVUb2tlbigpOiBzdHJpbmc7XG59XG5cbi8vIE5lZWQgdG8gZGVjbGFyZSB0aGUgc3RhdGljIG1vZGVsIHNvIGBmaW5kT25lYCBldGMuIHVzZSBjb3JyZWN0IHR5cGVzLlxudHlwZSBVc2VyTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBVc2VyTW9kZWw7XG4gICAgYXV0aGVudGljYXRlKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZEJ5VG9rZW4odG9rZW46IHN0cmluZyk6IFByb21pc2U8VXNlck1vZGVsIHwgbnVsbD47XG4gIH1cblxuLy8gVFMgY2FuJ3QgZGVyaXZlIGEgcHJvcGVyIGNsYXNzIGRlZmluaXRpb24gZnJvbSBhIGAuZGVmaW5lYCBjYWxsLCB0aGVyZWZvciB3ZSBuZWVkIHRvIGNhc3QgaGVyZS5cbmNvbnN0IFVzZXIgPSA8VXNlck1vZGVsU3RhdGljPmRiLmRlZmluZShcInVzZXJcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICB1bmlxdWU6IHRydWUsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBpc0VtYWlsOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgaW1hZ2VVcmw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL01hbiBFbW9qaS5wbmcnXG4gICAgfSxcbiAgICBzdHJpcElkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgeyBVc2VyLCBVc2VyTW9kZWwgfTtcblxuLy8gKiogaW5zdGFuY2VNZXRob2RzICoqXG5cbi8vIGdlbmVyYXRlIHRva2VuLCBzYXZlIHRoZSBpZCBpbiB0aGUgaGVhZGVyLlxuVXNlci5wcm90b3R5cGUuZ2VuZXJhdGVUb2tlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gand0LnNpZ24oeyBpZDogdGhpcy5pZCB9LHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nLCB7ZXhwaXJlc0luOiAnMWQnfVxuICAgICAgICApXG59XG5cbi8vIGNvbXBhcmUgdGhlIHBsYWluIHZlcnNpb24gdG8gdGhlIGVuY3JweXRlZCB2ZXJzaW9uLlxuVXNlci5wcm90b3R5cGUuY29ycmVjdFBhc3N3b3JkID0gZnVuY3Rpb24gKGNhbmRpZGF0ZVBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUoY2FuZGlkYXRlUGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpXG59XG5cblxuLy8gKiogY2xhc3NNZXRob2RzICoqXG5cblVzZXIuYXV0aGVudGljYXRlID0gYXN5bmMgZnVuY3Rpb24gKCBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nICkge1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSlcbiAgICBpZiAoIXVzZXIgfHwgIShhd2FpdCB1c2VyLmNvcnJlY3RQYXNzd29yZChwYXNzd29yZCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHVzZXJuYW1lL3Bhc3N3b3JkJyk7XG4gICAgfVxuICAgIHJldHVybiB1c2VyLmdlbmVyYXRlVG9rZW4oKTtcbiAgfTtcblxuICBVc2VyLmZpbmRCeVRva2VuID0gYXN5bmMgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nKSBhcyB7IGlkOiBudW1iZXIgfTtcbiAgICAgIGNvbnN0IHVzZXIgPSBVc2VyLmZpbmRCeVBrKGlkKVxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHRocm93ICdub29vJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVzZXJcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCB0b2tlbicpXG4gICAgfVxuICB9XG5cbiAgLy8gKiogaG9va3MgKipcblxuICBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAodXNlcjogVXNlck1vZGVsKSA9PiB7XG4gICAgLy9pbiBjYXNlIHRoZSBwYXNzd29yZCBoYXMgYmVlbiBjcmVhdGVkIG9yIGNoYW5nZWQsIHdlIHdhbnQgdG8gZW5jcnlwdCBpdCB3aXRoIGJjcnlwdFxuICAgIGlmICh1c2VyLmNoYW5nZWQoJ3Bhc3N3b3JkJykpIHtcbiAgICAgIHVzZXIucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBTQUxUX1JPVU5EUyk7XG4gICAgfVxuICB9XG4gIFxuICBVc2VyLmJlZm9yZUNyZWF0ZShoYXNoUGFzc3dvcmQpXG4gIFVzZXIuYmVmb3JlVXBkYXRlKGhhc2hQYXNzd29yZClcbiAgVXNlci5iZWZvcmVCdWxrQ3JlYXRlKCh1c2VycykgPT4ge1xuICAgICAgUHJvbWlzZS5hbGwodXNlcnMubWFwKGhhc2hQYXNzd29yZCkpfSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBhcHAgZnJvbSAnLi9hcHAnO1xuaW1wb3J0IHNlZWQgZnJvbSAnLi9zY3JpcHQvc2VlZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vZGIvaW5kZXgnO1xuaW1wb3J0IHtTZXJ2ZXIsICBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvXCI7XG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoICBwcm9jZXNzLmVudi5TRUVEID09PSAndHJ1ZScgKSB7XG4gICAgICAgICAgICBhd2FpdCBzZWVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5zeW5jKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5ibHVlQnJpZ2h0KCdEYXRhYmFzZSBzeW5jZWQnKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbyA9IG5ldyBTZXJ2ZXIoYXBwLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JULCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5jeWFuQnJpZ2h0YExpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVH1gKVxuICAgICAgICB9KSlcblxuICAgICAgICBpby5vbihcImNvbm5lY3Rpb25cIiwgKHNvY2tldDogU29ja2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ0dyZWVuQnJpZ2h0KGBVU0VSICgke3NvY2tldC5pZH0pIGhhcyBtYWRlIGEgcGVyc2lzdGVudCBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIhYCkpXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCB0d28gbGluZXMgd2lsbCBsb2cgaWYgYSB1c2VyIGRpc2Nvbm5lY3QuXG4gICAgICAgICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnUmVkQnJpZ2h0KGBVU0VSICgke3NvY2tldC5pZH0pIGRpc2Nvbm5lY3RlZGApKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG59IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhjaGFsay5yZWQoZXJyKSk7XG59XG59XG5cbmluaXQoKVxuXG5cbiIsIlxuXG5hc3luYyBmdW5jdGlvbiBzZWVkKCkge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlZWQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==