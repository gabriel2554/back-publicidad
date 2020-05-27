"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var mongooseUniqueValidator = require("mongoose-unique-validator");
var rolesValidos = {
    values: ['ADMIN_ROL', 'DRIVER_ROL'],
    message: '{value} no es un rol valido'
};
var unidadSchema = new mongoose_1.Schema({
    ruta: { type: String },
    placas: { type: String, uppercase: true },
    Numeconomico: { type: String },
    organizacion: { type: String, required: [true, 'La organizacion es requerida'] },
    identificador: { type: Number },
    MDVR: { type: String },
    rol: { type: String, enum: rolesValidos, default: 'ADMIN_ROL' },
}, { collection: 'unidades' });
unidadSchema.plugin(mongooseUniqueValidator, { message: "{ PATH } debe ser unico" });
exports.default = mongoose_2.default.model('Unidad', unidadSchema);
