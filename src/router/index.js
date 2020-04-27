import Vue from 'vue'
import VueRouter from 'vue-router'
import LabButton from '../components/LabButton.vue'
import StudentButton from '../components/StudentButton.vue'
import TeacherButton from '../components/TeacherButton.vue'
import GroupTable from '../components/GroupTable.vue'
import ReportTable from '../components/ReportTable.vue'
import WorkflowAction from '../components/WorkflowAction.vue'
import HierarchiesWorkflowAction from '../components/Hierarchies/HierarchiesworkflowAction.vue'
import ChangePlanButton from '../components/ChangePlanButton.vue'
import LabsTable from '../components/LabsTable.vue'
import SteplabsTable from '../components/SteplabsTable.vue'
import HierarchiesLabTable from '../components/HierarchiesLabTable.vue'
import SteplabButton from '../components/SteplabButton.vue'
import TeachersTable from '../components/TeachersTable.vue'
import RegistrationsTable from '../components/RegistrationsTable.vue'
import MatrixView from '../components/Hierarchies/MatrixView.vue'
import MatrixStepView from '../components/Hierarchies/MatrixStepView.vue'
import QuestionReport from '../components/Hierarchies/QuestionReport.vue'
import SiblingHierarchiesReport from '../components/Hierarchies/SiblingHierarchiesReport.vue'

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
import Results from 'components/AdditiveLab/Results'

import FirstStep from '../pages/PreferenceLab/components/FirstStep.vue'
import SecondStep from '../pages/PreferenceLab/components/SecondStep.vue'
import ThirdStep from '../pages/PreferenceLab/components/ThirdStep.vue'
import FourthStep from '../pages/PreferenceLab/components/FourthStep.vue'
import LastStep from '../pages/PreferenceLab/components/LastStep.vue'
import FillTable from '../pages/PreferenceLab/components/FillTable.vue'
import InputTable from '../pages/PreferenceLab/components/InputTable.vue'
import QuestionInput from '../pages/PreferenceLab/components/QuestionInput.vue'
import ConditionPref from '../pages/PreferenceLab/components/Condition'
import QuestionPref from '../pages/PreferenceLab/components/Question.vue'
import Report from '../pages/PreferenceLab/components/Report.vue'

import AlternativeLogics from '../pages/LogicsLab/Alternative.vue'
import ButtonNext from '../pages/LogicsLab/ButtonNext.vue'
import ConditionLogics from '../pages/LogicsLab/Condition.vue'
import FunctionLogics from '../pages/LogicsLab/Function.vue'
import QuestionLogics from '../pages/LogicsLab/Question.vue'
import Assessment from '../pages/LogicsLab/Assessment.vue'

import Lab3Table from '../components/Lab3Table.vue'
import Work3flowAction from '../components/Work3flowAction.vue'
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
Vue.component('matrix-view', MatrixView)
Vue.component('matrixstep-view', MatrixStepView)
Vue.component('question-report', QuestionReport)
Vue.component('siblinghierarchies-report', SiblingHierarchiesReport)

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
Vue.component('results', Results)

Vue.component('FirstStep', FirstStep)
Vue.component('SecondStep', SecondStep)
Vue.component('ThirdStep', ThirdStep)
Vue.component('FourthStep', FourthStep)
Vue.component('LastStep', LastStep)
Vue.component('FillTable', FillTable)
Vue.component('InputTable', InputTable)
Vue.component('QuestionInput', QuestionInput)
Vue.component('ConditionPref', ConditionPref)
Vue.component('QuestionPref', QuestionPref)
Vue.component('Report', Report)

Vue.component('lab3-table', Lab3Table)
Vue.component('work3flow-action', Work3flowAction)

Vue.component('alternative-logics', AlternativeLogics)
Vue.component('button-next', ButtonNext)
Vue.component('condition-logics', ConditionLogics)
Vue.component('function-logics', FunctionLogics)
Vue.component('question-logics', QuestionLogics)
Vue.component('assessment', Assessment)

export const bus = new Vue()
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
