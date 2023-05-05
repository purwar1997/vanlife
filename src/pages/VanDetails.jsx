import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getVanDetails } from '../api';

export default function VanDetails() {
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { search } = location.state;

  useEffect(() => {
    async function loadVanDetails() {
      try {
        const van = await getVanDetails(id);
        setVan(van);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVanDetails();
  }, [id]);

  if (loading) {
    return <h1 className='error'>Loading...</h1>;
  }

  if (error) {
    return <h1 className='error'>{error.message}</h1>;
  }

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
