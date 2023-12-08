"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorService = void 0;
const BaseClassService_1 = require("../abstract/BaseClassService");
/**
 * @table Table of the database
 * @indexFilters Filters of columns of the table to be able to be filtered
 */
class ProveedorService extends BaseClassService_1.BaseClassService {
    constructor(table, indexFilters) {
        super(table, indexFilters);
    }
}
exports.ProveedorService = ProveedorService;
//# sourceMappingURL=ProveedorService.js.map