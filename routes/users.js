var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
        getUserByMailAndUsername(res, req.query);
    } else {
        modele.User.findAll().then((result) => res.json(result));
    }
});

router.get('/:id', function (req, res, next) {
    modele.User.findOne({where: {id: req.params.id}}).then((result) => res.json(result));
});

router.put('/:id', function (req, res, next) {
    const id = req.params.id;
    const updates = req.body.updates;
    modele.User.findOne({
        where: { id: id }
    })
        .then(owner => {
            return owner.update(updates)
        })
        .then(updatedOwner => {
            res.json(updatedOwner);
        });
});

router.post('/', function (req, res, next) {
    req.body.user.password = bcrypt.hashSync(req.body.user.password , 10);
    modele.User.create(req.body.user)
        .then(newUser => {
            res.json(200, newUser);
        });
});

router.delete('/:id', function (req, res, next) {
    modele.User.destroy({
        where: { id: req.params.id }
    })
        .then(deletedPet => {
            if (deletedPet == 0) {
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
});

function  getUserByMailAndUsername(res ,params) {
     if (params.username !== undefined && params.email !== undefined) {
         modele.User.findOne({
             where: {username : params.username, email : params.email}
         }).then(
             (result) =>  {
                 result !== null ? res.json(result) : res.sendStatus(404)
             }
         );
     } else {
         res.send("Mauvais paramètres !" , 400);
     }

}

module.exports = router;
