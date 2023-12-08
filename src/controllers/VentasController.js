"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaController = void 0;
const BaseClassController_1 = require("../abstract/BaseClassController");
const VentasJoi_1 = require("../joi/VentasJoi");
const VentasService_1 = require("../services/VentasService");
class VentaController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/venta');
        this.indexFilters = ["cliente", "producto", "quantity", "fecha_orden", "vendedor"];
        this._ventas = new VentasService_1.VentasService("ventas", this.indexFilters);
        this.ventasJoi = new VentasJoi_1.VentasJoi();
    }
    get _service() {
        return this._ventas;
    }
    get joi() {
        return this.ventasJoi;
    }
}
exports.VentaController = VentaController;
//# sourceMappingURL=VentasController.js.map