import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/Vans';
import VanDetails from './pages/VanDetails';
import HostLayout from './pages/Host/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans from './pages/Host/HostVans';
import Reviews from './pages/Host/Reviews';
import HostVanLayout from './pages/Host/HostVan/HostVanLayout';
import HostVanDetails from './pages/Host/HostVan/HostVanDetails';
import HostVanPricing from './pages/Host/HostVan/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVan/HostVanPhotos';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='vans' element={<Vans />} loader={vansLoader} />
      <Route path='vans/:id' element={<VanDetails />} />
      <Route path='host' element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='income' element={<Income />} />
        <Route path='vans' element={<HostVans />} />
        <Route path='vans/:id' element={<HostVanLayout />}>
          <Route index element={<HostVanDetails />} />
          <Route path='pricing' element={<HostVanPricing />} />
          <Route path='photos' element={<HostVanPhotos />} />
        </Route>
        <Route path='reviews' element={<Reviews />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
