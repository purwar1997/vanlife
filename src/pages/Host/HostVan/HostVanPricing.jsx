import { useOutletContext } from 'react-router-dom';

export default function HostVanPricing() {
  const van = useOutletContext();

  return (
    <p className='host-van-pricing'>
      ${van.price}
      <span>/day</span>
    </p>
  );
}
