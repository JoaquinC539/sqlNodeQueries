"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const JoiClass_1 = require("../abstract/JoiClass");
class ProductoJoi extends JoiClass_1.JoiClass {
    constructor() {
        super(...arguments);
        this.postJoi = joi_1.default.object({
            nombre: joi_1.default.string().min(3).max(50).required(),
            precio: joi_1.default.number().min(20).max(1000000).required(),
            category: joi_1.default.string().min(3).max(18).required(),
            proveedor: joi_1.default.number().required(),
            descripcion: joi_1.default.string().min(5).max(350).required()
        });
        this.putJoi = joi_1.default.object({
            nombre: joi_1.default.string().min(3).max(50).optional(),
            precio: joi_1.default.number().min(20).max(1000000).optional(),
            category: joi_1.default.string().min(3).max(18).optional(),
            proveedor: joi_1.default.number().optional(),
            descripcion: joi_1.default.string().min(5).max(350).optional()
        });
    }
}
exports.ProductoJoi = ProductoJoi;
//# sourceMappingURL=ProductoJoi.js.map