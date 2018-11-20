import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

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
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

//Add reactReduxFirebase enchancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase instance as first arg
  reduxFirestore(firebase) // needed if using firestore
)(createStore);

//Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer  // required for firestore
});

// Check for settings in local storage
if (localStorage.getItem('setting') === null) {
  //default settings
  const defaultSettings = {
    disabledBalanceOnAdd: true,
    disabledBalanceOnEdit: false,
    allowRegistration: true
  }
  //set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
// Create Store with reducer and inital state
const initalState = { settings: JSON.parse(localStorage.getItem("settings")) };

const store = createStoreWithFirebase(
  rootReducer,
  initalState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
