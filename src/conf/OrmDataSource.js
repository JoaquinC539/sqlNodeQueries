"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmDataSource = void 0;
require('dotenv').config();
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const Vendedor_1 = require("../class/Vendedor");
const Cliente_1 = require("../class/Cliente");
const InteraccionORM_1 = require("../class/InteraccionORM");
exports.OrmDataSource = new typeorm_1.DataSource({
    type: "postgres",
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    entities: [Vendedor_1.Vendedor, Cliente_1.Cliente, InteraccionORM_1.InteraccionORM]
});
//# sourceMappingURL=OrmDataSource.js.map