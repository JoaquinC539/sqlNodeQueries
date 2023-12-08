import { BaseClassController} from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { JoiClass } from "../abstract/JoiClass";
import { ProveedorJoi } from "../joi/ProveedorJoi";
import { ProveedorService } from "../services/ProveedorService";

export class ProveedorController extends BaseClassController{
    private _proveedor:ProveedorService;
    public proveedorJoi:JoiClass;
    public indexFilters: string[];

    constructor(){
        super('/proveedor')
        this.indexFilters=["nombre","contacto","email","direccion"]
        this._proveedor=new ProveedorService("proveedores",this.indexFilters)
        this.proveedorJoi=new ProveedorJoi();
    }

    get _service():BaseClassService{
        return this._proveedor;
    }
    get joi():JoiClass{
        return this.proveedorJoi;
    }

}