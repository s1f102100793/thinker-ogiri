// src/firebase/FirebaseConfig.js

import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(config);

export default firebase;
