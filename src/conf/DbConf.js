"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConf = void 0;
const pg_1 = require("pg");
class DbConf {
    constructor() {
        this.pool = new pg_1.Pool({
            user: process.env.DB_USERNAME,
            host: "localhost",
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        });
    }
}
exports.DbConf = DbConf;
//# sourceMappingURL=DbConf.js.map