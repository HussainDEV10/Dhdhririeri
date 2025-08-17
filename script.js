import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwIhzy0_RBqhMBlvJxbs5_760jP-Yv2fw",
    authDomain: "facebookweb-2030.firebaseapp.com",
    projectId: "facebookweb-2030",
    storageBucket: "facebookweb-2030.appspot.com",
    messagingSenderId: "912333220741",
    appId: "1:912333220741:web:1c7425f4248b7465b45c67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

document.getElementById('showSignup').addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// تسجيل الدخول
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if(!email || !password) { messageDiv.textContent = 'يرجى ملء جميع الحقول'; return; }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'https://hussaindev10.github.io/postss/';
    } catch (err) {
        messageDiv.textContent = err.message;
    }
});

// إنشاء حساب
document.getElementById('signupBtn').addEventListener('click', async () => {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirm = document.getElementById('signupConfirmPassword').value.trim();

    if(!username || !email || !password || !confirm) { messageDiv.textContent = 'يرجى ملء جميع الحقول'; return; }
    if(password.length<6){ messageDiv.textContent='كلمة المرور يجب أن تحتوي 6 أحرف على الأقل'; return; }
    if(password!==confirm){ messageDiv.textContent='كلمة المرور والتأكيد غير متطابقين'; return; }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {username,email});
        window.location.href = 'https://hussaindev10.github.io/postss/';
    } catch(err) {
        messageDiv.textContent = err.message;
    }
});
