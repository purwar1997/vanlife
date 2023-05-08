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
import VanDetails, { loader as vanDetailsLoader } from './pages/VanDetails';
import HostLayout from './pages/Host/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans';
import Reviews from './pages/Host/Reviews';
import HostVanLayout, { loader as HostVanDetailsLoader } from './pages/Host/HostVan/HostVanLayout';
import HostVanDetails from './pages/Host/HostVan/HostVanDetails';
import HostVanPricing from './pages/Host/HostVan/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVan/HostVanPhotos';
import Login, { loader as loginLoader } from './pages/Login';
import NotFound from './pages/NotFound';
import Error from './components/Error';

import { requireAuth } from './utils';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      <Route
        path='vans/:id'
        element={<VanDetails />}
        loader={vanDetailsLoader}
        errorElement={<Error />}
      />
      <Route
        path='host'
        element={<HostLayout />}
        loader={async () => {
          await requireAuth();
          return null;
        }}
      >
        <Route index element={<Dashboard />} />
        <Route path='income' element={<Income />} />
        <Route
          path='vans'
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path='vans/:id'
          element={<HostVanLayout />}
          loader={HostVanDetailsLoader}
          errorElement={<Error />}
        >
          <Route index element={<HostVanDetails />} />
          <Route path='pricing' element={<HostVanPricing />} />
          <Route path='photos' element={<HostVanPhotos />} />
        </Route>
        <Route path='reviews' element={<Reviews />} />
      </Route>
      <Route path='login' element={<Login />} loader={loginLoader} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
