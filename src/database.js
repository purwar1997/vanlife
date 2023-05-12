import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyA7ypoj1LkWCS_OuCwei2G3k0u4WcCEaYs',
  authDomain: 'van-renting-app.firebaseapp.com',
  projectId: 'van-renting-app',
  storageBucket: 'van-renting-app.appspot.com',
  messagingSenderId: '1098600183067',
  appId: '1:1098600183067:web:5d036842a18daafd6c4fbe',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
