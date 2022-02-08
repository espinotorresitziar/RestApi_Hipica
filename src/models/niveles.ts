import { Schema, model } from "mongoose";

const nivelSchema = new Schema (
    {
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
        _edadMax: {
            type: Number
        },
        _limiteEdad: {
            type: Boolean,
            default: "False"
        },
        _inscripcion: {
            type: Number
        }
    }
)

export type nAlevin = {
    _id: number | null,
    _tipoNivel: String | null,
    _aficionado: Boolean | null,
    _inscripcion: number | null 
} 

export type nInfantil = {
    _id: number | null,
    _tipoNivel: String | null,
    _aficionado: Boolean | null,
    _edadMax: number | null,
    _inscripcion: number | null 
} 

export type nAdulto = {
    _id: number | null,
    _tipoNivel: String | null,
    _aficionado: Boolean | null,
    _limiteEdad: Boolean | null,
    _inscripcion: number | null 
} 

export const Niveles = model ("niveles", nivelSchema)