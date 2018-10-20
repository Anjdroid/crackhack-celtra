var promise = require('bluebird')

var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options)
var db = pgp("postgres://user:user@localhost:5433/postgres")

function getKudos(req, res, next) {
    var query = 'select * from kudos'

    if (req.query.beneficiaryId)
        query = 'select * from kudos where beneficiary = ${beneficiaryId}'

    db.any(query, { beneficiaryId: req.query.beneficiaryId || null }).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        return next(err)
    })
}

function getKudo(req, res, next) {
    var id = String(req.params.id)

    db.one('select * from kudos WHERE id = ${id}', { id : id}).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        return next(err)
    })
}

function createKudos(req, res, next) {
    db.one(
        'insert into kudos("beneficiary", "endorser", "message") ' +
        ' values(${beneficiary}, ${endorser}, ${message}) RETURNING id', req.body)
    .then(function (data) {
        res.status(200).json({
            id: data.id
        })
    }).catch(function (err) {
        return next(err)
    })
}

module.exports = {
    getKudos: getKudos,
    getKudo: getKudo,
    createKudos: createKudos
}
