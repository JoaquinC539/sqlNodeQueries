import { Router } from "express";
import { VendedorController } from "../controllers/VendedorController";
import { ClienteController } from "../controllers/ClienteController";
import { ProveedorController } from "../controllers/ProveedorController";
import { ProductoController } from "../controllers/ProductoController";
import { VentaController } from "../controllers/VentasController";
import { InteraccionController } from "../controllers/InteraccionController";

export class Routes{
    public routes:Router=Router();
    private vendedorController:VendedorController=new VendedorController();
    private clienteController:ClienteController=new ClienteController();
    private proveedorController:ProveedorController=new ProveedorController();
    private productoController:ProductoController=new ProductoController();
    private ventaController:VentaController=new VentaController();
    private interaccionController:InteraccionController=new InteraccionController();
    constructor(){
        this.routes.use("/",this.vendedorController.router);
        this.routes.use("/",this.clienteController.router);
        this.routes.use('/',this.proveedorController.router);
        this.routes.use("/",this.productoController.router);
        this.routes.use("/",this.ventaController.router);
        this.routes.use("/",this.interaccionController.router);
    }
}