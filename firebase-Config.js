<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Rehobot Choir Platform</title>
</head>
<body>

    <h1>Rehobot Choir Portal</h1>

    <!-- Simple UI forms for testing -->
    <div id="auth-section">
        <h3>Login / Register</h3>
        <input type="email" id="email" placeholder="Email"><br>
        <input type="password" id="password" placeholder="Password"><br>
        <input type="text" id="fullname" placeholder="Full Name (For Signup Only)"><br>
        <button id="login-btn">Login</button>
        <button id="signup-btn">Sign Up</button>
    </div>

    <!-- All-in-One Firebase & Application Script -->
    <script type="module">
        // 1. IMPORT FIREBASE SDKs
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
        import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, addDoc, serverTimestamp, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

        // 2. YOUR FIREBASE CONFIGURATION
        const firebaseConfig = {
          apiKey: "AIzaSyB6dLPh_99J2rbulIPN1phFfBUxsarfnCs",
          authDomain: "rehobot-choir-2fc56.firebaseapp.com",
          projectId: "rehobot-choir-2fc56",
          storageBucket: "rehobot-choir-2fc56.firebasestorage.app",
          messagingSenderId: "648229052840",
          appId: "1:648229052840:web:d9a4ea0f01c20775343d9d",
          measurementId: "G-0WSS50VQCX"
        };

        // 3. INITIALIZE FIREBASE
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // --- 4. SIGN UP FUNCTION (With Admin Approval Check) ---
        async function handleSignUp() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const fullName = document.getElementById("fullname").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Save user profile with approved: false
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: email,
                    name: fullName,
                    approved: false,
                    role: "member"
                });

                alert("Registration successful! Please wait for an admin to approve your account.");
                await signOut(auth);
            } catch (error) {
                alert("Sign up error: " + error.message);
            }
        }

        // --- 5. LOGIN FUNCTION ---
        async function handleLogin() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Check if user is approved
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.approved === true) {
                        alert("Login successful! Welcome to the dashboard.");
                        // window.location.href = "dashboard.html";
                    } else {
                        alert("Your account is pending admin approval.");
                        await signOut(auth);
                    }
                }
            } catch (error) {
                alert("Login failed: " + error.message);
            }
        }

        // --- 6. ATTACH BUTTON LISTENERS ---
        document.getElementById("signup-btn").addEventListener("click", handleSignUp);
        document.getElementById("login-btn").addEventListener("click", handleLogin);

    </script>
</body>
</html>
