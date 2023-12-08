"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorController = void 0;
const BaseClassController_1 = require("../abstract/BaseClassController");
const ProveedorJoi_1 = require("../joi/ProveedorJoi");
const ProveedorService_1 = require("../services/ProveedorService");
class ProveedorController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/proveedor');
        this.indexFilters = ["nombre", "contacto", "email", "direccion"];
        this._proveedor = new ProveedorService_1.ProveedorService("proveedores", this.indexFilters);
        this.proveedorJoi = new ProveedorJoi_1.ProveedorJoi();
    }
    get _service() {
        return this._proveedor;
    }
    get joi() {
        return this.proveedorJoi;
    }
}
exports.ProveedorController = ProveedorController;
//# sourceMappingURL=ProveedorController.js.map