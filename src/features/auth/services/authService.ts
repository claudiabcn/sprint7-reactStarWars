import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { auth } from '../../../config/firebase';

const googleProvider = new GoogleAuthProvider();

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

const handleAuthError = (error: unknown): never => {
  if (error && typeof error === 'object' && 'code' in error) {
    const authError = error as AuthError;
    
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-not-found': 'No user found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many attempts. Try again later',
      'auth/popup-closed-by-user': 'Login cancelled',
      'auth/cancelled-popup-request': 'Login cancelled',
    };

    const message = errorMessages[authError.code] || authError.message;
    throw new AuthServiceError(message, authError.code, error);
  }

  throw new AuthServiceError(
    'An unexpected error occurred',
    undefined,
    error
  );
};

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const loginWithGoogle = async (): Promise<User> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    handleAuthError(error);
  }
};