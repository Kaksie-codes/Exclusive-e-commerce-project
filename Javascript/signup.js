import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { auth } from '../firebaseConfig.js';

// Sign Up function
window.signUp = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('User signed up successfully: ' + user.email);
            // You can redirect the user to another page or update the UI accordingly
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}

// Sign Up with Google function
window.signUpWithGoogle = function() {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert('User signed up with Google: ' + user.email);
            // You can redirect the user to another page or update the UI accordingly
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}

document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent form submission
    signUp();
});
