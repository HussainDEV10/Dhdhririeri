import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwIhzy0_RBqhMBlvJxbs5_760jP-Yv2fw",
    authDomain: "facebookweb-2030.firebaseapp.com",
    projectId: "facebookweb-2030",
    storageBucket: "facebookweb-2030",
    messagingSenderId: "912333220741",
    appId: "1:912333220741:web:1c7425f4248b7465b45c67",
    measurementId: "G-ZJ6M2D8T3M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

signupBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // حفظ بيانات المستخدم في Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email
        });

        // إعادة التوجيه إلى صفحة المنشورات
        window.location.href = "https://hussaindev10.github.io/Mon/?";
    } catch (error) {
        console.error("خطأ في إنشاء الحساب:", error);
        alert("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    }
});

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // استرجاع اسم المستخدم من Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const username = userDoc.data().username;

        // إعادة التوجيه إلى صفحة المنشورات
        window.location.href = "https://hussaindev10.github.io/Mon/?";
    } catch (error) {
        console.error("خطأ في تسجيل الدخول:", error);
        alert("حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.");
    }
});
