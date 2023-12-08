import Joi from "joi";
import { JoiClass } from "../abstract/JoiClass";

export class VentasJoi extends JoiClass {
    public postJoi = Joi.object({
        cliente: Joi.number().required(),
        producto: Joi.number().required(),
        quantity: Joi.number().required(),
        fecha_orden: Joi.date().required(),
        vendedor: Joi.number().required()
    });

    public putJoi = Joi.object({
        cliente: Joi.number().optional(),
        producto: Joi.number().optional(),
        quantity: Joi.number().optional(),
        fecha_orden: Joi.date().optional(),
        vendedor: Joi.number().optional()
    });
}
