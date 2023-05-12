import db from './database';
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore/lite';

const vansRef = collection(db, 'vans');
const usersRef = collection(db, 'users');

/** Functions to fetch data from firestore */

export async function getVans() {
  try {
    const querySnapshot = await getDocs(vansRef);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (err) {
    throw new Error('Error fetching vans');
  }
}

export async function getVan(id) {
  try {
    const docRef = doc(db, 'vans', id);
    const docSnap = await getDoc(docRef);
    const data = { ...docSnap.data(), id: docSnap.id };
    return data;
  } catch (err) {
    throw new Error('Error fetching van details');
  }
}

export async function getHostVans() {
  try {
    const q = query(vansRef, where('hostId', '==', '123'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (err) {
    throw new Error('Error fetching vans');
  }
}

export async function getHostVan(id) {
  try {
    const docRef = doc(db, 'vans', id);
    const docSnap = await getDoc(docRef);
    const data = { ...docSnap.data(), id: docSnap.id };
    return data;
  } catch (err) {
    throw new Error('Error fetching van details');
  }
}

export async function loginUser(credentials) {
  const q = query(
    usersRef,
    where('email', '==', credentials.email),
    where('password', '==', credentials.password)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('No user found with those credentials!');
  }

  const doc = querySnapshot.docs[0];
  const data = { ...doc.data(), id: doc.id };
  return data;
}

/** Functions to fetch data from mirageJS server */

/** 
export async function getVans() {
  const response = await fetch('/api/vans');

  if (!response.ok) {
    throw {
      message: 'Failed to fetch vans',
      status: response.status,
      statusText: response.statusText,
    };
  }

  const data = await response.json();
  return data.vans;
}

export async function getVan(id) {
  const response = await fetch(`/api/vans/${id}`);

  if (!response.ok) {
    throw {
      message: 'Failed to fetch van details',
      status: response.status,
      statusText: response.statusText,
    };
  }

  const data = await response.json();
  return data.vans;
}

export async function getHostVans() {
  const response = await fetch('/api/host/vans');

  if (!response.ok) {
    throw {
      message: 'Failed to fetch vans',
      status: response.status,
      statusText: response.statusText,
    };
  }

  const data = await response.json();
  return data.vans;
}

export async function getHostVan(id) {
  const response = await fetch(`/api/host/vans/${id}`);

  if (!response.ok) {
    throw {
      message: 'Failed to fetch van details',
      status: response.status,
      statusText: response.statusText,
    };
  }

  const data = await response.json();
  return data.vans;
}

export async function loginUser(credentials) {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data;
}
*/
