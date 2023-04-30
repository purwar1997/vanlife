import { useLocation } from 'react-router-dom';

export default function HostVanPricing() {
  const { state: price } = useLocation();

  return (
    <p className='host-van-pricing'>
      ${price}
      <span>/day</span>
    </p>
  );
}
