import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByXc1vQuppvr7GaBFoQCB7X__ZOMYMRCE",
  authDomain: "app-compras-queromais.firebaseapp.com",
  projectId: "app-compras-queromais",
  storageBucket: "app-compras-queromais.firebasestorage.app",
  messagingSenderId: "884207169068",
  appId: "1:884207169068:web:200e67af53616704a26b89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 