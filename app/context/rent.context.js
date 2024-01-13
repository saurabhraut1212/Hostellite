import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from './firebase';

const getAllRentDetails = async () => {
  try {
    const collectionRef = collection(firestore, 'rentDetails');
    const result = await getDocs(collectionRef);
    const data = result.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting all rent details: ' + error.message);
  }
};

const addRentDetails = async (
  name,
  sid,
  bed,
  advancedeposit,
  startdate,
  duedate,
  mrate,
  miscellaneous,
  remark,
  bookingAmount,
) => {
  try {
    const data = await addDoc(collection(firestore, 'rentDetails'), {
      name,
      sid,
      bed,
      advancedeposit,
      startdate,
      duedate,
      mrate,
      miscellaneous,
      remark,
      bookingAmount,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding rent details: ' + error.message);
  }
};

const updateRentModel = async (id, data) => {
  try {
    const docRef = doc(firestore, 'rentDetails', id);
    await updateDoc(docRef, data);
    const updatedData = await getDoc(docRef);
    if (updatedData.exists()) {
      return updatedData.data();
    } else {
      throw new Error('No document found with id: ' + id);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error updating the rent document: ' + error.message);
  }
};

const getRentDetailsByQuery = async (id) => {
  try {
    const collectionRef = collection(firestore, 'rentDetails');
    const q = query(collectionRef, where('sid', '==', id));
    const result = await getDocs(q);
    const singleData = result.docs[0].data();

    return singleData;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting rent details by query: ' + error.message);
  }
};

export default {
  getAllRentDetails,
  addRentDetails,
  updateRentModel,
  getRentDetailsByQuery,
};
