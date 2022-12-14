// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase

const firebaseConfig = {
	apiKey: "AIzaSyBR0xpiS1xzZSwzW5HOxvqKIKnTSh7R6Xc",
	authDomain: "slack-clone-1cc39.firebaseapp.com",
	databaseURL: "https://slack-clone-1cc39-default-rtdb.firebaseio.com",
	projectId: "slack-clone-1cc39",
	storageBucket: "slack-clone-1cc39.appspot.com",
	messagingSenderId: "223320124700",
	appId: "1:223320124700:web:cc68bf46f95bfa8ee0ded9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
