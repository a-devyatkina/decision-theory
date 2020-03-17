const math = require('mathjs')

module.exports = function(app, db, ObjectID) {
    app.post('/restapi/hierarchies/lab1a', (req, res) => {
        db.collection('lab').find().toArray((err, result) => {
            if (err) {
                res.end()
                throw err
            }
            var index = Math.floor(Math.random() * result.length)

            var session = {
                user_id: req.body.user_id,
                timestamp: Date.now(),
                variant: result[index].var,
                intro: {
                    questions: [],
                    points: 5
                },
                practice: {
                    questions: [],
                    points: 15
                },
                target_matrix: {
                    priority: 0,
                    weight: 0,
                    mweight: 0,
                    lambda: 0,
                    lambda_max: 0,
                    c_index: 0,
                    c_relation: 0,
                    points: 10
                },
                criterion_matrix1: {
                    priority: 0,
                    weight: 0,
                    mweight: 0,
                    lambda: 0,
                    lambda_max: 0,
                    c_index: 0,
                    c_relation: 0,
                    points: 10
                },
                criterion_matrix2: {
                    priority: 0,
                    weight: 0,
                    mweight: 0,
                    lambda: 0,
                    lambda_max: 0,
                    c_index: 0,
                    c_relation: 0,
                    points: 10
                },
                criterion_matrix3: {
                    priority: 0,
                    weight: 0,
                    mweight: 0,
                    lambda: 0,
                    lambda_max: 0,
                    c_index: 0,
                    c_relation: 0,
                    points: 10
                },
                criterion_matrix4: {
                    priority: 0,
                    weight: 0,
                    mweight: 0,
                    lambda: 0,
                    lambda_max: 0,
                    c_index: 0,
                    c_relation: 0,
                    points: 10
                },
                hierarchical_synthesis: {
                    matrix: 0,
                    vector: 0,
                    alternative: 0,
                    points: 20.0
                },
                add_test: {
                    question: null,
                    points: 10.0
                },
                logs: []    // step, action, timestamp
            }
            db.collection('session').insertOne(session, () => {
                var response = {
                    data: result[index],
                    session_id: session._id
                }
                res.send(response)
            })
        })
    })

    app.post('/restapi/hierarchies/lab_validate', (req, res) => {
        db.collection('lab').findOne({"_id": ObjectID(req.body.id)}, (err, result) => {
            if (err) {
                res.end()
                throw err
            }

            var lab = result
            db.collection('session').findOne({'_id': ObjectID(req.body.session_id)}, (err, result) => {
                if (err) {
                    res.end()
                    throw err
                }

                var session = result
                if (req.body.step != null) {
                    var matrix, update, target
                    switch (req.body.step) {
                        case 'target_matrix':
                            matrix = lab.data[0].value
                            update = {
                                $inc: {
                                    'target_matrix.points': -2
                                }
                            }
                            target = session.target_matrix
                            break
                        case 'criterion_matrix1':
                            matrix = lab.data[1].value
                            update = {
                                $inc: {
                                    'criterion_matrix1.points': -2
                                }
                            }
                            target = session.criterion_matrix1
                            break
                        case 'criterion_matrix2':
                            matrix = lab.data[2].value
                            update = {
                                $inc: {
                                    'criterion_matrix2.points': -2
                                }
                            }
                            target = session.criterion_matrix2
                            break
                        case 'criterion_matrix3':
                            matrix = lab.data[3].value
                            update = {
                                $inc: {
                                    'criterion_matrix3.points': -2
                                }
                            }
                            target = session.criterion_matrix3
                            break
                        case 'criterion_matrix4':
                            matrix = lab.data[4].value
                            update = {
                                $inc: {
                                    'criterion_matrix4.points': -2
                                }
                            }
                            target = session.criterion_matrix4
                            break
                        }

                    var calculations = calculateMatrix(matrix)
                    var response = {
                        status: 'right',
                        body: new Set(),
                        errors: []
                    }
                    var filter = {
                        '_id': ObjectID(req.body.session_id)
                    }
                    for (i = 0; i < 4; i++) {
                        for (j = 0; j < calculations[i].length; j++) {
                            var upper = Math.round(calculations[i][j]*100+1)/100
                            var lower = Math.round(calculations[i][j]*100-1)/100
                            var tmp = req.body.value[i][j]
                            console.log(tmp)
                            if (lower > tmp || tmp > upper || !tmp) {
                                response.status = 'wrong'
                                response.errors.push(i)
                                index = i
                            }
                        }
                    }
                    for (i = 4; i < 7; i++) {
                        var upper = Math.round(calculations[i]*100+1)/100
                        var lower = Math.round(calculations[i]*100-1)/100
                        var tmp = req.body.value[i][0]
                        if (lower > tmp || tmp > upper || !tmp) {
                            response.status = 'wrong'
                            response.errors.push(i)
                        }
                    }

                    for (i = 0; i < response.errors.length; i++) {
                        switch (response.errors[i]) {
                            case 0:
                                response.body.add('Вектор приоритетов')
                                break
                            case 1:
                                response.body.add('Веса критериев')
                                break
                            case 2:
                                response.body.add('(M*w)')
                                break
                            case 3:
                                response.body.add('Вектор лямбда')
                                break
                            case 4:
                                response.body.add('Среднее значение лямбда')
                                break
                            case 5:
                                response.body.add('Индекс согласованности')
                                break
                            case 6:
                                response.body.add('Отношение согласованности')
                                break
                        }
                    }
                    delete response.errors
                    response.body = Array.from(response.body).join(', ')

                    if (response.status === 'wrong') {
                        if (target.points - 2 === 0) {
                            response = {
                                status: 'over'
                            }
                        }
                        db.collection('session').updateOne(filter, update, (err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }
                        })
                    }
                    res.send(response)
                } else {
                    var matrix = []
                    var tmp
                    for (index = 1; index < 5; index++) {
                        tmp = calculateMatrix(lab.data[index].value)
                        matrix.push(tmp[1])
                    }
                    matrix = math.transpose(matrix)
                    var criterion = calculateMatrix(lab.data[0].value)[1]
                    var priority = math.multiply(matrix, criterion)

                    var filter = {
                        '_id': ObjectID(req.body.session_id)
                    }
                    var update = {
                        $inc: {
                            'hierarchical_synthesis.points': -4
                        }
                    }
                    var response = {
                        status: 'right',
                        body: new Set()
                    }

                    var request = req.body.value.matrix
                    for (i = 0; i < matrix.length; i++) {
                        var row = matrix[i]
                        for (j = 0; j < matrix.length; j++) {
                            var upper = Math.round(row[j]*100+1)/100
                            var lower = Math.round(row[j]*100-1)/100
                            var tmp = parseFloat(request[i][j])
                            if (lower > tmp || tmp > upper || !tmp) {
                                response.status = 'wrong'
                                response.body.add('Матрица')
                            }
                        }
                    }

                    request = req.body.value.vector
                    for (i = 0; i < criterion.length; i++) {
                        var upper = Math.round(criterion[i]*100+1)/100
                        var lower = Math.round(criterion[i]*100-1)/100
                        var tmp = parseFloat(request[i])
                        if (lower > tmp || tmp > upper || !tmp) {
                            response.status = 'wrong'
                            response.body.add('Вектор')
                        }
                    }

                    var index
                    var max = Number.NEGATIVE_INFINITY
                    for (i = 0; i < priority.length; i++) {
                        if (max < priority[i]) {
                            max = priority[i]
                            index = i
                        }
                    }

                    request = req.body.value.alternative
                    if (index + 1 != request) {
                        response.status = 'wrong'
                        response.body.add('Альтернатива')
                    }

                    response.body = Array.from(response.body).join(', ')

                    if (response.status === 'wrong') {
                        if (session.hierarchical_synthesis.points-4 === 0) {
                            response = {
                                status: 'over'
                            }
                        }
                        db.collection('session').updateOne(filter, update, (err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }
                        })
                    }
                    res.send(response)
                }
            })
        })
    })

    app.get('/restapi/hierarchies/lab1b', (req, res) => {
        var query = {
            owner: null
        }
        var projection = {
            owner: 0
        }
        db.collection('themes').find(query).project(projection).toArray((err, result) => {
            if (err) {
                res.end
                throw err
            }
            res.send(result)
        })
    })

    app.post('/restapi/hierarchies/theme', (req, res) => {
        var filter = {
            '_id': ObjectID(req.body.theme)
        }
        var update = {
            'owner': req.body.user_id
        }
        db.collection('themes').updateOne(filter, update, (err, result) => {
            if (err) {
                res.end()
                throw err
            }
            res.send('ok')
        })
    })
}

function calculateMatrix (matrix) {
    const c_random = {
        1: 0,
        2: 0,
        3: 0.58,
        4: 0.9,
        5: 1.12,
        6: 1.24,
        7: 1.32,
        8: 1.41,
        9: 1.45,
        10: 1.49
    }

    var priority = []
    var norm = 0;
    for (i = 0; i < matrix.length; i++) {
        var row = matrix[i]
        priority.push(1);
        for (j = 0; j < row.length; j++) {
            priority[i] *= row[j]
        }
        priority[i] = Math.pow(priority[i], 1/matrix.length)
        norm += priority[i]
    }

    var weight = []
    for (i = 0; i < priority.length; i++) {
        weight.push(priority[i]/norm)
    }

    var mweight = math.multiply(matrix, weight)
    var lambda = []
    var max_lambda = 0
    for (i = 0; i < mweight.length; i++) {
        lambda.push(mweight[i]/weight[i])
        max_lambda += mweight[i]/weight[i]
    }
    max_lambda /= mweight.length

    var c_index = (max_lambda-mweight.length)/(mweight.length-1)
    var c_relation = (c_index/c_random[mweight.length])

    if (c_relation > 0.1) {
        var max = 0
        var index = 0
        for (i = 0; i < priority.length; i++) {
            if (max < priority[i]) {
                max = priority[i]
                index = i
            }
        }

        var new_matrix = matrix
        for (i = 0; i < weight.length; i++) {
            new_matrix[index][i] = weight[index]/weight[i]
            new_matrix[i][index] = 1/new_matrix[index][i]
        }
        return calculateMatrix(new_matrix)
    }

    return [
        priority,
        weight,
        mweight,
        lambda,
        max_lambda,
        c_index,
        c_relation
    ]
}
