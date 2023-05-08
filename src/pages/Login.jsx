import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { loginUser } from '../utils';

export function loader({ request }) {
  const url = new URL(request.url);
  const message = url.searchParams.get('message');
  return message;
}

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const message = useLoaderData();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setStatus('submitting');

    if (error) {
      setError(null);
    }

    loginUser(user)
      .then(data => console.log(data))
      .catch(err => setError(err))
      .finally(() => setStatus('idle'));
  }

  return (
    <div className='login-container'>
      {message ? <h1>{message}</h1> : <h1>Sign in to your account</h1>}
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email address'
          value={user.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
        />
        <button
          type='submit'
          disabled={user.email === '' || user.password === '' || status === 'submitting'}
        >
          Login
        </button>
      </form>
      {error && <p className='login-error'>{error.message}</p>}
    </div>
  );
}
