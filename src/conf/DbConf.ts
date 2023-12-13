import { Pool } from 'pg'
require('dotenv').config();
export class DbConf{
    public pool:Pool
    
    constructor(){
        this.pool=new Pool({
            user:process.env.DB_USERNAME,
            host:process.env.DB_HOST,
            database:process.env.DB_NAME,
            password:process.env.DB_PASSWORD,
            port:Number(process.env.DB_PORT)
        })
    }
}