import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [filter, setFilter] = useState(null);

  async function fetchVans() {
    const vansList = JSON.parse(localStorage.getItem('vans'));

    if (vansList) {
      setVans(vansList);
    } else {
      const response = await fetch('/api/vans');
      const { vans } = await response.json();
      setVans(vans);
      localStorage.setItem('vans', JSON.stringify(vans));
    }
  }

  useEffect(() => {
    fetchVans();
  }, []);

  const vansToDisplay = filter ? vans.filter(van => van.type === filter) : vans;

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      {vans.length === 0 ? (
        <h2>Loading vans...</h2>
      ) : (
        <>
          <div className='vans-filter'>
            <button onClick={() => setFilter('simple')}>Simple</button>
            <button onClick={() => setFilter('rugged')}>Rugged</button>
            <button onClick={() => setFilter('luxury')}>Luxury</button>
            {filter && <span onClick={() => setFilter(null)}>Clear filter</span>}
          </div>

          <div className='vans-list'>
            {vansToDisplay.map(van => (
              <div className='van-tile' key={van.id}>
                <Link to={van.id}>
                  <img src={van.imageUrl} alt={van.name} />
                  <div className='van-info'>
                    <h3>{van.name}</h3>
                    <span>${van.price}/day</span>
                  </div>
                  <span className={`van-type ${van.type}`}>{van.type}</span>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
