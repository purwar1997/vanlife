import { Link } from 'react-router-dom';
import aboutImg from '../assets/about-hero.png';

export default function About() {
  return (
    <div className='about-page-container'>
      <img className='about-hero-image' src={aboutImg} alt='about-page' />
      <div className='about-page-content'>
        <h1>Don't squeeze in a sedan when you could relax in a van.</h1>
        <p>
          Our mission is to enliven your road trip with the perfect travel van rental. Our vans are
          recertified before each trip to ensure your travel plans can go off without a hitch.
          (Hitch costs extra 😉)
        </p>
        <p>
          Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world
          on 4 wheels.
        </p>
      </div>
      <div className='about-page-cta'>
        <h1>
          Your destination is waiting.
          <br />
          Your van is ready.
        </h1>
        <Link to='/vans'>Explore our vans</Link>
      </div>
    </div>
  );
}
