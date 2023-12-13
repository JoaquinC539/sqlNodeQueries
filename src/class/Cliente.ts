import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { InteraccionORM } from "./InteraccionORM";

export interface ICliente{
    _id?:number,
    nombre?:string,
    contacto?:string,
    email?:string,
    direccion?:string
}

@Entity({
    name:"clientes",
    orderBy:{"_id":"DESC"}
})
export class Cliente implements ICliente{
    
    @PrimaryGeneratedColumn()
    // @OneToMany(()=>InteraccionORM,interaccion=>interaccion.vendedor)
    _id?:number;
    
    @Column()
    nombre?: string;
    @Column()
    contacto?: string;
    @Column()
    email?: string;
    @Column()
    direccion?: string;
    

}