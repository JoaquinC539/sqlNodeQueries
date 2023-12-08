"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const BaseClassService_1 = require("../abstract/BaseClassService");
/**
 * @table Table of the database
 * @indexFilters Filters of columns of the table to be able to be filtered
 */
class ProductoService extends BaseClassService_1.BaseClassService {
    constructor(table, indexFilters) {
        super(table, indexFilters);
    }
}
exports.ProductoService = ProductoService;
//# sourceMappingURL=ProductoService.js.map