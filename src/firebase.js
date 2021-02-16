import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCih6r4MizbVMV5AN2wlVRuidjm1cfl1Y',
  authDomain: 'shop-4cc24.firebaseapp.com',
  projectId: 'shop-4cc24',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
