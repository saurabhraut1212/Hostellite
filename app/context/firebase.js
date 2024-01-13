'use client';
import { createContext } from 'react';

export const FirebaseContext = createContext(null);
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import allotmentContext from './allotment.context';
import bookingContext from './booking.context';
import authContext from './auth.context';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APIID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
};
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const firebaseAuth = getAuth(app);

export const FirebaseProvider = (props) => {
  const addExpenses = async (
    ebill,
    wbill,
    tax,
    emi,
    salary,
    maintance,
    laundry,
    miscellaneous,
    remark,
  ) => {
    try {
      const result = await addDoc(collection(firestore, 'expenses'), {
        ebill,
        wbill,
        tax,
        emi,
        salary,
        maintance,
        laundry,
        miscellaneous,
        remark,
      });
      return result;
    } catch (error) {
      throw new Error('Expense is not added');
    }
  };

  const addCloseStudents = async (data) => {
    try {
      const result = await addDoc(collection(firestore, 'closedStudents'), {
        data,
      });
      return result.data();
    } catch (error) {
      throw new Error('Error in adding closed student');
    }
  };

  // const getAllClosedStudents = async () => {
  //     try {
  //         const collectionRef = collection(firestore, "closedStudents");
  //         const result = await getDocs(collectionRef);
  //         const dataa = result.docs.map((d) => ({
  //             id: d.id,
  //             ...d.data()
  //         }));
  //         return dataa;

  //     } catch (error) {
  //         throw new Error("Error in getting all close students");

  //     }
  // }

  return (
    <FirebaseContext.Provider
      value={{
        ...allotmentContext,
        ...bookingContext,
        ...authContext,
        addExpenses,
        addCloseStudents,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
