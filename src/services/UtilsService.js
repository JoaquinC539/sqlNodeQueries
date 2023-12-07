"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
class UtilsService {
    constructor() {
        this.setIndexResponse = (count, rows) => {
            let result = [
                {
                    results: rows,
                    count: [{ count: count }]
                }
            ];
            return result;
        };
    }
    clavificar(nombre) {
        nombre = nombre.normalize('NFD');
        nombre = nombre.replace(/[\u0300-\u036f]/g, "");
        return nombre;
    }
    paginateArray(items, max, offset) {
        max = max !== undefined ? max : 15;
        offset = offset !== undefined ? offset : 0;
        return items.slice(Number(offset), Number(offset) + Number(max));
    }
    setMaxAndOffset(req) {
        if (req.query.max === undefined) {
            req.query.max = "15";
        }
        if (req.query.offset === undefined) {
            req.query.offset = "0";
        }
        return req;
    }
    verifyReqExistData(value) {
        if (value === undefined) {
            return false;
        }
        if (value !== undefined && value !== 'null' && value !== '' && value != null && value !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
    parseGetData(data) {
        return data.rows[0];
    }
    parseValue(value) {
        if (!isNaN(Number(value))) {
            return Number(value);
        }
        else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            return Boolean(value);
        }
        else {
            return value;
        }
    }
}
exports.UtilsService = UtilsService;
//# sourceMappingURL=UtilsService.js.map