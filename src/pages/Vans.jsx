import { Suspense } from 'react';
import { useSearchParams, useLoaderData, defer, Await, Link } from 'react-router-dom';
import { getVans } from '../api';

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchFilters(filter, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(filter);
      } else {
        prevParams.set(filter, value);
      }

      return prevParams;
    });
  }

  function renderVans(vans) {
    const vanType = searchParams.get('type');
    const vansToDisplay = vanType ? vans.filter(van => van.type === vanType) : vans;

    return (
      <section className='vans-page-container'>
        <h1>Explore our van options</h1>

        <div className='vans-filter'>
          <button
            className={`filter simple-type ${vanType === 'simple' ? 'simple' : ''}`}
            onClick={() => setSearchFilters('type', 'simple')}
          >
            Simple
          </button>
          <button
            className={`filter rugged-type ${vanType === 'rugged' ? 'rugged' : ''}`}
            onClick={() => setSearchFilters('type', 'rugged')}
          >
            Rugged
          </button>
          <button
            className={`filter luxury-type ${vanType === 'luxury' ? 'luxury' : ''}`}
            onClick={() => setSearchFilters('type', 'luxury')}
          >
            Luxury
          </button>
          {vanType && <span onClick={() => setSearchFilters('type', null)}>Clear filter</span>}
        </div>

        <div className='vans-container'>
          {vansToDisplay.map(van => (
            <div className='van-container' key={van.id}>
              <Link to={van.id} state={{ queryString: searchParams.toString() }}>
                <img src={van.imageUrl} alt={van.name} />
                <div className='van-info'>
                  <h2>{van.name}</h2>
                  <h3>${van.price}/day</h3>
                </div>
                <span className={van.type}>{van.type}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<h1 className='loader'>Loading vans...</h1>}>
      <Await resolve={data.vans}>{vans => renderVans(vans)}</Await>
    </Suspense>
  );
}
