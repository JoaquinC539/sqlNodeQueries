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
exports.BaseClassController = void 0;
const UtilsService_1 = require("../services/UtilsService");
const express_1 = require("express");
class BaseClassController {
    /**
     *
     * @param endpoint Endpoint to be opened to CRUD get, post and put "endpoint/id"
     */
    constructor(endpoint) {
        this._utils = new UtilsService_1.UtilsService();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req = this._utils.setMaxAndOffset(req);
                const data = yield this._service.index(req);
                if (data.error === undefined || data.error === false) {
                    res.status(200).send(data);
                    return;
                }
                if (data.error === true) {
                    res.status(500).send(data);
                    return;
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this._service.get(req)
                .then((data) => {
                res.status(200).send(this._utils.parseGetData(data));
            })
                .catch((error) => {
                res.status(500).send(error);
            });
        });
        this.post = ((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = this.joi.postJoi.validate(req.body);
            if (error) {
                res.status(400).send({ error: true, failure: error });
                return;
            }
            this._service.post(req)
                .then((data) => {
                res.status(200).send(this._utils.parseGetData(data));
            })
                .catch((error) => {
                res.send(error);
            });
        }));
        this.put = ((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = this.joi.putJoi.validate(req.body);
            if (error) {
                res.status(400).send({ error: true, failure: error });
                return;
            }
            this._service.put(req)
                .then((data) => {
                res.status(200).send(this._utils.parseGetData(data));
            })
                .catch((error) => {
                res.send(error);
            });
        }));
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this._service.delete(req)
                .then((data) => {
                res.status(200).send({ success: true, message: `Deleted file with id: ${req.params.id}` });
            })
                .catch((error) => {
                res.send(error);
            });
        });
        this.endpoint = endpoint;
        this.router = (0, express_1.Router)();
        this.router.get(this.endpoint, this.index);
        this.router.get(`${this.endpoint}/`, this.index);
        this.router.post(this.endpoint, this.post);
        this.router.put(`${this.endpoint}/:id`, this.put);
        this.router.get(`${this.endpoint}/:id`, this.get);
        this.router.delete(`${this.endpoint}/:id`, this.delete);
    }
}
exports.BaseClassController = BaseClassController;
//# sourceMappingURL=BaseClassController.js.map