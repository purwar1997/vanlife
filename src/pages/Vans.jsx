import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  }

  const filter = searchParams.get('type');
  const vansToDisplay = filter ? vans.filter(van => van.type === filter) : vans;

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      {vansToDisplay.length === 0 ? (
        <h2>Loading vans...</h2>
      ) : (
        <>
          <div className='vans-filter'>
            <button
              className={`filter simple-type ${filter === 'simple' ? 'simple' : ''}`}
              onClick={() => handleFilterChange('type', 'simple')}
            >
              Simple
            </button>
            <button
              className={`filter rugged-type ${filter === 'rugged' ? 'rugged' : ''}`}
              onClick={() => handleFilterChange('type', 'rugged')}
            >
              Rugged
            </button>
            <button
              className={`filter luxury-type ${filter === 'luxury' ? 'luxury' : ''}`}
              onClick={() => handleFilterChange('type', 'luxury')}
            >
              Luxury
            </button>
            {filter && (
              <span className='clear-filter' onClick={() => handleFilterChange('type', null)}>
                Clear filter
              </span>
            )}
          </div>

          <div className='vans-list'>
            {vansToDisplay.map(van => (
              <div className='van-tile' key={van.id}>
                <Link to={van.id} state={{ search: searchParams.toString() }}>
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
