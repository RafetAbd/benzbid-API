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
const sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
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
const db = new sequelize.Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config);
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
const http_1 = __webpack_require__(/*! http */ "http");
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
        const httpServer = (0, http_1.createServer)(app_1.default);
        const io = new socket_io_1.Server(httpServer);
        io.on('connection', (socket) => {
            console.log(chalk_1.default.greenBright(`USER (${socket.id}) has made a persistent connection to the server!`));
            socket.on('disconnect', function () {
                console.log(chalk_1.default.redBright(`USER (${socket.id}) disconnected`));
            });
        });
        httpServer.listen(process.env.PORT, () => {
            console.log(chalk_1.default.cyan `Listening on http://localhost:${process.env.PORT}`);
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

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"benzbid-api","version":"1.0.0","description":"backend of benzbid","main":"bundle.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":" webpack","run:dev":"npm run build & nodemon dist/bundle.js","build":"webpack --watch"},"repository":{"type":"git","url":"git+https://github.com/RafetAbd/benzbid-API.git"},"author":"","license":"ISC","bugs":{"url":"https://github.com/RafetAbd/benzbid-API/issues"},"homepage":"https://github.com/RafetAbd/benzbid-API#readme","devDependencies":{"@types/express":"^4.17.13","@types/node":"^17.0.23","@types/webpack-node-externals":"^2.5.3","lite-server":"^2.6.1","nodemon":"^2.0.15","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1","webpack-shell-plugin-next":"^2.2.2"},"dependencies":{"@types/pg":"^8.6.5","@types/sequelize":"^4.28.11","@types/socket.io":"^3.0.2","@types/socket.io-client":"^3.0.0","body-parser":"^1.20.0","chalk":"^4.1.2","dotenv":"^16.0.0","express":"^4.17.3","path":"^0.12.7","pg":"^8.7.3","sequelize":"^6.19.0","socket.io":"^4.4.1","socket.io-client":"^4.4.1","util":"^0.12.4","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsZUFBSyxDQUFDLElBQUksa0NBQWlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUM7S0FFVDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0I7QUFDRCxDQUFDO0FBRUQsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNOLFNBQWUsSUFBSTs7SUFFbkIsQ0FBQztDQUFBO0FBRUQscUJBQWUsSUFBSSxDQUFDOzs7Ozs7Ozs7OztBQ05wQjs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2RiLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2RiL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpLy4vc3JjL3NjcmlwdC9zZWVkLnRzIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvZXh0ZXJuYWwgY29tbW9uanMgXCJzb2NrZXQuaW9cIiIsIndlYnBhY2s6Ly9iZW56YmlkLWFwaS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmVuemJpZC1hcGkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JlbnpiaWQtYXBpL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuXG4vLyBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbmFwcC5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICByZXMuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnIGJ5ZSB3b3JsZCcsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCcpXG5cbiAgZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCAqIGFzIHNlcXVlbGl6ZSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgKiBhcyBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZGF0YWJhc2VOYW1lOnN0cmluZyA9IHBrZy5uYW1lICsgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAnLXRlc3QnIDogJycpXG5cbmNvbnN0IGNvbmZpZzoge1xuICAgIGxvZ2dpbmc/OiBib29sZWFuLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gICAgIHNzbDoge1xuICAgIC8vICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBib29sZWFuLFxuICAgIC8vICAgICAgICAgcmVxdWlyZTogYm9vbGVhblxuICAgIC8vICAgICB9XG4gICAgfVxufSA9IHtcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgIC8vICAgICBzc2w6IHtcbiAgICAvLyAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAvLyAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAvLyAgICAgfVxuICAgIH0sXG4gIH07XG5cbmlmIChwcm9jZXNzLmVudi5MT0dHSU5HID09PSAndHJ1ZScpIHtcbiAgICBkZWxldGUgY29uZmlnLmxvZ2dpbmc7XG59XG5cbmlmICggcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMICkge1xuICAgIGNvbmZpZy5kaWFsZWN0T3B0aW9ucyA9IHtcbiAgICAgICAgLy8gc3NsOiB7XG4gICAgICAgIC8vICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAvLyAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAvLyB9XG4gICAgfTtcbn1cblxuY29uc3QgZGI6IGFueSA9IG5ldyBzZXF1ZWxpemUuU2VxdWVsaXplKFxuICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBgcG9zdGdyZXM6Ly9sb2NhbGhvc3Q6NTQzMi8ke2RhdGFiYXNlTmFtZX1gLCBjb25maWcpO1xuXG5leHBvcnQgZGVmYXVsdCBkYjsiLCJpbXBvcnQgZGIgZnJvbSAnLi9kYic7XG5cblxuZXhwb3J0IHsgZGIgfTsiLCIvLyBpbXBvcnQgZXhwcmVzcywgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9ufSBmcm9tICdleHByZXNzJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgYXBwIGZyb20gJy4vYXBwJztcbmltcG9ydCBzZWVkIGZyb20gJy4vc2NyaXB0L3NlZWQnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gXCJodHRwXCI7XG5pbXBvcnQgeyBTZXJ2ZXIsIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW9cIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5cblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoICBwcm9jZXNzLmVudi5TRUVEID09PSAndHJ1ZScgKSB7XG4gICAgICAgICAgICBhd2FpdCBzZWVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5zeW5jKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5ibHVlQnJpZ2h0KCdEYXRhYmFzZSBzeW5jZWQnKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaHR0cFNlcnZlciA9IGNyZWF0ZVNlcnZlcihhcHApO1xuXG4gICAgICAgIGNvbnN0IGlvID0gbmV3IFNlcnZlcihodHRwU2VydmVyKSBcbiAgICAgICAgLy8gcGFzcyB0aGUgaHR0cCBzZXJ2ZXIgaW50byB0aGUgc29ja2V0IHNlcnZlclxuXG4gICAgICAgIGlvLm9uKCdjb25uZWN0aW9uJywgKHNvY2tldDogU29ja2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5ncmVlbkJyaWdodChgVVNFUiAoJHtzb2NrZXQuaWR9KSBoYXMgbWFkZSBhIHBlcnNpc3RlbnQgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIWApKVxuICAgICAgICAgICAgLy8gdGhlIG5leHQgdHdvIGxpbmVzIHdpbGwgbG9nIGlmIGEgdXNlciBkaXNjb25uZWN0LlxuICAgICAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5yZWRCcmlnaHQoYFVTRVIgKCR7c29ja2V0LmlkfSkgZGlzY29ubmVjdGVkYCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgaHR0cFNlcnZlci5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbGsuY3lhbmBMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlBPUlR9YCk7XG4gICAgICAgIH0pXG5cbn0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlcnIpKTtcbn1cbn1cblxuaW5pdCgpXG5cbiIsIlxuXG5hc3luYyBmdW5jdGlvbiBzZWVkKCkge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlZWQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==