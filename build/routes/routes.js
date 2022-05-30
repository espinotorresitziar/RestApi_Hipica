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
            const { tipoNivel } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield niveles_1.Niveles.findOne({
                    '_tipoNivel': tipoNivel
                });
                /*const query = await Niveles.aggregate(
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
                                "_tipoNivel": tipoNivel
                            }
                        }
                    ]
                    
                )*/
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
            const { id, tipoNivel, aficionado, limiteEdad, inscripcion } = req.body;
            yield database_1.db.conectarBD();
            let dSchema = {
                "_id": id,
                "_tipoNivel": tipoNivel,
                "_aficionado": aficionado,
                "_limiteEdad": limiteEdad,
                "_inscripcion": inscripcion
            };
            const oSchema = new niveles_1.Niveles(dSchema);
            yield oSchema.save()
                .then((doc) => res.send('Nivel salvado: ' + doc))
                .catch((err) => res.send(err));
            yield database_1.db.desconectarBD();
        });
        this.newParticipante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, edad, nivel, modalidad, nacionalidad, nomCaballo, raza, edadCaballo, cabEstabulado, totalSaltos, maxAltura, TLimiteS, derriboS, rehusoS, caidaS, tiempoS, TLimiteC, rehusoC, caidaC, tiempoC, parada, paso, trote, galope, pasoAtras, transiciones, cambioDirec, figuras, movLateral, piruetas } = req.body;
            yield database_1.db.conectarBD();
            let dSchema = {
                "_id": id,
                "_nombre": nombre,
                "_edad": edad,
                "_nivel": nivel,
                "_modalidad": modalidad,
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
            };
            const oSchema = new participantes_1.Participantes(dSchema);
            yield oSchema.save()
                .then((doc) => res.send('Participante inscrito: ' + doc))
                .catch((err) => res.send(err));
            yield database_1.db.desconectarBD();
        });
        this.modiNivel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { aficionado, limiteEdad, inscripcion } = req.body;
            yield database_1.db.conectarBD();
            yield niveles_1.Niveles.findOneAndUpdate({
                "_id": id
            }, {
                "_aficionado": aficionado,
                "_limiteEdad": limiteEdad,
                "_inscripcion": inscripcion
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send('Nivel modificado: ' + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.modiPartici = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { nivel, modalidad, nomCaballo, raza, edadCaballo, cabEstabulado, totalSaltos, maxAltura, TLimiteS, derriboS, rehusoS, caidaS, tiempoS, TLimiteC, rehusoC, caidaC, tiempoC, parada, paso, trote, galope, pasoAtras, transiciones, cambioDirec, figuras, movLateral, piruetas } = req.body;
            yield database_1.db.conectarBD();
            yield participantes_1.Participantes.findOneAndUpdate({
                "_nombre": nombre
            }, {
                "_nivel": nivel,
                "_modalidad": modalidad,
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
        this.elimNivel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tipoNivel } = req.params;
            yield database_1.db.conectarBD();
            yield niveles_1.Niveles.findOneAndDelete({
                "_tipoNivel": tipoNivel
            })
                .then((doc) => res.send('Nivel eliminado ' + doc))
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
        this._router.get('/niveles/:tipoNivel', this.getNivel);
        this._router.get('/participante/:nombre', this.getParticipante);
        this._router.post('/nivel', this.newNivel);
        this._router.post('/participante', this.newParticipante);
        this._router.put('/modificarNivel/:id', this.modiNivel);
        this._router.put('/modificarPartici/:nombre', this.modiPartici);
        this._router.delete('/eliminarPartici/:nombre', this.elimParticipante);
        this._router.delete('/eliminarNivel/:tipoNivel', this.elimNivel);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
