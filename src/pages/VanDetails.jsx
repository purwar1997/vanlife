import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function VanDetails() {
  const [van, setVan] = useState(null);
  const { id } = useParams();

  async function fetchVanDetails() {
    const response = await fetch(`/api/vans/${id}`);
    const data = await response.json();
    setVan(data.vans);
  }

  useEffect(() => {
    fetchVanDetails();
  }, []);

  return (
    <div className='van-container'>
      {van ? (
        <>
          <Link to='..' relative='path'>
            &#x2190; Back to all vans
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
        <h2>Loading...</h2>
      )}
    </div>
  );
}
