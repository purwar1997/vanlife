import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHostVans } from '../../api';

export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHostVans() {
      try {
        const vans = await getHostVans();
        setVans(vans);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadHostVans();
  }, []);

  if (loading) {
    return <h2 className='message'>Loading vans...</h2>;
  }

  if (error) {
    return <h2 className='message'>{error.message}</h2>;
  }

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
