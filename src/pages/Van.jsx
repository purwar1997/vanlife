import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Van() {
  const [van, setVan] = useState(null);
  const { id } = useParams();

  async function fetchVan() {
    const response = await fetch(`/van/${id}`);
    const data = await response.json();
    setVan(data);
  }

  useEffect(() => {
    fetchVan();
  }, []);

  return (
    <div>
      {van === null && <h2>Loading...</h2>}
      {van && <Link to='/vans'>Back to all vans</Link>}
      <div>
        <img src={van.imageUrl} alt={van.name} />
        <span>{van.type}</span>
        <h1>{van.name}</h1>
        <h2>
          <span>${van.price}</span>/day
        </h2>
        <p>{van.description}</p>
        <button>Rent this van</button>
      </div>
    </div>
  );
}
