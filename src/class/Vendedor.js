"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendedor = void 0;
const typeorm_1 = require("typeorm");
let Vendedor = class Vendedor {
    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
};
exports.Vendedor = Vendedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vendedor.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendedor.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendedor.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vendedor.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendedor.prototype, "correo_electronico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Vendedor.prototype, "activo", void 0);
exports.Vendedor = Vendedor = __decorate([
    (0, typeorm_1.Entity)({
        name: "vendedores",
        orderBy: { "_id": "DESC" }
    }),
    __metadata("design:paramtypes", [Object])
], Vendedor);
//# sourceMappingURL=Vendedor.js.map