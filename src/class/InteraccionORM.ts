import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";

@Entity({
    name:"interacciones"
})
export class InteraccionORM{
    @PrimaryGeneratedColumn()
    _id?:number;
    @Column()
    cliente?:number;
    @Column()
    vendedor?:number;
    @Column()
    descripcion?:string;
    @Column()
    comentario?:string;
    constructor(data?:Partial<any>){
        if(data){
            Object.assign(this,data)
        }
    }
}
