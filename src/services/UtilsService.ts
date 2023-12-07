import { Request } from "express";
import { QueryResult } from "pg";

export interface IndexResult{
    results:Array<{[key:string]:any}>,
    count:Array<{count:number|string}>
}
export type JSONObject={[key:string]:any}

export class UtilsService{
    public clavificar(nombre:string):string{
        nombre=nombre.normalize('NFD');
        nombre=nombre.replace(/[\u0300-\u036f]/g,"");
        return nombre;
    }
    public paginateArray(items:Array<any>,max:string|number|undefined,offset:string|number|undefined):Array<any>{
        max=max!==undefined?max:15;
        offset=offset!==undefined?offset:0;
        return items.slice(Number(offset),Number(offset)+Number(max))
    }

    public setMaxAndOffset(req:Request):Request{
        if(req.query.max===undefined){
            req.query.max="15";
        }
        if(req.query.offset===undefined){
            req.query.offset="0"
        }
        return req
    }
    public setIndexResponse=(count:number|string,rows:Array<any>):Array<IndexResult>=>{
        let result:Array<IndexResult>=[
            {
                results:rows,
                count:[{count:count}]
            }
        ]
        return result;
    }
    public verifyReqExistData(value:any):boolean{
        if(value===undefined){
            return false;
        }
        
        if(value!==undefined && value!=='null' && value!=='' && value!=null && value!=='undefined'){
            return true;
        }else{
            return false;
        }
    }
    public parseGetData(data:QueryResult<any>):Object{
        return data.rows[0];
    }
    public parseValue(value:string):string|boolean|number {
        if (!isNaN(Number(value))) {
            return Number(value); 
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            return Boolean(value)
        } else {
            return value;
        }
    }
    
}