import { useContext, useState } from 'react';
import ResetPasswordView from './ResetPasswordView';
import { AuthContext } from '../../contexts/AuthProvider';

export default function ResetPasswordController() {
  const [message, setMessage] = useState<string>('');
  const authContext = useContext(AuthContext);
  const { forgotPassword } = authContext;

  async function requestPasswordResetEmail(values: { [field: string]: any }) {
    const email = values.email;
    const res = await forgotPassword(email);
    if (res === 'error') {
      setMessage(`Error sending password reset email`);
    } else {
      setMessage(`Password reset email sent to ${email}`);
    }
  }

  return (
    <>
      <ResetPasswordView
        handleRequest={requestPasswordResetEmail}
        message={message}
      />
    </>
  );
}
