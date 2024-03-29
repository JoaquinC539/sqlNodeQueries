import { BaseClassController} from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { JoiClass } from "../abstract/JoiClass";
import { ClienteService } from "../services/ClienteService";
import { ClienteJoi } from "../joi/ClienteJoi";
import { OrmDataSource } from "../conf/OrmDataSource";
import { Cliente, ICliente } from "../class/Cliente";
import { Request, Response } from "express";

export class ClienteController extends BaseClassController{
    private _cliente:ClienteService;
    public clienteJoi:JoiClass;
    public indexFilters: string[];

    constructor(){
        super('/cliente')
        this.indexFilters=["nombre","contacto","email","direccion"]
        this._cliente=new ClienteService("clientes",this.indexFilters)
        this.clienteJoi=new ClienteJoi();
        this.router.get("/clienteO",this.indexORM);
    }

    get _service():BaseClassService{
        return this._cliente;
    }
    get joi():JoiClass{
        return this.clienteJoi;
    }
    public indexORM(req:Request,res:Response):void{
        const clienteRepository=OrmDataSource.getRepository(Cliente);
        clienteRepository.find()
        // OrmDataSource.manager.find(Cliente)
        .then((data:ICliente[])=>{
            res.send(data);
        })
    }


}