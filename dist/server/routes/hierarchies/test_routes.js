module.exports = function(app, db, ObjectID) {
    app.post('/restapi/hierarchies/intro_test', (req, res) => {
        db.collection('test').find().project({correct: 0}).toArray((err, result) => {
            if (err) {
                res.end()
                throw err
            }
            var index = Math.floor(Math.random() * result.length)
            var question = result[index]

            var filter = {
                '_id': ObjectID(req.body.session_id),
            }
            var update = {
                $push: {
                    'intro.questions': {
                        question: question,
                        errors: 0
                    }
                }
            }
            db.collection('session').updateOne(filter, update, (err, result) => {
                if (err) {
                    res.end()
                    throw err
                }
                res.send(question)
            })
        })
    })

    app.post('/restapi/hierarchies/intro_test_validate', (req, res) => {
        db.collection('test').findOne({'_id': ObjectID(req.body.question_id)}, (err, result) => {
            if (err) {
                res.end()
                throw err
            }
            var question = result

            db.collection('session').findOne({'_id': ObjectID(req.body.session_id)}, (err, result) => {
                if (err) {
                    res.end()
                    throw err
                }

                var session = result
                var answered_questions = result.intro.questions.filter(obj => {
                    return obj.errors < 2
                })

                if (question.correct === req.body.answer) {
                    if (answered_questions.length < 5) {
                        db.collection('test').find().project({correct: 0}).toArray((err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }

                            for (i = 0; i < session.intro.questions.length; i++) {
                                result = result.filter((obj) => {
                                    return obj.question !== session.intro.questions[i].question.question
                                })
                            }

                            var index = Math.floor(Math.random() * result.length)
                            var new_question = result[index]

                            var filter = {
                                '_id': ObjectID(req.body.session_id),
                            }
                            var update = {
                                $push: {
                                    'intro.questions': {
                                        question: new_question,
                                        errors: 0,
                                    },
                                }
                            }
                            db.collection('session').updateOne(filter, update, (err, result) => {
                                if (err) {
                                    res.end()
                                    throw err
                                }

                                var response = {
                                    status: 'right',
                                    question: new_question
                                }
                                res.send(response)
                            })
                        })
                    } else {
                        res.send({ status: 'done' })
                    }
                } else {
                    session.intro.points -= 0.5
                    if (session.intro.points === 0) {
                        var filter = {
                            '_id': ObjectID(req.body.session_id),
                            'intro.questions.question._id': ObjectID(req.body.question_id)
                        }
                        var update = {
                            $inc: {
                                'intro.questions.$.errors': 1,
                            },
                            $set: {
                                'intro.points': session.intro.points
                            }
                        }
                        db.collection('session').updateOne(filter, update, (err, result) => {
                            if (err) {
                                res.end()
                                throw(err)
                            }

                            delete question.correct
                            var response = {
                                status: 'over'
                            }
                            res.send(response)
                        })
                    }
                    else {
                        var i
                        for (i = 0; i < session.intro.questions.length; i++) {
                            if (session.intro.questions[i].question._id.equals(question._id)) {
                                break
                            }
                        }

                        if (session.intro.questions[i].errors === 0) {
                            var filter = {
                                '_id': ObjectID(req.body.session_id),
                                'intro.questions.question._id': ObjectID(req.body.question_id)
                            }
                            var update = {
                                $inc: {
                                    'intro.questions.$.errors': 1
                                },
                                $set: {
                                    'intro.points': session.intro.points
                                }
                            }
                            db.collection('session').updateOne(filter, update, (err, result) => {
                                if (err) {
                                    res.end()
                                    throw(err)
                                }

                                delete question.correct
                                var response = {
                                    status: 'wrong',
                                    question: question
                                }
                                res.send(response)
                            })
                        } else {
                            db.collection('test').find().project({correct: 0}).toArray((err, result) => {
                                if (err) {
                                    res.end()
                                    throw err
                                }

                                for (i = 0; i < session.intro.questions.length; i++) {
                                    result = result.filter((obj) => {
                                        return obj.question !== session.intro.questions[i].question.question
                                    })
                                }

                                var index = Math.floor(Math.random() * result.length)
                                var new_question = result[index]

                                var filter = {
                                    '_id': ObjectID(req.body.session_id),
                                    'intro.questions.question._id': ObjectID(req.body.question_id)
                                }
                                var update = {
                                    $inc: {
                                        'intro.questions.$.errors': 1
                                    },
                                    $set: {
                                        'intro.points': session.intro.points
                                    }
                                }
                                db.collection('session').updateOne(filter, update, (err, result) => {
                                    if (err) {
                                        res.end()
                                        throw err
                                    }

                                    var update = {
                                        $push: {
                                            'intro.questions': {
                                                question: new_question,
                                                errors: 0
                                            }
                                        }
                                    }
                                    db.collection('session').updateOne(filter, update, (err, result) => {
                                        if (err) {
                                            res.end()
                                            throw err
                                        }

                                        var response = {
                                            status: 'wrong',
                                            question: new_question
                                        }
                                        res.send(response)
                                    })
                                })
                            })
                        }
                    }
                }
            })
        })
    })

    app.post('/restapi/hierarchies/practice_test', (req, res) => {
        db.collection('test2').find().project().toArray((err, result) => {
            if (err) {
                res.end()
                throw err
            }

            var index = Math.floor(Math.random() * result[0].questions.length)
            var question = result[0].questions[index]
            question['type'] = result[0].type

            var filter = {
                '_id': ObjectID(req.body.session_id)
            }
            var update = {
                $push: {
                    'practice.questions': {
                        question: question,
                        errors: 0
                    }
                }
            }
            db.collection('session').updateOne(filter, update, (err, result) => {
                if (err) {
                    res.end()
                    throw err
                }

                delete question.correct
                res.send(question)
            })
        })
    })

    app.post('/restapi/hierarchies/practice_test_validate', (req, res) => {
        db.collection('session').findOne({'_id': ObjectID(req.body.session_id)}, (err, result) => {
            if (err) {
                res.end()
                throw err
            }

            var session = result
            var questions = session.practice.questions
            var current = questions[questions.length - 1]
            if (current.question.correct === req.body.answer) {
                db.collection('test2').find().toArray((err, result) => {
                    if (err) {
                        res.end()
                        throw err
                    }

                    var questions = result
                    for (i = 0; i < session.practice.questions.length; i++) {
                        questions = questions.filter((obj) => {
                            return obj.type !== session.practice.questions[i].question.type
                        })
                    }

                    var filter, update, response
                    if (questions.length !== 0) {
                        var index = Math.floor(Math.random() * questions[0].questions.length)
                        var question = questions[0].questions[index]
                        question['type'] = questions[0].type

                        filter = {
                            '_id': ObjectID(req.body.session_id)
                        }
                        update = {
                            $push: {
                                'practice.questions': {
                                    question: question,
                                    errors: 0
                                }
                            }
                        }

                        response = {
                            status: 'right',
                            question: question,
                        }
                        db.collection('session').updateOne(filter, update, (err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }
                            res.send(response)
                        })
                    }
                    else {
                        response = {
                            status: 'done'
                        }
                        res.send(response)
                    }
                })
            } else {
                if (session.practice.points === 1) {
                    var filter = {
                        '_id': ObjectID(req.body.session_id)
                    }
                    var update = {
                        $inc: {
                            'practice.points': -1
                        }
                    }
                    db.collection('session').updateOne(filter, update, (err, result) => {
                        if (err) {
                            res.end()
                            throw err
                        }
                        var response = {
                            status: 'over'
                        }
                        res.send(response)
                    })
                } else {
                    if (current.errors === 1) {
                        db.collection('test2').find().toArray((err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }

                            var new_questions = result
                            var new_question
                            for (i = 0; i < new_questions.length; i++) {
                                if (new_questions[i].type === current.question.type) {
                                    new_question = new_questions[i].questions
                                    break
                                }
                            }

                            for (i = 0; i < session.practice.questions.length; i++) {
                                new_question = new_question.filter(obj => {
                                    return !(session.practice.questions[i].question._id.equals(obj._id))
                                })
                            }

                            var index = Math.floor(Math.random() * new_question.length)
                            var question = new_question[index]
                            question['type'] = current.question.type

                            filter = {
                                '_id': ObjectID(req.body.session_id),
                                'practice.questions.question._id': ObjectID(req.body.question_id)
                            }
                            update = {
                                $inc: {
                                    'practice.questions.$.errors': 1,
                                    'practice.points': -1
                                }
                            }
                            db.collection('session').updateOne(filter, update, (err, result) => {
                                if (err) {
                                    res.end()
                                    throw err
                                }

                                filter = {
                                    '_id': ObjectID(req.body.session_id)
                                }
                                update = {
                                    $push: {
                                        'practice.questions': {
                                            question: question,
                                            errors: 0
                                        }
                                    }
                                }
                                response = {
                                    status: 'wrong',
                                    question: question,
                                }
                                db.collection('session').updateOne(filter, update, (err, result) => {
                                    if (err) {
                                        res.end()
                                        throw err
                                    }

                                    delete response.question.correct
                                    res.send(response)
                                })
                            })
                        })
                    } else {
                        var filter = {
                            '_id': ObjectID(req.body.session_id),
                            'practice.questions.question._id': ObjectID(req.body.question_id)
                        }
                        var update = {
                            '$inc': {
                                'practice.questions.$.errors': 1,
                                'practice.points': -1
                            }
                        }
                        db.collection('session').updateOne(filter, update, (err, result) => {
                            if (err) {
                                res.end()
                                throw err
                            }
                            response = {
                                status: 'wrong',
                                question: current.question
                            }
                            res.send(response)
                        })
                    }
                }
            }
        })
    })

    app.post('/restapi/hierarchies/add_test', (req, res) => {
        db.collection('test3').find().toArray((err, result) => {
            if (err) {
                res.end()
                throw err
            }
            var index = Math.floor(Math.random() * result.length)
            var question = result[index]

            var filter = {
                '_id': ObjectID(req.body.id)
            }
            var update = {
                $set: {
                    'add_test.question': question
                }
            }
            db.collection('session').updateOne(filter, update, (err, result) => {
                if (err) {
                    res.end()
                    throw err
                }

                res.send(question)
            })
        })
    })

    app.post('/restapi/hierarchies/add_test_validate', (req, res) => {
        db.collection('test3').findOne({'_id': ObjectID(req.body.question_id)}, (err, result) => {
            var question = result
            db.collection('session').findOne({'_id': ObjectID(req.body.session_id)}, (err, result) => {
                var response, update
                if (req.body.answer === question.correct) {
                    mark = result.intro.points +
                    result.practice.points +
                    result.target_matrix.points +
                    result.criterion_matrix1.points +
                    result.criterion_matrix2.points +
                    result.criterion_matrix3.points +
                    result.criterion_matrix4.points +
                    result.hierarchical_synthesis.points +
                    result.add_test.points

                    response = {
                        status: 'done',
                        mark: mark
                    }
                    update = {
                        $set: {
                            mark: mark
                        }
                    }
                } else {
                    if (result.add_test.points === 10) {
                        response = {
                            status: 'wrong'
                        }
                        update = {
                            $inc: {
                                'add_test.points': -5
                            }
                        }
                    } else {

                        mark = result.intro.points +
                            result.practice.points +
                            result.target_matrix.points +
                            result.criterion_matrix1.points +
                            result.criterion_matrix2.points +
                            result.criterion_matrix3.points +
                            result.criterion_matrix4.points +
                            result.hierarchical_synthesis.points +
                            result.add_test.points - 5

                        update = {
                            $inc: {
                                'add_test.points': -5
                            },
                            $set: {
                                mark: mark
                            }
                        }
                        response = {
                            status: 'over',
                            mark: mark
                        }
                    }
                }

                var filter = {
                    '_id': ObjectID(req.body.session_id)
                }
                db.collection('session').updateOne(filter, update, (err, result) => {
                    if (err) {
                        res.end()
                        throw(err)
                    }

                    res.send(response)
                })
            })
        })
    })
}
