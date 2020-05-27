"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./clases/server"));
var environment_1 = require("./global/environment");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var server = new server_1.default();
///////// BODY - PARSER //////////
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//////////// CORS /////////////////
server.app.use(cors_1.default({ origin: true, credentials: true }));
////// IMPORTAR RUTAS //////////////
var unidad_1 = __importDefault(require("./rutas/unidad"));
//////SETEO DE RUTAS ///////
server.app.use('/unidad', unidad_1.default);
///////// CONEXION A BASE DE DATOS ///////////
mongoose_1.default.connect("mongodb://" + environment_1.DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
        throw err;
    var DB = environment_1.DB_URL.split('/');
    var DB_name = DB[DB.length - 1];
    console.log("Conectado a mi base de datos " + DB_name);
});
///////////// ARRANQUE DEL SERVIDOR /////////////
server.start(function () {
    console.log("Servidor corriendo en " + environment_1.SERVER_PORT);
});
