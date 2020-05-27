import Server from './clases/server';
import { SERVER_PORT, DB_URL} from './global/environment';
import bodyparser from 'body-parser';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';



const server = new Server ();

///////// BODY - PARSER //////////

server.app.use(bodyparser.urlencoded({extended:true}));
server.app.use(bodyparser.json () );

//////////// CORS /////////////////

server.app.use(cors( {origin:true,credentials:true }));

////// IMPORTAR RUTAS //////////////

import unidadRoutes from './rutas/unidad';


//////SETEO DE RUTAS ///////

server.app.use('/unidad',unidadRoutes);

///////// CONEXION A BASE DE DATOS ///////////

mongoose.connect (`mongodb://${DB_URL}`, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true},(err) => {
    if (err) throw err;
    const DB = DB_URL.split ('/');
    const DB_name = DB[DB.length - 1]
    console.log(`Conectado a mi base de datos ${DB_name}`);
});

///////////// ARRANQUE DEL SERVIDOR /////////////

server.start( () =>{
    console.log(`Servidor corriendo en ${ SERVER_PORT }`);
});
  
