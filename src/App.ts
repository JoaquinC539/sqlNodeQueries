import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
const cors =require('cors')
import { Routes } from './routes/Routes';
import { Cors } from './conf/Cors';

export class App{
    private express:any=express();
    private port:number | string | undefined=3500;
    private routes:Routes=new Routes();
    private cors:Cors=new Cors();

    constructor(){
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use(bodyParser.json());
        this.express.use(cors(this.cors));
        this.express.use('/api',this.routes.routes);

    }

    public getPort():number{
        return Number(this.port);
    }

    public serverCreate(port:number):Promise<unknown>{
        return new Promise<void>((resolve,reject)=>{
            try {
                this.express.listen(port,()=>{
                    console.log("Server listenting at localhost:"+port);
                    resolve();
                      });  
            } catch (error) {
                reject(error);
            }
            });
    }
}