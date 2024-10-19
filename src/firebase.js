import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDC2TLhna0RsJOSppffpUGpR_qdeIsNMcc",
  authDomain: "makenewfantcy-ce1c7.firebaseapp.com",
  projectId: "makenewfantcy-ce1c7",
  storageBucket: "makenewfantcy-ce1c7.appspot.com",
  messagingSenderId: "203476974898",
  appId: "1:203476974898:web:36dd473a57785439316b2b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const init = {
  db,
  storage,
  app,
  auth,
};
export default init;
