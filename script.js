// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwIhzy0_RBqhMBlvJxbs5_760jP-Yv2fw",
    authDomain: "facebookweb-2030.firebaseapp.com",
    projectId: "facebookweb-2030",
    storageBucket: "facebookweb-2030.appspot.com",
    messagingSenderId: "912333220741",
    appId: "1:912333220741:web:1c7425f4248b7465b45c67",
    measurementId: "G-ZJ6M2D8T3M"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const loginForm = document.getElementById('login-form');
const signupLink = document.getElementById('signup-link');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'https://hussaindev10.github.io/posts/';
    } catch (error) {
        alert('خطأ في تسجيل الدخول: ' + error.message);
    }
});

signupLink.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'https://hussaindev10.github.io/posts/';
        })
        .catch((error) => {
            alert('خطأ في إنشاء الحساب: ' + error.message);
        });
});
