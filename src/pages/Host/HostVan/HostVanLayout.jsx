import { useState, useEffect } from 'react';
import { useParams, Link, NavLink, Outlet } from 'react-router-dom';

export default function HostVanLayout() {
  const [van, setVan] = useState(null);
  const { id } = useParams();

  async function fetchVanDetails() {
    const response = await fetch(`/api/vans/${id}`);
    const { vans } = await response.json();
    setVan(vans);
  }

  useEffect(() => {
    fetchVanDetails();
  }, [id]);

  return (
    <div className='host-van-page'>
      {van ? (
        <>
          <Link to='/host/vans'>&larr; Back to all vans</Link>
          <div className='host-van-container'>
            <div className='host-van-details'>
              <img src={van.imageUrl} alt={van.name} />
              <div>
                <span className={van.type}>{van.type}</span>
                <h2>{van.name}</h2>
                <h3>${van.price}/day</h3>
              </div>
            </div>
            <nav className='host-van-nav-links'>
              <NavLink
                to={`/host/vans/${van.id}`}
                className={({ isActive }) => (isActive ? 'active-link' : null)}
                end
              >
                Details
              </NavLink>
              <NavLink
                to={`/host/vans/${van.id}/pricing`}
                state={van.price}
                className={({ isActive }) => (isActive ? 'active-link' : null)}
              >
                Pricing
              </NavLink>
              <NavLink
                to={`/host/vans/${van.id}/photos`}
                state={{ name: van.name, url: van.imageUrl }}
                className={({ isActive }) => (isActive ? 'active-link' : null)}
              >
                Photos
              </NavLink>
            </nav>
            <Outlet />
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
