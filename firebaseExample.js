// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: YOUR_API_KEY,
	authDomain: YOUR_AUTH_DOMAIN,
	databaseURL: YOUR_DATABASE_URL,
	projectId: YOUR_PROJECT_ID,
	storageBucket: "replace with your details",
	messagingSenderId: REPLACE_WITH_YOUR_DETAILS,
	appId: REPLACE_WITH_YOUR_DETAILS,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
