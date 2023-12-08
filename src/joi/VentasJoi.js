"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentasJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const JoiClass_1 = require("../abstract/JoiClass");
class VentasJoi extends JoiClass_1.JoiClass {
    constructor() {
        super(...arguments);
        this.postJoi = joi_1.default.object({
            cliente: joi_1.default.number().required(),
            producto: joi_1.default.number().required(),
            quantity: joi_1.default.number().required(),
            fecha_orden: joi_1.default.date().required(),
            vendedor: joi_1.default.number().required()
        });
        this.putJoi = joi_1.default.object({
            cliente: joi_1.default.number().optional(),
            producto: joi_1.default.number().optional(),
            quantity: joi_1.default.number().optional(),
            fecha_orden: joi_1.default.date().optional(),
            vendedor: joi_1.default.number().optional()
        });
    }
}
exports.VentasJoi = VentasJoi;
//# sourceMappingURL=VentasJoi.js.map