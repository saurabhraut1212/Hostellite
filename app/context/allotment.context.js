import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

const addAllotment = async (
  userId,
  bed,
  startDate,
  endDate,
  deposit,
  depositMethod,
) => {
  try {
    const result = await addDoc(collection(firestore, 'allotment'), {
      userId,
      bed,
      startDate,
      endDate,
      deposit,
      depositMethod,
    });
    return result;
  } catch (error) {
    console.error('Error adding allotment:', error);
    throw error; // Rethrow the error to handle it in the submitHandler
  }
};

const viewAllAllotment = async () => {
  try {
    const collectionRef = collection(firestore, 'allotment');
    const snapShot = await getDocs(collectionRef);
    const data = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error('Error in fetching allotments');
  }
};

const updateAllotment = async (id, newdata) => {
  console.log(id, 'This is updateAllotment id');
  try {
    const docRef = doc(firestore, 'allotment', id);
    await updateDoc(docRef, newdata);
    const updatedData = await getDoc(docRef);
    return updatedData.data();
  } catch (error) {
    throw new Error('Error in fetching the document');
  }
};

const getAllotment = async (id) => {
  try {
    const docref = doc(firestore, 'allotment', id);
    const result = await getDoc(docref);

    if (result.exists()) {
      return result.data();
    } else {
      throw new Error('Error');
    }
  } catch (error) {
    throw new Error('Error in getting allotment');
  }
};

const getAllotmentByQuery = async (id) => {
  try {
    const collectionRef = collection(firestore, 'allotment');
    const q = query(collectionRef, where('userId', '==', id));
    const result = await getDocs(q);
    const singleData = result.docs[0].data();
    console.log(singleData, 'ikjhjhjb');
    return singleData;
  } catch (error) {
    throw new Error('Error in getting allotment');
  }
};

const getAllotmentById = async (id) => {
  try {
    const docRef = doc(firestore, 'allotment', id);
    const result = await getDoc(docRef);

    if (result.exists()) {
      return result.data();
    } else {
      throw new Error('Error hai');
    }
  } catch (error) {
    throw new Error('Error in fetching rentDetails doc');
  }
};

export default {
  addAllotment,
  viewAllAllotment,
  updateAllotment,
  getAllotment,
  getAllotmentByQuery,
  getAllotmentById,
};
