import { VendedorService } from "../services/VendedorService";
import { BaseClassController } from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";

export class VendedorController extends BaseClassController{
    public indexFilters: string[]=["nombre","apellido",'edad']
    private _vendedor:VendedorService
    constructor(){
        super('/vendedor');
        this._vendedor=new VendedorService('vendedores',this.indexFilters);
    }
    get _service():BaseClassService{
        return this._vendedor
    }
}
