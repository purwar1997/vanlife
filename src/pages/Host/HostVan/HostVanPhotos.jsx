import { useLocation } from 'react-router-dom';

export default function HostVanPhotos() {
  const { state } = useLocation();
  const { name, url } = state;

  return <img className='host-van-photo' src={url} alt={name} />;
}
