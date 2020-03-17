import Vue from 'vue'
import VueRouter from 'vue-router'
import LabButton from '../components/LabButton.vue'
import StudentButton from '../components/StudentButton.vue'
import TeacherButton from '../components/TeacherButton.vue'
import GroupTable from '../components/GroupTable.vue'
import ReportTable from '../components/ReportTable.vue'
import WorkflowAction from '../components/WorkflowAction.vue'
import HierarchiesWorkflowAction from '../components/HierarchiesworkflowAction.vue'
import ChangePlanButton from '../components/ChangePlanButton.vue'
import LabsTable from '../components/LabsTable.vue'
import SteplabsTable from '../components/SteplabsTable.vue'
import HierarchiesLabTable from '../components/HierarchiesLabTable.vue'
import SteplabButton from '../components/SteplabButton.vue'
import TeachersTable from '../components/TeachersTable.vue'
import RegistrationsTable from '../components/RegistrationsTable.vue'

import routes from './routes'

Vue.use(VueRouter)
Vue.component('lab-button', LabButton)
Vue.component('student-button', StudentButton)
Vue.component('teacher-button', TeacherButton)
Vue.component('group-table', GroupTable)
Vue.component('report-table', ReportTable)
Vue.component('workflow-action', WorkflowAction)
Vue.component('hierarchiesworkflow-action', HierarchiesWorkflowAction)
Vue.component('change-plan-button', ChangePlanButton)
Vue.component('labs-table', LabsTable)
Vue.component('steplabs-table', SteplabsTable)
Vue.component('steplab-button', SteplabButton)
Vue.component('hierarchieslabs-table', HierarchiesLabTable)
Vue.component('teachers-table', TeachersTable)
Vue.component('registrations-table', RegistrationsTable)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
