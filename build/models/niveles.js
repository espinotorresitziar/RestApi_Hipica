"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Niveles = void 0;
const mongoose_1 = require("mongoose");
const nivelSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true
    },
    _tipoNivel: {
        type: String
    },
    _aficionado: {
        type: Boolean
    },
    _limiteEdad: {
        type: Number
    },
    _inscripcion: {
        type: Number
    }
});
exports.Niveles = (0, mongoose_1.model)("niveles", nivelSchema);
