import { BaseClassController} from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { JoiClass } from "../abstract/JoiClass";
import { ProductoJoi } from "../joi/ProductoJoi";
import { ProductoService } from "../services/ProductoService";

export class ProductoController extends BaseClassController{
    private _producto:ProductoService;
    public productoJoi:JoiClass;
    public indexFilters: string[];

    constructor(){
        super('/producto')
        this.indexFilters=["nombre","precio","category","descripcion"]
        this._producto=new ProductoService("productos",this.indexFilters)
        this.productoJoi=new ProductoJoi();
    }

    get _service():BaseClassService{
        return this._producto;
    }
    get joi():JoiClass{
        return this.productoJoi;
    }

}