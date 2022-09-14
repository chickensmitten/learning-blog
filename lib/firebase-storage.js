// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBX8QdLNZvK16ibuED3fCGRIjtFFWiwU1k",
//   authDomain: "learning-blog-nextjs.firebaseapp.com",
//   projectId: "learning-blog-nextjs",
//   storageBucket: "learning-blog-nextjs.appspot.com",
//   messagingSenderId: "509781298133",
//   appId: "1:509781298133:web:278136cf02d9d6fca64b5c"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);

// function firebaseStorage() {

//   const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGINGSENDERID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
//   };

//   const app = initializeApp(firebaseConfig);
//   const firebase = getStorage(app);
//   return firebase;
// }

// export default firebaseStorage