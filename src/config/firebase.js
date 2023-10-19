// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfYbtyXdPQvFa4TK0SG9xO3d4PwESntvg",
    authDomain: "instaclone-347dd.firebaseapp.com",
    projectId: "instaclone-347dd",
    storageBucket: "instaclone-347dd.appspot.com",
    messagingSenderId: "239935083121",
    appId: "1:239935083121:web:3b1c0b1ce06407812741d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);