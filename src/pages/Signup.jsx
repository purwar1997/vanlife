import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { signupUser } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData.entries());

  const path = new URL(request.url).searchParams.get('redirectTo');

  try {
    await signupUser(credentials);
    return redirect(`/login?redirectTo=${path}`);
  } catch (err) {
    return err;
  }
}

export default function Signup() {
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <section className='signup-page'>
      <h1>Signup to create your account</h1>
      <Form className='input-form' method='post' replace>
        <input type='text' name='name' placeholder='Name' />
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <input type='password' name='confirmPassword' placeholder='Confirm password' />
        <button className='form-btn' type='submit'>
          {navigation.state === 'submitting' ? 'Signing up...' : 'Signup'}
        </button>
      </Form>
      {error && <p className='form-error'>{error.message}</p>}
    </section>
  );
}
