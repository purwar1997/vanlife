import { BsStarFill } from 'react-icons/bs';
import reviewsGraph from '../../assets/reviews-graph.png';

export default function Reviews() {
  const reviews = [
    {
      rating: 5,
      name: 'Elliot',
      date: 'January 3, 2023',
      text: 'The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!',
      id: '1',
    },
    {
      rating: 5,
      name: 'Sandy',
      date: 'December 12, 2022',
      text: 'This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!',
      id: '2',
    },
  ];

  return (
    <div className='reviews-page'>
      <div className='reviews-top'>
        <h1>Your reviews</h1>
        <p>
          Last <span>30 days</span>
        </p>
      </div>

      <img className='reviews-graph' src={reviewsGraph} alt='graph' />

      <div className='reviews-section'>
        <h3>Reviews ({reviews.length})</h3>

        <div className='reviews'>
          {reviews.map(review => (
            <div className='review' key={review.id}>
              <div className='review-stars'>
                {[...new Array(review.rating)].map((_, index) => (
                  <BsStarFill className='review-star' key={index} />
                ))}
              </div>
              <div className='review-info'>
                <h4>{review.name}</h4>
                <p>{review.date}</p>
              </div>
              <p className='review-text'>{review.text}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
