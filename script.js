import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const db = getFirestore(app);

const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn'); // زر إنشاء حساب
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// تسجيل الدخول
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    if (email && password && username) {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // حفظ اسم المستخدم في قاعدة البيانات
            await setDoc(doc(db, "users", user.uid), { username });

            // تخزين اسم المستخدم في Local Storage
            localStorage.setItem('username', username);

            // التبديل إلى صفحة المنشورات
            window.location.href = 'https://hussaindev10.github.io/posttest/?';
        } catch (error) {
            console.error("خطأ في تسجيل الدخول: ", error);
        }
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
});

// إنشاء حساب جديد
signUpBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    if (email && password && username) {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // حفظ اسم المستخدم في قاعدة البيانات
            await setDoc(doc(db, "users", user.uid), { username });

            // تخزين اسم المستخدم في Local Storage
            localStorage.setItem('username', username);

            // التبديل إلى صفحة المنشورات
            window.location.href = 'https://hussaindev10.github.io/posttest/?';
        } catch (error) {
            console.error("خطأ في إنشاء الحساب: ", error);
        }
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
});
