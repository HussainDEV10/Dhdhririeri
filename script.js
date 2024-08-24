import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwIhzy0_RBqhMBlvJxbs5_760jP-Yv2fw",
  authDomain: "facebookweb-2030.firebaseapp.com",
  projectId: "facebookweb-2030",
  storageBucket: "facebookweb-2030.appspot.com",
  messagingSenderId: "865676249313",
  appId: "1:865676249313:web:8c19b685c42db47ad2cfa0",
  measurementId: "G-V7RQWTVDLG"
};
const app = initial izeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('userEmail', email);  // حفظ البريد الإلكتروني في localStorage
        window.location.href = 'https://hussaindev10.github.io/posttest/?';
    } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error.message);
        alert('فشل تسجيل الدخول: ' + error.message);
    }
});
document.getElementById('sign-up-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = 'https://hussaindev10.github.io/posttest/';
    } catch (error) {
        console.error('خطأ في إنشاء الحساب:', error.message);
        alert('فشل إنشاء الحساب: ' + error.message);
    }
});
