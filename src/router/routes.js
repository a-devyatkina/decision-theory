import Store from '../store'
import { Cookies } from 'quasar'

const store = Store()

async function checkAuth (to, from, next) {
  let user = store.getters['data/getUser']()

  if (!user && Cookies.has('custom_token')) {
    let token = Cookies.get('custom_token')
    await store.dispatch('data/signInWithCustomToken', { token: token })
    user = store.getters['data/getUser']()
  }

  if (user) {
    if (to.path === '/') {
      if (user.role === 'teacher') {
        next('/labs')
      } else if (user.role === 'student') {
        next('/works')
      } else {
        next('/admin')
      }
    }
    next()
  } else {
    next('/login')
  }
}

function checkTeacher (to, from, next) {
  let user = store.getters['data/getUser']()
  if (user && user.role === 'teacher') {
    next()
  } else {
    next('/login')
  }
}

function checkStudent (to, from, next) {
  let user = store.getters['data/getUser']()
  if (user && user.role === 'student') {
    next()
  } else {
    next('/login')
  }
}

function checkStudentOrTeacher (to, from, next) {
  let user = store.getters['data/getUser']()
  if (user && (user.role === 'student' || user.role === 'teacher')) {
    next()
  } else {
    next('/login')
  }
}

function checkAdmin (to, from, next) {
  let user = store.getters['data/getUser']()
  if (user && user.role === 'root') {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    beforeEnter: checkAuth
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/registration',
    component: () => import('pages/RegistrationPage.vue')
  },
  {
    path: '/labs',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LabsPage.vue') }],
    beforeEnter: checkTeacher
  },
  {
    path: '/groups',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GroupsPage.vue') }],
    beforeEnter: checkTeacher
  },
  {
    path: '/curriculum',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CurriculumPage.vue') }
    ],
    beforeEnter: checkTeacher
  },
  {
    path: '/archive',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ArchivePage.vue') }],
    beforeEnter: checkTeacher
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdminPage.vue') }],
    beforeEnter: checkAdmin
  },
  {
    path: '/workflow',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LabFlowPage.vue') }
    ],
    beforeEnter: checkStudentOrTeacher
  },
  {
    path: '/work3flow',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lab3FlowPage.vue') }
    ],
    beforeEnter: checkStudentOrTeacher
  },
  {
    path: '/hierarchiesworkflow',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HierarchieslabFlowPage.vue') }
    ],
    beforeEnter: checkStudentOrTeacher
  },
  {
    path: '/works',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StudentPage.vue') }
    ],
    beforeEnter: checkStudent
  },
  {
    path: '/steplab',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SteplabPage.vue') }
    ]
  },
  {
    path: '/additiveLab',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdditiveLab/Implementation.vue') }
    ]
  },
  {
    path: '/logicsLab',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LogicsLab/Index.vue') }
    ]
  },
  {
    path: '/preferenceLab',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PreferenceLab/Index.vue') }
    ]
  },
  {
    path: '/siblinghierarchies_preview',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SiblingHierarchiesPreview.vue') }
    ]
  },
  {
    path: '/siblinghierarchies',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SiblingHierarchies.vue') }
    ]
  },
  {
    path: '/layeredhierarchies_preview',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LayeredHierarchiesPreview.vue') }
    ]
  },
  {
    path: '/layeredhierarchies',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LayeredHierarchies.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
