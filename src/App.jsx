import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/Vans';
import Van from './pages/Van';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className='site-logo' to='/'>
          #VanLife
        </Link>
        <nav>
          <Link to='/about'>About</Link>
          <Link to='/vans'>Vans</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/vans' element={<Vans />} />
        <Route path='/van/:id' element={<Van />} />
      </Routes>
    </BrowserRouter>
  );
}
