import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHPd31Gf_48fSxaglowCpmAu2MAckLkO0",
  authDomain: "whatsapp-clone-nuatli.firebaseapp.com",
  projectId: "whatsapp-clone-nuatli",
  storageBucket: "whatsapp-clone-nuatli.appspot.com",
  messagingSenderId: "496725601817",
  appId: "1:496725601817:web:9c5aff08574fa65bd38488",
  measurementId: "G-13CYVSLF5H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;