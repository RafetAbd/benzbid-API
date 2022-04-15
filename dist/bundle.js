/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send({
        message: ' bye world',
    });
});
console.log('hello world');
exports["default"] = app;


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
exports.db = void 0;
const db_1 = __importDefault(__webpack_require__(/*! ./db */ "./src/db/db.ts"));
exports.db = db_1.default;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlGQUEwRTtBQUkxRSxNQUFNLEdBQUcsR0FBRyxxQkFBTyxHQUFFO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDN0QsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE9BQU8sRUFBRSxZQUFZO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFMUIscUJBQWUsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkckIsc0VBQXNDO0FBQ3RDLDBGQUEwQztBQUUxQyxNQUFNLFlBQVksR0FBVSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBK0IsQ0FBQyxDQUFDLENBQUMsQ0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFdkYsTUFBTSxNQUFNLEdBUVI7SUFDQSxPQUFPLEVBQUUsS0FBSztJQUNkLGNBQWMsRUFBRSxFQUtmO0NBQ0YsQ0FBQztBQUVKLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO0lBQ2hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztDQUN6QjtBQUVELElBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUc7SUFDNUIsTUFBTSxDQUFDLGNBQWMsR0FBRyxFQUt2QixDQUFDO0NBQ0w7QUFFRCxNQUFNLEVBQUUsR0FBRyxJQUFJLHFCQUFTLENBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLDZCQUE2QixZQUFZLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUVyRixxQkFBZSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNsQixnRkFBc0I7QUFHYixhQUhGLFlBQUUsQ0FHRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSFgsMkVBQTBCO0FBQzFCLGdGQUF3QjtBQUN4QixpR0FBaUM7QUFDakMsMkVBQWdDO0FBQ2hDLHNFQUEyQztBQUMzQyx5RUFBaUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sSUFBSSxHQUFHLEdBQVMsRUFBRTtJQUNwQixJQUFJO1FBQ0EsSUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUc7WUFDaEMsTUFBTSxrQkFBSSxHQUFFLENBQUM7U0FDaEI7YUFBTTtZQUNILE1BQU0sVUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFBQSxDQUFDO1FBRUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQkFBTSxDQUFDLGFBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLFVBQVUsa0NBQWlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxFQUFFLG1EQUFtRCxDQUFDLENBQUM7WUFFdkcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztLQUVUO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvQjtBQUNELENBQUM7QUFFRCxJQUFJLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ04sU0FBZSxJQUFJOztJQUVuQixDQUFDO0NBQUE7QUFFRCxxQkFBZSxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FDTnBCOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2RiLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL3NjcmlwdC9zZWVkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzb2NrZXQuaW9cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyfSBmcm9tICdleHByZXNzJztcblxuLy8gY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG5hcHAuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgcmVzLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJyBieWUgd29ybGQnLFxuICAgIH0pO1xuICB9KTtcblxuICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKVxuXG4gIGV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgKiBhcyBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZGF0YWJhc2VOYW1lOnN0cmluZyA9IHBrZy5uYW1lICsgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAnLXRlc3QnIDogJycpXG5cbmNvbnN0IGNvbmZpZzoge1xuICAgIGxvZ2dpbmc/OiBib29sZWFuLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBib29sZWFuLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogYm9vbGVhblxuICAgIC8vICAgICB9XG4gICAgfVxufSA9IHtcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAvLyAgICAgfVxuICAgIH0sXG4gIH07XG5cbmlmIChwcm9jZXNzLmVudi5MT0dHSU5HID09PSAndHJ1ZScpIHtcbiAgICBkZWxldGUgY29uZmlnLmxvZ2dpbmc7XG59XG5cbmlmICggcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMICkge1xuICAgIGNvbmZpZy5kaWFsZWN0T3B0aW9ucyA9IHtcbiAgICAgICAgLy8gc3NsOiB7XG4gICAgICAgIC8vICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAvLyAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAvLyB9XG4gICAgfTtcbn1cblxuY29uc3QgZGIgPSBuZXcgU2VxdWVsaXplKFxuICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBgcG9zdGdyZXM6Ly9sb2NhbGhvc3Q6NTQzMi8ke2RhdGFiYXNlTmFtZX1gLCBjb25maWcpO1xuXG5leHBvcnQgZGVmYXVsdCBkYjsiLCJpbXBvcnQgZGIgZnJvbSAnLi9kYic7XG5cblxuZXhwb3J0IHsgZGIgfTsiLCJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG5pbXBvcnQgc2VlZCBmcm9tICcuL3NjcmlwdC9zZWVkJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYi9pbmRleCc7XG5pbXBvcnQge1NlcnZlciwgIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW9cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICggIHByb2Nlc3MuZW52LlNFRUQgPT09ICd0cnVlJyApIHtcbiAgICAgICAgICAgIGF3YWl0IHNlZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnN5bmMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJsdWVCcmlnaHQoJ0RhdGFiYXNlIHN5bmNlZCcpKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlvID0gbmV3IFNlcnZlcihhcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmN5YW5CcmlnaHRgTGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUfWApXG4gICAgICAgIH0pKVxuXG4gICAgICAgIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW5CcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgaGFzIG1hZGUgYSBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciFgKSlcbiAgICAgICAgICAgIC8vIHRoZSBuZXh0IHR3byBsaW5lcyB3aWxsIGxvZyBpZiBhIHVzZXIgZGlzY29ubmVjdC5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdSZWRCcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgZGlzY29ubmVjdGVkYCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbn0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlcnIpKTtcbn1cbn1cblxuaW5pdCgpXG5cblxuIiwiXG5cbmFzeW5jIGZ1bmN0aW9uIHNlZWQoKSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VlZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==