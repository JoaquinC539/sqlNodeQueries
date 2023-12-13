import "reflect-metadata"
import { VendedorService } from "../services/VendedorService";
import { BaseClassController} from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { VendedorJoi } from "../joi/VendedorJoi";
import { JoiClass } from "../abstract/JoiClass";
import { Request, Response } from "express";
import { Vendedor } from "../class/Vendedor";
import { OrmDataSource } from "../conf/OrmDataSource";
import { MoreThanOrEqual } from "typeorm";


export class VendedorController extends BaseClassController{
    public vendedorJoi: JoiClass;
    public indexFilters: string[]
    private _vendedor:VendedorService
    constructor(){
        super('/vendedor');
        this.indexFilters=["nombre","apellido",'edad']
        this._vendedor=new VendedorService('vendedores',this.indexFilters);
        this.vendedorJoi=new VendedorJoi();
        this.router.get('/vendedorO',this.indexORM)
    }
    get _service():BaseClassService{
        return this._vendedor
    }
    get joi():JoiClass{
        return this.vendedorJoi
    }
    public async indexORM(req:Request,res:Response):Promise<void>{
        const vendedores=await OrmDataSource.manager.find(Vendedor,{where:{edad:MoreThanOrEqual(24)}})
        res.send(vendedores)
    }
    
}
