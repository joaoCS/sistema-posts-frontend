import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyACl3io0QPzTHRmpEf9vshlzKBWeyvcTtE",
    authDomain: "sistemapost-82903.firebaseapp.com",
    databaseURL: "https://sistemapost-82903.firebaseio.com",
    projectId: "sistemapost-82903",
    storageBucket: "sistemapost-82903.appspot.com",
    messagingSenderId: "344886460402",
    appId: "1:344886460402:web:3ca489b152ab0942dd756b"
  };
  
class Firebase {
    constructor () {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        
        this.storage = app.storage();
    }   
}

export default new Firebase();