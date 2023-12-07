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
class BaseClassService {
    constructor(table, indexFilters) {
        this.pool = (new DbConf_1.DbConf()).pool;
        this._utils = new UtilsService_1.UtilsService();
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
                let query = `SELECT * FROM ${this.table} WHERE _id=${Number(req.params.id)}`;
                return this.pool.query(query);
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
                for (let key in data) {
                    sets.push(`${key} = '${data[key]}'`);
                }
                let query = ` UPDATE ${this.table} SET ${sets.join(', ')} WHERE _id = ${Number(req.params.id)} RETURNING *`;
                return this.pool.query(query);
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
                let query = ` DELETE FROM ${this.table} WHERE _id=${Number(req.params.id)}`;
                return this.pool.query(query);
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject({ error: true, failure: error });
                });
            }
        });
        this.table = table;
        this.indexFilters = indexFilters;
    }
}
exports.BaseClassService = BaseClassService;
//# sourceMappingURL=BaseClassService.js.map