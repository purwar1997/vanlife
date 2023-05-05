import { useState } from 'react';
import { useSearchParams, useLoaderData, Link } from 'react-router-dom';
import { getVans } from '../api';

export async function loader() {
  return getVans();
}

export default function Vans() {
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const vans = useLoaderData();

  console.log(vans);

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

  if (error) {
    return <h2 className='message'>{error.message}</h2>;
  }

  const filter = searchParams.get('type');
  const vansDisplayed = filter ? vans.filter(van => van.type === filter) : vans;

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      {vansDisplayed.length > 0 ? (
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
            {vansDisplayed.map(van => (
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
      ) : (
        <h2>Sorry, vans not found</h2>
      )}
    </div>
  );
}
