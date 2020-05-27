"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var unidades_1 = __importDefault(require("../modelos/unidades"));
//import bcrypt from 'bcrypt';
//import verificatoken from '../middlewares/authentication';
var unidadRoutes = express_1.Router();
unidadRoutes.post('/', function (req, res) {
    var body = req.body;
    var unidad = new unidades_1.default({
        ruta: body.ruta,
        placas: body.placas,
        Numeconomico: body.Numeconomico,
        organizacion: body.organizacion,
        identificador: body.identificador,
        MDVR: body.MDVR,
        rol: body.rol,
    });
    unidad.save(function (err, unidadGuadada) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err,
            });
        }
        console.log(unidad);
        res.status(200).json({
            ok: true,
            mensaje: 'unidad guardada',
            unidad: unidadGuadada
        });
    });
});
unidadRoutes.get('/', function (req, res) {
    unidades_1.default.find(function (err, unidadDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        return res.status(200).json({
            ok: true,
            unidad: unidadDB
        });
    });
});
unidadRoutes.put('/', function (req, res) {
    var id = req.headers.id;
    var body = req.body;
    var admin = req.body.unidad;
    console.log(req.body.unidad);
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(403).json({
            ok: false,
            mensaje: 'No eres administrador',
        });
    }
    unidades_1.default.findById(id, function (err, unidadActualizado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: Error
            });
        }
        if (!unidadActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La unidad no existe'
            });
        }
        unidadActualizado.ruta = body.ruta;
        unidadActualizado.organizacion = body.organizacion;
        unidadActualizado.save(function (err, unidadGuard) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error en la base de datos',
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'Unidad actualizado correctamente',
                unidad: unidadGuard
            });
        });
    });
});
unidadRoutes.delete('/', function (req, res) {
    var id = req.headers.id;
    unidades_1.default.findByIdAndDelete(id, function (err, unidadDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se pudo borrar la unidad',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Unidad eliminada exitosamente',
            unidad: unidadDel
        });
    });
});
exports.default = unidadRoutes;
