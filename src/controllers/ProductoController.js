"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const BaseClassController_1 = require("../abstract/BaseClassController");
const ProductoJoi_1 = require("../joi/ProductoJoi");
const ProductoService_1 = require("../services/ProductoService");
class ProductoController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/producto');
        this.indexFilters = ["nombre", "precio", "category", "descripcion"];
        this._producto = new ProductoService_1.ProductoService("productos", this.indexFilters);
        this.productoJoi = new ProductoJoi_1.ProductoJoi();
    }
    get _service() {
        return this._producto;
    }
    get joi() {
        return this.productoJoi;
    }
}
exports.ProductoController = ProductoController;
//# sourceMappingURL=ProductoController.js.map