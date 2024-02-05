import { Response } from "express"

export const customerResponse =async ( res:Response, status:boolean, message:string, data:any, code:number,) => {
    res.json({status, message, data, code })
}