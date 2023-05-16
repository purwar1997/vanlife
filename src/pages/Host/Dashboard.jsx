import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { getHostVans } from '../../api';

export default function Dashboard() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVans() {
      try {
        const vans = await getHostVans();
        setVans(vans);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  return (
    <section className='dashboard-page-container'>
      <div className='income-section'>
        <div className='income-info'>
          <h1>Welcome!</h1>
          <p>
            Income of last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to='income'>Details</Link>
      </div>

      <div className='reviews-section'>
        <div className='reviews-info'>
          <h2>Review Score</h2>
          <div className='rating'>
            <BsStarFill className='review-star' />
            <h3>
              5.0<span>/5</span>
            </h3>
          </div>
        </div>
        <Link to='reviews'>Details</Link>
      </div>

      {loading ? (
        <h2 className='message'>Loading vans...</h2>
      ) : error ? (
        <h2 className='message'>{error.message}</h2>
      ) : (
        <div className='listed-vans-section'>
          <div className='listed-vans-top'>
            <h2>Your listed vans</h2>
            {vans.length > 0 && <Link to='vans'>View All</Link>}
          </div>

          {vans.length > 0 ? (
            <div className='listed-vans'>
              {vans.slice(0, 3).map(van => (
                <div className='listed-van-card' key={van.id}>
                  <div className='listed-van'>
                    <img src={van.imageUrl} alt={van.name} />
                    <div className='listed-van-info'>
                      <h3>{van.name}</h3>
                      <h4>${van.price}/day</h4>
                    </div>
                  </div>
                  <Link to={`vans/${van.id}`}>View</Link>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't listed any vans</p>
          )}
        </div>
      )}
    </section>
  );
}
