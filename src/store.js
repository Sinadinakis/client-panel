import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {
    reactReduxFirebase,
    firebaseReducer
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer, createFirestoreInstance } from 'redux-firestore';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    apiKey: "AIzaSyAx8GJniD_ZEQtdUrCwHsh5Dq03coHtUAM",
    authDomain: "clientpanel-16339.firebaseapp.com",
    databaseURL: "https://clientpanel-16339.firebaseio.com",
    projectId: "clientpanel-16339",
    storageBucket: "clientpanel-16339.appspot.com",
    messagingSenderId: "262517236703",
    appId: "1:262517236703:web:5d95d8d11911ea9dd69a6a",
    measurementId: "G-E23DKE6GWK"
}

// Initialize firebase instance
firebase.initializeApp(rrfConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__())

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

export default store;