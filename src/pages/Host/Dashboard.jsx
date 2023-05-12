import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHostVans } from '../../api';

export default function Dashboard() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHostVans() {
      try {
        const vans = await getHostVans();
        setVans(vans);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadHostVans();
  }, []);

  return (
    <div className='dashboard-page'>
      <div className='income'>
        <div>
          <h1>Welcome!</h1>
          <p>
            Income of last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to='income'>Details</Link>
      </div>

      <div className='review-score'>
        <div>
          <h2>Review Score</h2>
          <h3>
            ⭐ 5.0<span>/5</span>
          </h3>
        </div>
        <Link to='reviews'>Details</Link>
      </div>

      {loading ? (
        <h2 className='loader'>Loading vans...</h2>
      ) : error ? (
        <h2 className='error'>{error.message}</h2>
      ) : (
        <div className='listed-vans-container'>
          <div className='listed-vans-header'>
            <h3>Your listed vans</h3>
            <Link to='vans'>View All</Link>
          </div>
          {vans.length > 0 ? (
            <div className='listed-vans'>
              {vans.map(van => (
                <div key={van.id} className='listed-van-card'>
                  <div className='listed-van'>
                    <img src={van.imageUrl} alt={van.name} />
                    <div>
                      <h4>{van.name}</h4>
                      <p>${van.price}/day</p>
                    </div>
                  </div>
                  <Link to={`vans/${van.id}`}>View</Link>
                </div>
              ))}
            </div>
          ) : (
            <h2>You haven't listed any vans</h2>
          )}
        </div>
      )}
    </div>
  );
}
