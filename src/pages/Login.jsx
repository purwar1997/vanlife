import { useLoaderData, useActionData, useNavigation, redirect, Form } from 'react-router-dom';
import { loginUser } from '../api';

export function loader({ request }) {
  const message = new URL(request.url).searchParams.get('message');
  return message;
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  const path = new URL(request.url).searchParams.get('redirectTo') || '/host';

  try {
    await loginUser({ email, password });
    localStorage.setItem('loggedIn', true);
    return redirect(path);
  } catch (err) {
    return err;
  }
}

export default function Login() {
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <div className='login-container'>
      {message ? <h1>{message}</h1> : <h1>Sign in to your account</h1>}
      <Form method='post' replace className='login-form'>
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit' disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </Form>
      {error && <p className='login-error'>{error.message}</p>}
    </div>
  );
}
