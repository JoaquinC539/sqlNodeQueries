"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const BaseClassController_1 = require("../abstract/BaseClassController");
const ClienteService_1 = require("../services/ClienteService");
const ClienteJoi_1 = require("../joi/ClienteJoi");
class ClienteController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/cliente');
        this.indexFilters = ["nombre", "contacto", "email", "direccion"];
        this._cliente = new ClienteService_1.ClienteService("clientes", this.indexFilters);
        this.clienteJoi = new ClienteJoi_1.ClienteJoi();
    }
    get _service() {
        return this._cliente;
    }
    get joi() {
        return this.clienteJoi;
    }
}
exports.ClienteController = ClienteController;
//# sourceMappingURL=ClienteController.js.map