import Joi from "joi";
import { JoiClass } from "../abstract/JoiClass";


export class VendedorJoi extends JoiClass{
    
    
    public postJoi=Joi.object({
        nombre:Joi.string().min(3).max(15).required(),
        apellido:Joi.string().min(3).max(15).required(),
        edad:Joi.number().min(15).max(100).required(),
        correo_electronico:Joi.string().email({tlds:{allow:false}}).required()
    });

    public putJoi=Joi.object({
        nombre:Joi.string().min(3).max(15).optional(),
        apellido:Joi.string().min(3).max(15).optional(),
        edad:Joi.number().min(15).max(100).optional(),
        correo_electronico:Joi.string().email({tlds:{allow:false}}).optional()
    });

}

