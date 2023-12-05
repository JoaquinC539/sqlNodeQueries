import { Router } from "express";

export class Routes{
    public routes:Router=Router();

    constructor(){
        this.routes.get('/test',(req,res)=>{
            res.json({message:"test"})
        })
    }
}