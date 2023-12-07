import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

export interface IVendedor{
    id:number,
    first_name:string,
    last_name:string,
    email:string
}


export class vendedor{
    
    id?:number;

    
    first_name?:string;

    last_name?:string;

    email?:string;

    constructor(data?:Partial<any>){
        if(data){
            Object.assign(this,data)
        }
    }
}