import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyA0QKOp6GDVDEeKebO0LBjYmXS32jex2jY",
  authDomain: "reactclientpanel-3768d.firebaseapp.com",
  databaseURL: "https://reactclientpanel-3768d.firebaseio.com",
  projectId: "reactclientpanel-3768d",
  storageBucket: "reactclientpanel-3768d.appspot.com",
  messagingSenderId: "788777308329"
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true //Firestore for Profile instead of realtime DB
};

//Initialize Firebase instance
firebase.initializeApp(firebaseConfig);
//Initialize firestore
// const firestore = firebase.firestore();

//Add reactReduxFirebase enchancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase instance as first arg
  reduxFirestore(firebase) // needed if using firestore
)(createStore);

//Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // required for firestore
});
// Create Store with reducer and inital state
const initalState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initalState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
