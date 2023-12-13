require('dotenv').config();
import { DataSource } from "typeorm";
import "reflect-metadata";
import { Vendedor } from "../class/Vendedor";
import { Cliente } from "../class/Cliente";
import { InteraccionORM } from "../class/InteraccionORM";
export const OrmDataSource=new DataSource({
    type:"postgres",
    username:process.env.DB_USERNAME,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:Number(process.env.DB_PORT),
    entities:[Vendedor,Cliente,InteraccionORM]

})