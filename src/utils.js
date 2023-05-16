import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  const path = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem('loggedIn');

  if (!isLoggedIn) {
    return redirect(`/login?message=You need to login first&redirectTo=${path}`);
  }
}
