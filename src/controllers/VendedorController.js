"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorController = void 0;
require("reflect-metadata");
const VendedorService_1 = require("../services/VendedorService");
const BaseClassController_1 = require("../abstract/BaseClassController");
const VendedorJoi_1 = require("../joi/VendedorJoi");
const Vendedor_1 = require("../class/Vendedor");
const OrmDataSource_1 = require("../conf/OrmDataSource");
const typeorm_1 = require("typeorm");
class VendedorController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/vendedor');
        this.indexFilters = ["nombre", "apellido", 'edad'];
        this._vendedor = new VendedorService_1.VendedorService('vendedores', this.indexFilters);
        this.vendedorJoi = new VendedorJoi_1.VendedorJoi();
        this.router.get('/vendedorO', this.indexORM);
    }
    get _service() {
        return this._vendedor;
    }
    get joi() {
        return this.vendedorJoi;
    }
    indexORM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendedores = yield OrmDataSource_1.OrmDataSource.manager.find(Vendedor_1.Vendedor, { where: { edad: (0, typeorm_1.MoreThanOrEqual)(24) } });
            res.send(vendedores);
        });
    }
}
exports.VendedorController = VendedorController;
//# sourceMappingURL=VendedorController.js.map