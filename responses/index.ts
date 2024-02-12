import { Response } from "express"

export const customResponse =async ( res:Response, status:boolean, message:string, data:any, code:number,) => {
    res.json({status, message, data, code })
}