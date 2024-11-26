import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth } from './Config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      alert('Successfully Logged In');
      navigate('/taskmanager');
    } catch (error) {
      console.error(error);
      alert('Failed to log in. Please check your credentials.');
    }
  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN HERE</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <br />
        <button type="submit">LOGIN</button>
        <p>
          Don't have an account? <Link to="/signup">SIGN UP</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
