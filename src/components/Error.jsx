import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  return <h1 className='error'>Error: {error.message}</h1>;
}
