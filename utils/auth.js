import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config';

export const registerDB = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password);

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged(user => {
    console.log('user -->', user);
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (name, url) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: url,
      });
    } catch (error) {
      throw error;
    }
  }
};
