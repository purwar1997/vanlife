import { useLoaderData, Link } from 'react-router-dom';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader() {
  await requireAuth();
  return getHostVans();
}

export default function HostVans() {
  const vans = useLoaderData();

  return (
    <div className='host-vans-page'>
      <h1>Your listed vans</h1>
      {vans.length > 0 ? (
        <div className='host-vans'>
          {vans.map(van => (
            <Link to={van.id} key={van.id}>
              <div className='host-van-card'>
                <img src={van.imageUrl} alt={van.name} />
                <div>
                  <h3>{van.name}</h3>
                  <p>${van.price}/day</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2>You haven't listed any vans</h2>
      )}
    </div>
  );
}
