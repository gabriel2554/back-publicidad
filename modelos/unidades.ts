import { Schema,  Document} from 'mongoose';
import mongoose from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUnidad extends Document {
    ruta:string;
    placas:string;
    Numeconomico:string;
    organizacion:string;
    identificador:string;
    MDVR:string;
    rol:string;
}

const rolesValidos = {
    values: ['ADMIN_ROL', 'DRIVER_ROL'],
    message: '{value} no es un rol valido'
}

const unidadSchema: Schema = new Schema({
    ruta: { type: String },
    placas: {type: String, uppercase:true },
    Numeconomico: {type: String },
    organizacion: {type: String,required:[true,'La organizacion es requerida']},
    identificador: {type: Number},
    MDVR: {type: String },
    rol: {type:String, enum:rolesValidos,default:'ADMIN_ROL'},
},{ collection: 'unidades'} );

unidadSchema.plugin( mongooseUniqueValidator, {message: `{ PATH } debe ser unico`});
export default mongoose.model<IUnidad>( 'Unidad', unidadSchema )