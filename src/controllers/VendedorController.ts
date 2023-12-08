import { VendedorService } from "../services/VendedorService";
import { BaseClassController} from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { VendedorJoi } from "../joi/VendedorJoi";
import { JoiClass } from "../abstract/JoiClass";


export class VendedorController extends BaseClassController{
    public vendedorJoi: JoiClass;
    public indexFilters: string[]
    private _vendedor:VendedorService
    constructor(){
        super('/vendedor');
        this.indexFilters=["nombre","apellido",'edad']
        this._vendedor=new VendedorService('vendedores',this.indexFilters);
        this.vendedorJoi=new VendedorJoi();
    }
    get _service():BaseClassService{
        return this._vendedor
    }
    get joi():JoiClass{
        return this.vendedorJoi
    }
    
}
