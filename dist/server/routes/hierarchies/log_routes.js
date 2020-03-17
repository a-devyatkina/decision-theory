module.exports = function(app, db, ObjectID) {
    app.post('restapi/hierarchies/log', (req, res) => {
        var query = { session: req.body.session }
        var update = {
            $set: req.body.value
        }
        db.collection('logs').updateOne(query, update, {upsert: true}, (err, result) => {
            if (err) {
                res.end();
                throw err
            }
            if (result.result.ok === 1)
                res.send('ok')
            else
                res.send('error')
        })
    })
}
