import { Schema, model } from "mongoose";

const participanteSchema = new Schema (
    {
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
    }
)

export type participante = {
    _id: Number | null,
    _nombre: String | null,
    _edad: Number | null,
    _nacionalidad: String | null,
    _nivel: String | null,
    _modalidad: String | null,
    _nomCaballo: String | null,
    _raza: String | null,
    _edadCaballo: String | null,
    _cabEstabulado: Boolean | null
}

export type pSalto = {
    _id: Number | null,
    _nombre: String | null,
    _edad: Number | null,
    _nacionalidad: String | null,
    _nivel: String | null,
    _modalidad: String | null,
    _nomCaballo: String | null,
    _raza: String | null,
    _edadCaballo: String | null,
    _cabEstabulado: Boolean | null,
    _totalSaltos: Number | null,
    _maxAltura: Number | null,
    _TLimiteS: Number | null,
    _derriboS: Number | null,
    _rehusoS: Number | null,
    _caidaS: Number | null,
    _tiempoS: Number | null
}

export type pCross = {
    _id: Number | null,
    _nombre: String | null,
    _edad: Number | null,
    _nacionalidad: String | null,
    _nivel: String | null,
    _modalidad: String | null,
    _nomCaballo: String | null,
    _raza: String | null,
    _edadCaballo: String | null,
    _cabEstabulado: Boolean | null,
    _TLimiteC: Number | null,
    _rehusoC: Number | null,
    _caidaC: Number | null,
    _tiempoC: Number | null
    
}

export type pDoma = {
    _id: Number | null,
    _nombre: String | null,
    _edad: Number | null,
    _nacionalidad: String | null,
    _nivel: String | null,
    _modalidad: String | null,
    _nomCaballo: String | null,
    _raza: String | null,
    _edadCaballo: String | null,
    _cabEstabulado: Boolean | null,
    _parada: Number | null,
    _paso: Number | null,
    _trote: Number | null,
    _galope: Number | null,
    _pasoAtras: Number | null,
    _transiciones: Number | null,
    _cambioDirec: Number | null,
    _figuras: Number | null,
    _movLateral: Number | null,
    _piruetas: Number | null
}

export const Participantes = model ("participantes", participanteSchema)