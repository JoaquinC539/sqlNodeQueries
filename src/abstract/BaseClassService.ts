import { Request } from "express";
import { Pool, QueryResult } from "pg";
import { DbConf } from "../conf/DbConf";
import { JSONObject, UtilsService } from "../services/UtilsService";
export interface Filter{
    tableField:string,
    value:string
}


export abstract class BaseClassService{
    private pool:Pool=(new DbConf()).pool;
    private _utils:UtilsService=new UtilsService();
    public indexFilters:string[];
    public  table:string
    constructor(table:string,indexFilters:string[]){
        this.table=table;
        this.indexFilters=indexFilters
    }

    public index:Function = async (req:Request):Promise<any>=>{
        try {
            let queryCount:string=` SELECT COUNT(*) FROM ${this.table}`;
            let queryRow:string=` SELECT * FROM ${this.table} `;
            let queryParameters:JSONObject={...req.query};
            delete queryParameters["max"];
            delete queryParameters["offset"];
            const queryParametersKeys:Array<string>=Object.keys(queryParameters);
            const queryParametersLength:number=Object.keys(queryParameters).length
            if(queryParametersLength>0 ){
                for(let i=0;i<queryParametersLength;i++){
                    const filterKey=this.indexFilters.find((element)=>element===queryParametersKeys[i]);
                    if(filterKey!==undefined){
                        if(this._utils.verifyReqExistData(req.query[filterKey])){
                            const value:string|number|boolean=this._utils.parseValue(req.query[filterKey] as string)
                            switch(typeof value){
                                case 'string':
                                    if(i===0){
                                        queryCount += ` WHERE ${filterKey} ILIKE '${value}%'`;
                                        queryRow += ` WHERE ${filterKey} ILIKE '${value}%'`;
                                    }else{
                                        queryRow+=" AND";
                                        queryCount+=" AND";
                                        queryCount += `  ${filterKey} ILIKE '${value}%'`;
                                        queryRow += ` ${filterKey} ILIKE '${value}%'`;
                                    }
                                    break;
                                case "number":
                                    if(i===0){
                                        queryCount += ` WHERE ${filterKey} BETWEEN ${value-value*0.1} AND ${value+value*0.1}`;
                                        queryRow += ` WHERE ${filterKey} BETWEEN ${value-value*0.1} AND ${value+value*0.1}`;
                                    }else{
                                        queryRow+=" AND";
                                        queryCount+=" AND";
                                        queryCount += `  ${filterKey} BETWEEN ${value-value*0.1} AND ${value+value*0.1}`;
                                        queryRow += ` ${filterKey} BETWEEN ${value-value*0.1} AND ${value+value*0.1}`;
                                    }
                                    break;
                                case "boolean":
                                    if(i===0){
                                        queryCount += ` WHERE ${filterKey} IS ${value}`;
                                        queryRow += ` WHERE ${filterKey} IS ${value}`;
                                    }else{
                                        queryRow+=" AND";
                                        queryCount+=" AND";
                                        queryCount += `  ${filterKey} IS ${value}`;
                                        queryRow += ` ${filterKey} IS ${value}`;
                                    }
                                    break;
                            }
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
            queryRow+=' ORDER BY _id DESC';
            if(req.query.max !==undefined && req.query.offset !==undefined){
                queryRow+=` LIMIT ${req.query.max} OFFSET ${req.query.offset}`
            }
            let count:QueryResult<any>=await this.pool.query(queryCount);
            let row:QueryResult<any>=await this.pool.query(queryRow)
            return this._utils.setIndexResponse(count.rows[0].count,row.rows)
                  
        } catch (error) {
                return({error:true,failure:error})
            }
        
    }

    public get:Function =async (req:Request):Promise<any>=>{
        try {
            if(!req.params.id){
                return new Promise((resolve,reject)=>{
                    reject({error:true,failure:'No id provided'})
                })
            }
            let query:string=`SELECT * FROM ${this.table} WHERE _id=${Number(req.params.id)}`;
            return this.pool.query(query);
        } catch (error) {
           return new Promise((resolve,reject)=>{
                reject({error:true,failure:error})
            })
        }
    }

    public post:Function=async (req:Request):Promise<any>=>{
        try {
            let data:JSONObject= req.body;
            let columns:Array<string>=Object.keys(data);
            let values:Array<number|boolean|string|null|undefined>=Object.values(data);
            let indexes:Array<string>=values.map((value,index)=>"$"+String(Number(index+1)));
            let query:string=`INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${indexes.join(', ')}) RETURNING *`;
            return this.pool.query(query,values);
        } catch (error) {
           return new Promise((resolve,reject)=>{
                reject({error:true,failure:error})
            })
        }
    }
    public put:Function=async (req:Request):Promise<any>=>{
        try {
            if(!req.params.id){
                return new Promise((resolve,reject)=>{
                    reject({error:true,failure:'No id provided'})
                })
            }
            let data:JSONObject= req.body;
            let sets:string[]=[]
            for(let key in data){
                sets.push(`${key} = '${data[key]}'`)
            }
            let query:string=` UPDATE ${this.table} SET ${sets.join(', ')} WHERE _id = ${Number(req.params.id)} RETURNING *`
            return this.pool.query(query);
            
        } catch (error) {
            return new Promise((resolve,reject)=>{
                reject({error:true,failure:error});
            });
        }
    }
    public delete:Function=async (req:Request):Promise<any> => {
        try {
            if(!req.params.id){
                return new Promise((resolve,reject)=>{
                    reject({error:true,failure:'No id provided'})
                })
            }
            let query:string=` DELETE FROM ${this.table} WHERE _id=${Number(req.params.id)}`
            return this.pool.query(query);
        } catch (error) {
            return new Promise((resolve,reject)=>{
                reject({error:true,failure:error});
            });
        }
    }
}
