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
        const equi = new Niveles(req.body)
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                await equi.save()
                    .then ((doc: any) => res.send('Nivel salvado: ' + doc))
                    .catch((err: any) => res.send(err))
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private newParticipante = async (req: Request, res: Response) => {
        const jug = new Participantes(req.body)
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                await jug.save()
                    .then((doc: any) => res.send('Participante inscrito: ' + doc))
                    .catch((err: any) => res.send(err))
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private modiNivel = async (req: Request, res: Response) => {
        const nivel = new Niveles (req.body)
        await db.conectarBD()
        await Niveles.findOneAndUpdate(
           {
                _tipoNivel: nivel._tipoNivel
           },
           {
               _aficionado: nivel._aficionado,
               _edadMax: nivel._edadMax,
               _limiteEdad: nivel._limiteEdad,
               _inscripcion: nivel._inscripcion
           }
        )
    }

    private modiPartici = async (req: Request, res: Response) => {
        const participante = new Participantes (req.body)
        await db.conectarBD()
        await Participantes.findOneAndUpdate(
            {
                _nombre: participante._nombre
            },
            {
                _nivel: participante._nivel,
                _nomCaballo: participante._nomCaballo,
                _raza: participante._raza,
                _edadCaballo: participante._edadCaballo,
                _cabEstabulado: participante._cabEstabulado,
                _totalSaltos: participante._totalSaltos,
                _maxAltura: participante._maxAltura,
                _sPenalizaciones: {
                    _derriboS: participante._derriboS,
                    _rehusoS: participante._rehusoS,
                    _caidaS: participante._caidaS,
                    _tiempoS: participante._tiempoS
                },
                _cPenalizaciones: {
                    _rehusoC: participante._rehusoC,
                    _caidaC: participante._caidaC,
                    _tiempoC: participante._tiempoC
                },
                _dPuntuaciones: {
                    _parada: participante._parada,
                    _paso: participante._paso,
                    _trote: participante._trote,
                    _galope: participante._galope,
                    _pasoAtras: participante._pasoAtras,
                    _transiciones: participante._transiciones,
                    _cambioDirec: participante._cambioDirec,
                    _figuras: participante._figuras,
                    _movLateral: participante._movLateral,
                    _piruetas: participante._piruetas
                }
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
        this._router.put('/modificarNivel/:tipoNivel', this.modiNivel)
        this._router.put('/modificarPartici/:nombre', this.modiPartici)
        this._router.delete('/eliminarPartici/:nombre', this.elimParticipante)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
