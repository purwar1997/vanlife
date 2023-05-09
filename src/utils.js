import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  const path = new URL(request.url).pathname;
  const loggedIn = localStorage.getItem('loggedIn');

  if (!loggedIn) {
    return redirect(`/login?message=You must log in first&redirectTo=${path}`);
  }

  return null;
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
