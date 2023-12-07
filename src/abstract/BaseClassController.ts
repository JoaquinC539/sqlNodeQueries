import { QueryResult } from "pg";
import { UtilsService } from "../services/UtilsService";
import { Request,Response, Router } from "express";
import { BaseClassService } from "./BaseClassService";

export abstract class BaseClassController{
    public router:Router
    private _utils:UtilsService=new UtilsService();
    abstract _service:BaseClassService
    public endpoint
    constructor(endpoint:string){
        this.endpoint=endpoint
        this.router=Router();
        this.router.get(endpoint,this.index);
        this.router.get(`${endpoint}/` ,this.index);
        this.router.post(endpoint,this.post);
        this.router.put(`${endpoint}/:id`,this.put);
        this.router.get(`${endpoint}/:id`,this.get);
        this.router.delete(`${endpoint}/:id`,this.delete);

    }

    public  index=async (req:Request,res:Response):Promise<void>=>{
        try {
            req=this._utils.setMaxAndOffset(req)
            const data=await this._service.index(req);
            if(data.error===undefined || data.error===false){
                res.status(200).send(data);
                return;
            }
            if(data.error===true){
                res.status(500).send(data);
                return;
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
    public get =async (req:Request,res:Response):Promise<void>=>{
        this._service.get(req)
        .then((data:QueryResult<any>)=>{
            res.status(200).send(this._utils.parseGetData(data))
        })
        .catch((error: any)=>{
            res.status(500).send(error)
        })
    }
    public post=(async (req:Request,res:Response):Promise<void>=>{
        this._service.post(req)
        .then((data: any)=>{
            res.status(200).send(this._utils.parseGetData(data))
        })
        .catch((error: any)=>{
            res.send(error)
        })
    })
    public put =(async (req:Request,res:Response):Promise<void>=>{
        this._service.put(req)
        .then((data: any)=>{
            res.status(200).send(this._utils.parseGetData(data))
        })
        .catch((error: any)=>{
            res.send(error)
        })
    });

    public delete=async (req:Request,res:Response):Promise<void> => {
        this._service.delete(req)
        .then((data:any)=>{
            res.status(200).send({success:true,message:`Deleted file with id: ${req.params.id}`})
        })
        .catch((error: any)=>{
            res.send(error)
        })
    }
}