import { useOutletContext } from 'react-router-dom';

export default function HostVanPhotos() {
  const van = useOutletContext();

  return <img className='host-van-photo' src={van.imageUrl} alt={van.name} />;
}
