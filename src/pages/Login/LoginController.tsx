import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import LoginView from './LoginView';

export default function LoginController() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  async function handleLogin(values: { [field: string]: any }) {
    setError('');
    const username = values.username;
    const password = values.password;

    const { error } = await login(username, password);

    if (error) {
      const errorMsg = error.message.split(': ')[1];

      if (
        errorMsg === 'Error (auth/invalid-email).' ||
        errorMsg === 'Error (auth/user-not-found).' ||
        errorMsg === 'Error (auth/wrong-password).'
      ) {
        setError('The email or password you entered is incorrect.');
      } else {
        console.log(errorMsg);

        setError('Unkown error.');
      }
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <>
      <LoginView handleLogin={handleLogin} error={error} />
    </>
  );
}
