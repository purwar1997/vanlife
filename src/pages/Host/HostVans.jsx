import { Suspense } from 'react';
import { useLoaderData, defer, Await, Link, useAsyncValue } from 'react-router-dom';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<h1 className='loader'>Loading vans...</h1>}>
      <Await resolve={data.vans}>
        <RenderHostVans />
      </Await>
    </Suspense>
  );
}

function RenderHostVans() {
  const vans = useAsyncValue();

  return (
    <section className='host-vans-container'>
      <h1>Your listed vans</h1>

      {vans.length > 0 ? (
        <div className='host-vans'>
          {vans.map(van => (
            <Link to={van.id}>
              <div className='host-van-card' key={van.id}>
                <img src={van.imageUrl} alt={van.name} />
                <div className='host-van-info'>
                  <h3>{van.name}</h3>
                  <h4>${van.price}/day</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You haven't listed any vans</p>
      )}
    </section>
  );
}
