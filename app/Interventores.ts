import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IInterventor extends mongoose.Document { 
    nombre: string;
    id: number;
    contraseña: string;
    direccion:string;
    telefono: number
}

const InterventorSchema = new mongoose.Schema({
    nombre: {type:String,required:true},
    id: {type:Number,required: true},
    contraseña:{type:String, required: true},
    direccion: {type:String,required: true},
    telefono: {type:Number,required: true}

});

export const Interventor = mongoose.model<IInterventor>("Interventor", InterventorSchema);


export const CreateInterventor = async function(nombre: string,id:number,contraseña:string, direccion: string,telefono : number){
    await connectMongoDB;
   
    const newOne = new Interventor();
    newOne.nombre = nombre;
    newOne.id = id;
    newOne.contraseña = contraseña;
    newOne.direccion = direccion;
    newOne.telefono = telefono;

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getInterventor(_nombre: string):Promise<any>{
    return new Promise<any>( resolve => {
        Interventor.findOne({ nombre:_nombre}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}


