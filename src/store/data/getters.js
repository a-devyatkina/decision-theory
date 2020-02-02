export const getLink = (state) => (owner, file) => {
  if (state.links[owner] !== undefined) {
    return state.links[owner][file]
  }
  return null
}

export const getCurrentCourses = (state) => () => {
  let courses = {}
  for (let cid in state.courses) {
    if (state.courses[cid].archived === false) {
      courses[cid] = state.courses[cid]
    }
  }
  return courses
}

export const getArchivedCourses = (state) => () => {
  let courses = {}
  for (let cid in state.courses) {
    if (state.courses[cid].archived === true) {
      courses[cid] = state.courses[cid]
    }
  }
  return courses
}

export const getGroupCourses = (state) => (gid) => {
  let courses = {}
  for (let cid in state.courses) {
    for (let id in state.courses[cid].groups) {
      if (id === gid) {
        courses[cid] = state.courses[cid]
      }
    }
  }
  return courses
}

export const getCourse = (state) => (cid) => {
  return state.courses[cid]
}

export const getLabs = (state) => () => {
  let labs = {}
  for (let lid in state.labs) {
    if (state.labs[lid].outdated === false) {
      labs[lid] = state.labs[lid]
    }
  }
  return labs
}

export const getLab = (state) => (lid) => {
  return state.labs[lid]
}

export const getWork = (state) => (wid) => {
  return state.works[wid]
}

export const getHistory = (state) => (wid) => {
  if (state.histories[wid]) {
    return state.histories[wid]
  }
  return []
}

export const getStudentWorks = (state) => (sid) => {
  let works = {}
  for (let wid in state.works) {
    if (state.works[wid].student === sid) {
      works[wid] = state.works[wid]
    }
  }
  return works
}

export const getStudentWork = (state) => (sid, lid) => {
  for (let wid in state.works) {
    if (state.works[wid].student === sid && state.works[wid].lab === lid) {
      return { wid: wid, work: state.works[wid] }
    }
  }
  return null
}

export const getAttendance = (state) => (sid, cid) => {
  for (let aid in state.attendance) {
    if (state.attendance[aid] !== undefined && state.attendance[aid].student === sid && state.attendance[aid].course === cid) {
      return state.attendance[aid].score
    }
  }
  return 0
}

export const getCourseStudentWorks = (state) => (sid, cid) => {
  let works = {}
  for (let wid in state.works) {
    if (state.works[wid].student === sid && state.works[wid].course === cid) {
      works[wid] = state.works[wid]
    }
  }
  return works
}

export const getGroups = (state) => () => {
  let groups = {}
  for (let gid in state.groups) {
    if (state.groups[gid].outdated === false) {
      groups[gid] = state.groups[gid]
    }
  }
  return groups
}

export const getGroup = (state) => (gid) => {
  return state.groups[gid]
}

export const getGroupStudents = (state) => (gid) => {
  let students = {}
  for (let sid in state.students) {
    if (state.students[sid].group === gid && state.students[sid].outdated === false) {
      students[sid] = state.students[sid]
    }
  }
  return students
}

export const getStudent = (state) => (sid) => {
  return state.students[sid]
}

export const getTeachers = (state) => () => {
  return state.teachers
}

export const getTeacher = (state) => (tid) => {
  return state.teachers[tid]
}

export const getLoading = (state) => () => {
  return state.loading
}

export const getUser = (state) => () => {
  return state.user
}

export const loading = (state) => () => {
  return state.loading
}

export const error = (state) => () => {
  return state.error
}

export const getSteplab = (state) => (lid, uid) => {
  if (state.steplabs[lid] !== undefined && state.steplabs[lid][uid] !== undefined && state.steplabs[lid][uid].steps !== undefined) {
    return state.steplabs[lid][uid]
  }
  return null
}

export const getSteplabHandle = (state) => (lid) => {
  if (state.steplabs[lid] !== undefined && state.steplabs[lid].name !== undefined && state.steplabs[lid].description !== undefined) {
    return state.steplabs[lid]
  }
  return null
}

export const getSteplabsHandles = (state) => () => {
  return state.steplabs
}

export const getRegistrations = (state) => () => {
  return state.registrations
}

export const getRegistration = (state) => (rid) => {
  return state.registrations[rid]
}
