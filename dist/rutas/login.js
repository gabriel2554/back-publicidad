"use strict";
////////// LOGIN /////////////
/*import {Router,Request,Response} from 'express';
import Unidad from '../modelos/unidades';
import { nombre_DB } from '../global/environment';
import {SEED} from ''
import jwd from 'jsonwebtoken';

const loginRoutes = Router ();

loginRoutes.post ('/', (req:Request, res:Response) => {
    const body = req.body;
    Unidad.findOne ({email: body.email} (err:Error, nombre_DB) =>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error en la base de datos',
                error:err
            });
        }
        if (!nombre_DB) {
            return res.status(404).json ({
                ok:false,
                mensaje: 'La unidad no existe'
            });
        }
        if

    })
})
/** */ 
