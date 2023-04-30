import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [vans, setVans] = useState([]);

  async function fetchVans() {
    const response = await fetch('/api/vans');
    const { vans } = await response.json();
    setVans(vans);
  }

  useEffect(() => {
    fetchVans();
  }, []);

  return (
    <>
      <div className='dashboard-page'>
        <div className='income'>
          <div>
            <h1>Welcome!</h1>
            <p>
              Income of last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
          </div>
          <Link to='/host/income'>Details</Link>
        </div>
        <div className='review-score'>
          <div>
            <h2>Review Score</h2>
            <h3>
              ⭐ 5.0<span>/5</span>
            </h3>
          </div>
          <Link to='/host/reviews'>Details</Link>
        </div>
        <div className='listed-vans-container'>
          <div className='listed-vans-header'>
            <h3>Your listed vans</h3>
            <Link to='/host/vans'>View All</Link>
          </div>
          {vans.length > 0 ? (
            <div className='listed-vans'>
              {vans.map(van => (
                <div className='listed-van-card'>
                  <div className='listed-van'>
                    <img src={van.imageUrl} alt={van.name} />
                    <div>
                      <h4>{van.name}</h4>
                      <p>${van.price}/day</p>
                    </div>
                  </div>
                  <Link to={`/host/vans/${van.id}`}>View</Link>
                </div>
              ))}
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
}
