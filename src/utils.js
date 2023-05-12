import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  const path = new URL(request.url).pathname;
  const loggedIn = localStorage.getItem('loggedIn');

  if (!loggedIn) {
    return redirect(`/login?message=You must log in first&redirectTo=${path}`);
  }

  return null;
}
