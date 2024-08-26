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

// استدعاء هذه الدالة عند ضغط زر التسجيل مع تمرير البريد الإلكتروني وكلمة المرور المدخلين
