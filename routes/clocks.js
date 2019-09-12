var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt');


router.get('/:id_user', function (req, res, next) {
    modele.Clocking.findOne({where: {id_user: req.params.id}})
        .then((result) => (result != null) ? res.json(result) : res.sendStatus(404));
});

router.post('/:id_user', function (req, res, next) {
    modele.Clocking.findOne({where: {id_user: req.params.id_user}})
        .then(clock => {
            if (clock !== null) {
                if (clock.status) {
                    insertWorkingTime(clock.time, clock.id_user, req.body.update.time);
                }
                req.body.update.status = !clock.status;
                return clock.update(req.body.update);
            }
        }).then(updatedOwner => {
        res.json(updatedOwner);
    });
});

function insertWorkingTime(beforeUpdateClock, idUser, afterUpdateClock) {
    let workingTime = {};
    workingTime.id_user = idUser;
    workingTime.start = beforeUpdateClock;
    workingTime.end = afterUpdateClock;
    modele.WorkingTime.create(workingTime)
        .then(newWT => {
            return true
        }).catch(function (err) {
        return false;
    });

}


module.exports = router;
