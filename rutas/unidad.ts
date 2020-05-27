import { Request, Response, Router } from 'express';
import Unidad, { IUnidad } from '../modelos/unidades';
//import bcrypt from 'bcrypt';
//import verificatoken from '../middlewares/authentication';

const unidadRoutes = Router ();

unidadRoutes.post('/',(req: Request, res: Response ) => {
    
    const body: IUnidad = req.body;
    const unidad = new Unidad ({
        ruta:body.ruta,
        placas:body.placas,
        Numeconomico:body.Numeconomico,
        organizacion:body.organizacion,
        identificador:body.identificador,
        MDVR:body.MDVR,
        rol: body.rol,
    });

    unidad.save(( err:any, unidadGuadada) =>{
        if (err) {
            return res.status(500).json ({
                ok:false,
                mensaje:'error en la base de datos',
                err:err,
            });
        }
        console.log(unidad);

        res.status(200).json({
            ok:true,
            mensaje: 'unidad guardada',
            unidad: unidadGuadada
        });
    });

});

unidadRoutes.get('/', (req:Request, res:Response) =>{

    Unidad.find( (err:Error, unidadDB) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        return res.status(200).json({
            ok:true,
            unidad: unidadDB
        })
    });
});

unidadRoutes.put('/', (req:Request, res: Response) => {
    const id = req.headers.id;
    const body = req.body;
    const admin = req.body.unidad;

    console.log(req.body.unidad);

    if(admin.rol !== 'ADMIN_ROL'){
        return res.status(403).json({
            ok:false,
            mensaje: 'No eres administrador',
        })
    }

    Unidad.findById(id, (err, unidadActualizado) => {

        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error en la base de datos',
                err:Error
            });
        }

        if (!unidadActualizado) {
            return res.status(404).json({
                ok:false,
                mensaje: 'La unidad no existe'
            });
        }

        unidadActualizado.ruta = body.ruta;
        unidadActualizado.organizacion = body.organizacion;

        unidadActualizado.save( (err,unidadGuard) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error en la base de datos',
                    err:err
                });
            }

            res.status(200).json({
                ok:true,
                mensaje: 'Unidad actualizado correctamente',
                unidad:unidadGuard
            });
        });

    });
});

unidadRoutes.delete('/',( req:Request, res:Response) => {
    
    const id = req.headers.id;

    Unidad.findByIdAndDelete(id, (err, unidadDel) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje:'No se pudo borrar la unidad',
                err:err
            });
        }
        res.status(200).json({
            ok:true,
            mensaje: 'Unidad eliminada exitosamente',
            unidad: unidadDel
        });
    });
})

export default unidadRoutes;