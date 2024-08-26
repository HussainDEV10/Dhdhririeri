// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
        window.location.href = 'https://hussaindev10.github.io/Mon/';
    } catch (error) {
        alert('خطأ في تسجيل الدخول: ' + error.message);
    }
});

signupLink.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'https://hussaindev10.github.io/Mon/';
        })
        .catch((error) => {
            alert('خطأ في إنشاء الحساب: ' + error.message);
        });
});
