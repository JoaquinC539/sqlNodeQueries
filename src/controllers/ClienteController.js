"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const BaseClassController_1 = require("../abstract/BaseClassController");
const ClienteService_1 = require("../services/ClienteService");
const ClienteJoi_1 = require("../joi/ClienteJoi");
const OrmDataSource_1 = require("../conf/OrmDataSource");
const Cliente_1 = require("../class/Cliente");
class ClienteController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/cliente');
        this.indexFilters = ["nombre", "contacto", "email", "direccion"];
        this._cliente = new ClienteService_1.ClienteService("clientes", this.indexFilters);
        this.clienteJoi = new ClienteJoi_1.ClienteJoi();
        this.router.get("/clienteO", this.indexORM);
    }
    get _service() {
        return this._cliente;
    }
    get joi() {
        return this.clienteJoi;
    }
    indexORM(req, res) {
        OrmDataSource_1.OrmDataSource.manager.find(Cliente_1.Cliente)
            .then((data) => {
            res.send(data);
        });
    }
}
exports.ClienteController = ClienteController;
//# sourceMappingURL=ClienteController.js.map