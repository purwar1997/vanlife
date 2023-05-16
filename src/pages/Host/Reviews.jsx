import { BsStarFill } from 'react-icons/bs';
import reviewsGraph from '../../assets/images/reviews-graph.png';

export default function Reviews() {
  const reviews = [
    {
      id: '1',
      name: 'Elliot',
      date: 'January 3, 2023',
      text: 'The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Sandy',
      date: 'December 12, 2022',
      text: 'This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!',
      rating: 5,
    },
  ];

  return (
    <section className='reviews-page'>
      <h1>Your reviews</h1>
      <p>
        Last <span>30 days</span>
      </p>
      <img className='reviews-graph' src={reviewsGraph} alt='reviews-graph' />
      <div className='reviews-container'>
        <h2>Reviews ({reviews.length})</h2>
        <div className='reviews'>
          {reviews.map(review => (
            <div className='review' key={review.id}>
              <div className='ratings'>
                {[...new Array(review.rating)].map((_, index) => (
                  <BsStarFill className='rating-star' key={index} />
                ))}
              </div>
              <div className='review-details'>
                <h3>{review.name}</h3>
                <h4>{review.date}</h4>
              </div>
              <p className='review-text'>{review.text}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
