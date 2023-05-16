import {
  Link,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

import { loginUser } from '../api';

export function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const message = searchParams.get('message');
  const path = searchParams.get('redirectTo') || '/host';
  return { message, path };
}

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData.entries());

  const path = new URL(request.url).searchParams.get('redirectTo') || '/host';

  try {
    await loginUser(credentials);
    localStorage.setItem('loggedIn', true);
    return redirect(path);
  } catch (err) {
    return err;
  }
}

export default function Login() {
  const { message, path } = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <section className='login-page'>
      <h1>{message || 'Sign in to your account'}</h1>
      <Form className='input-form' method='post' replace>
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button className='form-btn' type='submit'>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </Form>
      {error && <p className='form-error'>{error.message}</p>}
      <p className='signup'>
        Don't have an account?{' '}
        <Link to={`/signup?redirectTo=${path}`} replace>
          Signup
        </Link>
      </p>
    </section>
  );
}
