import { useOutletContext } from 'react-router-dom';

export default function HostVanDetails() {
  const van = useOutletContext();

  return (
    <div className='host-van-details'>
      <p>
        <span>Name:</span> {van.name}
      </p>
      <p>
        <span>Category:</span> <b>{van.type}</b>
      </p>
      <p>
        <span>Description:</span> {van.description}
      </p>
      <p>
        <span>Visibility:</span> Public
      </p>
    </div>
  );
}
