import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const postsContainer = document.getElementById('postsContainer');

    // التحقق من حالة تسجيل الدخول
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // عرض اسم المستخدم من التخزين المحلي
            const username = localStorage.getItem('username');
            if (username) {
                usernameDisplay.textContent = `مرحبًا، ${username}`;
            }

            // تحميل وعرض المنشورات
            try {
                const postsSnapshot = await getDocs(collection(db, 'posts'));
                postsContainer.innerHTML = ''; // تفريغ الحاوية
                postsSnapshot.forEach((doc) => {
                    const postData = doc.data();
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `<h3>${postData.title}</h3><p>${postData.description}</p><p>من قِبل: ${postData.username}</p>`;
                    postsContainer.appendChild(postElement);
                });
            } catch (error) {
                console.error('خطأ في تحميل المنشورات:', error);
            }
        } else {
            // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجل الدخول
            window.location.href = 'https://hussaindev10.github.io/';
        }
    });

    // تسجيل الخروج
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('username');
            window.location.href = 'https://hussaindev10.github.io/';
        } catch (error) {
            console.error('خطأ في تسجيل الخروج:', error);
        }
    });
});
