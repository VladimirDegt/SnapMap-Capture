// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC7Z7_-Y0HZydiU1oV6nn67k_xdA2wTdKw',
  authDomain: 'auth-4cd7f.firebaseapp.com',
  databaseURL: 'https://auth-4cd7f-default-rtdb.firebaseio.com',
  projectId: 'auth-4cd7f',
  storageBucket: 'auth-4cd7f.appspot.com',
  messagingSenderId: '584186100730',
  appId: '1:584186100730:web:7d9867ccbf4b0067e48243',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
