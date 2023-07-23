import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config';

export const writeDataToFirestore = async (nameLocation, location, photo) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      nameLocation,
      location,
      photo,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const getAllDataFromFirestore = [];
    const snapshot = await getDocs(collection(db, 'posts'));
    snapshot.forEach(doc =>
      getAllDataFromFirestore.push({ id: doc.id, ...doc.data() })
    );

    return getAllDataFromFirestore;
  } catch (error) {
    console.log('Error getDataFromFirestore', error);
    throw error;
  }
};
