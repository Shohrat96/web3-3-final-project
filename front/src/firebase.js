import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBAncY57AOpYqg7_VWupjBOIFjPAg9cWIA",
    authDomain: "project5-f1dd2.firebaseapp.com",
    projectId: "project5-f1dd2",
    storageBucket: "project5-f1dd2.appspot.com",
    messagingSenderId: "394763942955",
    appId: "1:394763942955:web:c9126927d0bec299fc3e6e",
    measurementId: "G-NKMRFPGXNV"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app)