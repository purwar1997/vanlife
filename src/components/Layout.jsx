import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './Header';

export async function loader() {
  return localStorage.getItem('loggedIn');
}

export default function Layout() {
  const isLoggedIn = useLoaderData();

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
