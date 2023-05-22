import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout, { loader as layoutLoader } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/Vans';
import VanDetails, { loader as vanLoader } from './pages/VanDetails';
import HostLayout from './pages/Host/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans';
import HostVanLayout, { loader as hostVanLoader } from './pages/Host/HostVan/HostVanLayout';
import HostVanDetails from './pages/Host/HostVan/HostVanDetails';
import HostVanPricing from './pages/Host/HostVan/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVan/HostVanPhotos';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import Signup, { action as signupAction } from './pages/Signup';
import NotFound from './pages/NotFound';
import Error from './components/Error';

import { requireAuth } from './utils';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} loader={layoutLoader} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      <Route path='vans/:id' element={<VanDetails />} loader={vanLoader} errorElement={<Error />} />
      <Route
        path='host'
        element={<HostLayout />}
        loader={async ({ request }) => await requireAuth(request)}
      >
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path='income'
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path='reviews'
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path='vans'
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path='vans/:id'
          element={<HostVanLayout />}
          loader={hostVanLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanDetails />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path='pricing'
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path='photos'
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path='login' element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path='logout' action={logoutAction} />
      <Route path='signup' element={<Signup />} action={signupAction} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
