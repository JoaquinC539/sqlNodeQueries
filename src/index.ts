import { App } from "./App";
import { DbConf } from "./conf/DbConf";
require('dotenv').config();

class Index{
    private port:number=3500;
    private app:App
    private dbConf:DbConf
    constructor(port:string|number| undefined){
        this.port=Number(port);
        this.app=new App();
        this.dbConf=new DbConf();
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
            .catch((err)=>{
                console.error(err)
            });
        })
        .catch((error)=>{console.error(error)})
    }
 
 
}

const index:Index=new Index(process.env.PORT);
index.connect();
