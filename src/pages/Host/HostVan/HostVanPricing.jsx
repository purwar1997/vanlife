import { useOutletContext } from 'react-router-dom';

export default function HostVanPricing() {
  const van = useOutletContext();

  return (
    <h1 className='host-van-pricing'>
      ${van.price}
      <span>/day</span>
    </h1>
  );
}
