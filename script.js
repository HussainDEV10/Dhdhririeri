import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwIhzy0_RBqhMBlvJxbs5_760jP-Yv2fw",
    authDomain: "facebookweb-2030.firebaseapp.com",
    projectId: "facebookweb-2030",
    storageBucket: "facebookweb-2030.appspot.com",
    messagingSenderId: "912333220741",
    appId: "1:912333220741:web:1c7425f4248b7465b45c67",
    measurementId: "G-ZJ6M2D8T3M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const messageDiv = document.createElement('div');
    document.body.appendChild(messageDiv);

    const validateInputs = () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // التحقق من الحقول الفارغة
        if (email === '' || password === '') {
            messageDiv.textContent = 'خطأ في تسجيل الدخول، يرجى ملئ الحقول';
            return false;
        }

        // التحقق من صحة البريد الإلكتروني
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            messageDiv.textContent = 'خطأ في تسجيل الدخول، يرجى إدخال بريد إلكتروني صالح';
            return false;
        }

        // التحقق من طول كلمة المرور
        if (password.length < 6) {
            messageDiv.textContent = 'خطأ في تسجيل الدخول، يرجى إدخال كلمة مرور تحتوي على 6 أحرف أو أكثر';
            return false;
        }

        return true;
    };

    loginBtn.addEventListener('click', async () => {
        if (!validateInputs()) {
            return; // إيقاف التنفيذ إذا كانت المدخلات غير صحيحة
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            messageDiv.textContent = 'تسجيل الدخول ناجح، سيتم الانتقال الآن...';
            setTimeout(() => window.location.href = 'https://hussaindev10.github.io/postss/', 2000);
        } catch (error) {
            messageDiv.textContent = 'خطأ في تسجيل الدخول: ' + error.message;
        }
    });

    signupBtn.addEventListener('click', async () => {
        if (!validateInputs()) {
            return; // إيقاف التنفيذ إذا كانت المدخلات غير صحيحة
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            messageDiv.textContent = 'إنشاء الحساب ناجح، سيتم الانتقال الآن...';
            setTimeout(() => window.location.href = 'https://hussaindev10.github.io/postss/', 2000);
        } catch (error) {
            messageDiv.textContent = 'خطأ في إنشاء الحساب: ' + error.message;
        }
    });
});
