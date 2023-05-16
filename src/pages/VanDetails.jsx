import { Suspense } from 'react';
import { useLocation, useLoaderData, defer, Await, Link } from 'react-router-dom';
import { getVan } from '../api';

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

export default function VanDetails() {
  const data = useLoaderData();
  const location = useLocation();

  const queryString = location.state?.queryString || '';

  function renderVan(van) {
    return (
      <section className='van-details-container'>
        <Link to={`..?${queryString}`} relative='path'>
          &larr; Back to {queryString ? queryString.replace('type=', '') : 'all'} vans
        </Link>

        <div className='van'>
          <img src={van.imageUrl} alt={van.name} />

          <div className='van-details'>
            <span className={van.type}>{van.type}</span>
            <h1>{van.name}</h1>
            <h2>
              ${van.price}
              <span>/day</span>
            </h2>
            <p>{van.description}</p>
            <Link to='.' className='link-button rent-van-btn'>
              Rent this van
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<h1 className='loader'>Loading...</h1>}>
      <Await resolve={data.van}>{van => renderVan(van)}</Await>
    </Suspense>
  );
}
