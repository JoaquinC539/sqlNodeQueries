import { Request, Response, Router } from "express";
import { OrmDataSource } from "../conf/OrmDataSource";
import { InteraccionORM } from "../class/InteraccionORM";
import { JoiClass } from "../abstract/JoiClass";
import { InteraccionJoi } from "../joi/InteraccionJoi";
import { BaseClassController } from "../abstract/BaseClassController";
import { BaseClassService } from "../abstract/BaseClassService";
import { InteraccionService } from "../services/InteraccionService";
import { Interaccion } from "../class/Interaccion";
import { Pool, QueryResult } from "pg";
import { DbConf } from "../conf/DbConf";


export class InteraccionController extends BaseClassController{
    indexFilters: string[];
    public interaccionJoi:JoiClass;
    private _interaccion:BaseClassService

    constructor(){
        super('/interaccion')
        this.indexFilters=[]
        this.router.get('/interaccionO',this.indexORM)
        this.router.post('/interaccionO',this.postORM)
        this.interaccionJoi=new InteraccionJoi()
        this._interaccion=new InteraccionService('interacciones',this.indexFilters,this.interaccionJoi.postJoi)
    }
    get joi(){
        return this.interaccionJoi;
    }
    get _service(){
        return this._interaccion;
    }

    public indexORM=async (req:Request,res:Response)=>{
        OrmDataSource.manager.find(InteraccionORM)
        .then((data)=>{
            res.send(data)
        })
        
    }
    public postORM=async(req:Request,res:Response)=>{
        const {error}=this.interaccionJoi.postJoi.validate(req.body);
        if(error){res.send(error);return;}
        const interaccion=new InteraccionORM();
        interaccion.vendedor=req.body.vendedor;
        interaccion.cliente=req.body.cliente;
        interaccion.descripcion=req.body.descripcion;
        OrmDataSource.manager.save(interaccion)
        .then((data:any)=>{
            res.send(data)
        })
    }
   
}