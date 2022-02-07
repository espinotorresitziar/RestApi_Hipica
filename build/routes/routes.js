"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const niveles_1 = require("../models/niveles");
const participantes_1 = require("../models/participantes");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getNiveles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield niveles_1.Niveles.aggregate([
                    {
                        $lookup: {
                            from: 'participantes',
                            localField: '_tipoNivel',
                            foreignField: '_nivel',
                            as: 'participantes'
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getParticipantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield participantes_1.Participantes.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getNivel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nivel } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield niveles_1.Niveles.aggregate([
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
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getParticipante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield participantes_1.Participantes.findOne({
                    '_nombre': nombre
                });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.newNivel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const equi = new niveles_1.Niveles(req.body);
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                yield equi.save()
                    .then((doc) => res.send('Nivel salvado: ' + doc))
                    .catch((err) => res.send(err));
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.newParticipante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jug = new participantes_1.Participantes(req.body);
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                yield jug.save()
                    .then((doc) => res.send('Participante inscrito: ' + doc))
                    .catch((err) => res.send(err));
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.modiPartici = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const participante = new participantes_1.Participantes(req.body);
            yield database_1.db.conectarBD();
            yield participantes_1.Participantes.findOneAndUpdate({
                _nombre: participante._nombre
            }, {
                _nivel: participante._nivel,
                _nomCaballo: participante._nomCaballo,
                _raza: participante._raza,
                _edadCaballo: participante._edadCaballo,
                _cabEstabullado: participante._cabEstabulado,
                _totalSaltos: participante._totalSaltos,
                _maxAltura: participante._maxAltura,
                _sPenalizaciones: {
                    _derriboS: participante.derriboS,
                    _rehusoS: participante.rehusoS,
                    _caidaS: participante.caidaS,
                    _tiempoS: participante.tiempoS
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
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send('Participante modificado: ' + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.elimParticipante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD();
            yield participantes_1.Participantes.findOneAndDelete({
                '_nombre': nombre
            })
                .then((doc) => res.send('Participante eliminado ' + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/niveles', this.getNiveles);
        this._router.get('/participantes', this.getParticipantes);
        this._router.get('/niveles/:nivel', this.getNivel);
        this._router.get('/participante/:nombre', this.getParticipante);
        this._router.post('/nivel', this.newNivel);
        this._router.post('/participante', this.newParticipante);
        this._router.put('/modificarPartici/:nombre', this.modiPartici);
        this._router.delete('/eliminarPartici/:nombre', this.elimParticipante);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
