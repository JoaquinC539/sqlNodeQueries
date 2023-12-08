import { BaseClassController } from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { JoiClass } from "../abstract/JoiClass";
import { VentasJoi } from "../joi/VentasJoi";
import { VentasService } from "../services/VentasService";

export class VentaController extends BaseClassController {
    private _ventas: VentasService;
    public ventasJoi: JoiClass;
    public indexFilters: string[];

    constructor() {
        super('/venta')
        this.indexFilters = ["cliente", "producto", "quantity", "fecha_orden", "vendedor"]
        this._ventas = new VentasService("ventas", this.indexFilters)
        this.ventasJoi = new VentasJoi();
    }

    get _service(): BaseClassService {
        return this._ventas;
    }
    get joi(): JoiClass {
        return this.ventasJoi;
    }
}


