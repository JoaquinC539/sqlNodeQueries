"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const DbConf_1 = require("./conf/DbConf");
const OrmDataSource_1 = require("./conf/OrmDataSource");
require("reflect-metadata");
require('dotenv').config();
class Index {
    constructor(port) {
        this.port = 3500;
        this.port = Number(port);
        this.app = new App_1.App();
        this.dbConf = new DbConf_1.DbConf();
        this.ORM = OrmDataSource_1.OrmDataSource;
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
            });
            this.ORM.initialize()
                .then(() => {
                console.log("Data source has been initiallized! ");
            })
                .catch((err) => {
                console.error(err);
            }); //
        })
            .catch((error) => { console.error(error); });
    }
}
const index = new Index(process.env.PORT);
index.connect();
//# sourceMappingURL=index.js.map