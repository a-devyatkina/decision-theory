const math = require('mathjs')

module.exports = function(app, db, ObjectID) {
    app.post('/restapi/hierarchies/siblinghierarchies', async (req, res) => {
        let variants = await db.collection('variants').find().toArray()
        let index = Math.floor(Math.random() * variants.length)
        let session = {
            user_id: req.body.user_id,
            timestamp: Date.now(),
            variant: variants[index].var,
            intro: {
                questions: [],
                points: 5,
                done: false
            },
            practice: {
                questions: [],
                points: 15,
                done: false
            },
            target_matrix: {
                points: 10,
                done: false
            },
            criterion_matrix1: {
                points: 10,
                done: false
            },
            criterion_matrix2: {
                points: 10,
                done: false
            },
            criterion_matrix3: {
                points: 10,
                done: false
            },
            criterion_matrix4: {
                points: 10,
                done: false
            },
            hierarchical_synthesis: {
                points: 20,
                done: false
            },
            add_test: {
                question: null,
                answers: [],
                points: 10,
                done: false
            },
            status: 'in progress'
        }
        await db.collection('sessions').insertOne(session)
        let response = {
            data: variants[index],
            session_id: session._id
        }
        res.send(response)
    })

    app.post('/restapi/hierarchies/lab_validate', async (req, res) => {
        let lab = await db.collection('variants').findOne({"_id": ObjectID(req.body.id)})
        let session = await db.collection('sessions').findOne({'_id': ObjectID(req.body.session_id)})
        if (req.body.step != null) {
            let matrix, updateWrong, updateRight, target
            switch (req.body.step) {
                case 'target_matrix':
                    matrix = lab.data[0].value
                    updateWrong = {
                        $inc: {
                            'target_matrix.points': -2
                        }
                    }
                    updateRight = {
                        $set: {
                            'target_matrix.checked': true
                        }
                    }
                    target = session.target_matrix
                    break
                case 'criterion_matrix1':
                    matrix = lab.data[1].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix1.points': -2
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix1.checked': true
                        }
                    }
                    target = session.criterion_matrix1
                    break
                case 'criterion_matrix2':
                    matrix = lab.data[2].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix2.points': -2
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix2.checked': true
                        }
                    }
                    target = session.criterion_matrix2
                    break
                case 'criterion_matrix3':
                    matrix = lab.data[3].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix3.points': -2
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix3.checked': true
                        }
                    }
                    target = session.criterion_matrix3
                    break
                case 'criterion_matrix4':
                    matrix = lab.data[4].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix4.points': -2
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix4.checked': true
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
                db.collection('sessions').updateOne(filter, updateWrong, (err, result) => {
                    if (err) {
                        res.end()
                        throw err
                    }
                })
            }
            else {
                db.collection('sessions').updateOne(filter, updateRight, (err, result) => {
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
            var updateRight = {
                $inc: {
                    'hierarchical_synthesis.points': -4
                }
            }
            var updateWrong = {
                $set: {
                    'hierarchical_synthesis.checked': true
                }
            }
            var response = {
                status: 'right',
                body: new Set()
            }

            var request = req.body.value.matrix
            for (i = 0; i < 3; i++) {
                var row = matrix[i]
                for (j = 0; j < 4; j++) {
                    var upper = Math.round(row[j]*100+1)/100
                    var lower = Math.round(row[j]*100-1)/100
                    var tmp = request[i][j]
                    console.log(lower, tmp, upper)
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
                var tmp = request[i]
                console.log(lower, tmp, upper)
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

            console.log(index)
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
                db.collection('sessions').updateOne(filter, updateRight, (err, result) => {
                    if (err) {
                        res.end()
                        throw err
                    }
                })
            } else {
                db.collection('sessions').updateOne(filter, updateWrong, (err, result) => {
                    if (err) {
                        res.end()
                        throw err
                    }
                })
            }
            res.send(response)
        }
    })

    app.get('/restapi/hierarchies/layeredhierarchies', async (req, res) => {
        let themes = await db.collection('themes').find({owner: null}).project({owner: 0}).toArray()
        res.send(themes)
    })

    app.get('/restapi/hierarchies/get_theme', async (req, res) => {
        let theme = await db.collection('themes').findOne({owner: req.body.user_id})
        res.send(theme.name)
    })

    app.post('/restapi/hierarchies/choose_theme', async (req, res) => {
        let filter = {
            '_id': ObjectID(req.body.theme)
        }
        let update = {
            $set: {
                'owner': req.body.user_id
            }
        }
        await db.collection('themes').updateOne(filter, update)
        res.send('ok')
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
