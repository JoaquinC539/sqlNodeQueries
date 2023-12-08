"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorController = void 0;
const VendedorService_1 = require("../services/VendedorService");
const BaseClassController_1 = require("../abstract/BaseClassController");
const VendedorJoi_1 = require("../joi/VendedorJoi");
class VendedorController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/vendedor');
        this.indexFilters = ["nombre", "apellido", 'edad'];
        this._vendedor = new VendedorService_1.VendedorService('vendedores', this.indexFilters);
        this.vendedorJoi = new VendedorJoi_1.VendedorJoi();
    }
    get _service() {
        return this._vendedor;
    }
    get joi() {
        return this.vendedorJoi;
    }
}
exports.VendedorController = VendedorController;
//# sourceMappingURL=VendedorController.js.map