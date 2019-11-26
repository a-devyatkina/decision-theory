import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDsLYEDAWagfjx4WQvUtUmr6IKTf-wOqwI',
  authDomain: 'labs-service.firebaseapp.com',
  databaseURL: 'https://labs-service.firebaseio.com',
  projectId: 'labs-service',
  storageBucket: 'labs-service.appspot.com',
  messagingSenderId: '201614197685'
}

firebase.initializeApp(config)

export default ({ app, router, Vue }) => {

}
