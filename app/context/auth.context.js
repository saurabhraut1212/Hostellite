import { firebaseAuth } from './firebase';

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require('firebase/auth');

const signOutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    throw new Error('Error in signout');
  }
};

const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

const UserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const getCurrentLoginUserInfo = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        unsubscribe();
        user ? resolve(user) : reject(new Error('No current login user'));
      },
      reject,
    );
  });
};

export default {
  signOutUser,
  signInUser,
  UserWithEmailAndPassword,
  getCurrentLoginUserInfo,
};
