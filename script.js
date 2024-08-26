import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const auth = getAuth();

const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // تم إنشاء الحساب بنجاح
            const user = userCredential.user;
            console.log("User created:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
        });
};

const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // تسجيل الدخول بنجاح
            window.location.href = "https://hussaindev10.github.io/Mon/?";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
        });
};

// نفس الطريقة يمكن استخدامها بعد تسجيل الحساب الجديد
const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // تم إنشاء الحساب بنجاح
            window.location.href = "https://hussaindev10.github.io/Mon/?";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
        });
};

// استدعاء هذه الدالة عند ضغط زر التسجيل مع تمرير البريد الإلكتروني وكلمة المرور المدخلين
