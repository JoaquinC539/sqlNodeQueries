"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
class Routes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.routes.get('/test', (req, res) => {
            res.json({ message: "test" });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map