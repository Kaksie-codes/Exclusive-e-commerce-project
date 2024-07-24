import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_hPXCXTa42PL_jRDZ7FIP7rNoJrqQaUA",
    authDomain: "student-e-commerce.firebaseapp.com",
    projectId: "student-e-commerce",
    storageBucket: "student-e-commerce.appspot.com",
    messagingSenderId: "719956734771",
    appId: "1:719956734771:web:ee5dba318ba490f0c84446",
    measurementId: "G-3SD718F9DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
