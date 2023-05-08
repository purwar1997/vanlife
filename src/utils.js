import { redirect } from 'react-router-dom';

export async function requireAuth() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    throw redirect('/login?message=You must log in first');
  }
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

  return data.user;
}
