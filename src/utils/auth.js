import { redirect } from 'react-router-dom';

export default async function auth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect('/login');
  }
}
