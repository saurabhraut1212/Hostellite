import { addDoc, collection, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const addBooking = async (
  name,
  age,
  pcontact,
  econtact,
  hno,
  locality,
  city,
  state,
  email,
  dtype,
  dno,
) => {
  try {
    const data = await addDoc(collection(firestore, 'booking'), {
      name,
      age,
      pcontact,
      econtact,
      hno,
      locality,
      city,
      state,
      email,
      dtype,
      dno,
    });
    return data;
  } catch (error) {
    throw new Error('Error in booking');
  }
};

const getBookingDoc = async (id) => {
  try {
    const docRef = doc(firestore, 'booking', id);
    const result = await getDoc(docRef);
    if (result.exists()) {
      return result.data();
    } else {
      throw new Error('Booking doc does not exists');
    }
  } catch (error) {
    throw new Error('Error in get booking doc');
  }
};

export default {
  addBooking,
  getBookingDoc,
};
