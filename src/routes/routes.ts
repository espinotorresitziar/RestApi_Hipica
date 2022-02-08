import {Request, Response, Router } from 'express'
import { Niveles } from '../models/niveles'
import { Participantes } from '../models/participantes'
import { db } from '../database/database'
import { pathToFileURL } from 'url'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getNiveles = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await Niveles.aggregate(
                [
                    {
                        $lookup: {
                            from: 'participantes',
                            localField: '_tipoNivel',
                            foreignField: '_nivel',
                            as: 'participantes'
                        }
                    }
                ]
            )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getParticipantes = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await Participantes.find({})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    private getNivel = async (req: Request, res: Response) => {
        const { nivel } = req.params
        await db.conectarBD()
        .then (async () => {
            const query = await Niveles.aggregate(
                [
                    {
                        $lookup: {
                            from: 'participantes',
                            localField: '_tipoNivel',
                            foreignField: '_nivel',
                            as: 'participantes'
                        }
                    }, 
                    {
                        $match: {
                            _tipoNivel: nivel
                        }
                    }
                ]
            )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getParticipante = async (req: Request, res: Response) => {
        const {nombre} = req.params
        await db.conectarBD()
        .then (async() => {
            const query = await Participantes.findOne(
                {
                    '_nombre': nombre
                }
            )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private newNivel = async (req: Request, res: Response) => {
        const {id, tipoNivel, aficionado, edadMax, limiteEdad, inscripcion} = req.body
        await db.conectarBD()
        let dSchema = {
            "_id": id,
            "_tipoNivel": tipoNivel,
            "_aficionado": aficionado,
            "_edadMax": edadMax,
            "_limiteEdad": limiteEdad,
            "_inscripcion": inscripcion
        }
        const oSchema = new Niveles(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Nivel salvado: ' + doc))
            .catch((err: any) => res.send(err))
        await db.desconectarBD()
    }

    private newParticipante = async (req: Request, res: Response) => {
        const {id, nombre, fechNac, nivel, nacionalidad, nomCaballo, raza, edadCaballo,
        cabEstabulado, totalSaltos, maxAltura, TLimiteS, derriboS, rehusoS, caidaS,
        tiempoS, TLimiteC, rehusoC, caidaC, tiempoC, parada, paso, trote, galope, 
        pasoAtras, transiciones, cambioDirec, figuras, movLateral, piruetas} = req.body
        await db.conectarBD()
        let dSchema = {
            "_id": id,
            "_nombre": nombre,
            "_fechNac": fechNac,
            "_nivel": nivel,
            "_nacionalidad": nacionalidad,
            "_nomCaballo": nomCaballo,
            "_raza": raza,
            "_edadCaballo": edadCaballo,
            "_cabEstabulado": cabEstabulado,
            "_totalSaltos": totalSaltos,
            "_maxAltura": maxAltura,
            "_TLimiteS": TLimiteS,
            "_derriboS": derriboS,
            "_rehusoS": rehusoS,
            "_caidaS": caidaS,
            "_tiempoS": tiempoS,
            "_TLimiteC": TLimiteC,
            "_rehusoC": rehusoC,
            "_caidaC": caidaC,
            "_tiempoC": tiempoC,
            "_parada": parada,
            "_paso": paso,
            "_trote": trote,
            "_galope": galope,
            "_pasoAtras": pasoAtras,
            "_transiciones": transiciones,
            "_cambioDirec": cambioDirec,
            "_figuras": figuras,
            "_movLateral": movLateral,
            "_piruetas": piruetas
        }
        const oSchema = new Participantes(dSchema)
        await oSchema.save()
                    .then((doc: any) => res.send('Participante inscrito: ' + doc))
                    .catch((err: any) => res.send(err))
        await db.desconectarBD()
    }

    private modiNivel = async (req: Request, res: Response) => {
        const { id } = req.params 
        const { aficionado, edadMax, limiteEdad, inscripcion } = req.body
        await db.conectarBD()
        await Niveles.findOneAndUpdate(
           {
                "_id": id
           },
           {
               "_aficionado": aficionado,
               "_edadMax": edadMax,
               "_limiteEdad": limiteEdad,
               "_inscripcion": inscripcion
           },
           {
               new: true,
               runValidators: true
           }
       )
       .then((doc: any) => res.send('Nivel modificado: ' + doc))
       .catch((err: any) => res.send('Error: ' + err))
       await db.desconectarBD()
    }

    private modiPartici = async (req: Request, res: Response) => {
        const { nombre } = req.params
        const {nivel, nomCaballo, raza, edadCaballo, cabEstabulado, totalSaltos, maxAltura, 
            TLimiteS, derriboS, rehusoS, caidaS, tiempoS, TLimiteC, rehusoC, caidaC, 
            tiempoC, parada, paso, trote, galope, pasoAtras, transiciones, cambioDirec, 
            figuras, movLateral, piruetas} = req.body
        await db.conectarBD()
        await Participantes.findOneAndUpdate(
            {
                "_nombre": nombre
            },
            {
                "_nivel": nivel,
                "_nomCaballo": nomCaballo,
                "_raza": raza,
                "_edadCaballo": edadCaballo,
                "_cabEstabulado": cabEstabulado,
                "_totalSaltos": totalSaltos,
                "_maxAltura": maxAltura,
                "_TLimiteS": TLimiteS,
                "_derriboS": derriboS,
                "_rehusoS": rehusoS,
                "_caidaS": caidaS,
                "_tiempoS": tiempoS,
                "_TLimiteC": TLimiteC,
                "_rehusoC": rehusoC,
                "_caidaC": caidaC,
                "_tiempoC": tiempoC,
                "_parada": parada,
                "_paso": paso,
                "_trote": trote,
                "_galope": galope,
                "_pasoAtras": pasoAtras,
                "_transiciones": transiciones,
                "_cambioDirec": cambioDirec,
                "_figuras": figuras,
                "_movLateral": movLateral,
                "_piruetas": piruetas
            },
            {
                new: true,
                runValidators: true
            }
        )
        .then((doc: any) => res.send('Participante modificado: ' + doc))
        .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private elimParticipante = async (req: Request, res: Response) => {
        const {nombre} = req.params
        await db.conectarBD()
        await Participantes.findOneAndDelete(
            {
                '_nombre': nombre
            }
        )
        .then((doc: any) => res.send('Participante eliminado ' + doc))
        .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    misRutas(){
        this._router.get('/niveles', this.getNiveles)
        this._router.get('/participantes', this.getParticipantes)
        this._router.get('/niveles/:nivel', this.getNivel)
        this._router.get('/participante/:nombre', this.getParticipante)
        this._router.post('/nivel', this.newNivel)
        this._router.post('/participante', this.newParticipante)
        this._router.put('/modificarNivel/:id', this.modiNivel)
        this._router.put('/modificarPartici/:nombre', this.modiPartici)
        this._router.delete('/eliminarPartici/:nombre', this.elimParticipante)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
