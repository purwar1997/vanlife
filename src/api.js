import db from './firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  addDoc,
} from 'firebase/firestore/lite';

const vansRef = collection(db, 'vans');
const usersRef = collection(db, 'users');

// Functions to read/write data on firestore

export async function getVans() {
  try {
    const querySnapshot = await getDocs(vansRef);

    if (querySnapshot.empty) {
      throw new Error('Vans not found');
    }

    const vans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return vans;
  } catch (err) {
    throw new Error(err.message || 'Error fetching vans');
  }
}

export async function getVan(id) {
  try {
    const docRef = doc(db, 'vans', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Van details not found');
    }

    const van = { id: docSnap.id, ...docSnap.data() };
    return van;
  } catch (err) {
    throw new Error(err.message || 'Error fetching van details');
  }
}

export async function getHostVans() {
  try {
    const q = query(vansRef, where('hostId', '==', '123'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Vans not found');
    }

    const vans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return vans;
  } catch (err) {
    throw new Error(err.message || 'Error fetching vans');
  }
}

export async function getHostVan(id) {
  try {
    const docRef = doc(db, 'vans', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Van details not found');
    }

    const van = { id: docSnap.id, ...docSnap.data() };
    return van;
  } catch (err) {
    throw new Error(err.message || 'Error fetching van details');
  }
}

export async function loginUser(credentials) {
  const { email, password } = credentials;

  if (!(email && password)) {
    throw new Error('Please enter all the details');
  }

  const q = query(usersRef, where('email', '==', email), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Email not registered');
  }

  const user = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };

  if (password !== user.password) {
    throw new Error('Incorrect password');
  }

  user.password = undefined;

  return {
    message: 'Login successful',
    user,
  };
}

export async function signupUser(credentials) {
  const { name, email, password, confirmPassword } = credentials;

  if (!(name && email && password && confirmPassword)) {
    throw new Error('Please enter all the details');
  }

  if (password !== confirmPassword) {
    throw new Error("Password and confirmed password don't match");
  }

  if (password.length < 6) {
    throw new Error('Password must be atleast 6 characters long');
  }

  const q = query(usersRef, where('email', '==', email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error('Email already registered');
  }

  const docRef = await addDoc(usersRef, { name, email, password });
  const docSnap = await getDoc(docRef);
  const user = { id: docSnap.id, ...docSnap.data() };

  user.password = undefined;

  return {
    message: 'Signup successful',
    user,
  };
}

// Functions to read/write data on mirageJS in-memory database

/*
export async function getVans() {
  const res = await fetch('/api/vans');
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: 'Error fetching vans',
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.vans;
}

export async function getVan(id) {
  const res = await fetch(`/api/vans/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: 'Error fetching van details',
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.van;
}

export async function getHostVans() {
  const res = await fetch('/api/host/vans');
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: 'Error fetching vans',
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.vans;
}

export async function getHostVan(id) {
  const res = await fetch(`/api/host/vans/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: 'Error fetching van details',
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.van;
}

export async function loginUser(credentials) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.user;
}

export async function signupUser(credentials) {
  const res = await fetch('/api/signup', {
    method: 'post',
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data.user;
}
*/
