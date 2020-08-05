import firebase from 'firebase'

const fireApp = firebase.initializeApp({
    apiKey: "AIzaSyDAiHT6fdbuFJICAhEcZhwds3-JSn9x-yk",
    authDomain: "instagram-ba6cb.firebaseapp.com",
    databaseURL: "https://instagram-ba6cb.firebaseio.com",
    projectId: "instagram-ba6cb",
    storageBucket: "instagram-ba6cb.appspot.com",
    messagingSenderId: "637384635678",
    appId: "1:637384635678:web:c1d7452b49cd3b72dc050f",
    measurementId: "G-4ZHZRC27NV"
})

const db = fireApp.firestore();
const auth = fireApp.auth();
const storage = fireApp.storage();

export {db, auth, storage}