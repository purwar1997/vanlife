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
            <Link
              to='?type=simple'
              className='filter simple-type'
              // style={({ isActive }) => (isActive ? { backgroundColor: '#e17654' } : null)}
              // onClick={() => setSearchParams({ type: 'simple' })}
            >
              Simple
            </Link>
            <Link
              to='?type=rugged'
              className='filter rugged-type'
              // onClick={() => setSearchParams({ type: 'rugged' })}
            >
              Rugged
            </Link>
            <Link
              to='?type=luxury'
              className='filter luxury-type'
              // onClick={() => setSearchParams({ type: 'luxury' })}
            >
              Luxury
            </Link>
            {filter && (
              <Link
                to='.'
                className='clear-filter'
                // onClick={() => setSearchParams()}
              >
                Clear filter
              </Link>
            )}
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
