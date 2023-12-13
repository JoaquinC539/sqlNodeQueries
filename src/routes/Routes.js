"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const VendedorController_1 = require("../controllers/VendedorController");
const ClienteController_1 = require("../controllers/ClienteController");
const ProveedorController_1 = require("../controllers/ProveedorController");
const ProductoController_1 = require("../controllers/ProductoController");
const VentasController_1 = require("../controllers/VentasController");
const InteraccionController_1 = require("../controllers/InteraccionController");
class Routes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.vendedorController = new VendedorController_1.VendedorController();
        this.clienteController = new ClienteController_1.ClienteController();
        this.proveedorController = new ProveedorController_1.ProveedorController();
        this.productoController = new ProductoController_1.ProductoController();
        this.ventaController = new VentasController_1.VentaController();
        this.interaccionController = new InteraccionController_1.InteraccionController();
        this.routes.use("/", this.vendedorController.router);
        this.routes.use("/", this.clienteController.router);
        this.routes.use('/', this.proveedorController.router);
        this.routes.use("/", this.productoController.router);
        this.routes.use("/", this.ventaController.router);
        this.routes.use("/", this.interaccionController.router);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map