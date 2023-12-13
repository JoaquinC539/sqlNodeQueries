"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const cors = require('cors');
const Routes_1 = require("./routes/Routes");
const Cors_1 = require("./conf/Cors");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.port = 3500;
        this.routes = new Routes_1.Routes();
        this.cors = new Cors_1.Cors();
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(body_parser_1.default.json());
        this.express.use(cors(this.cors));
        this.express.use('/api', this.routes.routes);
    }
    getPort() {
        return Number(this.port);
    }
    serverCreate(port) {
        return new Promise((resolve, reject) => {
            try {
                this.express.listen(port, () => {
                    console.log("Server listenting at localhost:" + port);
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map