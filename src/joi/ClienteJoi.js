"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const JoiClass_1 = require("../abstract/JoiClass");
class ClienteJoi extends JoiClass_1.JoiClass {
    constructor() {
        super(...arguments);
        this.postJoi = joi_1.default.object({
            nombre: joi_1.default.string().min(3).max(15).required(),
            contacto: joi_1.default.string().min(3).max(15).required(),
            direccion: joi_1.default.string().min(15).max(100).required(),
            email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
            activo: joi_1.default.boolean().required()
        });
        this.putJoi = joi_1.default.object({
            nombre: joi_1.default.string().min(3).max(15).optional(),
            contacto: joi_1.default.string().min(3).max(15).optional(),
            direccion: joi_1.default.number().min(15).max(100).optional(),
            email: joi_1.default.string().email({ tlds: { allow: false } }).optional(),
            activo: joi_1.default.boolean().required()
        });
    }
}
exports.ClienteJoi = ClienteJoi;
//# sourceMappingURL=ClienteJoi.js.map