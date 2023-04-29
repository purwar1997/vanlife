import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <div className='dashboard-page'>
        <div className='income'>
          <div className='income-info'>
            <h1>Welcome</h1>
            <p>
              Income of last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
          </div>
          <Link to='/host/income'>Details</Link>
        </div>
        <div className='review-score'>
          <div className='review-score-info'>
            <h2>Review Score</h2>
            <h3>
              ⭐ <span>5.0</span>/5
            </h3>
          </div>
          <Link to='/host/reviews'>Details</Link>
        </div>
        <div className='listed-vans-container'>
          <div>
            <h3>Your listed vans</h3>
            <Link>View All</Link>
          </div>
          <div className='listed-vans'>
            <div className='listed-van-card'>
              <div className='listed-van-info'>
                <img src='' alt='' />
                <div>
                  <h4>Modest Explorer</h4>
                  <p>$60.day</p>
                </div>
              </div>
              <Link>View</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
