import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/Vans';
import VanDetails from './pages/VanDetails';
import HostLayout from './pages/Host/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import VansList from './pages/Host/VansList';
import VanInfo from './pages/Host/VanInfo';
import Reviews from './pages/Host/Reviews';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='vans' element={<Vans />} />
          <Route path='vans/:id' element={<VanDetails />} />
          <Route path='host' element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='income' element={<Income />} />
            <Route path='vans' element={<VansList />} />
            <Route path='vans/:id' element={<VanInfo />} />
            <Route path='reviews' element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
