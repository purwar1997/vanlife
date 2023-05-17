import { Suspense } from 'react';
import {
  useLoaderData,
  useAsyncValue,
  defer,
  Await,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getHostVan } from '../../../api';
import { requireAuth } from '../../../utils';

export async function loader({ request, params }) {
  await requireAuth(request);
  return defer({ van: getHostVan(params.id) });
}

export default function HostVanLayout() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<h1 className='loader'>Loading...</h1>}>
      <Await resolve={data.van}>
        <RenderHostVan />
      </Await>
    </Suspense>
  );
}

function RenderHostVan() {
  const van = useAsyncValue();

  return (
    <section className='host-van-page'>
      <Link to='/host/vans'>&larr; Back to all vans</Link>

      <div className='host-van-container'>
        <div className='host-van'>
          <img src={van.imageUrl} alt={van.name} />
          <div className='host-van-details'>
            <span className={van.type}>{van.type}</span>
            <h1>{van.name}</h1>
            <h2>${van.price}/day</h2>
          </div>
        </div>

        <nav className='host-van-nav-links'>
          <NavLink to='.' end className={({ isActive }) => (isActive ? 'active' : '')}>
            Details
          </NavLink>
          <NavLink to='pricing' className={({ isActive }) => (isActive ? 'active' : '')}>
            Pricing
          </NavLink>
          <NavLink to='photos' className={({ isActive }) => (isActive ? 'active' : '')}>
            Photos
          </NavLink>
        </nav>

        <Outlet context={van} />
      </div>
    </section>
  );
}
