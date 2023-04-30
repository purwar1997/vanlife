import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HostVans() {
  const [vans, setVans] = useState([]);

  async function fetchVans() {
    const hostVans = JSON.parse(localStorage.getItem('hostVans'));

    if (hostVans) {
      setVans(hostVans);
    } else {
      const response = await fetch('/api/vans');
      const { vans } = await response.json();
      setVans(vans);
      localStorage.setItem('hostVans', JSON.stringify(vans));
    }
  }

  useEffect(() => {
    fetchVans();
  }, []);

  return (
    <div className='host-vans-page'>
      <h1>Your listed vans</h1>
      {vans.length > 0 ? (
        <div className='host-vans'>
          {vans.map(van => (
            <Link to={`/host/vans/${van.id}`}>
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
