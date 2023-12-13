import Joi from "joi";
import { JoiClass } from "../abstract/JoiClass";


export class InteraccionJoi extends JoiClass{
    public postJoi=Joi.object({
        cliente:Joi.number().required(),
        vendedor:Joi.number().min(1).max(1000000).required(),
        comentario:Joi.string().min(3).max(255).optional(),
        descripcion:Joi.string().min(5).max(255).required()
    });

    public putJoi = Joi.object({
        cliente:Joi.number().optional(),
        vendedor:Joi.number().min(1).max(1000000).optional(),
        comentario:Joi.string().min(3).max(18).optional(),
        descripcion:Joi.string().min(5).max(255).optional()
    });

}