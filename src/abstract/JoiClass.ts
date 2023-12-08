import { ObjectSchema } from "joi";

export abstract class JoiClass{
    abstract postJoi:ObjectSchema;
    abstract putJoi:ObjectSchema;
}