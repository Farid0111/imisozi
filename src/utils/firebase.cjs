const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyB9uWscwgcxG-Db-SwT-wy8JHg6AjHLdow",
  authDomain: "tourisme-rwanda.firebaseapp.com",
  projectId: "tourisme-rwanda",
  storageBucket: "tourisme-rwanda.appspot.com",
  messagingSenderId: "887889305859",
  appId: "1:887889305859:web:e88ef0bd18bc513f924936"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth }; 