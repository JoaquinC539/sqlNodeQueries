import { Router } from "express";
import { VendedorController } from "../controllers/VendedorController";

export class Routes{
    public routes:Router=Router();
    private vendedorController:VendedorController=new VendedorController();
    constructor(){
        this.routes.use("/",this.vendedorController.router)
    }
}