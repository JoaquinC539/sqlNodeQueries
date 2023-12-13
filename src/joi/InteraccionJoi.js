"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteraccionJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const JoiClass_1 = require("../abstract/JoiClass");
class InteraccionJoi extends JoiClass_1.JoiClass {
    constructor() {
        super(...arguments);
        this.postJoi = joi_1.default.object({
            cliente: joi_1.default.number().required(),
            vendedor: joi_1.default.number().min(1).max(1000000).required(),
            comentario: joi_1.default.string().min(3).max(255).optional(),
            descripcion: joi_1.default.string().min(5).max(255).required()
        });
        this.putJoi = joi_1.default.object({
            cliente: joi_1.default.number().optional(),
            vendedor: joi_1.default.number().min(1).max(1000000).optional(),
            comentario: joi_1.default.string().min(3).max(18).optional(),
            descripcion: joi_1.default.string().min(5).max(255).optional()
        });
    }
}
exports.InteraccionJoi = InteraccionJoi;
//# sourceMappingURL=InteraccionJoi.js.map