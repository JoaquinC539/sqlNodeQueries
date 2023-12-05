"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const DbConf_1 = require("./conf/DbConf");
require('dotenv').config();
class Index {
    constructor(port) {
        this.port = 3500;
        this.port = Number(port);
        this.app = new App_1.App();
        this.dbConf = new DbConf_1.DbConf();
    }
    getPort() {
        return Number(this.port);
    }
    connect() {
        this.app.serverCreate(this.getPort())
            .then(() => {
            this.dbConf.pool.connect()
                .then(() => {
                console.log("Postgre connection successful");
            })
                .catch((err) => {
                console.error(err);
            });
        })
            .catch((error) => { console.error(error); });
    }
}
const index = new Index(process.env.PORT);
index.connect();
//# sourceMappingURL=index.js.map