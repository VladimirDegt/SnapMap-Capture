import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config';

export const writeDataToFirestore = async (
  nameLocation,
  location,
  photo,
  login,
  email
) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      login,
      email,
      nameLocation,
      location,
      photo,
      comments: [],
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

export const updateDataInFirestore = async (docId, newComment) => {
  try {
    const ref = doc(db, 'posts', docId);

    const docSnap = await getDoc(ref);
    const currentComments = docSnap.data().comments;
    const updatedComments = [...currentComments, newComment];

    await updateDoc(ref, {
      comments: updatedComments,
    });
    console.log('document updated');
  } catch (error) {
    console.log(error);
  }
};
