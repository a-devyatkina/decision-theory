const lang = require("../lang/index.js")
const firebase = require("../firebase/index.js")
const database = firebase.database();
const config = require("../config.json");
const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
    host: config.mailer.server,
    port: config.mailer.port,
    secure: config.mailer.secure,
    auth: {
        user: config.mailer.sender,
        pass: config.mailer.password,
    }
})

async function sendRegRequestNotification(request, maillist) {
  const mailOptions = {
    from: config.mailer.sender,
    to: maillist.join()
  }

  mailOptions.subject = lang.__('MEPhI-lab registration request')
  mailOptions.text = lang.__('Received request for registration from user with name %s and email %s', request.name, request.email)

  try {
    await mailTransport.sendMail(mailOptions)
    console.log('Sent notification about registration to ' + maillist.join())
  } catch(error) {
    console.error('There was an error while sending notification about registration to ' + maillist.join() + ':' + error)
  }
}

async function sendRegResultNotification(request, accepted) {
  const mailOptions = {
    from: config.mailer.sender,
    to: request.email
  }

  mailOptions.subject = lang.__('MEPhI-lab registration request')
  mailOptions.text = accepted ?
        lang.__('Your request for registration was accepted. Welcome to MEPhI-lab!') :
        lang.__('Your request for registration was rejected. Check registration info and try again.')

  try {
    await mailTransport.sendMail(mailOptions)
    console.log('Sent notification about result of registration to ' + request.email)
  } catch (error) {
    console.error('There was an error while sending notification about result of registration to ' + request.email + ':' + error)
  }
}

module.exports.createRegRequest = async (request, callback) => {
  try {
    let snapshot = await database.ref('registrations').push({
      name: request.name,
      group: request.group,
      email: request.email,
      phone: request.phone,
      address: request.address,
      role: request.role
    })
    let admins = await database.ref('admin').once('value')
    let maillist = []
    admins.forEach(function (child) {
      maillist.push(child.val().email)
    })
    sendRegRequestNotification(request, maillist)
    return callback(snapshot.key)
  } catch (error) {
    return callback(null, error)
  }
}

module.exports.acceptRegRequest = async (rid, callback) => {
  console.log('Acceptind reg request: ' + rid)
  try {
    let snapshot = await database.ref('registrations').child(rid).once('value')
    let request = snapshot.val()
    if (request.role === 'student') {
      let studentRef = await database.ref('students').push({
        name: request.name,
        group: request.group,
        email: request.email,
        phone: request.phone,
        address: request.address,
        outdated: false
      })
      let studentKey = studentRef.key
      let coursesRef = await database.ref('courses').once('value')
      coursesRef.forEach(child => {
        let course = child.val()
        let courseKey = child.key
        if (course.groups[request.group] !== undefined) {
          for (let lid in course.groups[request.group].labs) {
            database.ref('works').push({
              student: studentKey,
              course: courseKey,
              teacher: course.teacher,
              lab: lid,
              stage: 'unassign',
              task: '',
              solution: '',
              score: 0
            }, error => {
              if (error) {
                console.log(error)
              }
            })
          }
        }
      })
    } else if (request.role === 'teacher') {
      await database.ref('teachers').push({
        name: request.name,
        email: request.email,
        phone: request.phone,
        address: request.address,
        outdated: false
      })
    } else {
      return callback('unknown role')
    }
    await database.ref('registrations').child(rid).remove()
    await sendRegResultNotification(request, true)
  } catch (error) {
    return callback(error)
  }
  return callback()
}

module.exports.rejectRegRequest = async (rid, callback) => {
  try {
    let snapshot = await database.ref('registrations').child(rid).once('value')
    let request = snapshot.val()
    await database.ref('registrations').child(rid).remove()
    await sendRegResultNotification(request, false)
  } catch (error) {
    return callback(error)
  }
  return callback()
}
