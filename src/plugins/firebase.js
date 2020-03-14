import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAGJtXu1JmVkHitKgixIoNN_8l-8eoExVs',
  authDomain: 'decision-theory-simulator.firebaseapp.com',
  databaseURL: 'https://decision-theory-simulator.firebaseio.com',
  projectId: 'decision-theory-simulator',
  storageBucket: 'gs://decision-theory-simulator.appspot.com',
  messagingSenderId: '674382729600'
}

firebase.initializeApp(config)

export default ({ app, router, Vue }) => {

}
