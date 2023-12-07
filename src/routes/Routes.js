"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const VendedorController_1 = require("../controllers/VendedorController");
class Routes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.vendedorController = new VendedorController_1.VendedorController();
        this.routes.use("/", this.vendedorController.router);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map