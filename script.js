import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
        const username = usernameInput.value.trim();

        if (!username || !email || !password) {
            messageDiv.textContent = 'جميع الحقول مطلوبة';
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            messageDiv.textContent = 'بريد إلكتروني غير صالح';
            return false;
        }

        if (password.length < 6) {
            messageDiv.textContent = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
            return false;
        }

        return true;
    };

    const createUserDocument = async (user, username) => {
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: user.email,
            createdAt: new Date(),
            lastLogin: new Date()
        });
    };

    const handleAuthSuccess = (user, username) => {
        localStorage.setItem('username', username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('uid', user.uid);
        window.location.href = 'https://hussaindev10.github.io/postss/';
    };

    signupBtn.addEventListener('click', async () => {
        if (!validateInputs()) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const username = usernameInput.value.trim();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await createUserDocument(userCredential.user, username);
            handleAuthSuccess(userCredential.user, username);
        } catch (error) {
            messageDiv.textContent = `خطأ في التسجيل: ${error.message}`;
        }
    });

    loginBtn.addEventListener('click', async () => {
        if (!validateInputs()) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const username = usernameInput.value.trim();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // عند تسجيل الدخول، نتحقق من وجود المستند في Firestore
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            if (!userDoc.exists()) {
                await createUserDocument(userCredential.user, username);
            }
            
            handleAuthSuccess(userCredential.user, username);
        } catch (error) {
            messageDiv.textContent = `خطأ في تسجيل الدخول: ${error.message}`;
        }
    });
});
