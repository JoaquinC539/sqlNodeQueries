export class Interaccion{
    _id?:number;
    cliente?:number;
    vendedor?:number;
    descripcion?:string;
    comentario?:string;
    constructor(data?:Partial<any>){
        if(data){
            Object.assign(this,data)
        }
    }
}