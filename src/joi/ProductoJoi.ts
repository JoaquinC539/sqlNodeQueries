import Joi from "joi";
import { JoiClass } from "../abstract/JoiClass";


export class ProductoJoi extends JoiClass{
    public postJoi=Joi.object({
        nombre:Joi.string().min(3).max(50).required(),
        precio:Joi.number().min(20).max(1000000).required(),
        category:Joi.string().min(3).max(18).required(),
        proveedor:Joi.number().required(),
        descripcion:Joi.string().min(5).max(350).required()
    });

    public putJoi = Joi.object({
        nombre: Joi.string().min(3).max(50).optional(),
        precio: Joi.number().min(20).max(1000000).optional(),
        category: Joi.string().min(3).max(18).optional(),
        proveedor:Joi.number().optional(),
        descripcion: Joi.string().min(5).max(350).optional()
    });

}