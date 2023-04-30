import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function HostVanDetails() {
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
    van && (
      <div className='host-van-details-page'>
        <p>
          <span>Name:</span> {van.name}
        </p>
        <p>
          <span>Category:</span> {van.type}
        </p>
        <p>
          <span>Description:</span> {van.description}
        </p>
        <p>
          <span>Visibility:</span> Public
        </p>
      </div>
    )
  );
}
