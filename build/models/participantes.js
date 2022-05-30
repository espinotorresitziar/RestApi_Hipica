"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participantes = void 0;
const mongoose_1 = require("mongoose");
const participanteSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true
    },
    _nombre: {
        type: String
    },
    _edad: {
        type: Number
    },
    _nivel: {
        type: String
    },
    _modalidad: {
        type: String
    },
    _nacionalidad: {
        type: String
    },
    _nomCaballo: {
        type: String
    },
    _raza: {
        type: String
    },
    _edadCaballo: {
        type: Number
    },
    _cabEstabulado: {
        type: Boolean
    },
    _totalSaltos: {
        type: Number
    },
    _maxAltura: {
        type: Number
    },
    _TLimiteS: {
        type: Number
    },
    _derriboS: Number,
    _rehusoS: {
        type: Number,
        max: 3
    },
    _caidaS: {
        type: Number,
        max: 2
    },
    _tiempoS: Number,
    _TLimiteC: {
        type: Number
    },
    _rehusoC: {
        type: Number,
        max: 3
    },
    _caidaC: {
        type: Number,
        max: 2
    },
    _tiempoC: Number,
    _parada: {
        type: Number,
        max: 10
    },
    _paso: {
        type: Number,
        max: 10
    },
    _trote: {
        type: Number,
        max: 10
    },
    _galope: {
        type: Number,
        max: 10
    },
    _pasoAtras: {
        type: Number,
        max: 10
    },
    _transiciones: {
        type: Number,
        max: 10
    },
    _cambioDirec: {
        type: Number,
        max: 10
    },
    _figuras: {
        type: Number,
        max: 10
    },
    _movLateral: {
        type: Number,
        max: 10
    },
    _piruetas: {
        type: Number,
        max: 10
    }
});
exports.Participantes = (0, mongoose_1.model)("participantes", participanteSchema);
