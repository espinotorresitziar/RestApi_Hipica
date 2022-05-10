import { Schema, model } from "mongoose";

const nivelSchema = new Schema (
    {
        _idNivel: {
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
    }
)

export type nivel = {
    _idNivel: number | null,
    _tipoNivel: String | null,
    _aficionado: Boolean | null,
    _limiteEdad: Boolean | null,
    _inscripcion: number | null 
} 



export const Niveles = model ("niveles", nivelSchema)