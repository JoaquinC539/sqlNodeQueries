import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { InteraccionORM } from "./InteraccionORM";

export interface IVendedor{
    _id?:number ,
    nombre?:string ,
    apellido?:string ,
    edad?:number,
    correo_electronico?:string,
    activo?:boolean 
}

@Entity({
    name:"vendedores",
    orderBy:{"_id":"DESC"}
})
export class Vendedor implements IVendedor{
    // @OneToMany(()=>InteraccionORM,interaccion=>interaccion.vendedor)
    @PrimaryGeneratedColumn()
    _id?:number;
    @Column()
    nombre?:string;
    @Column()
    apellido?: string;
    @Column()
    edad?:number;
    @Column()
    correo_electronico?:string;
    @Column()
    activo?:boolean;

    constructor(data?:Partial<any>){
        if(data){
            Object.assign(this,data)
        }
    }
}