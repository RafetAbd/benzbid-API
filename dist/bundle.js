/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const router = (0, express_1.Router)();
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
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '/mercedes default.jpg'
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
        defaultValue: 'Active'
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    endTimeAndDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    s3id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
    },
    defaultScopes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.15","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/bcrypt":"^5.0.0","@types/jsonwebtoken":"^8.5.8","@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","bcrypt":"^5.0.1","body-parser":"^1.20.0","chalk":"^4.1.2","dotenv":"^16.0.0","express":"^4.17.3","jsonwebtoken":"^8.5.1","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO0tBRVQ7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0FBQ0QsQ0FBQztBQUVELElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDTixTQUFlLElBQUk7O0lBRW5CLENBQUM7Q0FBQTtBQUVELHFCQUFlLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7QUNOcEI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2F1dGgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvZGIudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvZGIvbW9kZWxzL0JpZC50cyIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS8uL3NyYy9kYi9tb2RlbHMvQ2FyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9NZXNzYWdlLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL3NjcmlwdC9zZWVkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInNvY2tldC5pb1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBhdXRoUm91dGVyIGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgYXBpUm91dGVyIGZyb20gJy4vYXBpJztcbmltcG9ydCB7IGpzb24gfSBmcm9tICdib2R5LXBhcnNlcic7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4vLyBib2R5IHBhcnNpbmcgbWlkZGxld2FyZVxuYXBwLnVzZShqc29uKCkpXG5cbi8vIGF1dGggYW5kIGFwaSByb3V0ZXNcbmFwcC51c2UoJy9hdXRoJywgYXV0aFJvdXRlcik7XG5hcHAudXNlKCcvYXBpJywgYXBpUm91dGVyKTtcblxuLy8gYXBwLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuLy8gICAgIHJlcy5zZW5kKHtcbi8vICAgICAgIG1lc3NhZ2U6ICcgYnllIHdvcmxkJyxcbi8vICAgICB9KTtcbi8vICAgfSk7XG5cbi8vICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkJylcblxuICAvLyBlcnJvciBoYW5kbGluZyBtaWRkbGV3YXJlLlxuICBhcHAudXNlKChlcnI6IEVycm9yLCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHttZXNzYWdlOiBlcnIubWVzc2FnZX0pO1xuICB9KTtcblxuICBleHBvcnQgZGVmYXVsdCBhcHA7IiwiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9kYic7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuLy8gcmVjaWV2ZSBhIGVtYWlsLCBwYXNzb3dyZCB0aGVuIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHRva2VuLlxucm91dGVyLnBvc3QoJy9sb2dpbicsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJlcy5zZW5kKHsgdG9rZW46IGF3YWl0IFVzZXIuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCkgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pO1xuXG4vLyByZWNpZXZlIHVzZXIgaW5mbywgY3JlYXRlIGEgbmV3IHVzZXIgYW5kIHJlc3BvbnNlIHdpdGggYSB0b2tlbi5cbnJvdXRlci5wb3N0KCcvc2lnbnVwJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHJlcS5ib2R5KTtcbiAgICAgICAgcmVzLnNlbmQoeyB0b2tlbjogdXNlci5nZW5lcmF0ZVRva2VuKCkgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgaWYgKChlcnIgYXMgRXJyb3IpLm5hbWUgPT09ICdTZXF1ZWxpemVVbmlxdWVDb25zdHJhaW50RXJyb3InKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCgnVXNlciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgIH1cbiAgICB9XG59KVxuXG4vLyByZWNpZXZlIGEgdG9rZW4sIHZlcmlmeSBhbmQgcmVzcG9uc2Ugd2l0aCBhIHVzZXIuXG5yb3V0ZXIuZ2V0KCcvbWUnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXMuc2VuZChhd2FpdCBVc2VyLmZpbmRCeVRva2VuKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gYXMgc3RyaW5nKSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn0pIiwiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGRhdGFiYXNlTmFtZTpzdHJpbmcgPSBwa2cubmFtZSArIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnID8gJy10ZXN0JyA6ICcnKVxuXG5jb25zdCBjb25maWc6IHtcbiAgICBsb2dnaW5nPzogYm9vbGVhbixcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogYm9vbGVhbixcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IGJvb2xlYW5cbiAgICAvLyAgICAgfVxuICAgIH1cbn0gPSB7XG4gICAgbG9nZ2luZzogZmFsc2UsXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAvLyAgICAgc3NsOiB7XG4gICAgLy8gICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgLy8gICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgLy8gICAgIH1cbiAgICB9LFxuICB9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTE9HR0lORyA9PT0gJ3RydWUnKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5sb2dnaW5nO1xufVxuXG5pZiAoIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCApIHtcbiAgICBjb25maWcuZGlhbGVjdE9wdGlvbnMgPSB7XG4gICAgICAgIC8vIHNzbDoge1xuICAgICAgICAvLyAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgLy8gfVxuICAgIH07XG59XG5cbmNvbnN0IGRiID0gbmV3IFNlcXVlbGl6ZShcbiAgICBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgYHBvc3RncmVzOi8vbG9jYWxob3N0OjU0MzIvJHtkYXRhYmFzZU5hbWV9YCwgY29uZmlnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7IiwiaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IEJpZCBmcm9tICcuL21vZGVscy9CaWQnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tb2RlbHMvTWVzc2FnZSc7XG5pbXBvcnQgQ2FyIGZyb20gJy4vbW9kZWxzL0Nhcic7XG5cbi8vIGFzc29jaWF0ZSB0aGUgbW9kZWxzXG5Vc2VyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oVXNlcik7XG5cblVzZXIuaGFzTWFueShDYXIpO1xuQ2FyLmJlbG9uZ3NUbyhVc2VyKTtcblxuQ2FyLmhhc01hbnkoQmlkKTtcbkJpZC5iZWxvbmdzVG8oQ2FyKTtcblxuQ2FyLmhhc01hbnkoTWVzc2FnZSk7XG5NZXNzYWdlLmJlbG9uZ3NUbyhDYXIpO1xuXG5leHBvcnQgeyBkYiwgVXNlciwgQmlkLCBNZXNzYWdlLCBDYXIgfTsiLCJpbXBvcnQgeyBTZXF1ZWxpemUsIE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIlxuXG5pbnRlcmZhY2UgQmlkTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgYW1vdW50OiBudW1iZXI7XG59XG5cbnR5cGUgQmlkTW9kZWxTdGF0aWMgPSB0eXBlb2YgTW9kZWwgJiB7XG4gICAgbmV3ICh2YWx1ZXM/OiBvYmplY3QsIG9wdGlvbnM/OiBCdWlsZE9wdGlvbnMpOiBCaWRNb2RlbDtcbn1cblxuY29uc3QgQmlkICA9IDxCaWRNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJiaWRcIiwge1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgfSxcbiAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmlkOyIsImltcG9ydCB7IFNlcXVlbGl6ZSwgTW9kZWwsIERhdGFUeXBlcywgQnVpbGRPcHRpb25zIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBkYiBmcm9tICcuLi9kYic7XG5cbmludGVyZmFjZSBDYXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBtb2RlbDogc3RyaW5nO1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBpbWFnZVVybDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBsb2NhdGlvbjogc3RyaW5nO1xuICAgIGVuZFRpbWVBbmREYXRlOiBzdHJpbmc7XG4gICAgczNpZDogc3RyaW5nO1xufVxuXG50eXBlIENhck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogQ2FyTW9kZWw7XG59XG5cbmNvbnN0IENhciA9IDxDYXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoJ2NhcicsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgeWVhcjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIGlzSW50OiB0cnVlLFxuICAgICAgICAgICAgbWluOiAxOTIwLFxuICAgICAgICAgICAgbWF4OiAyMDIzLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBpbWFnZVVybDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcvbWVyY2VkZXMgZGVmYXVsdC5qcGcnXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBwcmljZToge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ0FjdGl2ZSdcbiAgICB9LFxuICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGVuZFRpbWVBbmREYXRlOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIHMzaWQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYXI7XG4iLCJpbXBvcnQgeyBTZXF1ZWxpemUsIE1vZGVsLCBEYXRhVHlwZXMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gXCIuL1VzZXJcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcblxuaW50ZXJmYWNlIE1lc3NhZ2VNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgZGVmYXVsdFNjb3BlczogeyBpbmNsdWRlOiB7IG1vZGVsOiBVc2VyTW9kZWwgfVtdIH07XG59XG5cbnR5cGUgTWVzc2FnZU1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogTWVzc2FnZU1vZGVsO1xufVxuXG5jb25zdCBNZXNzYWdlID0gPE1lc3NhZ2VNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJtZXNzYWdlXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBkZWZhdWx0U2NvcGVzOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTsiLCJcbmltcG9ydCB7IFNlcXVlbGl6ZSwgQnVpbGRPcHRpb25zLCBNb2RlbCwgRGF0YVR5cGVzICwgQ3JlYXRlRGF0YWJhc2VPcHRpb25zLCBJbmZlckF0dHJpYnV0ZXMsIEluZmVyQ3JlYXRpb25BdHRyaWJ1dGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcblxuY29uc3QgU0FMVF9ST1VORFMgPSA1O1xuXG4vLyBXZSBuZWVkIHRvIGRlY2xhcmUgYW4gaW50ZXJmYWNlIGZvciBvdXIgbW9kZWwgdGhhdCBpcyBiYXNpY2FsbHkgd2hhdCBvdXIgY2xhc3Mgd291bGQgYmVcbmludGVyZmFjZSBVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbWFnZVVybD86IHN0cmluZztcbiAgICBzdHJpcElkPzogc3RyaW5nO1xuICAgIGNvcnJlY3RQYXNzd29yZChwYXNzd29yZDpzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGdlbmVyYXRlVG9rZW4oKTogc3RyaW5nO1xufVxuXG4vLyBOZWVkIHRvIGRlY2xhcmUgdGhlIHN0YXRpYyBtb2RlbCBzbyBgZmluZE9uZWAgZXRjLiB1c2UgY29ycmVjdCB0eXBlcy5cbnR5cGUgVXNlck1vZGVsU3RhdGljID0gdHlwZW9mIE1vZGVsICYge1xuICAgIG5ldyAodmFsdWVzPzogb2JqZWN0LCBvcHRpb25zPzogQnVpbGRPcHRpb25zKTogVXNlck1vZGVsO1xuICAgIGF1dGhlbnRpY2F0ZShlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRCeVRva2VuKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJNb2RlbCB8IG51bGw+O1xuICB9XG5cbi8vIFRTIGNhbid0IGRlcml2ZSBhIHByb3BlciBjbGFzcyBkZWZpbml0aW9uIGZyb20gYSBgLmRlZmluZWAgY2FsbCwgdGhlcmVmb3Igd2UgbmVlZCB0byBjYXN0IGhlcmUuXG5jb25zdCBVc2VyID0gPFVzZXJNb2RlbFN0YXRpYz5kYi5kZWZpbmUoXCJ1c2VyXCIsIHtcbiAgICBpZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWw6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgaXNFbWFpbDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2VcbiAgICB9LFxuICAgIGltYWdlVXJsOiB7XG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJy9NYW4gRW1vamkucG5nJ1xuICAgIH0sXG4gICAgc3RyaXBJZDoge1xuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9XG59KTtcblxuZXhwb3J0IHsgVXNlciwgVXNlck1vZGVsIH07XG5cbi8vICoqIGluc3RhbmNlTWV0aG9kcyAqKlxuXG4vLyBnZW5lcmF0ZSB0b2tlbiwgc2F2ZSB0aGUgaWQgaW4gdGhlIGhlYWRlci5cblVzZXIucHJvdG90eXBlLmdlbmVyYXRlVG9rZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGp3dC5zaWduKHsgaWQ6IHRoaXMuaWQgfSxwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZywge2V4cGlyZXNJbjogJzFkJ31cbiAgICAgICAgKVxufVxuXG4vLyBjb21wYXJlIHRoZSBwbGFpbiB2ZXJzaW9uIHRvIHRoZSBlbmNycHl0ZWQgdmVyc2lvbi5cblVzZXIucHJvdG90eXBlLmNvcnJlY3RQYXNzd29yZCA9IGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZVBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKVxufVxuXG5cbi8vICoqIGNsYXNzTWV0aG9kcyAqKlxuXG5Vc2VyLmF1dGhlbnRpY2F0ZSA9IGFzeW5jIGZ1bmN0aW9uICggZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyApIHtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbCB9IH0pXG4gICAgaWYgKCF1c2VyIHx8ICEoYXdhaXQgdXNlci5jb3JyZWN0UGFzc3dvcmQocGFzc3dvcmQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCB1c2VybmFtZS9wYXNzd29yZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlci5nZW5lcmF0ZVRva2VuKCk7XG4gIH07XG5cbiAgVXNlci5maW5kQnlUb2tlbiA9IGFzeW5jIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZykgYXMgeyBpZDogbnVtYmVyIH07XG4gICAgICBjb25zdCB1c2VyID0gVXNlci5maW5kQnlQayhpZClcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB0aHJvdyAnbm9vbydcbiAgICAgIH1cbiAgICAgIHJldHVybiB1c2VyXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgdG9rZW4nKVxuICAgIH1cbiAgfVxuXG4gIC8vICoqIGhvb2tzICoqXG5cbiAgY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHVzZXI6IFVzZXJNb2RlbCkgPT4ge1xuICAgIC8vaW4gY2FzZSB0aGUgcGFzc3dvcmQgaGFzIGJlZW4gY2hhbmdlZCwgd2Ugd2FudCB0byBlbmNyeXB0IGl0IHdpdGggYmNyeXB0XG4gICAgaWYgKHVzZXIuY2hhbmdlZCgncGFzc3dvcmQnKSkge1xuICAgICAgdXNlci5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIFNBTFRfUk9VTkRTKTtcbiAgICB9XG4gIH1cblxuLy8gICB0eXBlIHVzZXJzID0gdHlwZW9mIFVzZXJbXVxuICBcbiAgVXNlci5iZWZvcmVDcmVhdGUoaGFzaFBhc3N3b3JkKVxuICBVc2VyLmJlZm9yZVVwZGF0ZShoYXNoUGFzc3dvcmQpXG4gIFVzZXIuYmVmb3JlQnVsa0NyZWF0ZSgodXNlcnMpID0+IHtcbiAgICAgIFByb21pc2UuYWxsKHVzZXJzLm1hcChoYXNoUGFzc3dvcmQpKX0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgYXBwIGZyb20gJy4vYXBwJztcbmltcG9ydCBzZWVkIGZyb20gJy4vc2NyaXB0L3NlZWQnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiL2luZGV4JztcbmltcG9ydCB7U2VydmVyLCAgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pb1wiO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKCAgcHJvY2Vzcy5lbnYuU0VFRCA9PT0gJ3RydWUnICkge1xuICAgICAgICAgICAgYXdhaXQgc2VlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgZGIuc3luYygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmx1ZUJyaWdodCgnRGF0YWJhc2Ugc3luY2VkJykpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW8gPSBuZXcgU2VydmVyKGFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuY3lhbkJyaWdodGBMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlBPUlR9YClcbiAgICAgICAgfSkpXG5cbiAgICAgICAgaW8ub24oXCJjb25uZWN0aW9uXCIsIChzb2NrZXQ6IFNvY2tldCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdHcmVlbkJyaWdodChgVVNFUiAoJHtzb2NrZXQuaWR9KSBoYXMgbWFkZSBhIHBlcnNpc3RlbnQgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIWApKVxuICAgICAgICAgICAgLy8gdGhlIG5leHQgdHdvIGxpbmVzIHdpbGwgbG9nIGlmIGEgdXNlciBkaXNjb25uZWN0LlxuICAgICAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ1JlZEJyaWdodChgVVNFUiAoJHtzb2NrZXQuaWR9KSBkaXNjb25uZWN0ZWRgKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxufSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coY2hhbGsucmVkKGVycikpO1xufVxufVxuXG5pbml0KClcblxuXG4iLCJcblxuYXN5bmMgZnVuY3Rpb24gc2VlZCgpIHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWVkOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=