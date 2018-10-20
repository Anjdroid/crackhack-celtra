var promise = require('bluebird')

var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options)
var db = pgp("postgres://postgres:pass@localhost:5432/postgres")

function getEmployees(_, res, next) {
    db.any('select * from employees').then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        return next(err)
    })
}

function getEmployee(req, res, next) {
    var employeeUUID = String(req.params.id)

    db.one('select e.*, array_remove(array_agg(e1.id), NULL) AS subordinates from employees e left join employees e1 ON e."id" = e1."managerId" where e.id = ${id} GROUP BY e.id', { id : employeeUUID}).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        return next(err)
    })
}

function getRootEmployee(req, res, next) {
    db.one('select * from employees WHERE "managerId" IS NULL').then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        return next(err)
    })
}

function createEmployee(req, res, next) {
    db.one(
        'insert into employees("firstName", "lastName", "email", "avatarUrl", "jobTitle", "department", "managerId") ' +
        ' values(${firstName}, ${lastName}, ${email}, ${avatarUrl}, ${jobTitle}, ${department}, ${managerId}) RETURNING id', req.body)
    .then(function (data) {
        res.status(200).json({
            id: data.id
        })
    }).catch(function (err) {
        return next(err)
    })
}

module.exports = {
    getEmployees: getEmployees,
    getEmployee: getEmployee,
    getRootEmployee: getRootEmployee,
    createEmployee: createEmployee
}
