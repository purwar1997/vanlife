import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../server';

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [filter, setFilter] = useState(null);

  async function fetchVans() {
    const response = await fetch('/vans');
    const data = JSON.parse(await response.json());
    setVans(data);
  }

  useEffect(() => {
    fetchVans();
  }, []);

  function buttonColor(vanType) {
    switch (vanType) {
      case 'simple':
        return '#E17654';

      case 'rugged':
        return '#115E59';

      case 'luxury':
        return '#161616';

      default:
        return '#FFEAD0';
    }
  }

  return (
    <div>
      <h1>Explore our van options</h1>
      {vans.length === 0 && <h2>Loading vans...</h2>}
      <div>
        <button onClick={() => setFilter('simple')}>Simple</button>
        <button onClick={() => setFilter('rugged')}>Rugged</button>
        <button onClick={() => setFilter('luxury')}>Luxury</button>
        {filter && <span onClick={() => setFilter(null)}>Clear filter</span>}
      </div>
      <div>
        {(filter ? vans.filter(van => van.type === filter) : vans).map(van => (
          <div key={van.id}>
            <Link to={`/van/${van.id}`}>
              <img src={van.imageUrl} alt={van.name} />
            </Link>
            <div>
              <span>{van.name}</span>
              <span>${van.price}/day</span>
            </div>
            <span style={{ backgroundColor: buttonColor(van.type) }}>{van.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
