import mongoose = require("mongoose");
import {IInterventor, getInterventor} from "./Interventores"
import {connectMongoDB} from "./helpers"

interface IBeneficiarios extends mongoose.Document { 
    nombre: string;
    Id: number;
    Edad: number;
    Ocupacion: string;
    Direccion: string;
    interventor: IInterventor
}

const BeneficiarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    Id: {type: Number, required: true},
    Edad: {type: Number, required: true},
   Ocupacion: {type: String, required: true},
   Direccion: {type: String, required: true},
    interventor: { type: mongoose.Schema.Types.ObjectId, ref: "Interventor" }
});


export const Beneficiario = mongoose.model<IBeneficiarios>("Beneficiario", BeneficiarioSchema);

export const CreateBeneficiario = async function(nombreInterventor:string,nombre:string, Id:number,Edad:number,Ocupacion:string,Direccion:string){
    //Conectar con la base de datos
    await connectMongoDB;
    //Obtener el proveedor en funcion del nombre
    const int:any = await getInterventor(nombreInterventor);

    //persistencia de nuestro producto
    const b = new Beneficiario();
    b.nombre = nombre;
    b.Id = Id;
    b.Edad = Edad;
    b.Ocupacion =  Ocupacion;
    b.Direccion = Direccion;
    b.interventor = int;

    b.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(b);
        }
    });
}

