import { ObjectSchema } from "joi";
import { BaseClassService } from "../abstract/BaseClassService";


export class InteraccionService extends BaseClassService{

    constructor(table:string,indexFilters:string[],joiSchema?:ObjectSchema){
        super(table,indexFilters,joiSchema);
    }
}