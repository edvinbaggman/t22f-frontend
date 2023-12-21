import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, secondaryAuth } from '../utils/firebaseSetup';

type ContextProps = {
  currentUser: any;
  userEmail: string;
  userName: string;
  authenticated: boolean;
  setCurrentUser: any;
  loadingAuthState: boolean;
  createUser: any;
  login: any;
  logout: any;
  forgotPassword: any;
  jwt: string;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null as any);
  const [userEmail, setUserEmail] = useState('');
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);

      if (user) {
        setUserEmail(user.email);
        setJwt(user.accessToken);
      }

      setLoadingAuthState(false);
    });

    return unsubscribe;
  }, []);

  const createUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(userCredential.user, { displayName });
      //await addUserToDatabase(email, displayName);
      sendEmailVerification(user);
    } catch {
      return 'error';
    }
    return 'success';
  };

  const login = async (email: string, password: string) => {
    let res,
      error: any = null;

    try {
      res = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(res);
      setUserEmail(email);
    } catch (errorMsg: any) {
      error = errorMsg;
    }

    return { res, error };
  };

  const logout = () => {
    setJwt('');
    setUserEmail('');
    return signOut(auth);
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        return 'success';
      })
      .catch(() => {
        return 'error';
      });
  };

  const value = {
    currentUser,
    userEmail,
    createUser,
    login,
    logout,
    forgotPassword,
    authenticated: currentUser !== null,
    setCurrentUser,
    loadingAuthState,
    jwt,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loadingAuthState && children}
    </AuthContext.Provider>
  );
};
