import Joi from "joi";
import { JoiClass } from "../abstract/JoiClass";


export class ProveedorJoi extends JoiClass{
    public postJoi=Joi.object({
        nombre:Joi.string().min(3).max(15).required(),
        contacto:Joi.string().min(3).max(15).required(),
        direccion:Joi.string().min(15).max(100).required(),
        email:Joi.string().email({tlds:{allow:false}}).required()
    });

    public putJoi=Joi.object({
        nombre:Joi.string().min(3).max(15).optional(),
        contacto:Joi.string().min(3).max(15).optional(),
        direccion:Joi.number().min(15).max(100).optional(),
        email:Joi.string().email({tlds:{allow:false}}).optional()
    });

}