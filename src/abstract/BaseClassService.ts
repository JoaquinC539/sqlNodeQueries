import { Request } from "express";
import { Pool, QueryResult } from "pg";
import { DbConf } from "../conf/DbConf";
import { JSONObject, UtilsService } from "../services/UtilsService";
import { ObjectSchema } from "joi";
export interface Filter{
    tableField:string,
    value:string
}

/**
 * @table Table of the database
 * @indexFilters Filters of columns of the table to be able to be filtered
 * @joiSchema Schema necesary but optional to create tables with a default schema base on data types 
 */
export abstract class BaseClassService{
    private pool:Pool=(new DbConf()).pool;
    private _utils:UtilsService=new UtilsService();
    public indexFilters:string[];
    public  table:string
    private joiSchema:ObjectSchema| undefined

    /**
     * 
     * @param table Table of the database
     * @param indexFilters Filters of columns of the table to be able to be filtered
     * @param joiSchema Schema necesary but optional to create tables with a default schema base on data types
     */
    constructor(table:string,indexFilters:string[],joiSchema?:ObjectSchema){
        this.table=table;
        this.indexFilters=indexFilters;
        this.joiSchema=joiSchema;
        this.checkAndCreateTable();
    }
/**
 * 
 * @param req request of http
 * @returns query promise
 */
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
            
            let query:string=`SELECT * FROM ${this.table} WHERE _id=$1`;
            return this.pool.query(query,[Number(req.params.id)]);
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
            let values:any[]=[];
            let i=1;
            for(let key in data){
                sets.push(`${key} = $${i}`);
                values.push(data[key]);
                i++;

            }
            values.push(Number(req.params.id));
            let query:string=` UPDATE ${this.table} SET ${sets.join(', ')} WHERE _id = $${i} RETURNING *`;
            return this.pool.query(query,values);
            
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
            let query:string=` DELETE FROM ${this.table} WHERE _id=$1`
            return this.pool.query(query,[Number(req.params.id)]);
        } catch (error) {
            return new Promise((resolve,reject)=>{
                reject({error:true,failure:error});
            });
        }
    }

    /**
     * 
     * @returns Check if a table exists in the db, if not create a table with a schema template based on the joi schema
     */
    private checkAndCreateTable:Function=async():Promise<any>=>{
        if(this.joiSchema===undefined){
            return;
        }else{
            let query:string=`CREATE TABLE IF NOT EXISTS ${this.table} (`
            query+= `_id SERIAL PRIMARY KEY,`
            const joiDetails=this.joiSchema.describe().keys;
            for (const key in joiDetails){
                const dataType:string=joiDetails[key].type
                let typeSQL:string;
                switch (dataType){
                    case 'number':
                        typeSQL='INT';
                        break;
                    case 'string':
                        typeSQL="VARCHAR(255)";
                        break;
                    case 'boolean':
                        typeSQL="BOOLEAN";
                        break;
                    default:
                        typeSQL ="VARCHAR(255)";
                        break;
                }
                query+=` ${key} ${typeSQL},`
            }
            query=query.slice(0,-1);
            query+=")"
            this.pool.query(query)
            .then(()=>{
                return;
            })
            
        }
    }
}
