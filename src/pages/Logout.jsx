import { redirect } from 'react-router-dom';

export async function action() {
  localStorage.removeItem('loggedIn');
  return redirect('/login');
}
