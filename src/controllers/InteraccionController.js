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
exports.InteraccionController = void 0;
const OrmDataSource_1 = require("../conf/OrmDataSource");
const InteraccionORM_1 = require("../class/InteraccionORM");
const InteraccionJoi_1 = require("../joi/InteraccionJoi");
const BaseClassController_1 = require("../abstract/BaseClassController");
const InteraccionService_1 = require("../services/InteraccionService");
class InteraccionController extends BaseClassController_1.BaseClassController {
    constructor() {
        super('/interaccion');
        this.indexORM = (req, res) => __awaiter(this, void 0, void 0, function* () {
            OrmDataSource_1.OrmDataSource.manager.find(InteraccionORM_1.InteraccionORM)
                .then((data) => {
                res.send(data);
            });
        });
        this.postORM = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = this.interaccionJoi.postJoi.validate(req.body);
            if (error) {
                res.send(error);
                return;
            }
            const interaccion = new InteraccionORM_1.InteraccionORM();
            interaccion.vendedor = req.body.vendedor;
            interaccion.cliente = req.body.cliente;
            interaccion.descripcion = req.body.descripcion;
            OrmDataSource_1.OrmDataSource.manager.save(interaccion)
                .then((data) => {
                res.send(data);
            });
        });
        this.indexFilters = [];
        this.router.get('/interaccionO', this.indexORM);
        this.router.post('/interaccionO', this.postORM);
        this.interaccionJoi = new InteraccionJoi_1.InteraccionJoi();
        this._interaccion = new InteraccionService_1.InteraccionService('interacciones', this.indexFilters, this.interaccionJoi.postJoi);
    }
    get joi() {
        return this.interaccionJoi;
    }
    get _service() {
        return this._interaccion;
    }
}
exports.InteraccionController = InteraccionController;
//# sourceMappingURL=InteraccionController.js.map