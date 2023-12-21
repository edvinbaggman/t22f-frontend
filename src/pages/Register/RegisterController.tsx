import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import RegisterView from './RegisterView';

export default function RegisterController() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const authContext = useContext(AuthContext);
  const { createUser } = authContext;

  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?~';
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const NAME_REGEX = /^[a-zA-Zéçèàùûüöåä']+$/;
  const SPECIAL_CHAR_REGEX = new RegExp(
    `[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`
  );

  async function handleRegister(values: { [field: string]: any }) {
    const errorList: string[] = [];

    const { firstName, lastName, email, password } = values;
    const displayName: string = firstName + ' ' + lastName;

    let isAnError = false;

    if (values.key != 't22f2023') {
      errorList.push('Wrong key');
      isAnError = true;
    }

    if (!NAME_REGEX.test(firstName)) {
      errorList.push('First name should only contain letters.');
      isAnError = true;
    }

    if (!NAME_REGEX.test(lastName)) {
      errorList.push('Last name should only contain letters.');
      isAnError = true;
    }

    if (!EMAIL_REGEX.test(email)) {
      errorList.push('Invalid email format.');
      isAnError = true;
    }

    if (password.length <= 8) {
      errorList.push('Password should be more than 8 characters.');
      isAnError = true;
    }

    if (!/[0-9]/.test(password)) {
      errorList.push('Password should include a number.');
      isAnError = true;
    }

    if (!/[a-z]/.test(password)) {
      errorList.push('Password should include a lowercase letter.');
      isAnError = true;
    }

    if (!/[A-Z]/.test(password)) {
      errorList.push('Password should include a capital letter.');
      isAnError = true;
    }

    if (!SPECIAL_CHAR_REGEX.test(password)) {
      errorList.push('Password should include a special character.');
      isAnError = true;
    }

    if (isAnError == false) {
      const res = await createUser(email, password, displayName);
      if (res === 'error') {
        errorList.push('An error occured. Make sure that email is not in use.');
      } else {
        window.alert('Please check your emails for the confirmation email ');
        navigate('/login');
      }
    }

    if (errorList.length > 0) {
      setError(
        `<ul class="list-disc">${errorList
          .map((err) => `<li>${err}</li>`)
          .join('')}</ul>`
      );
    }
  }

  return (
    <>
      <RegisterView handleCreate={handleRegister} error={error} />
    </>
  );
}
