var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/:id', function (req, res, next) {
    if (req.query !== undefined && Object.keys(req.query).length === 2) {
        if (req.query.start !== undefined && req.query.end !== undefined) {
            modele.WorkingTime.findAll({
                where: {id_user: req.params.id, start: {[Op.gte]: req.query.start}, end: {[Op.lte]: req.query.end}}
            }).then(
                (result) => {
                    console.log("My result" + result);
                    result !== null ? res.json(result) : res.sendStatus(404)
                }
            );
        } else {
            res.send("Mauvais paramètres !", 400);
        }
    } else {
        res.send("Mauvais paramètres !", 400);
    }
});

router.get('/:id_user/:id_workingtime', function (req, res, next) {
    modele.WorkingTime.findOne({where: {id_user: req.params.id_user, id: req.params.id_workingtime}})
        .then((result) => (result != null) ? res.json(result) : res.sendStatus(404));
});

router.post('/:id_user', function (req, res, next) {
    req.body.WorkingTime.id_user = req.params.id_user;
    modele.WorkingTime.create(req.body.WorkingTime)
        .then(newWT => {
            res.json(200, newWT);
        }).catch(function (err) {
        res.send(400, err);
    });
});

router.put("/:id", function (req, res, next) {
    const id = req.params.id;
    const updates = req.body.updates;
    modele.WorkingTime.findOne({
        where: {id: id}
    })
        .then(newWT => {
            return newWT.update(updates)
        })
        .then(updatedNewWT => {
            res.json(updatedNewWT);
        }).catch(ex => {
            res.sendStatus(400);
    });
});

router.delete('/:id', function (req, res, next) {
    modele.WorkingTime.destroy({
        where: { id: req.params.id }
    })
        .then(deletedWT => {
            if (deletedWT == 0) {
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        }).catch(e => {
            res.sendStatus(400);
    });
});

module.exports = router;

