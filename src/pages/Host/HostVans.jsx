import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHostVans } from '../../api';

export default function HostVans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    async function loadHostVans() {
      const vans = await getHostVans();
      setVans(vans);
    }

    loadHostVans();
  }, []);

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
        <h2>Loading vans...</h2>
      )}
    </div>
  );
}
