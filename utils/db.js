import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config';

export const writeDataToFirestore = async (nameLocation, location, photo) => {
  console.log('nameLocation --> ', nameLocation);
  console.log('location-->', location);
  console.log('photo -->', photo);
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      nameLocation,
      location,
      photo,
    });
    console.log('Document written with ID: ', docRef.id);

    //проверяем информацию в базе данных
    const querySnapshot = await getDocs(collection(db, 'posts'));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
