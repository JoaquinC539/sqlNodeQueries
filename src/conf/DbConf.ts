import { Pool } from 'pg'

export class DbConf{
    public pool:Pool
    
    constructor(){
        this.pool=new Pool({
            user:process.env.DB_USERNAME,
            host:"localhost",
            database:process.env.DB_NAME,
            password:process.env.DB_PASSWORD,
            port:Number(process.env.DB_PORT)
        })
    }
}