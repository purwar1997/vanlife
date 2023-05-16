import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDmxBSN1B3Kk69ttjtRqAjcsBhp0ioHEwg',
  authDomain: 'vanlife-29657.firebaseapp.com',
  projectId: 'vanlife-29657',
  storageBucket: 'vanlife-29657.appspot.com',
  messagingSenderId: '717037250296',
  appId: '1:717037250296:web:e1f24e600a36d28bf33d0d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
