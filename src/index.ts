import { DataSource } from "typeorm";
import { App } from "./App";
import { DbConf } from "./conf/DbConf";
import { OrmDataSource } from "./conf/OrmDataSource";
import "reflect-metadata";
require('dotenv').config();

class Index{
    private port:number=3500;
    private app:App
    private dbConf:DbConf
    private ORM:DataSource
    constructor(port:string|number| undefined){
        this.port=Number(port);
        this.app=new App();
        this.dbConf=new DbConf();
        this.ORM=OrmDataSource
        
    }
    public getPort():number{
    return Number(this.port);
    }
    public connect(){
        this.app.serverCreate(this.getPort())
        .then(()=>{
            this.dbConf.pool.connect()
            .then(()=>{
                console.log("Postgre connection successful")
            })
            this.ORM.initialize()
            .then(()=>{
                console.log("Data source has been initiallized! ")
            })
            .catch((err)=>{
                console.error(err)
            });//
        })
        .catch((error)=>{console.error(error)})
    }
 
 
}

const index:Index=new Index(process.env.PORT);
index.connect();
