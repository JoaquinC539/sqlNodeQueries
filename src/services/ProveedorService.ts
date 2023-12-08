import { BaseClassService } from "../abstract/BaseClassService";

/**
 * @table Table of the database
 * @indexFilters Filters of columns of the table to be able to be filtered
 */
export class ProveedorService extends BaseClassService{
    constructor(table:string,indexFilters:string[]){
        super(table,indexFilters);
    }
}