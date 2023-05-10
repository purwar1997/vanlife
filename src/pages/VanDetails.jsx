import { Suspense } from 'react';
import { Link, useLocation, useLoaderData, defer, Await } from 'react-router-dom';
import { getVanDetails } from '../api';

export function loader({ params }) {
  return defer({ van: getVanDetails(params.id) });
}

export default function VanDetails() {
  const data = useLoaderData();
  const location = useLocation();
  const { search } = location.state;

  function renderVan(van) {
    return (
      <div className='van-container'>
        {van ? (
          <>
            <Link to={`..?${search}`} relative='path'>
              &larr; Back to {search ? search.slice(5) : 'all'} vans
            </Link>
            <div className='van-card'>
              <div className='van-image'>
                <img src={van.imageUrl} alt={van.name} />
              </div>
              <div className='van-details'>
                <span className={`van-type ${van.type}`}>{van.type}</span>
                <h1>{van.name}</h1>
                <h2>
                  <span className='van-price'>${van.price}</span>/day
                </h2>
                <p>{van.description}</p>
                <button className='rent-van-btn'>Rent this van</button>
              </div>
            </div>
          </>
        ) : (
          <h2>Van not found</h2>
        )}
      </div>
    );
  }

  return (
    <Suspense fallback={<h1 className='loader'>Loading...</h1>}>
      <Await resolve={data.van}>{van => renderVan(van)}</Await>
    </Suspense>
  );
}
