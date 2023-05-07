import { useState } from 'react';

export default function LoginForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setUser({ email: '', password: '' });
    console.log(user);
  }

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
