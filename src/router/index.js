import Vue from 'vue'
import VueRouter from 'vue-router'
import LabButton from '../components/LabButton.vue'
import StudentButton from '../components/StudentButton.vue'
import TeacherButton from '../components/TeacherButton.vue'
import GroupTable from '../components/GroupTable.vue'
import ReportTable from '../components/ReportTable.vue'
import WorkflowAction from '../components/WorkflowAction.vue'
import ChangePlanButton from '../components/ChangePlanButton.vue'
import LabsTable from '../components/LabsTable.vue'
import SteplabsTable from '../components/SteplabsTable.vue'
import SteplabButton from '../components/SteplabButton.vue'

import QuantitativeFunc from 'components/AdditiveLab/QuantitativeFunc.vue'
import CategoricalFunc from 'components/AdditiveLab/CategoricalFunc.vue'
import Condition from 'components/AdditiveLab/Condition.vue'
import TheoreticaChoice from 'components/AdditiveLab/TheoreticaChoice.vue'
import TheoreticalInput from 'components/AdditiveLab/TheoreticalInput.vue'
import AlternativesEvaluation from 'components/AdditiveLab/AlternativesEvaluation.vue'
import RFunctions from 'components/AdditiveLab/RFunctions.vue'
import Squares from 'components/AdditiveLab/Squares.vue'
import CoordsAndAnswer from 'components/AdditiveLab/CoordsAndAnswer.vue'
import importanceTable from 'components/AdditiveLab/importanceTable'
import linguisticTable from 'components/AdditiveLab/linguisticTable'

import Alternative from 'components/LogicsLab/Alternative.vue'
import ThirdQuest from 'components/LogicsLab/ThirdQuest.vue'
import LogicsCondition from 'components/LogicsLab/LogicsCondition.vue'
import LogicsImplementation from 'pages/LogicsLab/Implementation.vue'
import Question from 'components/LogicsLab/Question.vue'

import FirstStep from '../pages/PreferenceLab/components/FirstStep.vue'
import SecondStep from '../pages/PreferenceLab/components/SecondStep.vue'
import ThirdStep from '../pages/PreferenceLab/components/ThirdStep.vue'
import FourthStep from '../pages/PreferenceLab/components/FourthStep.vue'
import LastStep from '../pages/PreferenceLab/components/LastStep.vue'
import FillTable from '../pages/PreferenceLab/components/FillTable.vue'
import InputTable from '../pages/PreferenceLab/components/InputTable.vue'

import routes from './routes'

Vue.use(VueRouter)
Vue.component('lab-button', LabButton)
Vue.component('student-button', StudentButton)
Vue.component('teacher-button', TeacherButton)
Vue.component('group-table', GroupTable)
Vue.component('report-table', ReportTable)
Vue.component('workflow-action', WorkflowAction)
Vue.component('change-plan-button', ChangePlanButton)
Vue.component('labs-table', LabsTable)
Vue.component('steplabs-table', SteplabsTable)
Vue.component('steplab-button', SteplabButton)

Vue.component('importance-table', importanceTable)
Vue.component('linguistic-table', linguisticTable)
Vue.component('condition', Condition)
Vue.component('quantitativefunc', QuantitativeFunc)
Vue.component('categoricalfunc', CategoricalFunc)
Vue.component('theoretical-choice', TheoreticaChoice)
Vue.component('theoretical-input', TheoreticalInput)
Vue.component('alternatives-evaluation', AlternativesEvaluation)
Vue.component('r-functions', RFunctions)
Vue.component('squares', Squares)
Vue.component('coords-and-answer', CoordsAndAnswer)

Vue.component('alternative', Alternative)
Vue.component('thirdquest', ThirdQuest)
Vue.component('logics-condition', LogicsCondition)
Vue.component('logics-implementation', LogicsImplementation)
Vue.component('question', Question)

Vue.component('FirstStep', FirstStep)
Vue.component('SecondStep', SecondStep)
Vue.component('ThirdStep', ThirdStep)
Vue.component('FourthStep', FourthStep)
Vue.component('LastStep', LastStep)
Vue.component('FillTable', FillTable)
Vue.component('InputTable', InputTable)

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
