module.exports = function(app, db, ObjectID) {
    app.post('/restapi/hierarchies/intro_test', async (req, res) => {
        let questions = await db.collection('intro_test').find().project({correct:0}).toArray()
        let index = Math.floor(Math.random() * questions.length)
        let question = questions[index]
        let filter = {'_id': ObjectID(req.body.session_id)}
        let update = {
            $push: {
                'intro.questions': {
                    _id: ObjectID(question._id),
                    answers: [],
                    errors: 0,
                    answered: false
                }
            }
        }
        await db.collection('sessions').updateOne(filter, update)
        res.send(question)
    })

    app.post('/restapi/hierarchies/validate_intro_test', async (req, res) => {
        let question = await db.collection('intro_test').findOne({'_id': ObjectID(req.body.question_id)})
        let session = await db.collection('sessions').findOne({'_id': ObjectID(req.body.session_id)})
        let intro = session.intro
        let length = intro.questions.length - 1
        let response
        intro.questions[length].answers.push(req.body.answer)
        if (req.body.answer === question.correct) {
            let answered_questions = intro.questions.filter(obj => {
                return obj.answered === true
            }).length
            if (answered_questions === 4) {
                intro.done = true
                intro.questions[length].answered = true
                response = {status: 'done'}
            } else {
                answered_questions = []
                for (i in intro.questions) {
                    answered_questions.push(intro.questions[i]._id)
                }
                let questions = await db.collection('intro_test').find({'_id':{$nin:answered_questions}}).project({correct:0}).toArray()
                let index = Math.floor(Math.random() * questions.length)
                let new_question = questions[index]
                intro.questions[length].answered = true
                intro.questions.push({
                    _id: ObjectID(new_question._id),
                    answers: [],
                    errors: 0,
                    answered: false
                })
                response = {
                    status: 'right',
                    question: new_question
                }
            }
        } else {
            intro.points -= 0.5
            intro.questions[length].errors += 1
            if (intro.points !== 0) {
                if (intro.questions[length].errors === 2) {
                    answered_questions = []
                    for (i in intro.questions) {
                        answered_questions.push(ObjectID(intro.questions[i]._id))
                    }
                    let questions = await db.collection('intro_test').find({'_id':{$nin:answered_questions}}).project({correct:0}).toArray()
                    let index = Math.floor(Math.random() * questions.length)
                    let new_question = questions[index]
                    response = {
                        status: 'wrong',
                        question: new_question
                    }
                    intro.questions.push({
                        _id: ObjectID(new_question._id),
                        answers: [],
                        errors: 0,
                        answered: false
                    })
                } else {
                    delete question.correct
                    response = {
                        status: 'wrong',
                        question: question
                    }
                }
            } else {
                response = {status: 'over'}
            }
        }
        await db.collection('sessions').updateOne({'_id': ObjectID(session._id)}, {$set:{'intro':intro}})
        res.send(response)
    })

    app.post('/restapi/hierarchies/practice_test', async (req, res) => {
        let practice = await db.collection('practice_test').find().project({correct:0}).toArray()
        let index = Math.floor(Math.random() * practice[0].questions.length)
        let question = practice[0].questions[index]
        question['type'] = practice[0].type
        let filter = {'_id': ObjectID(req.body.session_id)}
        let update = {
            $push: {
                'practice.questions': {
                    _id: question._id,
                    type: question.type,
                    answers: [],
                    errors: 0,
                    answered: false
                }
            }
        }
        await db.collection('sessions').updateOne(filter, update)
        delete question.correct
        res.send(question)
    })

    app.post('/restapi/hierarchies/practice_test_validate', async (req, res) => {
        let session = await db.collection('sessions').findOne({'_id': ObjectID(req.body.session_id)})
        let practice = session.practice
        let length = practice.questions.length - 1
        let question = await db.collection('practice_test').findOne({'type':practice.questions[length].type})
        question = question.questions.find((el, index, array) => {
            if (el._id.equals(req.body.question_id)) return true
            else return false
        })
        question.type = practice.questions[length].type
        practice.questions[length].answers.push(req.body.answer)
        let response
        let filter = {'_id': ObjectID(req.body.session_id)}
        if (question.correct === req.body.answer) {
            practice.questions[length].answered = true
            questions = await db.collection('practice_test').find().toArray()
            for (i = 0; i < practice.questions.length; i++) {
                questions = questions.filter((obj) => {
                    return obj.type !== practice.questions[i].type
                })
            }
            if (questions.length !== 0) {
                let index = Math.floor(Math.random() * questions[0].questions.length)
                let new_question = questions[0].questions[index]
                new_question['type'] = questions[0].type
                practice.questions.push({
                    _id: new_question._id,
                    type: new_question.type,
                    answers: [],
                    errors: 0
                })
                response = {
                    status: 'right',
                    question: new_question,
                }
            }
            else {
                practice.done = true
                response = {status: 'done'}
            }
        } else {
            practice.points -= 1
            practice.questions[length].errors += 1
            if (practice.points === 0) {
                response = {status: 'over'}
            } else if (practice.questions[length].errors < 2) {
                delete question.correct
                response = {
                    status: 'wrong',
                    question: question
                }
            } else {
                let practice_questions = await db.collection('practice_test').find().toArray()
                let new_questions
                for (i = 0; i < practice_questions.length; i++) {
                    if (practice_questions[i].type === question.type) {
                        new_questions = practice_questions[i].questions
                        break
                    }
                }
                for (i = 0; i < practice.questions.length; i++) {
                    new_questions = new_questions.filter(obj => {
                        return !(practice.questions[i]._id.equals(obj._id))
                    })
                }
                if (new_questions.length) {
                    let index = Math.floor(Math.random() * new_questions.length)
                    let new_question = new_questions[index]
                    new_question['type'] = question.type
                    delete new_question.correct
                    filter = {'_id': ObjectID(req.body.session_id)}
                    practice.questions.push({
                        _id: new_question._id,
                        type: new_question.type,
                        answers: [],
                        errors: 0,
                        answered: false
                    })
                    response = {
                        status: 'wrong',
                        question: new_question,
                    }
                } else {
                    for (i = 0; i < practice.questions.length; i++) {
                        practice_questions = practice_questions.filter((obj) => {
                            return obj.type !== practice.questions[i].type
                        })
                    }
                    if (practice_questions.length) {
                        let index = Math.floor(Math.random() * practice_questions[0].questions.length)
                        let new_question = practice_questions[0].questions[index]
                        new_question['type'] = practice_questions[0].type
                        practice.questions.push({
                            _id: new_question._id,
                            type: new_question.type,
                            answers: [],
                            errors: 0
                        })
                        response = {
                            status: 'wrong',
                            question: new_question,
                        }
                    }
                    else {
                        practice.done = true
                        response = {status: 'done'}
                    }
                }
            }

        }
        await db.collection('sessions').updateOne(filter, {'$set':{'practice':practice}})
        res.send(response)
    })

    app.post('/restapi/hierarchies/add_test', async (req, res) => {
        let questions = await db.collection('add_test').find().project({correct:0}).toArray()
        let index = Math.floor(Math.random() * questions.length)
        let question = questions[index]
        let filter = {'_id': ObjectID(req.body.session_id)}
        let update = {
            $set: {
                'add_test.question': question._id
            }
        }
        await db.collection('sessions').updateOne(filter, update)
        res.send(question)
    })

    app.post('/restapi/hierarchies/add_test_validate', async (req, res) => {
        let question = await db.collection('add_test').findOne({'_id': ObjectID(req.body.question_id)})
        let session = await db.collection('sessions').findOne({'_id': ObjectID(req.body.session_id)})
        let filter = {'_id': ObjectID(req.body.session_id)}
        let update = {
            $push: {
                'add_test.answers': req.body.answer
            }
        }
        let response
        if (req.body.answer === question.correct) {
            mark = session.intro.points +
            session.practice.points +
            session.target_matrix.points +
            session.criterion_matrix1.points +
            session.criterion_matrix2.points +
            session.criterion_matrix3.points +
            session.criterion_matrix4.points +
            session.hierarchical_synthesis.points +
            session.add_test.points

            response = {
                status: 'done',
                mark: mark
            }
            update['$set'] = {
                'mark': mark,
                'add_test.done': true
            }
        } else {
            update['$inc'] = {
                'add_test.points': -5
            }
            if (session.add_test.points === 10) {
                delete question.correct
                response = {
                    status: 'wrong',
                    question: question
                }
            } else {
                mark = session.intro.points +
                    session.practice.points +
                    session.target_matrix.points +
                    session.criterion_matrix1.points +
                    session.criterion_matrix2.points +
                    session.criterion_matrix3.points +
                    session.criterion_matrix4.points +
                    session.hierarchical_synthesis.points +
                    session.add_test.points - 5

                update['$set'] = {
                    mark: mark,
                    'add_test.done': true
                }
                response = {
                    status: 'over',
                    mark: mark
                }
            }
        }
        await db.collection('sessions').updateOne(filter, update)
        res.send(response)
    })
}
