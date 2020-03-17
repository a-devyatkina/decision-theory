import model from './model'
import Vue from 'vue'
import { Cookies } from 'quasar'

export async function fillLabs ({ state, commit }) {
  let labs = await model.labs.list()
  // for (let lid in labs) {
  //   if (labs[lid].files !== undefined) {
  //     for (let file of labs[lid].files) {
  //       if (file.length > 0) {
  //         let url = await model.storage.url(labs[lid].teacher, file)
  //         commit('updateLink', { owner: labs[lid].teacher, file: file, url: url })
  //       }
  //     }
  //   }
  // }
  commit('fillLabs', labs)
}

export function listenLabs ({commit}) {
  model.labs.listen(async data => {
    commit('updateLab', data)
    // if (data.lab.files !== undefined) {
    //   for (let file of data.lab.files) {
    //     if (file.length > 0) {
    //       let url = await model.storage.url(data.lab.teacher, file)
    //       commit('updateLink', { owner: data.lab.teacher, file: file, url: url })
    //     }
    //   }
    // }
  }, async data => {
    commit('updateLab', data)
    // if (data.lab.files !== undefined) {
    //   for (let file of data.lab.files) {
    //     if (file.length > 0) {
    //       let url = await model.storage.url(data.lab.teacher, file)
    //       commit('updateLink', { owner: data.lab.teacher, file: file, url: url })
    //     }
    //   }
    // }
  }, lid => {
    commit('removeLab', lid)
  })
}

export async function fillFileLinkForDownload ({commit}, {owner, file}) {
  let url = await model.storage.url(owner, file)
  commit('updateLink', { owner, file, url })
}

export function unlistenLabs ({ commit }) {
  model.labs.unlisten()
}

export async function createLab ({ commit }, { name, description, teacher, files, outdated }) {
  let lid = await model.labs.create(name, description, teacher, files, outdated)
  commit('updateLab', { lid: lid, lab: { name, description, teacher, files, outdated } })
}

export async function updateLab ({ commit }, { lid, name, description, teacher, files, outdated }) {
  await model.labs.update(lid, name, description, teacher, files, outdated)
  commit('updateLab', { lid: lid, lab: { name, description, teacher, files, outdated } })
}

export async function removeLab ({ state, commit }, { lid }) {
  let archive = false
  for (let wid in state.works) {
    if (state.works[wid].lab === lid) {
      archive = true
      break
    }
  }
  if (archive) {
    let lab = state.labs[lid]
    if (lab) {
      await model.labs.update(lid, lab.name, lab.description, lab.teacher, lab.files, true)
      commit('updateLab', { lid: lid, lab: { name: lab.name, description: lab.description, teacher: lab.teacher, files: lab.files, outdated: true } })
    }
    return
  }
  await model.labs.remove(lid)
  commit('removeLab', lid)
}

export async function listenGroups ({commit}) {
  model.groups.listen(data => {
    commit('updateGroup', data)
  }, data => {
    commit('updateGroup', data)
  }, gid => {
    commit('removeGroup', gid)
  })
}

export async function unlistenGroups ({ commit }) {
  model.groups.unlisten()
}

export async function createGroup ({ commit }, { name, description, outdated }) {
  await model.groups.create(name, description, outdated)
}

export async function updateGroup ({ commit }, { gid, name, description, outdated }) {
  await model.groups.update(gid, name, description, outdated)
}

export async function removeGroup ({ state }, { gid }) {
  let archive = false
  for (var sid in state.students) {
    if (state.students[sid].group === gid) {
      archive = true
      break
    }
  }
  if (archive) {
    let group = state.groups[gid]
    if (group) {
      await model.groups.update(gid, group.name, group.description, true)
    }
  }
  await model.groups.remove(gid)
}

export async function listGroups ({ commit }) {
  let groups = await model.groups.list()
  commit('fillGroups', groups)
  return groups
}

export async function listenRegistrations ({ commit }) {
  model.registrations.listen(data => {
    commit('updateRegistration', data)
  }, data => {
    commit('updateRegistration', data)
  }, rid => {
    commit('removeRegistration', rid)
  })
}

export async function unlistenRegistrations ({ commit }) {
  model.registrations.unlisten()
}

export async function acceptRegistration ({ state }, { rid }) {
  await model.registrations.acceptRegRequest(rid)
}

export async function rejectRegistration ({ state }, { rid }) {
  await model.registrations.rejectRegRequest(rid)
}

export async function listenTeachers ({ commit }) {
  model.teachers.listen(data => {
    commit('updateTeacher', data)
  }, data => {
    commit('updateTeacher', data)
  }, tid => {
    commit('removeTeacher', tid)
  })
}

export async function unlistenTeachers ({ commit }) {
  model.teachers.unlisten()
}

export async function updateTeacher ({ commit }, { tid, teacher }) {
  let found = await model.teachers.find(teacher.email)
  if (found && found.tid !== tid) {
    throw Error('teacher with such email already exists')
  }
  await model.teachers.update(tid, teacher.name, teacher.email, teacher.phone, teacher.address, teacher.outdated)
  commit('updateTeacher', {
    tid: tid,
    teacher: { name: teacher.name, email: teacher.email, phone: teacher.phone, address: teacher.address, outdated: teacher.outdated }
  })
}

export async function createTeacher ({ commit }, { teacher }) {
  let found = await model.teachers.find(teacher.email)
  let tid = null
  if (found) {
    tid = found.tid
    if (found.teacher.outdated === true) {
      await model.teachers.update(tid, teacher.name, teacher.email, teacher.phone, teacher.address, teacher.outdated)
    } else {
      throw Error('teacher with such email already exists')
    }
  } else {
    tid = await model.teachers.create(teacher.name, teacher.email, teacher.phone, teacher.address, teacher.outdated)
  }
  commit('updateTeacher', {
    tid: tid,
    teacher: { name: teacher.name, email: teacher.email, phone: teacher.phone, address: teacher.address, outdated: teacher.outdated }
  })
}

export async function removeTeacher ({ commit }, { tid }) {
  await model.teachers.remove(tid)
}

export async function listenStudents ({ commit }) {
  model.students.listen(data => {
    commit('updateStudent', data)
  }, data => {
    commit('updateStudent', data)
  }, sid => {
    commit('removeStudent', sid)
  })
}

export async function unlistenStudents ({ commit }) {
  model.students.unlisten()
}

export async function createStudent ({ state }, { name, group, email, phone, address, outdated }) {
  let found = await model.students.find(email)
  if (found) {
    if (found.student.outdated === true) {
      await model.students.update(found.sid, name, group, email, phone, address, false)
    } else {
      throw Error('student with such email already exists')
    }
  } else {
    let sid = await model.students.create(name, group, email, phone, address, outdated)
    for (let cid in state.courses) {
      if (state.courses[cid].groups[group] !== undefined) {
        for (let lid in state.courses[cid].groups[group].labs) {
          await model.works.create(sid, cid, state.courses[cid].teacher, lid, 'unassign', '', '', 0)
        }
        for (let lid in state.courses[cid].groups[group].hierarchieslab) {
          await model.hierarchieswork.create(sid, cid, state.courses[cid].teacher, lid, 0, 'unassign', '', 0, 0, '', '', 0, '')
        }
      }
    }
  }
}

export async function findStudent ({ state }, { email }) {
  let found = await model.students.find(email)
  return found
}

export async function updateStudent ({ commit }, { sid, name, group, email, phone, address, outdated }) {
  let found = await model.students.find(email)
  if (found && sid !== found.sid) {
    throw Error('student with such email already exists')
  }
  await model.students.update(sid, name, group, email, phone, address, outdated)
}

export async function removeStudent ({ state }, { sid }) {
  let remove = true
  for (let wid in state.works) {
    if (state.works[wid].student === sid) {
      remove = false
      break
    }
  }

  if (remove) {
    await model.students.remove(sid)
    for (let aid in state.attendance) {
      if (state.attendance[aid].student === sid) {
        Vue.delete(state.attendance, aid)
        await model.attendance.remove(aid)
        break
      }
    }
  } else {
    let student = state.students[sid]
    if (student) {
      await model.students.update(
        sid, student.name, student.group, student.email, student.phone, student.address, true
      )
    }
  }
}

export async function listenWorks ({ state, commit, dispatch }) {
  model.works.listen(state.user, async data => {
    commit('updateWork', data)
    // if (data.work.solution && data.work.solution.length > 0) {
    //   let url = await model.storage.url(data.work.student, data.work.solution)
    //   commit('updateLink', { owner: data.work.student, file: data.work.solution, url: url })
    // }
  }, async data => {
    commit('updateWork', data)
    // if (data.work.solution && data.work.solution.length > 0) {
    //   let url = await model.storage.url(data.work.student, data.work.solution)
    //   commit('updateLink', { owner: data.work.student, file: data.work.solution, url: url })
    // }
  }, wid => {
    commit('removeWork', wid)
  })
}

export async function unlistenWorks ({ commit }) {
  model.works.unlisten()
}

export async function updateWork ({ commit }, { wid, work, history }) {
  await model.works.update(wid, work.student, work.course, work.teacher, work.lab, work.stage, work.task, work.solution, work.score)
  await model.histories.update(wid, history)
}

export async function listenAttendance ({ state, commit }) {
  model.attendance.listen(state.user, data => {
    commit('updateAttendance', data)
  }, data => {
    commit('updateAttendance', data)
  }, aid => {
    commit('removeAttendance', aid)
  })
}

export async function unlistenAttendance ({ commit }) {
  model.attendance.unlisten()
}

export async function listenHistory ({ state, commit }, { wid }) {
  model.histories.listen(wid, async data => {
    const validHistory = clearUnvalidHistory(data.history, state.works[wid])
    commit('updateHistory', {
      wid,
      history: validHistory
    })
    // for (let stage of validHistory) {
    //   if (stage.file && stage.file.length > 0) {
    //     let url = await model.storage.url(stage.author, stage.file)
    //     commit('updateLink', { owner: stage.author, file: stage.file, url: url })
    //   }
    // }
  }, async data => {
    const validHistory = clearUnvalidHistory(data.history, state.works[wid])
    commit('updateHistory', {
      wid,
      history: validHistory
    })
    // for (let stage of validHistory) {
    //   if (stage.file && stage.file.length > 0) {
    //     let url = await model.storage.url(stage.author, stage.file)
    //     commit('updateLink', { owner: stage.author, file: stage.file, url: url })
    //   }
    // }
  }, aid => {
    commit('removeHistory', aid)
  })
}

const clearUnvalidHistory = (historyStack, work) => {
  let validHistoryStack = []
  work.score = 0
  work.task = ''
  work.solution = ''
  work.stage = 'unassign'
  for (const stage of historyStack) {
    if (!(((stage.action === 'assign' || stage.action === 'resolve') && !stage.file) ||
      (stage.action === 'comment' && !stage.comment) ||
      (stage.action === 'close' && !stage.score)
    )) {
      validHistoryStack.push(stage)

      if (stage.action === 'close') {
        work.score = stage.score
        work.stage = stage.action
      } else if (stage.action === 'resolve') {
        work.solution = stage.file
        work.stage = stage.action
        work.score = 0
      } else if (stage.action === 'assign') {
        work.task = stage.file
        work.stage = stage.action
        work.score = 0
      } else if (stage.action === 'improve') {
        work.score = 0
        work.stage = stage.action
      } else if (stage.action === 'unassign') {
        work.score = 0
        work.task = ''
        work.solution = ''
        work.stage = stage.action
      }
    }
  }
  return validHistoryStack
}

export async function unlistenHistory ({ commit }, { wid }) {
  model.histories.unlisten(wid)
}

export async function subscribeDatabase ({ state, commit, dispatch }) {
  if (state.user.role === 'teacher') {
    dispatch('listenGroups')
    dispatch('listenTeachers')
    dispatch('listenStudents')
    dispatch('listenWorks')
    dispatch('listenLabs')
    dispatch('listenSteplabHandles')
    dispatch('listenAttendance')
    dispatch('listenCourses')
    dispatch('listenHierarchieslab')
    dispatch('listenHierarchiesworks')
  } else if (state.user.role === 'student') {
    dispatch('listenTeachers')
    dispatch('listenLabs')
    dispatch('listenSteplabHandles')
    dispatch('listenWorks')
    dispatch('listenAttendance')
    dispatch('listenCourses')
    dispatch('listenHierarchieslab')
    dispatch('listenHierarchiesworks')
    commit('updateGroup', await model.groups.get(state.user.group))
  } else if (state.user.role === 'root') {
    dispatch('listenGroups')
    dispatch('listenTeachers')
    dispatch('listenRegistrations')
  }
}

export async function unsubscribeDatabase ({ dispatch }) {
  dispatch('unlistenGroups')
  dispatch('unlistenTeachers')
  dispatch('unlistenRegistrations')
  dispatch('unlistenLabs')
  dispatch('unlistenStudents')
  dispatch('unlistenWorks')
  dispatch('unlistenAttendance')
  dispatch('unlistenCourses')
  dispatch('unlistenHierarchieslab')
  dispatch('unlistenHierarchiesworks')
}

export async function loginUser ({ dispatch, commit }, { email, password }) {
  commit('clearError')
  commit('setLoading', true)
  try {
    const user = await model.user.loginByPassword(email, password)
    commit('setUser', user)
    commit('setLoading', false)
    dispatch('subscribeDatabase')
  } catch (error) {
    commit('setLoading', false)
    commit('setError', error.message)
    throw error
  }
}

export async function signInWithCustomToken ({ dispatch, commit }, { token }) {
  commit('clearError')
  commit('setLoading', true)
  try {
    const user = await model.user.loginWithCustomToken(token)
    commit('setUser', user)
    commit('setLoading', false)
    dispatch('subscribeDatabase')
  } catch (error) {
    commit('setLoading', false)
    commit('setError', error.message)
    throw error
  }
}

export async function signOut ({ dispatch, commit }) {
  commit('clearError')
  commit('setLoading', true)
  try {
    await model.user.logout()
    Cookies.remove('custom_token')
    commit('removeUser')
    commit('setLoading', false)
  } catch (error) {
    commit('setLoading', false)
    commit('setError', error.message)
    throw error
  }
  dispatch('unsubscribeDatabase')
}

export async function listenCourses ({ commit }) {
  model.courses.listen(data => {
    commit('updateCourse', data)
  }, data => {
    commit('updateCourse', data)
  }, cid => {
    commit('removeCourse', cid)
  })
}

export async function unlistenCourses ({ commit }) {
  model.courses.unlisten()
}

export async function addGroupToCourse ({ state, commit }, { cid, gid }) {
  let course = state.courses[cid]
  if (course) {
    Vue.set(course.groups, gid, { attendance: { maxScore: 5 } })
    await model.courses.update(cid, course.name, course.teacher, course.groups, course.archived)
  }
}

export async function delGroupFromCourse ({ state, commit }, { cid, gid }) {
  let course = state.courses[cid]
  if (course) {
    Vue.delete(course.groups, gid)
    await model.courses.update(cid, course.name, course.teacher, course.groups, course.archived)
  }
}

export async function createCourse ({ commit }, { name, teacher }) {
  let cid = await model.courses.create(name, teacher, {}, false)
  commit('createCourse', { cid: cid, course: { name: name, teacher: teacher, groups: {}, archived: false } })
}

export async function updateCourse ({ commit }, { cid, name, teacher, groups, archived }) {
  await model.courses.update(cid, name, teacher, groups, archived)
  commit('updateCourse', { cid: cid, course: { name: name, teacher: teacher, groups: groups, archived: archived } })
}

export async function removeCourse ({ commit }, { cid }) {
  await model.courses.remove(cid)
  commit('removeCourse', cid)
}

export async function archiveCourse ({ state, commit }, { cid }) {
  let course = state.courses[cid]
  if (course) {
    course.archived = true
    Vue.set(course, 'archived', true)
    await model.courses.update(cid, course.name, course.teacher, course.groups, course.archived)
  }
}

export async function unarchiveCourse ({ state }, { cid }) {
  let course = state.courses[cid]
  if (course) {
    Vue.set(course, 'archived', false)
    await model.courses.update(cid, course.name, course.teacher, course.groups, course.archived)
  }
}

export async function updatePlanLabs ({ state, getters, dispatch }, { cid, gid, labs, attendance, steplabs, hierarchieslab }) {
  let course = state.courses[cid]
  if (course) {
    let plan = course.groups[gid]
    if (plan) {
      for (let lid in labs) {
        for (let sid in state.students) {
          if (state.students[sid].group === gid) {
            let work = getters['getStudentWork'](sid, lid)
            if (!work) {
              await model.works.create(sid, cid, course.teacher, lid, 'unassign', '', '', 0)
            }
          }
        }
      }
      Vue.set(plan, 'labs', labs)

      for (let lid in steplabs) {
        for (let sid in state.students) {
          if (state.students[sid].group === gid) {
            await dispatch('createSteplab', { lid, uid: sid })
          }
        }
      }
      Vue.set(plan, 'steplabs', steplabs)

      for (let lid in hierarchieslab) {
        for (let sid in state.students) {
          if (state.students[sid].group === gid) {
            let work = getters['getStudentHierarchieswork'](sid, lid)
            if (!work) {
              await model.hierarchieswork.create(sid, cid, state.courses[cid].teacher, lid, 0, 'unassign', '', 0, 0, '', '', 0, '')
            }
          }
        }
      }
      Vue.set(plan, 'hierarchieslab', hierarchieslab)

      if (attendance !== undefined) {
        Vue.set(plan, 'attendance', attendance)
      } else {
        Vue.delete(plan, 'attendance')
      }
      await model.courses.update(cid, course.name, course.teacher, course.groups, course.archived)
    }
  }
}

export async function updateAttendance ({ state }, { cid, sid, tid, score }) {
  for (let aid in state.attendance) {
    if (state.attendance[aid].student === sid && state.attendance[aid].course === cid) {
      let attendance = state.attendance[aid]
      Vue.set(attendance, 'score', score)
      await model.attendance.update(aid, attendance.student, attendance.teacher, attendance.course, attendance.score)
      return
    }
  }
  let aid = await model.attendance.create(sid, tid, cid, score)
  Vue.set(state.attendance, aid, { student: sid, teacher: tid, course: cid, score: score })
}

export async function uploadFile ({ state, commit }, { file }) {
  let url = await model.storage.upload(state.user.id, file)
  commit('updateLink', { owner: state.user.id, file: file.name, url: url })
  return url
}

export async function deleteFile ({ state }, { file }) {
  let url = await model.storage.delete(state.user.id, file)
  return url
}

export async function getFileUrl ({ state }, { owner, file }) {
  let url = await model.storage.url(owner, file)
  return url
}

export async function getSteplab ({ commit }, { lid, uid }) {
  let steplab = await model.steplabs.getSteplab(lid, uid)
  commit('updateSteplab', { lid: lid, uid: uid, steplab: steplab })
  return steplab
}

export async function createSteplab ({ commit }, { lid, uid }) {
  await model.steplabs.createSteplab(lid, uid)
  let lab = await model.steplabs.getSteplab(lid, uid)
  commit('updateSteplab', { lid: lid, uid: uid, steplab: lab })
}

export async function removeSteplab ({ commit }, { lid, uid }) {
  await model.steplabs.removeSteplab(lid, uid)
  commit('removeSteplab', { lid: lid, uid: uid })
}

export async function updateSteplab ({ commit }, { lid, uid, steplab }) {
  await model.steplabs.updateSteplab(lid, uid, steplab)
  let lab = await model.steplabs.getSteplab(lid, uid)
  commit('updateSteplab', { lid: lid, uid: uid, steplab: lab })
}

export async function uploadSteplabPattern ({ commit }, { lid, file }) {
  await model.steplabs.uploadSteplabPattern(lid, file)
}

export async function updateSteplabPatternSchema ({ commit }, { lid, schema }) {
  await model.steplabs.setSteplabPatternSchema(lid, schema)
}

export async function getSteplabPatternSchema ({ commit }, { lid }) {
  let schema = await model.steplabs.getSteplabPatternSchema(lid)
  return schema
}

export async function removeSteplabPattern ({ commit }, { lid }) {
  await model.steplabs.removeSteplabPattern(lid)
}

export async function createSteplabHandle ({ commit }, { handle }) {
  let lid = await model.steplabs.createSteplabHandle(handle)
  commit('updateSteplabHandle', { lid, handle })
  return lid
}

export async function updateSteplabHandle ({ state, commit, dispatch }, { lid, handle }) {
  if (handle.outdated) {
    for (let cid in state.courses) {
      let course = state.courses[cid]
      let dirty = false
      for (let gid in course.groups) {
        if (course.groups[gid].steplabs && course.groups[gid].steplabs[lid]) {
          Vue.delete(course.groups[gid].steplabs, lid)
          dirty = true
        }
      }
      if (dirty) {
        await dispatch('updateCourse', { cid, ...course })
      }
    }
  }
  await model.steplabs.updateSteplabHandle(lid, handle)
  commit('updateSteplabHandle', { lid, handle })
}

export async function getSteplabHandle ({ commit }, { lid }) {
  let handle = await model.steplabs.getSteplabHandle(lid)
  commit('updateSteplabHandle', { lid, handle })
}

export async function fillSteplabHandles ({ state, commit }) {
  let handles = await model.steplabs.listSteplabHandles()
  for (let lid in handles) {
    let handle = handles[lid]
    commit('updateSteplabHandle', { lid, handle })
  }
}

export async function listenSteplabHandles ({ state, commit }) {
  model.steplabs.listen(data => {
    commit('updateSteplabHandle', data)
  }, data => {
    commit('updateSteplabHandle', data)
  }, lid => {
    commit('removeSteplabHandle', lid)
  })
}

export function listenHierarchieslab ({commit}) {
  model.hierarchieslab.listen(async data => {
    commit('updateHierarchieslab', data)
  }, async data => {
    commit('updateHierarchieslab', data)
  }, lid => {
    commit('removeHierarchieslab', lid)
  })
}

export function unlistenHierarchieslab ({ commit }) {
  model.hierarchieslab.unlisten()
}

export async function createHierarchieslab ({ commit }, { name, description, teacher }) {
  let lid = await model.hierarchieslab.create(name, description, teacher)
  commit('updateHierarchieslab', { lid: lid, lab: { name, description, teacher } })
}

export async function updateHierarchieslab ({ commit }, { lid, name, description, teacher }) {
  await model.hierarchieslab.update(lid, name, description, teacher)
  commit('updateHierarchieslab', { lid: lid, lab: { name, description, teacher } })
}

export async function removeHierarchieslab ({ state, commit }, { lid }) {
  let archive = false
  for (let wid in state.hierarchieswork) {
    if (state.hierarchieswork[wid].lab === lid) {
      archive = true
      break
    }
  }
  if (archive) {
    let lab = state.hierarchieslab[lid]
    if (lab) {
      await model.hierarchieslab.update(lid, lab.name, lab.description, lab.teacher)
      commit('updateHierarchieslab', { lid: lid, lab: { name: lab.name, description: lab.description, teacher: lab.teacher } })
    }
    return
  }
  await model.hierarchieslab.remove(lid)
  commit('removeHierarchieslab', lid)
}

export async function listenHierarchiesworks ({ state, commit, dispatch }) {
  model.hierarchieswork.listen(state.user, async data => {
    commit('updateHierarchieswork', data)
  }, async data => {
    commit('updateHierarchieswork', data)
  }, wid => {
    commit('removeHierarchieswork', wid)
  })
}

export async function unlistenHierarchiesworks ({ commit }) {
  model.hierarchieswork.unlisten()
}

export async function updateHierarchieswork ({ commit }, { wid, work }) {
  await model.hierarchieswork.update(wid, work.student, work.course, work.teacher, work.lab, work.step, work.stage, work.condition, work.score, work.attempt, work.error, work.question, work.penalty, work.finalquestion)
}
