import Vue from 'vue'

export function updateLink (state, data) {
  if (state.links[data.owner] === undefined) {
    Vue.set(state.links, data.owner, {})
  }
  Vue.set(state.links[data.owner], data.file, data.url)
}

export function fillCourses (state, data) {
  for (let cid in data) {
    Vue.set(state.courses, cid, data[cid])
  }
}

export function updateCourse (state, data) {
  Vue.set(state.courses, data.cid, data.course)
}

export function removeCourse (state, cid) {
  Vue.delete(state.courses, cid)
}

export function createCourse (state, data) {
  Vue.set(state.courses, data.cid, data.course)
}

export function updateAttendance (state, data) {
  Vue.set(state.attendance, data.aid, data.attendance)
}

export function removeAttendance (state, aid) {
  Vue.delete(state.attendance, aid)
}

export function fillGroups (state, data) {
  for (let gid in data) {
    Vue.set(state.groups, gid, data[gid])
  }
}

export function updateGroup (state, data) {
  Vue.set(state.groups, data.gid, data.group)
}

export function removeGroup (state, gid) {
  Vue.delete(state.groups, gid)
}

export function updateStudent (state, data) {
  Vue.set(state.students, data.sid, data.student)
}

export function removeStudent (state, sid) {
  Vue.delete(state.students, sid)
}

export function fillLabs (state, data) {
  for (let lid in data) {
    Vue.set(state.labs, lid, data[lid])
  }
}

export function updateLab (state, data) {
  Vue.set(state.labs, data.lid, data.lab)
}

export function removeLab (state, lid) {
  Vue.delete(state.labs, lid)
}

export function fillTeachers (state, data) {
  for (let tid in data) {
    Vue.set(state.teachers, tid, data[tid])
  }
}

export function updateTeacher (state, data) {
  Vue.set(state.teachers, data.tid, data.teacher)
}

export function removeTeacher (state, tid) {
  Vue.delete(state.teachers, tid)
}

export function updateWork (state, data) {
  Vue.set(state.works, data.wid, data.work)
}

export function removeWork (state, data) {
  Vue.delete(state.works, data.wid)
}

export function updateHistory (state, data) {
  Vue.set(state.histories, data.wid, data.history)
}

export function removeHistory (state, data) {
  Vue.delete(state.histories, data.wid)
}

export const setUser = (state, data) => {
  const user = {...data}
  if (data.role === 'root') {
    user['name'] = 'Администратор'
  } else if (data.role === 'student') {
    Vue.set(state.students, user.id, user)
  } else if (data.role === 'teacher') {
    Vue.set(state.teachers, user.id, user)
  }
  Vue.set(state, 'user', user)
}

export const removeUser = (state) => {
  Vue.set(state, 'user', null)
}

export const setLoading = (state, loading) => {
  Vue.set(state, 'loading', loading)
}

export const setError = (state, error) => {
  state.error = error
}

export const clearError = (state) => {
  state.error = null
}

export const updateSteplab = (state, data) => {
  if (state.steplabs[data.lid] === undefined) {
    Vue.set(state.steplabs, data.lid, {})
  }
  Vue.set(state.steplabs[data.lid], data.uid, data.steplab)
}

export const removeSteplab = (state, data) => {
  if (state.steplabs[data.lid] !== undefined) {
    Vue.delete(state.steplabs[data.lid], data.uid)
  }
}

export const removeSteplabHandle = (state, lid) => {
  if (state.steplabs[lid] !== undefined) {
    Vue.delete(state.steplabs, lid)
  }
}

export const updateSteplabHandle = (state, data) => {
  if (state.steplabs[data.lid] === undefined) {
    Vue.set(state.steplabs, data.lid, {})
  }
  for (let key in data.handle) {
    let value = data.handle[key]
    if (key === 'name' || key === 'description' || key === 'outdated') {
      Vue.set(state.steplabs[data.lid], key, value)
    } else {
      if (state.steplabs[data.lid][key] === undefined) {
        Vue.set(state.steplabs[data.lid], key, {})
      }
      Vue.set(state.steplabs[data.lid][key], 'state', value.state)
      Vue.set(state.steplabs[data.lid][key], 'score', value.score)
    }
  }
}

export function updateRegistration (state, data) {
  Vue.set(state.registrations, data.rid, data.request)
}

export function removeRegistration (state, rid) {
  Vue.delete(state.registrations, rid)
}

export function fillHierarchiesLab (state, data) {
  for (let lid in data) {
    Vue.set(state.hierarchieslab, lid, data[lid])
  }
}

export function updateHierarchiesLab (state, data) {
  Vue.set(state.hierarchieslab, data.lid, data.lab)
}

export function removeHierarchiesLab (state, lid) {
  Vue.delete(state.hierarchieslab, lid)
}

export function updateHierarchiesWork (state, data) {
  Vue.set(state.hierarchieswork, data.wid, data.work)
}

export function removeHierarchiesWork (state, data) {
  Vue.delete(state.hierarchieswork, data.wid)
}
