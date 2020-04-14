const math = require('mathjs')

module.exports = function(app, db, ObjectID) {
    app.post('/restapi/hierarchies/siblinghierarchies', async (req, res) => {
        let fixed_variant = await db.collection('fixed_variants').findOne({user:req.body.user_id})
        let variant
        if (fixed_variant) {
            variant = await db.collection('variants').findOne({var:fixed_variant.var})
        } else {
            let variants = await db.collection('variants').find().toArray()
            let index = Math.floor(Math.random() * variants.length)
            variant = variants[index]
        }
        let session = {
            user_id: req.body.user_id,
            timestamp: Date.now(),
            variant: variant,
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
                answers: [],
                done: false
            },
            criterion_matrix1: {
                points: 10,
                answers: [],
                done: false
            },
            criterion_matrix2: {
                points: 10,
                answers: [],
                done: false
            },
            criterion_matrix3: {
                points: 10,
                answers: [],
                done: false
            },
            criterion_matrix4: {
                points: 10,
                answers: [],
                done: false
            },
            hierarchical_synthesis: {
                points: 20,
                answers: [],
                done: false
            },
            add_test: {
                question: null,
                answers: [],
                points: 10,
                done: false
            }
        }
        await db.collection('sessions').insertOne(session)
        let response = {
            data: variant,
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
                        },
                        $push: {
                            'target_matrix.answers': req.body.value
                        }
                    }
                    updateRight = {
                        $set: {
                            'target_matrix.done': true
                        },
                        $push: {
                            'target_matrix.answers': req.body.value
                        }
                    }
                    target = session.target_matrix
                    break
                case 'criterion_matrix1':
                    matrix = lab.data[1].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix1.points': -2
                        },
                        $push: {
                            'criterion_matrix1.answers': req.body.value
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix1.done': true
                        },
                        $push: {
                            'criterion_matrix1.answers': req.body.value
                        }
                    }
                    target = session.criterion_matrix1
                    break
                case 'criterion_matrix2':
                    matrix = lab.data[2].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix2.points': -2
                        },
                        $push: {
                            'criterion_matrix2.answers': req.body.value
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix2.done': true
                        },
                        $push: {
                            'criterion_matrix2.answers': req.body.value
                        }
                    }
                    target = session.criterion_matrix2
                    break
                case 'criterion_matrix3':
                    matrix = lab.data[3].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix3.points': -2
                        },
                        $push: {
                            'criterion_matrix3.answers': req.body.value
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix3.done': true
                        },
                        $push: {
                            'criterion_matrix3.answers': req.body.value
                        }
                    }
                    target = session.criterion_matrix3
                    break
                case 'criterion_matrix4':
                    matrix = lab.data[4].value
                    updateWrong = {
                        $inc: {
                            'criterion_matrix4.points': -2
                        },
                        $push: {
                            'criterion_matrix4.answers': req.body.value
                        }
                    }
                    updateRight = {
                        $set: {
                            'criterion_matrix4.done': true
                        },
                        $push: {
                            'criterion_matrix4.answers': req.body.value
                        }
                    }
                    target = session.criterion_matrix4
                    break
                }

            let calculations = calculateMatrix(matrix)
            let response = {
                status: 'right',
                body: new Set(),
                errors: []
            }
            let filter = {
                '_id': ObjectID(req.body.session_id)
            }
            for (i = 0; i < 4; i++) {
                for (j = 0; j < calculations[i].length; j++) {
                    let upper = Math.round(calculations[i][j]*100+1)/100
                    let lower = Math.round(calculations[i][j]*100-1)/100
                    let tmp = req.body.value[i][j]
                    console.log(lower, tmp, upper)
                    if (lower > tmp || tmp > upper || !tmp) {
                        response.status = 'wrong'
                        response.errors.push(i)
                        index = i
                    }
                }
            }
            for (i = 4; i < 7; i++) {
                let upper = Math.round(calculations[i]*100+1)/100
                let lower = Math.round(calculations[i]*100-1)/100
                let tmp = req.body.value[i][0]
                console.log(lower, tmp, upper)
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
            let matrix = []
            let tmp
            for (let index = 1; index < 5; index++) {
                tmp = calculateMatrix(lab.data[index].value)
                matrix.push(tmp[1])
            }
            matrix = math.transpose(matrix)
            let criterion_priority = calculateMatrix(lab.data[0].value)[1]
            let global_priority = math.multiply(matrix, criterion_priority)

            let filter = {
                '_id': ObjectID(req.body.session_id)
            }
            let updateRight = {
                $inc: {
                    'hierarchical_synthesis.points': -4
                },
                $push: {
                    'hierarchical_synthesis.answers': req.body.value
                }
            }
            let updateWrong = {
                $set: {
                    'hierarchical_synthesis.done': true
                },
                $push: {
                    'hierarchical_synthesis.answers': req.body.value
                }
            }
            let response = {
                status: 'right',
                body: new Set()
            }

            let request = req.body.value.matrix
            for (i = 0; i < 3; i++) {
                let row = matrix[i]
                for (j = 0; j < 4; j++) {
                    let upper = Math.round(row[j]*100+1)/100
                    let lower = Math.round(row[j]*100-1)/100
                    let tmp = request[i][j]
                    console.log(lower, tmp, upper)
                    if (lower > tmp || tmp > upper || !tmp) {
                        response.status = 'wrong'
                        response.body.add('Матрица')
                    }
                }
            }

            request = req.body.value.criterion_priority
            for (i = 0; i < criterion_priority.length; i++) {
                let upper = Math.round(criterion_priority[i]*100+1)/100
                let lower = Math.round(criterion_priority[i]*100-1)/100
                let tmp = request[i]
                console.log(lower, tmp, upper)
                if (lower > tmp || tmp > upper || !tmp) {
                    response.status = 'wrong'
                    response.body.add('Вектор приоритетов критериев')
                }
            }

            request = req.body.value.global_priority
            for (i = 0; i < global_priority.length; i++) {
                let upper = Math.round(global_priority[i]*100+1)/100
                let lower = Math.round(global_priority[i]*100-1)/100
                let tmp = request[i]
                console.log(lower, tmp, upper)
                if (lower > tmp || tmp > upper || !tmp) {
                    response.status = 'wrong'
                    response.body.add('Вектор глобальных приоритетов')
                }
            }

            let index
            let max = Number.NEGATIVE_INFINITY
            for (i = 0; i < global_priority.length; i++) {
                if (max < global_priority[i]) {
                    max = global_priority[i]
                    index = i
                }
            }

            request = req.body.value.alternative
            if (index + 1 != request) {
                response.status = 'wrong'
                response.body.add('Альтернатива')
            }

            response.body = Array.from(response.body).join(', ')
            console.log(response)

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

    app.post('/restapi/hierarchies/get_session', async (req, res) => {
        let sessions = await db.collection('sessions').find({user_id: req.body.user_id}).toArray()
        let session = sessions[sessions.length - 1]
        let response = {
            session_id: session._id,
            data: session.variant,
            intro_done: session.intro.done,
            practice_done: session.practice.done,
            target_matrix_done: session.target_matrix.done,
            criterion_matrix1_done: session.criterion_matrix1.done,
            criterion_matrix2_done: session.criterion_matrix2.done,
            criterion_matrix3_done: session.criterion_matrix3.done,
            criterion_matrix4_done: session.criterion_matrix4.done,
            hierarchical_synthesis: {
                done: session.hierarchical_synthesis.done,
                matrix: [[], [], []],
                criterion_priority: [],
                global_priority: [],
                alternative: null,
            },
            add_test_done: session.add_test.done,
            mark: session.mark
        }
        let answers = session.target_matrix.answers
        if (answers.length) {
            response.target_matrix = answers[answers.length - 1]
        }
        answers = session.criterion_matrix1.answers
        if (answers.length) {
            response.criterion_matrix1 = answers[answers.length - 1]
        }
        answers = session.criterion_matrix2.answers
        if (answers.length) {
            response.criterion_matrix2 = answers[answers.length - 1]
        }
        answers = session.criterion_matrix3.answers
        if (answers.length) {
            response.criterion_matrix3 = answers[answers.length - 1]
        }
        answers = session.criterion_matrix4.answers
        if (answers.length) {
            response.criterion_matrix4 = answers[answers.length - 1]
        }
        answers = session.hierarchical_synthesis.answers
        if (answers.length) {
            let answer = answers[answers.length - 1]
            response.hierarchical_synthesis.matrix = answer.matrix
            response.hierarchical_synthesis.criterion_priority = answer.criterion_priority
            response.hierarchical_synthesis.global_priority = answer.global_priority
            response.hierarchical_synthesis.alternative = answer.alternative
        }
        if (!session.intro.done) {
            let questions = session.intro.questions
            if (questions.length) {
                let id = questions[questions.length - 1]._id
                let question = await db.collection('intro_test').findOne({_id:ObjectID(id)},{correct:0})
                response.intro_started = true
                response.question = question
            } else {
                response.intro_started = false
            }
        } else if (!session.practice.done) {
            let practice_questions = session.practice.questions
            response.intro_started = true
            if (practice_questions.length) {
                let id = practice_questions[practice_questions.length - 1]._id
                let type = practice_questions[practice_questions.length - 1].type
                let questions = await db.collection('practice_test').findOne({type: type}, {correct: 0})
                let question
                for (i in questions) {
                    if (questions[i]._id === id) {
                        question = questions[i]
                        delete question.correct
                        break
                    }
                }
                response.practice_started = true
                response.question = question
            } else {
                response.practice_started = false
            }
        } else {
            response.intro_started = true
            response.practice_started = true
            if (session.target_matrix.done &&
                session.criterion_matrix1.done &&
                session.criterion_matrix2.done &&
                session.criterion_matrix3.done &&
                session.criterion_matrix4.done &&
                session.hierarchierarchical_synthesis &&
                !session.add_test.done) {
                response.intro_started = true
                response.practice_started = true
                if (session.add_test.question) {
                    let question = await db.collection('add_test').findOne({_id:session.add_test.question})
                    delete question.correct
                    response.add_test_started = true
                    response.question = question
                } else {
                    response.add_test_started = false
                }
            }
        }
        res.send(response)
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

    let priority = []
    let norm = 0;
    for (i = 0; i < matrix.length; i++) {
        let row = matrix[i]
        priority.push(1);
        for (j = 0; j < row.length; j++) {
            priority[i] *= row[j]
        }
        priority[i] = Math.pow(priority[i], 1/matrix.length)
        norm += priority[i]
    }

    let weight = []
    for (i = 0; i < priority.length; i++) {
        weight.push(priority[i]/norm)
    }

    let mweight = math.multiply(matrix, weight)
    let lambda = []
    let max_lambda = 0
    for (i = 0; i < mweight.length; i++) {
        lambda.push(mweight[i]/weight[i])
        max_lambda += mweight[i]/weight[i]
    }
    max_lambda /= mweight.length

    let c_index = (max_lambda-mweight.length)/(mweight.length-1)
    let c_relation = (c_index/c_random[mweight.length])

    if (c_relation > 0.1) {
        let max = 0
        let index = 0
        for (i = 0; i < priority.length; i++) {
            if (max < priority[i]) {
                max = priority[i]
                index = i
            }
        }

        let new_matrix = matrix
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
