"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClassService = void 0;
const DbConf_1 = require("../conf/DbConf");
const UtilsService_1 = require("../services/UtilsService");
/**
 * @table Table of the database
 * @indexFilters Filters of columns of the table to be able to be filtered
 * @joiSchema Schema necesary but optional to create tables with a default schema base on data types
 */
class BaseClassService {
    /**
     *
     * @param table Table of the database
     * @param indexFilters Filters of columns of the table to be able to be filtered
     * @param joiSchema Schema necesary but optional to create tables with a default schema base on data types
     */
    constructor(table, indexFilters, joiSchema) {
        this.pool = (new DbConf_1.DbConf()).pool;
        this._utils = new UtilsService_1.UtilsService();
        /**
         *
         * @param req request of http
         * @returns query promise
         */
        this.index = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                let queryCount = ` SELECT COUNT(*) FROM ${this.table}`;
                let queryRow = ` SELECT * FROM ${this.table} `;
                let queryParameters = Object.assign({}, req.query);
                delete queryParameters["max"];
                delete queryParameters["offset"];
                const queryParametersKeys = Object.keys(queryParameters);
                const queryParametersLength = Object.keys(queryParameters).length;
                if (queryParametersLength > 0) {
                    for (let i = 0; i < queryParametersLength; i++) {
                        const filterKey = this.indexFilters.find((element) => element === queryParametersKeys[i]);
                        if (filterKey !== undefined) {
                            if (this._utils.verifyReqExistData(req.query[filterKey])) {
                                const value = this._utils.parseValue(req.query[filterKey]);
                                switch (typeof value) {
                                    case 'string':
                                        if (i === 0) {
                                            queryCount += ` WHERE ${filterKey} ILIKE '${value}%'`;
                                            queryRow += ` WHERE ${filterKey} ILIKE '${value}%'`;
                                        }
                                        else {
                                            queryRow += " AND";
                                            queryCount += " AND";
                                            queryCount += `  ${filterKey} ILIKE '${value}%'`;
                                            queryRow += ` ${filterKey} ILIKE '${value}%'`;
                                        }
                                        break;
                                    case "number":
                                        if (i === 0) {
                                            queryCount += ` WHERE ${filterKey} BETWEEN ${value - value * 0.1} AND ${value + value * 0.1}`;
                                            queryRow += ` WHERE ${filterKey} BETWEEN ${value - value * 0.1} AND ${value + value * 0.1}`;
                                        }
                                        else {
                                            queryRow += " AND";
                                            queryCount += " AND";
                                            queryCount += `  ${filterKey} BETWEEN ${value - value * 0.1} AND ${value + value * 0.1}`;
                                            queryRow += ` ${filterKey} BETWEEN ${value - value * 0.1} AND ${value + value * 0.1}`;
                                        }
                                        break;
                                    case "boolean":
                                        if (i === 0) {
                                            queryCount += ` WHERE ${filterKey} IS ${value}`;
                                            queryRow += ` WHERE ${filterKey} IS ${value}`;
                                        }
                                        else {
                                            queryRow += " AND";
                                            queryCount += " AND";
                                            queryCount += `  ${filterKey} IS ${value}`;
                                            queryRow += ` ${filterKey} IS ${value}`;
                                        }
                                        break;
                                }
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                queryRow += ' ORDER BY _id DESC';
                if (req.query.max !== undefined && req.query.offset !== undefined) {
                    queryRow += ` LIMIT ${req.query.max} OFFSET ${req.query.offset}`;
                }
                let count = yield this.pool.query(queryCount);
                let row = yield this.pool.query(queryRow);
                return this._utils.setIndexResponse(count.rows[0].count, row.rows);
            }
            catch (error) {
                return ({ error: true, failure: error });
            }
        });
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    return new Promise((resolve, reject) => {
                        reject({ error: true, failure: 'No id provided' });
                    });
                }
                let query = `SELECT * FROM ${this.table} WHERE _id=$1`;
                return this.pool.query(query, [Number(req.params.id)]);
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject({ error: true, failure: error });
                });
            }
        });
        this.post = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                let columns = Object.keys(data);
                let values = Object.values(data);
                let indexes = values.map((value, index) => "$" + String(Number(index + 1)));
                let query = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${indexes.join(', ')}) RETURNING *`;
                return this.pool.query(query, values);
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject({ error: true, failure: error });
                });
            }
        });
        this.put = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    return new Promise((resolve, reject) => {
                        reject({ error: true, failure: 'No id provided' });
                    });
                }
                let data = req.body;
                let sets = [];
                let values = [];
                let i = 1;
                for (let key in data) {
                    sets.push(`${key} = $${i}`);
                    values.push(data[key]);
                    i++;
                }
                values.push(Number(req.params.id));
                let query = ` UPDATE ${this.table} SET ${sets.join(', ')} WHERE _id = $${i} RETURNING *`;
                return this.pool.query(query, values);
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject({ error: true, failure: error });
                });
            }
        });
        this.delete = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    return new Promise((resolve, reject) => {
                        reject({ error: true, failure: 'No id provided' });
                    });
                }
                let query = ` DELETE FROM ${this.table} WHERE _id=$1`;
                return this.pool.query(query, [Number(req.params.id)]);
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject({ error: true, failure: error });
                });
            }
        });
        /**
         *
         * @returns Check if a table exists in the db, if not create a table with a schema template based on the joi schema
         */
        this.checkAndCreateTable = () => __awaiter(this, void 0, void 0, function* () {
            if (this.joiSchema === undefined) {
                return;
            }
            else {
                let query = `CREATE TABLE IF NOT EXISTS ${this.table} (`;
                query += `_id SERIAL PRIMARY KEY,`;
                const joiDetails = this.joiSchema.describe().keys;
                for (const key in joiDetails) {
                    const dataType = joiDetails[key].type;
                    let typeSQL;
                    switch (dataType) {
                        case 'number':
                            typeSQL = 'INT';
                            break;
                        case 'string':
                            typeSQL = "VARCHAR(255)";
                            break;
                        case 'boolean':
                            typeSQL = "BOOLEAN";
                            break;
                        default:
                            typeSQL = "VARCHAR(255)";
                            break;
                    }
                    query += ` ${key} ${typeSQL},`;
                }
                query = query.slice(0, -1);
                query += ")";
                this.pool.query(query)
                    .then(() => {
                    return;
                });
            }
        });
        this.table = table;
        this.indexFilters = indexFilters;
        this.joiSchema = joiSchema;
        this.checkAndCreateTable();
    }
}
exports.BaseClassService = BaseClassService;
//# sourceMappingURL=BaseClassService.js.map